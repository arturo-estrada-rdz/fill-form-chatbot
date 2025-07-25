import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { useChatHistory } from "../../hooks/use-chat-history";
import { ChatOffCanvasComponent } from "./chat-offcanvas";

export const AIAssistantComponent = () => {
  const { messages, addMessage, isLoading } = useChatHistory();
  const [userMessage, setUserMessage] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const onPropmtChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserMessage(value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    addMessage(userMessage);
    setUserMessage("");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className="ai-assistant-button"
        onClick={handleShow}
      >
        <i className="bi bi-robot"></i>
        <span className="m-2">AI Assistant</span>
      </Button>
      <ChatOffCanvasComponent
        show={show}
        handleClose={handleClose}
        handleChange={onPropmtChange}
        handleSubmit={onSubmit}
        messages={messages}
        isLoading={isLoading}
        prompt={userMessage}
      />
    </>
  );
};
