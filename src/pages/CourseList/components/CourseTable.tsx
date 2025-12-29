
import { useNavigate } from 'react-router-dom'; 

import { Star } from 'lucide-react';

interface Course { // 课程数据类型
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
  onSort?: () => void; // 简化的排序回调
  sortDirection?: 'asc' | 'desc' | null; // 当前排序方向
}

export function CourseTable({ courses, onSort, sortDirection }: CourseTableProps) {
  const navigate = useNavigate(); // 用于导航到课程详情页
  
  const handleRowClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  }; // 处理行点击事件，导航到课程详情页

  // 渲染评分星星
  
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

  // 获取排序按钮文本
  const getSortButtonText = () => {
    if (!sortDirection) return '按综合评分排序';
    return `按综合评分排序（${sortDirection === 'desc' ? '降序' : '升序'}）`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 shadow-sm overflow-hidden">
      <div className="flex justify-end p-4 border-b border-purple-100">
        {onSort && (
          <button
            onClick={onSort}
            className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 rounded-lg transition-all"
          >
            {getSortButtonText()}
          </button>
        )}
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
                  onClick={() => handleRowClick(course.id)}
                  className={`${index % 2 === 0 ? 'bg-white/50' : 'bg-purple-50/30 hover:bg-purple-50/50'} cursor-pointer transition-colors duration-150 hover:bg-purple-100/30`}
                >
                  <td className="px-6 py-4 text-gray-700">{course.courseNo}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{course.courseName}</td>
                  <td className="px-6 py-4 text-gray-700">{course.credits}</td>
                  <td className="px-6 py-4 text-gray-700">{course.teacher}</td>
                  <td className="px-6 py-4 text-gray-600">{course.department}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {renderStars(course.rating)}
                      <span className="text-sm text-gray-600">({course.rating})</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}