//课程库左下角的评分卡片：
// 这里需要的接口是动态从后端获取的评分类别和对应星级评分“”

import { Star } from "lucide-react";
import { RadarChart } from "./RadarChart";
import { useState, useEffect } from 'react';


export function CourseInfoCard() {
  const [ratings, setRatings] = useState<{ label: string; stars: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        // ⚠️ 请替换成你的真实 API 地址
        const response = await fetch('/api/course/ratings'); 
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        // 假设后端返回 { ratings: [...] }
        setRatings(data.ratings || []);
      } catch (err) {
        console.error(err);
        // 可选：设置默认值或错误提示
        setRatings([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      {/* Course Name as Main Title */}
      <div className="text-center space-y-2 pb-4 border-b-2 border-gradient-to-r from-blue-400 to-purple-400">
        <h2 className="text-gray-800 text-2xl">心理学导论</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <span className="text-sm">开课院系：</span>
          <span className="text-sm bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 rounded-full">
            心理认知与科学学院
          </span>
        </div>
      </div>

      {/* Comprehensive Score */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2 py-3">
          <span className="text-gray-700">综合得分</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>

        {/* Score Details */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
            <div className="text-gray-600 text-sm mb-1">学分</div>
            <div className="text-blue-600">2学分</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
            <div className="text-gray-600 text-sm mb-1">评分方式</div>
            <div className="text-purple-600">百分制</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3">
            <div className="text-gray-600 text-sm mb-1">热门标签</div>
            <div className="text-pink-600">听感好</div>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="py-4">
        <div className="text-center text-gray-700 mb-4">
          各项评分雷达图
        </div>
        <RadarChart />
      </div>

      {/* Rating Categories */}
      <div className="space-y-3">
        {ratings.map((rating, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">{rating.label}</span>
              <div className="flex gap-1">
                {[...Array(rating.stars)].map((_, i) => (
                  <span key={i} className="text-lg">🌟</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}