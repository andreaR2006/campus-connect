'use client';

import { Message, User } from '@/types';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
}

export default function MessageList({ messages, currentUser }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`max-w-xs px-4 py-2 rounded shadow text-white ${
            msg.sender === currentUser._id ? 'bg-blue-600 self-end ml-auto' : 'bg-gray-600 self-start mr-auto'
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
