"use client";

import { useState } from "react";

interface Props {
  onSend: (content: string) => void | Promise<void>;
}

export default function MessageInput({
  onSend,
}: Props) {
  const [content, setContent] = useState("");

  const handleSend = () => {
    if (!content.trim()) return;

    onSend(content);

    setContent("");
  };

  return (
    <div className="border-t p-4 flex gap-2">
      <input
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        type="text"
        placeholder="Type a message"
        className="flex-1 border rounded px-3 py-2"
      />

      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}
