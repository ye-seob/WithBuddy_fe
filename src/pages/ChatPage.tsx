import React, { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import styles from "../public/css/ChatPage.module.css";
import { useUserStore } from "../stores/userStore";
import { useChatStore } from "../stores/useChatStore";

const socket: Socket = io("https://www.skuwithbuddy.com");

export interface ChatMessage {
  _id: string;
  studentId: string;
  message: string;
  timestamp: string;
  group: string;
}

const ChatPage: React.FC = () => {
  const { studentId, major } = useUserStore();
  const [message, setMessage] = useState<string>("");
  const { messages, setMessages, addMessage } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.emit("register", { studentId, major });

    socket.on("previousMessages", (loadedMessages: ChatMessage[]) => {
      setMessages(loadedMessages);
    });

    socket.on("chat message", (newMessage: ChatMessage) => {
      addMessage(newMessage);
    });

    socket.on("error", (errorMessage: string) => {
      console.error("Server error:", errorMessage);
      // 오류 처리
    });

    return () => {
      socket.off("previousMessages");
      socket.off("chat message");
      socket.off("error");
    };
  }, [studentId, major, setMessages, addMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div className={styles.chat_container}>
      <div className={styles.header_section}>
        <span className={styles.title}>
          {major} {studentId.slice(-3)}번
        </span>
      </div>
      <div className={styles.messages_section}>
        {messages.map((msg) => (
          <div key={msg._id} className={styles.message}>
            <strong>{msg.studentId}: </strong>
            <span>{msg.message}</span>
            <div className={styles.timestamp}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className={styles.input_section}>
        <input
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button type="submit" className={styles.send_button}>
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
