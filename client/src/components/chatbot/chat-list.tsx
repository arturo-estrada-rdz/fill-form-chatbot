import { useEffect, useRef } from "react";
import { Row } from "react-bootstrap";
import { ChatMessage } from "../../types/chat.models";

interface ChatListProps {
  messages: ChatMessage[];
}

export const ChatListComponent = ({ messages }: ChatListProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="chat-list overflow-auto"
      style={{ maxHeight: "calc(100vh - 160px)" }}
      ref={messagesContainerRef}
    >
      {messages.map((message, index) => (
        <Row key={index} className={`chat-message ${message.role}`}>
          <div className="message-content">
            <strong>{message.role === "user" ? "User" : "Assistant"}:</strong>{" "}
            {message.content}
          </div>
          <div className="message-timestamp">
            {new Date(message.createdAt).toLocaleTimeString()}
          </div>
        </Row>
      ))}
    </div>
  );
};
