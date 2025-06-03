'use client';

import React, { useState } from 'react';
import { Bell, MessageSquare, Search, Settings, Menu, X, LogOut } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

interface User {
  name: string;
  email: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
  role?: string;
  department?: string;
}

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  user: User;
  currentUser: User;
  selectedUser: User;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarOpen, user }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notificationCount = 3;

  return (
    <header className="border-b border-neutral-200 bg-white px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Sidebar Toggle & Logo */}
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-neutral-100 focus:outline-none text-neutral-600"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center ml-2">
          <MessageSquare className="text-primary-600 h-6 w-6" />
          <span className="ml-2 text-lg font-semibold text-primary-800">Campus Connect</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center flex-1 mx-4 max-w-md relative">
        <Search className="absolute left-3 top-2.5 text-neutral-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full pl-10 pr-4 py-2 text-sm border rounded-md border-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3 relative">
        {/* Search mobile */}
        <button className="md:hidden p-2 hover:bg-neutral-100 rounded-full text-neutral-500">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-neutral-100 rounded-full text-neutral-500 relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-30 mt-2 w-80 bg-white rounded-md shadow-lg border border-neutral-200 animate-fade-in">
              <div className="p-3 border-b">
                <h3 className="text-sm font-medium text-neutral-800">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y text-sm">
                <div className="flex items-start p-3 hover:bg-neutral-50 cursor-pointer">
                  <Avatar
                    src="https://i.pinimg.com/736x/62/67/5b/62675bbafb119acbab1037b5399f5c78.jpg"
                    alt="Valérie"
                    size="sm"
                  />
                  <div className="ml-3">
                    <p className="text-neutral-800">
                      <span className="font-semibold">Valérie</span> vous a mentionné dans Team Alpha.
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">Il y a 5 min</p>
                  </div>
                </div>
                {/* Autres notifications... */}
              </div>
              <div className="p-3 border-t text-center">
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  Voir toutes les notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
            className="focus:outline-none"
          >
            <Avatar
              src={user.avatar ?? '/default-avatar.png'}
              alt={user.name}
              size="sm"
              status={user.status}
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 z-30 mt-2 w-64 bg-white rounded-md shadow-lg border border-neutral-200 animate-fade-in">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <Avatar
                    src={user.avatar ?? '/default-avatar.png'}
                    alt={user.name}
                    size="sm"
                    status={user.status}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-800">{user.name}</p>
                    <p className="text-xs text-neutral-500">{user.email}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="primary" size="sm">
                    {user.role === 'admin' ? 'Administrateur' :
                      user.role === 'faculty' ? 'Enseignant' : 'Étudiant'}
                  </Badge>
                  {user.department && (
                    <span className="text-xs text-neutral-500">{user.department}</span>
                  )}
                </div>
              </div>
              <div className="py-2">
                <button className="w-full flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
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
