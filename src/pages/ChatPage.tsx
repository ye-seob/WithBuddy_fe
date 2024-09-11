import React, { useEffect, useRef, useState } from "react";
import styles from "../public/css/ChatPage.module.css";
import { useUserStore } from "../stores/userStore";
import { io, Socket } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { BuddyData } from "./RoomListPage";
import { CiCircleChevLeft } from "react-icons/ci";
interface ChatMessage {
  studentId: string;
  message: string;
  timestamp: string;
  name: string;
}

const ChatPage: React.FC = () => {
  const { studentId, major, name } = useUserStore();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const roomBuddy = location.state as BuddyData;
  useEffect(() => {
    // 소켓 초기화 코드
    const newSocket = io("https://api.skuwithbuddy.com");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      const room = `${Math.min(
        parseInt(studentId),
        parseInt(roomBuddy.studentId)
      )}-${Math.max(parseInt(studentId), parseInt(roomBuddy.studentId))}`;
      newSocket.emit("join room", room);
    });

    // 기존 메시지 수신
    newSocket.on("previous messages", (msgs: ChatMessage[]) => {
      setMessages(msgs);
    });

    // 새로운 메시지 수신 및 알림 표시
    newSocket.on("chat message", (msg: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, [studentId, major, roomBuddy.studentId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.emit("chat message", {
        studentId,
        major,
        message,
        name,
        roomBuddyId: roomBuddy.studentId,
      });
      setMessage("");
    }
  };
  const handleBack = () => {
    navigate("/roomlist");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };

  return (
    <div className={styles.chat_container}>
      <div className={styles.header_section}>
        <button onClick={handleBack} className={styles.back_button}>
          <CiCircleChevLeft size={24} />
        </button>
        <span className={styles.title}>
          {roomBuddy.major} - {roomBuddy.name}
        </span>
      </div>

      <div className={styles.messages_section}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.studentId === studentId ? styles.right : styles.left
            }`}
          >
            <div>
              <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                {msg.name}{" "}
                <span style={{ fontSize: "0.7rem" }}>
                  ({msg.studentId.slice(2, 4)}학번)
                </span>
              </span>
            </div>
            <div> {msg.message}</div>
            <div className={styles.timestamp}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.input_section}>
        <input
          placeholder="메세지를 입력해주세요"
          type="text"
          value={message}
          className={styles.input}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.send_button} type="submit">
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
