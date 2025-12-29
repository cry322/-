import { useState } from "react";
import { X, Check, Trash2, MessageCircle, ThumbsUp, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Message {
  id: string;
  type: "comment" | "like" | "system";
  from: {
    avatar: string;
    nickname: string;
  };
  content: string;
  targetTitle?: string;
  time: string;
  isRead: boolean;
}

interface MessageBoxProps {
  onClose: () => void;
  unreadCount: number;
}

const mockMessages: Message[] = [
  {
    id: "1",
    type: "comment",
    from: {
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      nickname: "momo",
    },
    content: "回复了你的测评：说得太对了！我也有同样的感受。",
    targetTitle: "地震概论",
    time: "2024-12-01T14:30:00",
    isRead: false,
  },
  {
    id: "2",
    type: "like",
    from: {
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      nickname: "我不是momo",
    },
    content: "赞了你的测评",
    targetTitle: "政治学原理",
    time: "2024-12-01T10:20:00",
    isRead: false,
  },
  {
    id: "3",
    type: "system",
    from: {
      avatar: "",
      nickname: "系统通知",
    },
    content: "你的测评《数据结构与算法》获得了100次浏览",
    time: "2024-11-30T16:00:00",
    isRead: false,
  },
  {
    id: "4",
    type: "comment",
    from: {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      nickname: "nibu",
    },
    content: "回复了你的评论：感谢分享经验！",
    targetTitle: "李大钊思想",
    time: "2024-11-29T09:15:00",
    isRead: true,
  },
];

export function MessageBox({ onClose, unreadCount }: MessageBoxProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredMessages = messages.filter((msg) =>
    filter === "all" ? true : !msg.isRead
  );

  const markAsRead = (id: string) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );
  };

  const markAllAsRead = () => {
    setMessages(messages.map((msg) => ({ ...msg, isRead: true })));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    const now = new Date();
    const diff = now.getTime() - time.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}天前`;
    if (hours > 0) return `${hours}小时前`;
    if (minutes > 0) return `${minutes}分钟前`;
    return "刚刚";
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageCircle className="w-4 h-4" />;
      case "like":
        return <ThumbsUp className="w-4 h-4" />;
      case "system":
        return <Star className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[600px] flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-gray-900">消息中心</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs">
                {unreadCount} 条未读
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 过滤器 */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              全部消息
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === "unread"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              未读消息
            </button>
          </div>
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Check className="w-4 h-4" />
            全部已读
          </button>
        </div>

        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
              <MessageCircle className="w-12 h-12 mb-2" />
              <p>暂无消息</p>
            </div>
          ) : (
            <div>
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !message.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  {message.type === "system" ? (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      {getMessageIcon(message.type)}
                    </div>
                  ) : (
                    <ImageWithFallback
                      src={message.from.avatar}
                      alt={message.from.nickname}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{message.from.nickname}</span>
                        {message.type !== "system" && (
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            {getMessageIcon(message.type)}
                            {message.type === "comment" ? "评论" : "点赞"}
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 text-xs flex-shrink-0">
                        {formatTime(message.time)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-1">{message.content}</p>
                    {message.targetTitle && (
                      <p className="text-blue-600 text-sm">《{message.targetTitle}》</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      {!message.isRead && (
                        <button
                          onClick={() => markAsRead(message.id)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          标为已读
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
