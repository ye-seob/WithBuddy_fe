import React, { useEffect, useRef, useState } from "react";
import styles from "../public/css/ChatPage.module.css";
import { useUserStore } from "../stores/userStore";
import { io, Socket } from "socket.io-client";
import Button from "../components/Button";
import Input from "../components/Input";

interface ChatMessage {
  studentId: string;
  message: string;
  timestamp: string;
}

const ChatPage: React.FC = () => {
  const { studentId, major } = useUserStore();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newSocket = io("https://api/skuwithbuddy.com");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("소켓 연결:", newSocket.id);

      // 방에 참가하고 이전 메시지 요청
      newSocket.emit("join room", { major, studentId });
    });

    // 이전 메시지 수신
    newSocket.on("previous messages", (msgs: ChatMessage[]) => {
      setMessages(msgs);
    });

    // 새로운 메시지 수신
    newSocket.on("chat message", (msg: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
      console.log("소켓 연결 중단");
    };
  }, [studentId, major]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("chat message", { studentId, major, message }, () => {
        setMessage("");
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };

  return (
    <div className={styles.chat_container}>
      <div className={styles.header_section}>
        <span className={styles.title}>
          {major} {studentId.slice(-3)}번
        </span>
      </div>

      <div className={styles.messages_section}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <div>
              <strong>{msg.studentId}</strong>
            </div>
            <div>{msg.message}</div>
            <div className={styles.timestamp}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.input_section}>
        <Input
          placeholder="메세지를 입력해주세요"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={() => {}} text="전송" className={styles.send_button} />
      </form>
    </div>
  );
};

export default ChatPage;
