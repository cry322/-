import { useState } from 'react';
import { 
  Reply, 
  Trash2, 
  Flag, 
  MoreVertical, 
  ExternalLink,
  ThumbsUp,
  Send,
  X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Message } from '../types/message';
import { useNavigate } from 'react-router-dom';

interface MessageDetailProps {
  message: Message | null;
  onDelete: (id: string) => void;
  onReply: (id: string, content: string) => void;
  onMarkAsRead: (id: string) => void;
}

export function MessageDetail({ message, onDelete, onReply, onMarkAsRead }: MessageDetailProps) {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  if (!message) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p>请选择一条消息查看详情</p>
        </div>
      </div>
    );
  }

  const handleSendReply = () => {
    if (replyContent.trim()) {
      onReply(message.id, replyContent);
      setReplyContent('');
      setShowReply(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这条消息吗？')) {
      onDelete(message.id);
    }
  };

  return (
    <div className="flex-1 bg-white flex flex-col h-full">
      {/* 消息标题区域 */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            {message.sender.avatar ? (
              <ImageWithFallback 
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                系统
              </div>
            )}
            <div>
              <div className="mb-1">{message.sender.name}</div>
              <div className="text-gray-400 mt-1" style={{ fontSize: '12px' }}>
                {message.time}
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center gap-2">
            {!message.isRead && (
              <button
                onClick={() => onMarkAsRead(message.id)}
                className="px-3 py-1.5 text-[#2563eb] hover:bg-blue-50 rounded transition-colors"
                style={{ fontSize: '13px' }}
              >
                标记已读
              </button>
            )}
            <button
              onClick={() => setShowReply(!showReply)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="回复"
            >
              <Reply className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="删除"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                title="更多"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button 
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                    style={{ fontSize: '14px' }}
                  >
                    <Flag className="w-4 h-4" />
                    举报
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-gray-900">{message.title}</h2>
      </div>

      {/* 消息内容区域 */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* 未读标识 */}
        {!message.isRead && (
          <div className="mb-4 px-3 py-2 bg-blue-50 border-l-4 border-[#2563eb] rounded">
            <span className="text-[#2563eb]" style={{ fontSize: '13px' }}>
              新消息
            </span>
          </div>
        )}

        {/* 消息正文 */}
        <div 
          className="text-gray-700 leading-relaxed mb-6"
          style={{ fontSize: '15px', lineHeight: '1.6' }}
        >
          {message.content}
        </div>

        {/* 相关课程卡片 */}
        {message.course && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                  相关课程
                </div>
                <div className="text-gray-900 mb-1">
                  {message.course.name}
                </div>
                <div className="text-gray-500" style={{ fontSize: '13px' }}>
                  课程代码：{message.course.code}
                </div>
              </div>
              {message.relatedUrl && (
                <button
                  onClick={() => navigate(message.relatedUrl!)}
                  className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors flex items-center gap-2"
                >
                  查看详情
                </button>

              )}
            </div>
          </div>
        )}

        {/* 附件预览 */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mb-6">
            <div className="text-gray-700 mb-3">附件</div>
            <div className="grid grid-cols-2 gap-3">
              {message.attachments.map((attachment, index) => (
                <div 
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                    📎
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate" style={{ fontSize: '14px' }}>
                      {attachment.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 互动区域 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#2563eb] hover:bg-gray-50 rounded-lg transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span style={{ fontSize: '14px' }}>有帮助</span>
            </button>
          </div>
        </div>
      </div>

      {/* 快速回复区域 */}
      {showReply && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-start justify-between mb-3">
            <span className="text-gray-700">快速回复</span>
            <button 
              onClick={() => setShowReply(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="输入回复内容..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] resize-none"
            rows={3}
            style={{ fontSize: '14px' }}
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setShowReply(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSendReply}
              disabled={!replyContent.trim()}
              className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              发送
            </button>
          </div>
        </div>
      )}
    </div>
  );
}