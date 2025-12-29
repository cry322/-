// src/pages/Messages/MessagesView.tsx
import { useState } from 'react';
import { MessageSidebar } from './components/MessageSidebar';
import { MessageList } from './components/MessageList';
import { MessageDetail } from './components/MessageDetail';
import { PageTitleBar } from './components/PageTitleBar';
import { mockMessages } from './data/mockMessages';
import { Message, MessageCategory } from './types/message';
import { Home, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
export default function MessagesView() {
  // 所有消息
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  // 当前选中的消息 ID
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  // 当前分类
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory>('all');

  // 当前选中的消息对象
  const selectedMessage =
    messages.find((m) => m.id === selectedMessageId) ?? null;

  /** ====== 统计 ====== */
  const unreadCount = messages.filter((m) => !m.isRead).length;

  const messageCounts: Record<MessageCategory, number> = {
    all: messages.length,
    system: messages.filter((m) => m.type === 'system_announcement').length,
    interaction: messages.filter(
      (m) => m.type !== 'system_announcement'
    ).length,
  };

  /** ====== 事件处理 ====== */
  const handleSelectMessage = (id: string) => {
    setSelectedMessageId(id);
  };

  const handleMarkAsRead = (ids: string[]) => {
    setMessages((prev) =>
      prev.map((m) =>
        ids.includes(m.id) ? { ...m, isRead: true } : m
      )
    );
  };

  const handleDelete = (ids: string[]) => {
    setMessages((prev) => prev.filter((m) => !ids.includes(m.id)));
    if (selectedMessageId && ids.includes(selectedMessageId)) {
      setSelectedMessageId(null);
    }
  };

  const handleReply = (id: string, content: string) => {
    console.log('回复消息', id, content);
    // 现在是 mock，后面接接口
  };

  /** ====== 分类过滤 ====== */
  const filteredMessages = messages.filter((m) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'system')
      return m.type === 'system_announcement';
    if (selectedCategory === 'interaction')
      return m.type !== 'system_announcement';
    return true;
  });

  return (
    <div className="h-screen flex flex-col">
      {/* 面包屑导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-4">
          <nav className="flex items-center py-3 text-sm">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-blue-600 transition"
            >
              <Home className="w-4 h-4 mr-1" />
              首页
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-blue-600 font-medium">消息中心</span>
          </nav>
        </div>
      </div>
      {/* 页面标题栏（不是全局 Header） */}
        <PageTitleBar />
      
      <div className="flex flex-1 overflow-hidden">
        <MessageSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          messageCounts={messageCounts}
          unreadCount={unreadCount}
        />

        <MessageList
          messages={filteredMessages}
          selectedMessageId={selectedMessageId}
          onSelectMessage={handleSelectMessage}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
        />

        <MessageDetail
          message={selectedMessage}
          onDelete={(id) => handleDelete([id])}
          onReply={handleReply}
          onMarkAsRead={(id) => handleMarkAsRead([id])}
        />
      </div>
    </div>
  );
}
