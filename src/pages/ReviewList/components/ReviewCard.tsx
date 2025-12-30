// src/pages/ReviewList/components/ReviewCard.tsx
import { Calendar, User, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ReviewCardProps {
  id: number;
  courseName: string;
  teacher: string;
  semester: string;
  publishDate: string;
  overallScore: number;
  content: string;
  sortScore: number; // 当前排序标准下的分数（用于颜色判断）
  sortLabel: string; // 当前排序标准标签
  displayValue: string | number; // 显示的值（可能是分数或日期）
}

export function ReviewCard({
  id,
  courseName,
  teacher,
  semester,
  publishDate,
  overallScore,
  content,
  sortScore,
  sortLabel,
  displayValue,
}: ReviewCardProps) {
  // 根据分数确定颜色（对于日期，我们使用中性色）
  const getScoreColor = (score: number) => {
    if (sortLabel === "发布时间") return "text-gray-900"; // 日期用黑色
    if (score >= 4.2) return "text-green-600";
    if (score >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  // 格式化显示值
  const formatDisplayValue = () => {
    if (typeof displayValue === "number") {
      return displayValue.toFixed(1);
    }
    return displayValue;
  };

  // 格式化日期显示
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  // 渲染星星评分（1-5分制）
  const renderStars = () => {
    const stars = [];
    const score = overallScore;
    
    // 确保分数在1-5之间
    const normalizedScore = Math.min(Math.max(score, 0), 5);
    const fullStars = Math.floor(normalizedScore);
    const hasHalfStar = normalizedScore - fullStars >= 0.5;
    
    // 满星
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-500 fill-current"
        />
      );
    }
    
    // 半星
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <Star 
            className="w-4 h-4 text-yellow-500 fill-current absolute left-0 top-0 overflow-hidden" 
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </div>
      );
    }
    
    // 空星
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
        />
      );
    }
    
    return stars;
  };

  return (
    <Link
      to={`/reviews/${id}`}
      className="block bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
    >
      {/* 头部信息 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-gray-900 group-hover:text-blue-600 transition-colors mb-2 text-lg font-semibold">
            {courseName}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{teacher}</span>
            </div>
            <span className="text-gray-400">·</span>
            <span>{semester || "未指定学期"}</span>
          </div>
        </div>
        
        {/* 当前排序标准下的评分/日期 */}
        <div className="flex flex-col items-center ml-4 min-w-[80px]">
          <div className={`text-2xl mb-1 font-bold ${getScoreColor(sortScore)}`}>
            {formatDisplayValue()}
          </div>
          <div className="text-xs text-gray-500 text-center">{sortLabel}</div>
        </div>
      </div>

      {/* 星星评分显示（修改为1-5分制） */}
      <div className="flex items-center mb-3">
        <div className="flex items-center mr-2">
          {renderStars()}
        </div>
        <span className="text-sm text-gray-600">{overallScore.toFixed(1)}分【综合】</span>
      </div>

      {/* 测评内容预览 */}
      <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed">
        {content.length > 200 ? `${content.substring(0, 200)}...` : content}
      </p>

      {/* 底部信息 */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>发布于 {formatDate(publishDate)}</span>
        </div>
        <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          查看详情 →
        </div>
      </div>
    </Link>
  );
}