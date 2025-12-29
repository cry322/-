import { ThumbsUp, MessageCircle, ExternalLink } from "lucide-react";

interface Comment {
  id: string;
  targetType: "review" | "comment";
  targetTitle: string;
  targetAuthor: string;
  content: string;
  time: string;
  likes: number;
  replies: number;
}

const mockComments: Comment[] = [
  {
    id: "1",
    targetType: "review",
    targetTitle: "政治学原理",
    targetAuthor: "王同学",
    content: "说得太对了！我也是这学期选的这门课，作业确实多但是收获很大。期末考试建议多刷题。",
    time: "2024-11-28T14:30:00",
    likes: 12,
    replies: 3,
  },
  {
    id: "2",
    targetType: "review",
    targetTitle: "音乐与数学",
    targetAuthor: "张老师的学生",
    content: "请问这门课的难度大吗？需要提前准备什么吗？",
    time: "2024-11-26T10:20:00",
    likes: 5,
    replies: 1,
  },
  {
    id: "3",
    targetType: "comment",
    targetTitle: "哲学导论",
    targetAuthor: "momo",
    content: "感谢分享！下学期准备选这门课，看了你的测评更有信心了。",
    time: "2024-11-25T16:45:00",
    likes: 8,
    replies: 0,
  },
  {
    id: "4",
    targetType: "review",
    targetTitle: "中国历史地理",
    targetAuthor: "小明",
    content: "这门课的案例确实是亮点，能学到很多实践经验。",
    time: "2024-11-20T09:15:00",
    likes: 15,
    replies: 5,
  },
];

export function MyComments() {
  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    const now = new Date();
    const diff = now.getTime() - time.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (days > 0) return `${days}天前`;
    if (hours > 0) return `${hours}小时前`;
    return "刚刚";
  };

  return (
    <div className="space-y-4">
      {mockComments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                <span>
                  评论了{" "}
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    @{comment.targetAuthor}
                  </span>{" "}
                  的{comment.targetType === "review" ? "测评" : "评论"}
                </span>
                <span>·</span>
                <span>{formatTime(comment.time)}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gray-400">关于</span>
                <span className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                  《{comment.targetTitle}》
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg mb-3">
                {comment.content}
              </p>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {comment.likes} 点赞
                </div>
                {comment.replies > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {comment.replies} 回复
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
