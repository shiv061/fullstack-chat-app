import { IMessageState } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

export const Messages = ({
  messages,
  userId,
}: {
  messages: IMessageState[];
  userId?: number;
}) => {
  return (
    <div>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex items-end space-x-2",
            userId === message.senderId && "justify-end"
          )}
        >
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>{message.receiverId}</AvatarFallback>
          </Avatar>
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
