import { IMessageState } from "@/types";
import { BASE_SOCKET_URL } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";

export const useWebSocket = ({ userId }: { userId?: number }) => {
  const [messages, setMessages] = useState<IMessageState[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${BASE_SOCKET_URL}/chat/${userId}`);
    setSocket(ws);

    ws.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  const sendMessage = useCallback(
    (content: string, receiverId: string) => {
      if (socket) {
        socket.send(JSON.stringify({ type: "chat", content, receiverId }));
      }
    },
    [socket]
  );

  return { messages, sendMessage };
};
