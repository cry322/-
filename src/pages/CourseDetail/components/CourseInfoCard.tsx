// 课程库左侧的课程信息与评分卡片
// 现在直接从本地 course_data.json 中读取课程基本信息和评价分项

import { Star } from "lucide-react";
import { RadarChart } from "./RadarChart";
import courseData from "../course_data.json";

interface RatingItem {
  label: string;
  hint?: string; // 方向提示，如“小→大”等
  stars: number; // 1-5 之间整数
}

interface CourseInfoCardProps {
  courseId: number;
}

export function CourseInfoCard({ courseId }: CourseInfoCardProps) {
  const list = courseData as any[];
  const matchedCourse = list.find((item) => {
    const c = item.course || {};
    return c.courseId === String(courseId) || c.id === courseId;
  });

  const course = matchedCourse?.course || {};
  const reviews = (matchedCourse?.reviews || []) as any[];
  const firstReview = reviews[0];

  const courseName: string = course.name || "课程详情";
  const departmentRaw = course.department as unknown;
  const departmentText: string =
    typeof departmentRaw === "string" && departmentRaw.trim()
      ? departmentRaw.trim()
      : departmentRaw !== undefined && departmentRaw !== null
        ? `院系编号 ${departmentRaw}`
        : "未知院系";
  const creditsText: string =
    typeof course.credits === "number" ? `${course.credits} 学分` : "学分未知";
  const assessmentText: string = course.assessment || "暂无考核方式说明";

  let ratings: RatingItem[] = [];
  if (firstReview) {
    const rawRatings: RatingItem[] = [
      { label: "任务量", hint: "小 → 大", stars: firstReview.taskLoad ?? 0 },
      { label: "课程难度", hint: "小 → 大", stars: firstReview.difficulty ?? 0 },
      { label: "给分松紧", hint: "差 → 好", stars: firstReview.grading ?? 0 },
      { label: "课程体验", hint: "差 → 好", stars: firstReview.teaching ?? 0 },
      { label: "收获程度", hint: "少 → 多", stars: firstReview.harvest ?? 0 },
    ];

    ratings = rawRatings
      .filter((r) => typeof r.stars === "number" && r.stars > 0)
      .map((r) => ({
        ...r,
        stars: Math.min(5, Math.max(1, Math.round(r.stars))),
      }));
  }

  // 综合星级：使用该课程所有测评的 overallScore 平均值来计算
  const overallStars = reviews.length
    ? Math.min(
        5,
        Math.max(
          1,
          Math.round(
            reviews.reduce(
              (sum, r) => sum + (typeof r.overallScore === "number" ? r.overallScore : 0),
              0
            ) / reviews.length
          )
        )
      )
    : 5;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      {/* Course Name as Main Title */}
      <div className="text-center space-y-2 pb-4 border-b-2 border-gradient-to-r from-blue-400 to-purple-400">
        <h2 className="text-gray-800 text-2xl">{courseName}</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <span className="text-sm">开课院系：</span>
          <span className="text-sm bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 rounded-full">
            {departmentText}
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
                opacity={star <= overallStars ? 1 : 0.2}
              />
            ))}
          </div>
        </div>

        {/* Score Details */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
            <div className="text-gray-600 text-sm mb-1">学分</div>
            <div className="text-blue-600">{creditsText}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
            <div className="text-gray-600 text-sm mb-1">评分方式</div>
            <div className="text-purple-600">百分制</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3">
            <div className="text-gray-600 text-sm mb-1">热门标签</div>
            <div className="text-pink-600">{reviews.length > 0 ? "好评较多" : "暂无标签"}</div>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="py-4">
        <RadarChart />
      </div>

      {/* Rating Categories */}
      <div className="space-y-3">
        {ratings.length === 0 ? (
          <div className="text-center text-gray-400 text-sm">暂无评分数据</div>
        ) : (
          ratings.map((rating, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                  <span className="text-gray-800 text-sm font-medium">{rating.label}</span>
                  {rating.hint && (
                    <span className="text-gray-400 text-[11px] leading-tight">{rating.hint}</span>
                  )}
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      opacity={star <= rating.stars ? 1 : 0.2}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}