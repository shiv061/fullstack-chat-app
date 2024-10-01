import { Button } from "@/components/ui/button";
import { ChatInput } from "./ChatInput";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Messages } from "./Messages";
import { useAuthContext } from "@/context/AuthContext";

export default function ChatWindow() {
  const { user } = useAuthContext();

  const { messages, sendMessage } = useWebSocket({ userId: user?.id });
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <h1 className="text-lg font-semibold">Chat Room</h1>
        <Button variant="outline" size="sm">
          Leave Chat
        </Button>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <Messages messages={messages} userId={user?.id} />
      </main>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
