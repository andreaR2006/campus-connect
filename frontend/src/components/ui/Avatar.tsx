import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away';
  className?: string;
}

const Avatar = ({ src, alt, size = 'md', status, className = '' }: AvatarProps) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const statusClasses = {
    online: 'bg-success-500',
    offline: 'bg-neutral-300',
    away: 'bg-warning-500',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
      {status && (
        <span 
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${
            statusClasses[status]
          } ${size === 'xs' ? 'w-1.5 h-1.5' : size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'}`}
        />
      )}
    </div>
  );
};

export default Avatar;
