'use client';

import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useEffect, useState } from 'react';
import { Message, User, Discussion } from '@/types';

interface ChatRoomProps {
  discussion: Discussion;
  currentUser: User;
  selectedUser: User;
}

export default function ChatRoom({ currentUser, selectedUser, discussion }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${selectedUser._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error('Erreur lors du chargement des messages', error);
      }
    };

    if (selectedUser) fetchMessages();
  }, [selectedUser]);

  const handleSend = async (content: string) => {
    const newMessage = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      content,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newMessage),
      });

      const saved = await res.json();
      setMessages((prev) => [...prev, saved]);
    } catch (err) {
      console.error("Erreur d'envoi", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <ChatHeader
        currentUser={currentUser}
        selectedUser={selectedUser}
        user={currentUser}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 md:px-6 md:py-4 bg-white dark:bg-gray-800 transition-colors">
        <MessageList messages={messages} currentUser={currentUser} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
