import { useState } from 'react';
import { Search, CheckCheck, Trash2, Filter, Inbox } from 'lucide-react';
import { MessageItem } from './MessageItem';
import { Message } from '../types/message';

interface MessageListProps {
  messages: Message[];
  selectedMessageId: string | null;
  onSelectMessage: (id: string) => void;
  onMarkAsRead: (ids: string[]) => void;
  onDelete: (ids: string[]) => void;
}

export function MessageList({ 
  messages, 
  selectedMessageId, 
  onSelectMessage,
  onMarkAsRead,
  onDelete 
}: MessageListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = searchQuery === '' || 
      msg.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.course?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUnread = !showUnreadOnly || !msg.isRead;
    
    return matchesSearch && matchesUnread;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleSelectAll = () => {
    if (selectedIds.size === filteredMessages.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredMessages.map(m => m.id)));
    }
  };

  const handleBatchMarkAsRead = () => {
    onMarkAsRead(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  const handleBatchDelete = () => {
    if (window.confirm(`确定要删除选中的 ${selectedIds.size} 条消息吗？`)) {
      onDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  return (
    <div className="w-[400px] bg-white border-r border-gray-200 flex flex-col h-full">
      {/* 搜索框 */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索发送者、课程名..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            style={{ fontSize: '14px' }}
          />
        </div>
      </div>

      {/* 批量操作工具栏 */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSelectAll}
            className="text-gray-600 hover:text-[#2563eb] transition-colors"
            style={{ fontSize: '13px' }}
          >
            {selectedIds.size === filteredMessages.length ? '取消全选' : '全选'}
          </button>
          {selectedIds.size > 0 && (
            <span className="text-gray-500" style={{ fontSize: '13px' }}>
              已选 {selectedIds.size} 条
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {selectedIds.size > 0 ? (
            <>
              <button
                onClick={handleBatchMarkAsRead}
                className="p-2 text-gray-600 hover:bg-white hover:text-[#2563eb] rounded transition-colors"
                title="标记为已读"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
              <button
                onClick={handleBatchDelete}
                className="p-2 text-gray-600 hover:bg-white hover:text-red-600 rounded transition-colors"
                title="删除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`px-3 py-1.5 rounded flex items-center gap-1 transition-colors ${
                showUnreadOnly 
                  ? 'bg-[#2563eb] text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              style={{ fontSize: '13px' }}
            >
              <Filter className="w-3.5 h-3.5" />
              仅未读 {!showUnreadOnly && unreadCount > 0 && `(${unreadCount})`}
            </button>
          )}
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Inbox className="w-16 h-16 mb-3 opacity-20" />
            <p>暂无消息</p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div key={message.id} className="relative">
              <input
                type="checkbox"
                checked={selectedIds.has(message.id)}
                onChange={(e) => {
                  const newSet = new Set(selectedIds);
                  if (e.target.checked) {
                    newSet.add(message.id);
                  } else {
                    newSet.delete(message.id);
                  }
                  setSelectedIds(newSet);
                }}
                className="absolute top-4 right-4 z-10 w-4 h-4 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb]"
              />
              <MessageItem
                message={message}
                isSelected={selectedMessageId === message.id}
                onClick={() => onSelectMessage(message.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}