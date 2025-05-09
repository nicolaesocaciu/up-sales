
import { ReactNode } from "react";

export const highlightText = (text: string, searchQuery: string): ReactNode => {
  if (!searchQuery) return text;
  
  const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === searchQuery.toLowerCase() ? 
      <span key={i} className="bg-yellow-200">{part}</span> : 
      part
  );
};
