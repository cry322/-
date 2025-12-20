import { ThumbsUp, Users } from "lucide-react";
import { Link } from 'react-router-dom';


interface TeacherCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  weeks?: string[];
  about?: string;
  reviewDetail?: string;
  capacity?: string;
  likes?: number | string;
  isPlaceholder?: boolean;
  colorIndex?: number;
}

const cardColors = [
  "bg-gradient-to-br from-blue-50 to-blue-100",
  "bg-gradient-to-br from-green-50 to-green-100",
  "bg-gradient-to-br from-purple-50 to-purple-100",
  "bg-gradient-to-br from-orange-50 to-orange-100",
  "bg-gradient-to-br from-pink-50 to-pink-100",
  "bg-gradient-to-br from-yellow-50 to-yellow-100"
];

export function TeacherCard({
  title,
  subtitle,
  description,
  weeks,
  about,
  reviewDetail,
  capacity,
  likes,
  isPlaceholder = false,
  colorIndex = 0
}: TeacherCardProps) {
  const bgColor = cardColors[colorIndex % cardColors.length];

  // 只保留综合评分
  const rating = { label: "综合评分", stars: 4 };

  if (isPlaceholder) {
    return (
      <div className={`${bgColor} rounded-xl shadow-md p-4 border border-gray-300 hover:shadow-lg transition-shadow`}>
        <div className="bg-white rounded-lg p-4 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-3 pb-2 border-b-2 border-orange-400">
            <h3 className="text-gray-800">开课教师</h3>
          </div>

          {/* Rating - Single */}
          <div className="flex items-center justify-between mb-3 text-sm px-2">
            <span className="text-gray-600">{rating.label}</span>
            <div className="flex gap-0.5">
              {[...Array(rating.stars)].map((_, i) => (
                <span key={i} className="text-base">🌟</span>
              ))}
            </div>
          </div>

          {/* Description - Expanded */}
          <div className="flex-1 bg-gray-50 rounded p-3 mb-3 min-h-[120px]">
            <p className="text-xs text-gray-700 leading-relaxed">
              课程描述内容...
            </p>
          </div>

          {/* Footer Info */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center px-2 py-1 bg-blue-50 rounded">
              <span className="text-gray-600">评分学期</span>
              <span className="text-blue-700">25春</span>
            </div>
            <div className="flex justify-between items-center px-2 py-1 bg-purple-50 rounded">
              <span className="text-gray-600">得分区间</span>
              <span className="text-purple-700">90+</span>
            </div>
          </div>

          {/* Expand Link，注意这里还没加跳转 */}
          <div className="text-right mt-2">
            <span className="text-xs text-indigo-600 cursor-pointer hover:text-indigo-800">
              &gt;&gt;&gt;点击展开
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bgColor} rounded-xl shadow-md p-4 border border-gray-300 hover:shadow-lg transition-shadow hover:border-indigo-400`}>
      <div className="bg-white rounded-lg p-4 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-3 pb-2 border-b-2 border-orange-400">
          <h3 className="text-gray-800">{title}</h3>
        </div>

        {/* Rating - Single */}
        <div className="flex items-center justify-between mb-3 text-sm px-2">
          <span className="text-gray-600">{rating.label}</span>
          <div className="flex gap-0.5">
            {[...Array(rating.stars)].map((_, i) => (
              <span key={i} className="text-base">🌟</span>
            ))}
          </div>
        </div>

        {/* Description - Expanded */}
        <div className="flex-1 bg-gray-50 rounded p-3 mb-3 min-h-[120px]">
          <p className="text-xs text-gray-700 leading-relaxed">
            {subtitle || "这门课是国际关系学院的专业课，也是二类通识核心课。课程内容就是民主的历史与现实。包括早期民主、代议制民主的兴起与扩散、民主与法治、民主与经济发展、民主与社会结构等内容。考核方式：20小组pre+30个人读书报告+50期末闭卷考试..."}
          </p>
        </div>

        {/* Footer Info */}
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between items-center px-2 py-1 bg-blue-50 rounded">
            <span className="text-gray-600">评分学期</span>
            <span className="text-blue-700">25春</span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-purple-50 rounded">
            <span className="text-gray-600">得分区间</span>
            <span className="text-purple-700">90+</span>
          </div>
        </div>

        {/* Expand Link */}
        <div className="text-right mt-2">
          <span className="text-xs text-indigo-600 cursor-pointer hover:text-indigo-800">
            &gt;&gt;&gt;点击展开
          </span>
        </div>
      </div>
    </div>
  );
}