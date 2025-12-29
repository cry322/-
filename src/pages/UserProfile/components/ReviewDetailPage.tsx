import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, Eye, Calendar, Share2, Flag, ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RatingDimension } from "./RatingDimension";
import { CommentSection } from "./CommentSection";
import { UserInfoCard } from "./UserInfoCard";

// 模拟数据
const mockReview = {
  id: "1",
  courseCode: "CS101",
  courseName: "数据结构与算法",
  overallRating: 4.5,
  ratings: {
    workload: 3.5, // 任务量：越大分越高
    experience: 4.8, // 听感
    difficulty: 4.0, // 难度：越高分越高
    gain: 4.7, // 收获
    grading: 4.2, // 给分松紧：越松分越高
  },
  tags: ["作业多", "收获大", "老师认真", "考试难度适中", "推荐选修"],
  content: `这门课是我大二上学期选的，整体体验非常好。老师讲课思路清晰，PPT 制作精良，每节课都会有实际案例帮助理解抽象的数据结构概念。

课程内容涵盖了链表、栈、队列、树、图等基础数据结构，以及常见的排序和查找算法。虽然课程难度不低，但老师讲解得很透彻，只要认真听课并完成作业，理解起来不会太困难。

作业量确实比较大，每周都有编程作业，需要投入不少时间。但正是通过这些作业，我才真正掌握了这些数据结构的实现和应用。期中期末考试都是笔试+上机，题目难度适中，给分也比较合理。

总的来说，这是一门值得推荐的课程，虽然会花费不少时间和精力，但收获确实很大。对于想要深入学习计算机的同学来说，这门课绝对是必修的。`,
  publishTime: "2024-11-15T10:30:00",
  views: 1847,
  likes: 234,
  dislikes: 12,
  commentsCount: 45,
  isLiked: false,
  isDisliked: false,
  author: {
    id: "user123",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0NTgxODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    nickname: "学习委员小李",
    reviewCount: 23,
    courseGrade: "A",
  },
};

export function ReviewDetailPage() {
  const [review, setReview] = useState(mockReview);
  const [showComments, setShowComments] = useState(true);

  const handleLike = () => {
    if (review.isLiked) {
      setReview({
        ...review,
        likes: review.likes - 1,
        isLiked: false,
      });
    } else {
      setReview({
        ...review,
        likes: review.likes + 1,
        dislikes: review.isDisliked ? review.dislikes - 1 : review.dislikes,
        isLiked: true,
        isDisliked: false,
      });
    }
  };

  const handleDislike = () => {
    if (review.isDisliked) {
      setReview({
        ...review,
        dislikes: review.dislikes - 1,
        isDisliked: false,
      });
    } else {
      setReview({
        ...review,
        likes: review.isLiked ? review.likes - 1 : review.likes,
        dislikes: review.dislikes + 1,
        isLiked: false,
        isDisliked: true,
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              返回课程页面
            </button>
            <div className="ml-auto flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                分享
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Flag className="w-4 h-4" />
                举报
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：用户信息卡片 */}
          <div className="col-span-1">
            <UserInfoCard author={review.author} />
          </div>

          {/* 右侧：测评详情 */}
          <div className="col-span-2 space-y-6">
            {/* 课程信息和综合评分 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-gray-900 mb-2">
                    {review.courseCode} - {review.courseName}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(review.publishTime)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {review.views.toLocaleString()} 次浏览
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 mb-1">综合评分</div>
                  <div className="text-blue-600">{review.overallRating.toFixed(1)}</div>
                </div>
              </div>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {review.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 多维度评分 */}
              <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-gray-900 text-sm mb-2">详细评分</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <RatingDimension
                    label="任务量"
                    value={review.ratings.workload}
                  />
                  <RatingDimension
                    label="课程难度"
                    value={review.ratings.difficulty}
                  />
                  <RatingDimension
                    label="给分松紧"
                    value={review.ratings.grading}
                  />
                  <RatingDimension
                    label="听感体验"
                    value={review.ratings.experience}
                  />
                  <RatingDimension
                    label="课程收获"
                    value={review.ratings.gain}
                  />
                </div>
              </div>

              {/* 测评正文 */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-gray-900 mb-4">测评内容</h3>
                <div className="text-gray-800 leading-relaxed whitespace-pre-line text-base">
                  {review.content}
                </div>
              </div>
            </div>

            {/* 互动区域 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      review.isLiked
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${review.isLiked ? "fill-current" : ""}`} />
                    有帮助 ({review.likes})
                  </button>
                  <button
                    onClick={handleDislike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      review.isDisliked
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <ThumbsDown className={`w-5 h-5 ${review.isDisliked ? "fill-current" : ""}`} />
                    没帮助 ({review.dislikes})
                  </button>
                </div>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  评论 ({review.commentsCount})
                </button>
              </div>
            </div>

            {/* 评论区 */}
            {showComments && <CommentSection commentsCount={review.commentsCount} />}
          </div>
        </div>
      </div>
    </div>
  );
}