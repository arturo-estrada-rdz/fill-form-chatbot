import { ChangeEvent, FormEvent } from "react";
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Popover,
  Spinner,
} from "react-bootstrap";
import { ChatMessage } from "../../types/chat.models";
import { ChatListComponent } from "./chat-list";

interface ChatOverlayProps {
  messages: ChatMessage[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  propt: string;
  isLoading: boolean;
}

export const ChatOverlayComponent = ({
  messages,
  onChange,
  onSubmit,
  propt,
  isLoading,
}: ChatOverlayProps) => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      overlay={
        <Popover id="ai-chat">
          <Popover.Header as="h3">AI Assistant</Popover.Header>
          <Popover.Body>
            <ChatListComponent messages={messages} />
            <Form noValidate onSubmit={onSubmit}>
              <InputGroup className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Ask me anything..."
                  className="mt-2"
                  name="prompt"
                  onChange={onChange}
                  value={propt}
                  disabled={isLoading}
                ></Form.Control>
                <Button
                  type="submit"
                  className="mt-2"
                  variant="outline-secondary"
                  size="sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="grow" />
                  ) : (
                    <i className="bi bi-send"></i>
                  )}
                </Button>
              </InputGroup>
            </Form>
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant="primary" className="ai-assistant-button">
        <i className="bi bi-robot"></i>
        <span className="m-2">AI Assistant</span>
      </Button>
    </OverlayTrigger>
  );
};
