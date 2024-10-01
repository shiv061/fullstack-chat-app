import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useParams } from "react-router-dom";

export const ChatInput = ({
  sendMessage,
}: {
  sendMessage: (content: string, receiverId: string) => void;
}) => {
  const [value, setValue] = useState("");
  const { chatId: chatUserId } = useParams();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onSend = useCallback(() => {
    if (chatUserId) sendMessage(value, chatUserId);
    setValue("");
  }, [chatUserId, sendMessage, value]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSend();
      }
    },
    [onSend]
  );

  return (
    <footer className="flex items-center space-x-2 p-2 border-t">
      <Input
        className="flex-1"
        value={value}
        onChange={onChange}
        placeholder="Type a message"
        onKeyDown={handleKeyDown}
      />
      <Button variant="outline" size="sm" onClick={onSend}>
        Send
      </Button>
    </footer>
  );
};
