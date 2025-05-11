
import React from 'react';

export const DragDotsIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="4" cy="2" r="2" fill="currentColor" />
      <circle cx="12" cy="2" r="2" fill="currentColor" />
      <circle cx="4" cy="6" r="2" fill="currentColor" />
      <circle cx="12" cy="6" r="2" fill="currentColor" />
      <circle cx="4" cy="10" r="2" fill="currentColor" />
      <circle cx="12" cy="10" r="2" fill="currentColor" />
      <circle cx="4" cy="14" r="2" fill="currentColor" />
      <circle cx="12" cy="14" r="2" fill="currentColor" />
    </svg>
  );
};
