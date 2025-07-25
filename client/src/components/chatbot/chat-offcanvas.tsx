import { ChangeEvent, FormEvent } from "react";
import { CloseButton, Offcanvas } from "react-bootstrap";
import { ChatMessage } from "../../types/chat.models";
import { ChatInputComponent } from "./chat-input";
import { ChatListComponent } from "./chat-list";

interface ChatOffCanvasProps {
  show: boolean;
  handleClose: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  messages: ChatMessage[];
  prompt: string;
  isLoading: boolean;
}

export const ChatOffCanvasComponent = ({
  show,
  handleClose,
  handleChange,
  handleSubmit,
  messages,
  prompt,
  isLoading,
}: ChatOffCanvasProps) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header>
        <Offcanvas.Title>AI Assistant</Offcanvas.Title>
        <CloseButton onClick={handleClose} />
      </Offcanvas.Header>
      <Offcanvas.Body className="position-relative">
        <ChatListComponent messages={messages} />
        <ChatInputComponent
          value={prompt}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};
