"use client";

import { FormEvent, useState } from "react";

interface Props {
  disabled: boolean;
  onSend: (content: string) => Promise<void>;
}

export default function MessageInput({ disabled, onSend }: Props) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent || disabled || isSending) return;

    setIsSending(true);

    try {
      await onSend(trimmedContent);
      setContent("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-zinc-200 bg-white p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={disabled ? "Select a user first" : "Type a message"}
          disabled={disabled || isSending}
          className="min-w-0 flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-700 text-blue-600 disabled:bg-zinc-100"
        />
        <button
          type="submit"
          disabled={disabled || isSending || !content.trim()}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          Send
        </button>
      </div>
    </form>
  );
}
