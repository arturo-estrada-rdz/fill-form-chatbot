import { ChangeEvent, FormEvent } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";

interface ChatInputPros {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export const ChatInputComponent = ({
  value,
  isLoading,
  handleChange,
  handleSubmit,
}: ChatInputPros) => {
  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="position-absolute"
      style={{ bottom: "1.5rem", width: "91%" }}
    >
      <InputGroup className="mt-3">
        <Form.Control
          type="text"
          placeholder="Ask me anything..."
          className="mt-2"
          name="prompt"
          onChange={handleChange}
          value={value}
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
            <Spinner animation="grow" size="sm" />
          ) : (
            <i className="bi bi-send"></i>
          )}
        </Button>
      </InputGroup>
    </Form>
  );
};
