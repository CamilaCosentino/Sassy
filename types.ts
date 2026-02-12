export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Full text content
  category: string; // The Main Room Category (e.g. Epistemology)
  subcategory: string; // The specific Object Subcategory (e.g. Nonbinary Logic)
  image?: string;
}

export interface InteractiveObject {
  id: string;
  name: string;
  type: 'sub' | 'main'; // 'sub' for subcategories, 'main' for the central repository
  description: string; // Tooltip text
  top: string; // percentage CSS value
  left: string; // percentage CSS value
  posts: Post[];
}

export interface RoomData {
  id: string;
  title: string;
  image: string;
  description: string;
  objects: InteractiveObject[];
}

export enum ViewState {
  HOME = 'HOME',
  ROOM = 'ROOM'
}