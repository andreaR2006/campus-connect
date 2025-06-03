import React from 'react';
import { MessageSquare } from 'lucide-react';
import Button from './Button';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-72 h-72 mb-6">
        <img 
          src="https://images.pexels.com/photos/5417678/pexels-photo-5417678.jpeg?auto=compress&cs=tinysrgb&w=800" 
          alt="3D illustration of communication" 
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Welcome to Campus Connect</h1>
      <p className="text-neutral-600 max-w-md mb-8">
        The messaging platform designed to facilitate communication between students and administrative staff at your university.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
        <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-subtle">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
              <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"></path>
              <path d="M19 17V5a2 2 0 0 0-2-2H4"></path>
              <path d="M15 8h-5"></path>
              <path d="M15 12h-5"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Stay Informed</h3>
          <p className="text-sm text-neutral-600 text-center">
            Receive important announcements and updates from your university.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-subtle">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
              <path d="M17 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4"></path>
              <path d="M5 5a4 4 0 0 1 4.5-3.5C10.5 1.2 11.7 1 13 1h1a9 9 0 0 1 9 9v5a2 2 0 0 1-2 2h-2v-4.5a6.5 6.5 0 0 0-13 0V17H4a2 2 0 0 1-2-2v-5c0-4.2 2.5-6.9 6.3-7.8"></path>
              <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Get Support</h3>
          <p className="text-sm text-neutral-600 text-center">
            Connect directly with administrative staff for personalized assistance.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-subtle">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
              <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Collaborate</h3>
          <p className="text-sm text-neutral-600 text-center">
            Work together with peers and faculty on projects and assignments.
          </p>
        </div>
      </div>
      <Button className="mt-8">
        <MessageSquare size={18} className="mr-2" />
        Start Chatting
      </Button>
    </div>
  );
};

export default EmptyState;