import React, { useState } from 'react';
import {
  Hash,
  User as UserIcon,
  Users,
  Plus,
  ChevronDown,
  ChevronRight,
  Star,
} from 'lucide-react';
import Badge from '../ui/Badge';
import { Discussion, User } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onSelectChat: (chatId: string) => void;
  selectedChatId: string;
  users: User[];
  currentUserId?: string;
  mockChatRooms?: Discussion[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onSelectChat,
  selectedChatId,
  currentUserId,
  mockChatRooms = [],
  users,
}) => {
  const [channelsExpanded, setChannelsExpanded] = useState(true);
  const [directExpanded, setDirectExpanded] = useState(true);
  const [groupsExpanded, setGroupsExpanded] = useState(true);

  const channels = mockChatRooms.filter(room => room.type === 'channel');
  const directMessages = mockChatRooms.filter(room => room.type === 'direct');
  const groups = mockChatRooms.filter(room => room.type === 'group');

  const renderChatItem = (chat: Discussion) => {
    const isSelected = selectedChatId === chat._id;

    const icon =
      chat.type === 'channel' ? (
        <Hash size={18} className="text-primary-600" />
      ) : chat.type === 'direct' ? (
        <UserIcon size={18} className="text-primary-600" />
      ) : (
        <Users size={18} className="text-primary-600" />
      );

    let displayName = chat.name || 'Discussion';

    if (chat.type === 'direct') {
      const otherUser = chat.participants.find(user => user._id !== currentUserId);
      if (otherUser) {
        displayName = otherUser?.name || 'Discussion';
      }
    } else if (chat.type === 'group' && chat.groupName) {
      displayName = chat.groupName;
    }

    return (
      <li key={chat._id}>
        <button
          className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
            isSelected
              ? 'bg-primary-100 text-primary-800 font-semibold'
              : 'text-neutral-700 hover:bg-neutral-100'
          }`}
          onClick={() => chat._id && onSelectChat(chat._id)}
          aria-current={isSelected ? 'page' : undefined}
        >
          <span className="mr-2">{icon}</span>
          <span className="truncate flex-1">{displayName}</span>

          {chat.isStarred && (
            <Star size={14} className="ml-1 text-yellow-500" />
          )}
          {chat.unreadCount && chat.unreadCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs text-white font-semibold">
              {chat.unreadCount}
            </span>
          )}
        </button>
      </li>
    );
  };

  if (!isOpen) return null;

  return (
    <aside className="bg-white border-r border-neutral-200 w-72 flex-shrink-0 h-full overflow-y-auto shadow-subtle">
      <div className="py-4 flex flex-col h-full">
        <div className="px-4 mb-4">
          <button className="w-full py-2 px-3 flex items-center justify-center rounded-md border border-dashed border-neutral-300 text-sm text-neutral-600 hover:border-primary-500 hover:text-primary-600 transition-colors">
            <Plus size={16} className="mr-2" />
            Commencer une nouvelle discussion...
          </button>
        </div>

        {/* Channels */}
        <div className="mb-6">
          <button
            className="flex items-center justify-between px-4 py-2 w-full text-sm font-semibold text-neutral-800 hover:bg-neutral-50 rounded-md transition-colors"
            onClick={() => setChannelsExpanded(!channelsExpanded)}
            aria-expanded={channelsExpanded}
            aria-controls="channels-list"
          >
            <div className="flex items-center">
              {channelsExpanded ? (
                <ChevronDown size={16} className="text-primary-600" />
              ) : (
                <ChevronRight size={16} className="text-primary-600" />
              )}
              <span className="ml-2">Channels</span>
            </div>
            <Badge variant="neutral" size="sm">{channels.length}</Badge>
          </button>

          {channelsExpanded && (
            <ul
              id="channels-list"
              className="mt-1 ml-4 space-y-1 mr-1 max-h-64 overflow-y-auto animate-fade-in"
            >
              {channels.map(renderChatItem)}
              <li key="add-channel">
                <button className="w-full flex items-center px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md font-medium">
                  <Plus size={16} className="mr-2" />
                  Ajouter une chaîne
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* Groups */}
        <div className="mb-6">
          <button
            className="flex items-center justify-between px-4 py-2 w-full text-sm font-semibold text-neutral-800 hover:bg-neutral-50 rounded-md transition-colors"
            onClick={() => setGroupsExpanded(!groupsExpanded)}
            aria-expanded={groupsExpanded}
            aria-controls="groups-list"
          >
            <div className="flex items-center">
              {groupsExpanded ? (
                <ChevronDown size={16} className="text-primary-600" />
              ) : (
                <ChevronRight size={16} className="text-primary-600" />
              )}
              <span className="ml-2">Groupes</span>
            </div>
            <Badge variant="neutral" size="sm">{groups.length}</Badge>
          </button>

          {groupsExpanded && (
            <ul
              id="groups-list"
              className="mt-1 ml-4 space-y-1 mr-1 max-h-64 overflow-y-auto animate-fade-in"
            >
              {groups.map(renderChatItem)}
              <li key="add-group">
                <button className="w-full flex items-center px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md font-medium">
                  <Plus size={16} className="mr-2" />
                  Ajouter un groupe
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* Direct Messages */}
        <div className="mb-4 flex-grow">
          <button
            className="flex items-center justify-between px-4 py-2 w-full text-sm font-semibold text-neutral-800 hover:bg-neutral-50 rounded-md transition-colors"
            onClick={() => setDirectExpanded(!directExpanded)}
            aria-expanded={directExpanded}
            aria-controls="direct-list"
          >
            <div className="flex items-center">
              {directExpanded ? (
                <ChevronDown size={16} className="text-primary-600" />
              ) : (
                <ChevronRight size={16} className="text-primary-600" />
              )}
              <span className="ml-2">Messages directs</span>
            </div>
            <Badge variant="neutral" size="sm">{directMessages.length}</Badge>
          </button>

          {directExpanded && (
            <ul
              id="direct-list"
              className="mt-1 ml-4 space-y-1 mr-1 max-h-64 overflow-y-auto animate-fade-in"
            >
              {directMessages.map(renderChatItem)}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
