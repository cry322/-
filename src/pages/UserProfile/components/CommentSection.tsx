import { useState } from "react";
import { Send, ThumbsUp, MoreVertical } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Comment {
  id: string;
  author: {
    avatar: string;
    nickname: string;
  };
  content: string;
  time: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  commentsCount: number;
}

export function CommentSection({ commentsCount }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        nickname: "momo1号",
      },
      content: "说得太对了！我也是这学期选的这门课，作业确实多但是收获很大。",
      time: "2024-11-16T14:20:00",
      likes: 12,
      isLiked: false,
    },
    {
      id: "2",
      author: {
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        nickname: "我不是momo",
      },
      content: "请问期末考试重点是什么呀？",
      time: "2024-11-17T09:15:00",
      likes: 5,
      isLiked: false,
    },
    {
      id: "3",
      author: {
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        nickname: "爱吃番茄",
      },
      content: "感谢分享！下学期准备选这门课，看了你的测评更有信心了。",
      time: "2024-11-18T16:45:00",
      likes: 8,
      isLiked: false,
    },
  ]);

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: {
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
          nickname: "我",
        },
        content: commentText,
        time: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          : comment
      )
    );
  };

  const formatCommentTime = (timeString: string) => {
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

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-gray-900 mb-6">全部评论 ({commentsCount})</h3>

      {/* 评论输入框 */}
      <div className="mb-6">
        <div className="flex gap-3">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
            alt="我的头像"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="写下你的评论..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmitComment}
                disabled={!commentText.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                发表评论
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <ImageWithFallback
              src={comment.author.avatar}
              alt={comment.author.nickname}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">{comment.author.nickname}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-700 mb-2">{comment.content}</p>
              <div className="flex items-center gap-4 text-gray-500">
                <span>{formatCommentTime(comment.time)}</span>
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
                    comment.isLiked ? "text-blue-600" : ""
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? "fill-current" : ""}`} />
                  {comment.likes > 0 && comment.likes}
                </button>
                <button className="hover:text-blue-600 transition-colors">回复</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}