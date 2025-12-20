import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Course {
  id: number;
  department: string;
  courseNo: string;
  courseName: string;
  credits: number;
  teacher: string;
  rating: number;
}

interface CourseTableProps {
  courses: Course[];
}

export function CourseTable({ courses }: CourseTableProps) {
  const [displayCourses, setDisplayCourses] = useState<Course[]>([]);

  // 修复点1：仅在组件初始化时初始化数据，而非每次courses变化都重置
  // 移除原有的useEffect，替换为仅执行一次的初始化逻辑
  useEffect(() => {
    setDisplayCourses([...courses]);
  }, []); // 空依赖：仅组件挂载时执行一次

  // 修复点2：排序逻辑增加「数字类型校验」，避免非数字rating导致排序异常
  const handleSortByRating = () => {
    // 先复制数组，避免修改原数据
    const sorted = [...displayCourses].sort((a, b) => {
      // 强制转为数字，避免字符串/小数等异常情况
      const ratingA = Number(a.rating);
      const ratingB = Number(b.rating);
      // 降序排序（高分在前）
      return ratingB - ratingA;
    });
    setDisplayCourses(sorted);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 shadow-sm overflow-hidden">
      {/* 排序按钮 */}
      <div className="flex justify-end p-4 border-b border-purple-100">
        <button
          onClick={handleSortByRating}
          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 rounded-lg transition-all"
        >
          按综合评分排序
        </button>
      </div>

      {/* 表格容器 */}
      <div className="overflow-auto max-h-[calc(100vh-280px)]">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left text-gray-700">课程号</th>
              <th className="px-6 py-4 text-left text-gray-700">课程名</th>
              <th className="px-6 py-4 text-left text-gray-700">学分</th>
              <th className="px-6 py-4 text-left text-gray-700">授课教师</th>
              <th className="px-6 py-4 text-left text-gray-700">开课单位</th>
              <th className="px-6 py-4 text-left text-gray-700">综合评分</th>
            </tr>
          </thead>
          <tbody>
            {displayCourses.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  暂无符合条件的课程
                </td>
              </tr>
            ) : (
              displayCourses.map((course, index) => (
                <tr
                  key={course.id} // 必须用唯一id作为key，避免排序后DOM渲染异常
                  className={index % 2 === 0 ? 'bg-white/50' : 'bg-purple-50/30 hover:bg-purple-50/50'}
                >
                  <td className="px-6 py-4 text-gray-700">{course.courseNo}</td>
                  <td className="px-6 py-4 text-gray-800">{course.courseName}</td>
                  <td className="px-6 py-4 text-gray-700">{course.credits}</td>
                  <td className="px-6 py-4 text-gray-700">{course.teacher}</td>
                  <td className="px-6 py-4 text-gray-600">{course.department}</td>
                  <td className="px-6 py-4">{renderStars(course.rating)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}