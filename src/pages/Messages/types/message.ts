export type MessageCategory = 'all' | 'system' | 'interaction';

export type MessageType = 
  | 'system_announcement' 
  | 'review_approved' 
  | 'review_rejected'
  | 'comment_reply' 
  | 'mention' 
  | 'like';

export interface Message {
  id: string;
  type: MessageType;
  category: MessageCategory;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  };
  title: string;
  preview: string;
  content: string;
  time: string;
  isRead: boolean;
  course?: {
    id: string;
    name: string;
    code: string;
  };
  attachments?: Array<{
    type: 'image' | 'file';
    url: string;
    name: string;
  }>;
  relatedUrl?: string;
}