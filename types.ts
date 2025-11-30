export interface NewsScript {
  title: string;
  script: string;
  hashtags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  imageUrl: string;
  nftPerks: string[];
}

export interface CourseItem {
  id: string;
  title: string;
  price: string;
  students: number;
  description: string;
  tags: string[];
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  isNftLinked: boolean;
  imageUrl: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: string; // Display price
  priceValue: number; // Numeric for calculation
  type: 'EVENT' | 'MERCH' | 'COURSE' | 'SERVICE' | 'SPORTS';
  image?: string;
}

export type ViewState = 
  | 'HOME' 
  | 'EVENTS' 
  | 'SPORTS' 
  | 'WATCH' 
  | 'TALENT' 
  | 'STUDIO' 
  | 'GROWTH' 
  | 'CREDENTIAL' 
  | 'LEARN' 
  | 'SHOP';