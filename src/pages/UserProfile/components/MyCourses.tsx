import { BookOpen, Star, Users, Calendar } from "lucide-react";

interface Course {
  id: string;
  code: string;
  name: string;
  semester: string;
  credits: number;
  avgRating: number;
  reviewCount: number;
  hasReviewed: boolean;
}

const mockCourses: Course[] = [
  {
    id: "1",
    code: "3230900",
    name: "政治学原理",
    semester: "2024秋季",
    credits: 3,
    avgRating: 4.3,
    reviewCount: 156,
    hasReviewed: true,
  },
  {
    id: "2",
    code: "1233170",
    name: "地震概论",
    semester: "2024秋季",
    credits: 2,
    avgRating: 4.1,
    reviewCount: 142,
    hasReviewed: true,
  },
  {
    id: "3",
    code: "2939991",
    name: "英美侵权法",
    semester: "2024春季",
    credits: 2,
    avgRating: 4.5,
    reviewCount: 178,
    hasReviewed: true,
  },
  {
    id: "4",
    code: "2039130",
    name: "民俗研究",
    semester: "2024春季",
    credits: 2,
    avgRating: 3.8,
    reviewCount: 89,
    hasReviewed: false,
  },
  {
    id: "5",
    code: "2930187",
    name: "中国当代法律与社会",
    semester: "2023秋季",
    credits: 2,
    avgRating: 4.2,
    reviewCount: 134,
    hasReviewed: false,
  },
];

export function MyCourses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockCourses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-gray-900">
                {course.code} - {course.name}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {course.semester}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {course.credits} 学分
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-gray-700">{course.avgRating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Users className="w-4 h-4" />
                {course.reviewCount} 条测评
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              查看课程
            </button>
            {course.hasReviewed ? (
              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                查看我的测评
              </button>
            ) : (
              <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                写测评
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}