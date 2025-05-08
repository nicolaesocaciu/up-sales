
import { ReactNode } from 'react';

export function highlightText(text: string, searchQuery: string): ReactNode {
  // If there's no search query or text is empty, return original text
  if (!searchQuery || !text) return text;
  
  try {
    // Case-insensitive search
    const regExp = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regExp);
    
    // If no matches found or split didn't work, return original text
    if (parts.length <= 1) return text;
    
    // Map parts to React nodes with highlighted spans
    return parts.map((part, i) => {
      if (part.toLowerCase() === searchQuery.toLowerCase()) {
        return <span key={i} className="bg-yellow-200">{part}</span>;
      }
      return part;
    });
  } catch (error) {
    // In case of regex error, return original text
    console.error('Error highlighting text:', error);
    return text;
  }
}
