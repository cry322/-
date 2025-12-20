import { Bell, MessageCircle, Heart, BookOpen, CheckCircle, XCircle, AtSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Message, MessageType } from '../types/message';

interface MessageItemProps {
  message: Message;
  isSelected: boolean;
  onClick: () => void;
}

const messageTypeIcons: Record<MessageType, any> = {
  system_announcement: Bell,
  review_approved: CheckCircle,
  review_rejected: XCircle,
  comment_reply: MessageCircle,
  mention: AtSign,
  like: Heart,
};

const messageTypeColors: Record<MessageType, string> = {
  system_announcement: 'text-blue-600',
  review_approved: 'text-green-600',
  review_rejected: 'text-red-600',
  comment_reply: 'text-purple-600',
  mention: 'text-orange-600',
  like: 'text-pink-600',
};

export function MessageItem({ message, isSelected, onClick }: MessageItemProps) {
  const Icon = messageTypeIcons[message.type];
  const iconColor = messageTypeColors[message.type];
  
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
        isSelected 
          ? 'bg-blue-50 border-l-2 border-l-[#2563eb]' 
          : message.isRead 
            ? 'bg-white hover:bg-gray-50' 
            : 'bg-blue-50/30 hover:bg-blue-50/50'
      }`}
    >
      <div className="flex gap-3">
        {/* 头像/图标区域 */}
        <div className="relative flex-shrink-0">
          {message.sender.avatar ? (
            <ImageWithFallback 
              src={message.sender.avatar}
              alt={message.sender.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
          )}
          {!message.isRead && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2563eb] rounded-full border-2 border-white"></div>
          )}
        </div>

        {/* 消息内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="truncate">{message.sender.name}</div>
            <span className="text-gray-400 flex-shrink-0" style={{ fontSize: '12px' }}>
              {message.time}
            </span>
          </div>
          
          <div 
            className="text-gray-900 mb-1" 
            style={{ fontSize: '14px' }}
          >
            {message.title}
          </div>
          
          <div 
            className="text-gray-500 line-clamp-2"
            style={{ fontSize: '13px' }}
          >
            {message.preview}
          </div>

          {/* 课程标签 */}
          {message.course && (
            <div className="mt-2">
              <span 
                className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                style={{ fontSize: '12px' }}
              >
                {message.course.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}