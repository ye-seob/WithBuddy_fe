import React, { useEffect, useRef, useState } from "react";
import styles from "../public/css/ChatPage.module.css";
import { useUserStore } from "../stores/userStore";
import { io, Socket } from "socket.io-client";

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

  useEffect(() => {
    const newSocket = io("https://api.skuwithbuddy.com");
    //const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("join room", { major, studentId, name });
    });

    newSocket.on("previous messages", (msgs: ChatMessage[]) => {
      setMessages(msgs);
    });

    newSocket.on("chat message", (msg: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [studentId, major, name]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("chat message", { studentId, major, message, name }, () => {
        setMessage("");
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
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
        <button className={styles.send_button} onClick={() => {}}>
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
