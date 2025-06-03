import React, { useState } from 'react';
import { Bell, MessageSquare, Search, Settings, Menu, X } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { currentUser } from '../../data/mockData';
import { User } from '@/types';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  currentUser: User;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarOpen, currentUser }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const avatarSrc = currentUser.avatar ?? "/default-avatar.png";
  const notificationCount = 3;

  return (
    <header className="bg-white border-b border-neutral-200 py-3 px-4 sm:px-6 flex items-center justify-between shadow-subtle">
      <div className="flex items-center">
        <button
          type="button"
          className="mr-3 p-1.5 rounded-md text-neutral-600 hover:bg-neutral-100 lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center">
          <MessageSquare className="text-primary-600 h-6 w-6" />
          <h1 className="ml-2 text-lg font-semibold text-primary-800">Campus Connect</h1>
        </div>
      </div>

      <div className="hidden md:flex mx-4 flex-1 max-w-md relative">
        <div className="w-full">
          <input
            type="text"
            placeholder="Chercher un message, chaînes ou utilisateurs..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-1.5 rounded-md text-neutral-600 hover:bg-neutral-100 relative md:hidden" aria-label="Search">
          <Search size={20} />
        </button>

        <div className="relative">
          <button 
            className="p-1.5 rounded-md text-neutral-600 hover:bg-neutral-100 relative"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-error-500 text-xs text-white">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-modal border border-neutral-200 z-20 animate-fade-in">
              <div className="p-3 border-b border-neutral-200">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Avatar 
                        src="https://i.pinimg.com/736x/62/67/5b/62675bbafb119acbab1037b5399f5c78.jpg" 
                        alt="Valérie Herinantenaina" 
                        size="sm" 
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-neutral-800">
                        <span className="font-medium">Valérie Herinantenaina</span> vous a mentionné dans le Projet Team Alpha.
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">Il y a 5 min</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Avatar 
                        src="https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg" 
                        alt="Hary Rabenamana" 
                        size="sm" 
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-neutral-800">
                        <span className="font-medium">Hary Rabenamana</span> a partagé une annonce.
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">Il y a 1 heure</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-neutral-50 cursor-pointer">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-100 rounded-full p-2">
                      <Bell size={16} className="text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-neutral-800">
                        La réinscription pour la saison de l'automne est déjà ouverte.
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">il y a 5 heures</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 text-center border-t border-neutral-200">
                <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
                  Voir toutes les notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            className="flex items-center"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
          >
            <Avatar
              status={currentUser.status}
              src={avatarSrc}
              alt={currentUser.name}
              size="sm"
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-modal border border-neutral-200 z-20 animate-fade-in">
              <div className="p-3 border-b border-neutral-200">
                <div className="flex items-center">
                  <Avatar
                    status={currentUser.status}
                    src={avatarSrc}
                    alt={currentUser.name}
                    size="sm"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-800">{currentUser.name}</p>
                    <p className="text-xs text-neutral-500">{currentUser.email}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <Badge variant="primary" size="sm">
                    {currentUser.role === 'admin' ? 'Administrator' : 
                     currentUser.role === 'faculty' ? 'Faculty' : 'Student'}
                  </Badge>
                  {currentUser.department && (
                    <span className="ml-2 text-xs text-neutral-500">{currentUser.department}</span>
                  )}
                </div>
              </div>
              <div className="py-1">
                <button className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                  <Settings size={16} className="mr-2" />
                  Settings
                </button>
                <button className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
