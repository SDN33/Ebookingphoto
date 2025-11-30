export interface Photo {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
  aspectRatio: 'portrait' | 'landscape';
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface RotatingTextProps {
  words: string[];
  interval?: number;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}
