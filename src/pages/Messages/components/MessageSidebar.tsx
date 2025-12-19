import { Bell, MessageSquare, BookOpen, Settings, Shield, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCategory } from '../types/message';

interface MessageSidebarProps {
  selectedCategory: MessageCategory;
  onSelectCategory: (category: MessageCategory) => void;
  messageCounts: Record<MessageCategory, number>;
  unreadCount: number;
}

const categories = [
  { id: 'all' as MessageCategory, label: '全部消息', icon: MessageSquare },
  { id: 'system' as MessageCategory, label: '系统通知', icon: Bell },
  { id: 'interaction' as MessageCategory, label: '互动消息', icon: MessageSquare },
];

export function MessageSidebar({ 
  selectedCategory, 
  onSelectCategory, 
  messageCounts,
  unreadCount 
}: MessageSidebarProps) {
  return (
    <div className="w-60 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* 用户信息区域 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1639654655546-68bc1f21e9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDc2Nzg4MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="用户头像"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="truncate">张三</div>
          </div>
        </div>
        
        {/* 消息统计 */}
        <div className="bg-blue-50 rounded-lg px-3 py-2 flex items-center justify-between">
          <span className="text-gray-700" style={{ fontSize: '13px' }}>未读消息</span>
          <span className="text-[#2563eb]">{unreadCount}</span>
        </div>
      </div>

      {/* 消息分类菜单 */}
      <nav className="flex-1 overflow-y-auto py-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = messageCounts[category.id] || 0;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                isSelected 
                  ? 'bg-blue-50 border-r-2 border-[#2563eb] text-[#2563eb]' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left">{category.label}</span>
              {count > 0 && (
                <span 
                  className={`px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#2563eb] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                  style={{ fontSize: '12px' }}
                >
                  {count}
                </span>
              )}
              {isSelected && <ChevronRight className="w-4 h-4" />}
            </button>
          );
        })}
      </nav>

      {/* 底部设置链接 */}
      <div className="border-t border-gray-200 p-4">
        <button className="w-full px-3 py-2 flex items-center gap-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
          <span style={{ fontSize: '14px' }}>消息设置</span>
        </button>
        <button className="w-full px-3 py-2 flex items-center gap-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <Shield className="w-4 h-4" />
          <span style={{ fontSize: '14px' }}>隐私设置</span>
        </button>
      </div>
    </div>
  );
}