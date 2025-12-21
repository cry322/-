import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

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
  onSortByRating?: (courses: Course[]) => Course[]; // 新增：排序回调
}

export function CourseTable({ courses, onSortByRating }: CourseTableProps) {
  const navigate = useNavigate(); // 👈 获取导航函数
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

  const handleSortByRating = () => {
    if (!onSortByRating) return;
    const sortedCourses = onSortByRating([...courses]);
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  // 👇 点击行跳转到课程详情
  const handleRowClick = (id: number) => {
    navigate(`/course/${id}`);
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
      <div className="flex justify-end p-4 border-b border-purple-100">
        <button
          onClick={handleSortByRating}
          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 rounded-lg transition-all"
        >
          按综合评分排序（{sortDirection === 'desc' ? '降序' : '升序'}）
        </button>
      </div>

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
            {courses.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  暂无符合条件的课程
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr
                  key={course.id}
                  onClick={() => handleRowClick(course.id)} // 👈 添加点击事件
                  className={`${index % 2 === 0 ? 'bg-white/50' : 'bg-purple-50/30 hover:bg-purple-50/50'} cursor-pointer`} // 👈 添加 cursor-pointer 样式
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