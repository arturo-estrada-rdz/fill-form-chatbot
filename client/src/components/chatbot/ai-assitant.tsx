import { ChangeEvent, FormEvent, useState } from "react";
import { useChatHistory } from "../../hooks/use-chat-history";
import { ChatOverlayComponent } from "./chat-overlay";

export const AIAssistantComponent = () => {
  const { messages, addMessage, isLoading } = useChatHistory();
  const [userMessage, setUserMessage] = useState<string>("");

  const onPropmtChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserMessage(value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    addMessage(userMessage);
    setUserMessage("");
  };

  return (
    <div className="ai-assistant position-absolute bottom-0 end-0">
      <ChatOverlayComponent
        messages={messages}
        onChange={onPropmtChange}
        propt={userMessage}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};
