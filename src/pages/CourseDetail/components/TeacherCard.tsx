// src/pages/CourseDetail/components/TeacherCard.tsx
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 根据你的本地数据结构定义接口
interface TeacherReviewDetail {
  count: number;
  avgScore: number;
  reviews?: Array<{
    id: number;
    content: string;
    scores: {
      overall: number;
      taskLoad: number;
      difficulty: number;
      grading: number;
      teaching: number;
      harvest: number;
    };
    semester: string;
    scoreRange?: string;
  }>;
}

interface TeacherCardProps {
  id: string; // 必须：用于跳转的唯一标识
  name: string; // 教师姓名
  alias?: string; // 教师别称
  title: string; // 标题（与name相同）
  subtitle?: string; // 副标题
  description?: string; // 描述
  weeks?: string; // 周数（本地数据中是字符串）
  about?: string; // 关于教师
  capacity?: number; // 容量
  reviewDetail?: TeacherReviewDetail; // 评价详情（结构化）
  
  // 课程信息
  courseId?: string; // 课程ID
  courseName?: string; // 课程名称
  
  // UI相关
  isPlaceholder?: boolean;
  colorIndex?: number;
  
  // 点击事件
  onClick?: () => void;
}

const cardColors = [
  "bg-gradient-to-br from-blue-50 to-blue-100",
  "bg-gradient-to-br from-green-50 to-green-100",
  "bg-gradient-to-br from-purple-50 to-purple-100",
  "bg-gradient-to-br from-orange-50 to-orange-100",
  "bg-gradient-to-br from-pink-50 to-pink-100",
  "bg-gradient-to-br from-yellow-50 to-yellow-100"
];

// 获取评分描述
const getScoreDescription = (score: number): string => {
  if (score >= 4.5) return "极佳";
  if (score >= 4.0) return "优秀";
  if (score >= 3.5) return "良好";
  if (score >= 3.0) return "一般";
  return "较差";
};

// 获取星星显示
const getStars = (score: number) => {
  const normalizedScore = Math.min(Math.max(Math.round(score), 1), 5);
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < normalizedScore ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

// 获取简化的描述文本
const getShortDescription = (teacher: TeacherCardProps): string => {
  // 如果有reviewDetail且有reviews，使用第一个评价的内容
  if (teacher.reviewDetail?.reviews && teacher.reviewDetail.reviews.length > 0) {
    const firstReview = teacher.reviewDetail.reviews[0];
    // 截取前100个字符
    const content = firstReview.content || "";
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
  }
  
  // 否则使用description
  return teacher.description || "暂无详细描述";
};

// 获取最新学期
const getLatestSemester = (teacher: TeacherCardProps): string => {
  if (teacher.reviewDetail?.reviews && teacher.reviewDetail.reviews.length > 0) {
    // 找出有学期的评价
    const reviewsWithSemester = teacher.reviewDetail.reviews.filter(
      review => review.semester && review.semester.trim()
    );
    
    if (reviewsWithSemester.length > 0) {
      // 返回最新的学期（假设学期格式为"24秋"、"25春"等）
      return reviewsWithSemester[0].semester;
    }
  }
  
  return "最新学期";
};

// 获取得分区间（直接使用评价中的 scoreRange 字段）
const getScoreRange = (teacher: TeacherCardProps): string => {
  const reviews = teacher.reviewDetail?.reviews;
  if (reviews && reviews.length > 0) {
    const first = reviews.find(r => r.scoreRange && r.scoreRange.trim());
    if (first && first.scoreRange) {
      return first.scoreRange;
    }
  }
  return "未知";
};

// 获取用于跳转的测评 ID（这里取第一条测评）
const getFirstReviewId = (teacher: TeacherCardProps): number | null => {
  const reviews = teacher.reviewDetail?.reviews;
  if (reviews && reviews.length > 0) {
    const first = reviews[0];
    return typeof first.id === "number" ? first.id : null;
  }
  return null;
};

export function TeacherCard({
  id,
  name,
  alias,
  title,
  description,
  reviewDetail,
  courseId,
  isPlaceholder = false,
  colorIndex = 0,
  onClick
}: TeacherCardProps) {
  const navigate = useNavigate();
  const bgColor = cardColors[colorIndex % cardColors.length];
  const avgScore = reviewDetail?.avgScore || 0;
  const reviewCount = reviewDetail?.count || 0;
  const latestSemester = getLatestSemester({ id, name, title, reviewDetail } as TeacherCardProps);
  
  // 点击处理函数
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // 默认跳转到对应的测评详情页
      const reviewId = getFirstReviewId({ id, name, title, reviewDetail } as TeacherCardProps);
      if (reviewId !== null) {
        navigate(`/reviews/${reviewId}`);
      } else if (courseId) {
        // 如果没有具体测评 ID，就退而求其次跳到课程详情
        navigate(`/courses/${courseId}`);
      }
    }
  };

  if (isPlaceholder) {
    return (
      <div className={`${bgColor} rounded-xl shadow-md p-4 border border-gray-300 hover:shadow-lg transition-shadow animate-pulse`}>
        <div className="bg-white rounded-lg p-4 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-3 pb-2 border-b-2 border-orange-400">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between mb-3 text-sm px-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex-1 bg-gray-50 rounded p-3 mb-3 min-h-[120px]">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center px-2 py-1 bg-blue-50 rounded">
              <div className="h-3 bg-gray-200 rounded w-12"></div>
              <div className="h-3 bg-gray-200 rounded w-8"></div>
            </div>
            <div className="flex justify-between items-center px-2 py-1 bg-purple-50 rounded">
              <div className="h-3 bg-gray-200 rounded w-12"></div>
              <div className="h-3 bg-gray-200 rounded w-8"></div>
            </div>
          </div>

          {/* Expand Link */}
          <div className="text-right mt-2">
            <div className="h-3 bg-gray-200 rounded w-16 ml-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${bgColor} rounded-xl shadow-md p-4 border border-gray-300 hover:shadow-lg transition-shadow hover:border-indigo-400 cursor-pointer`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="bg-white rounded-lg p-4 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-3 pb-2 border-b-2 border-orange-400">
          <h3 className="text-gray-800 font-medium">{name}</h3>
          {alias && (
            <p className="text-xs text-gray-500 mt-1">别名：{alias}</p>
          )}
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-3 text-sm px-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">综合评分</span>
            {getStars(avgScore)}
            <span className="text-gray-700 font-medium">
              {avgScore.toFixed(1)}
            </span>
          </div>
          
        </div>

        {/* Description */}
        <div className="flex-1 bg-gray-50 rounded p-3 mb-3 min-h-[120px]">
          <p className="text-xs text-gray-700 leading-relaxed">
            {getShortDescription({ id, name, title, description, reviewDetail } as TeacherCardProps)}
          </p>
          
          {/* 额外的统计信息 */}
          {reviewCount > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>累计评价：{reviewCount}条</span>
                <span>评分：{getScoreDescription(avgScore)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between items-center px-2 py-1 bg-blue-50 rounded">
            <span className="text-gray-600">评分学期</span>
            <span className="text-blue-700 font-medium">{latestSemester}</span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-purple-50 rounded">
            <span className="text-gray-600">得分区间</span>
            <span className="text-purple-700 font-medium">
              {getScoreRange({ id, name, title, reviewDetail } as TeacherCardProps)}
            </span>
          </div>

        </div>

        <div className="text-right mt-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              查看详情
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
