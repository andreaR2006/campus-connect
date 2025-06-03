'use client';

import ChatHeader from '@/components/Chat/ChatHeader';
import ChatRoom from '@/components/Chat/ChatRoom';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Discussion, User } from '@/types';
import { currentUser } from '@/data/mockData';


export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [currentDiscussion, setCurrentDiscussion] = useState<Discussion | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => router.push('/login'));
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDiscussions(data));
  }, []);

  const handleSelectDiscussion = (discussion: Discussion) => {
    setCurrentDiscussion(discussion);
  };

const [sidebarOpen, setSidebarOpen] = useState(false);

const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen">
      <aside className="w-1/3 border-r overflow-y-auto">
{user && (
  <ChatHeader
    currentUser={user}
    selectedUser={user}
    user={user}
    onToggleSidebar={toggleSidebar}
    sidebarOpen={sidebarOpen}
  />
)}

        <ul>
          {discussions.map((d) => (
            <li
              key={d._id}
              onClick={() => handleSelectDiscussion(d)}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                currentDiscussion?._id === d._id ? 'bg-gray-200' : ''
              }`}
            >
              {d.isGroup ? d.groupName : d.participants.find((p) => p._id !== user?._id)?.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 flex flex-col">
        {currentDiscussion && user ? (
          <ChatRoom
            discussion={currentDiscussion}
            currentUser={currentUser}       // <- Simulé ou récupéré depuis tes données mockées
            selectedUser={user as User}     // <- forcer à User si tu es sûre qu’il ne sera pas null
          />

        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Sélectionnez une discussion
          </div>
        )}
      </main>
    </div>
  );
}
