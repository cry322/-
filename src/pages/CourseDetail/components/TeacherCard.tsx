import { ThumbsUp, Users } from "lucide-react";
import { Link } from 'react-router-dom';

interface TeacherCardProps {
  id?: string; // 👈 新增：用于跳转的唯一标识
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
  id,
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
            <h3 className="text-gray-800">毛利华</h3>
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

          {/* Expand Link */}
          <div className="text-right mt-2">
            <span className="text-xs text-gray-400 cursor-not-allowed">
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
            {subtitle || "老师的课堂组织还有slides蛮好，有几节课我感兴趣，其余的有时候会陷入哲学。课堂人满为患。 【考试】：前面有十道选择题比较刁钻，很难做对。然后是六道名词解释，在135个名词中选6个，这个阶段在备考的时候还是很重要的，dz也在这个阶段学到了许多。然后是简答题，最后一个小问会赦免你的一道选择题（自己选题号），或者问你期望的分数之类的hh。..."}
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
            <span className="text-purple-700">90-95</span>
          </div>
        </div>

        {/* Expand Link */}
        <div className="text-right mt-2">
          {id ? (
            <Link to={`/reviews/${id}`} className="text-xs text-indigo-600 hover:text-indigo-800">
              &gt;&gt;&gt;点击展开
            </Link>
          ) : (
            <span className="text-xs text-gray-400 cursor-not-allowed">
              &gt;&gt;&gt;暂无详情
            </span>
          )}
        </div>
      </div>
    </div>
  );
}