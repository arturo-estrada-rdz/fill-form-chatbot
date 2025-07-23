import { Row } from "react-bootstrap";
import { ChatMessage } from "../../types/chat.models";

interface ChatListProps {
  messages: ChatMessage[];
}

export const ChatListComponent = ({ messages }: ChatListProps) => {
  return (
    <div className="chat-list overflow-auto" style={{ maxHeight: "450px" }}>
      {messages.map((message, index) => (
        <Row key={index} className={`chat-message ${message.role}`}>
          <div className="message-content">
            <strong>{message.role === "user" ? "User" : "Assistant"}:</strong>{" "}
            {message.content}
          </div>
          <div className="message-timestamp">
            {message.createdAt.toLocaleTimeString()}
          </div>
        </Row>
      ))}
    </div>
  );
};
