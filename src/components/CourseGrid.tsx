import { useState } from "react";
import { Star, MessageSquare, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  name: string;
  teacher: string;
  department: string;
  reviewCount: number;
  overallScore: number; // 改为综合评分（1-5，支持小数）
  tags: string[];
  type: string; // 添加类型字段
}

const courses: Course[] = [
  {
    id: "2838360",
    name: "微观经济学",
    teacher: "高彧",
    department: "光华管理学院",
    reviewCount: 120,
    overallScore: 5.0,
    tags: ["课程干货多", "实践性强", "给分好"],
    type: "general", // 添加类型字段
  },
  {
    id: "3230020",
    name: "政治学原理",
    teacher: "马啸",
    department: "政府管理学院",
    reviewCount: 85,
    overallScore: 5.0,
    tags: ["理论深入", "互动性强", "讲课生动"],
    type: "general",
  },
  {
    id: "4334010",
    name: "古代西亚北非神话与艺术",
    teacher: "贾妍",
    department: "艺术学院",
    reviewCount: 95,
    overallScore: 5.0,
    tags: ["讲课生动", "前沿内容", "不考勤"],
    type: "general",
  },
  {
    id: "2432210",
    name: "民主的历史与现实",
    teacher: "汪卫华",
    department: "国际关系学院",
    reviewCount: 78,
    overallScore: 4.0,
    tags: ["理论深入", "前沿内容", "考勤严格"],
    type: "general",
  },
  {
    id: "1630079",
    name: "心理学导论",
    teacher: "毛利华",
    department: "心理与认知科学学院",
    reviewCount: 210,
    overallScore: 4.0,
    tags: ["课程干货多", "讲课生动", "给分好"],
    type: "general",
  },
  {
    id: "1339180",
    name: "世界文化地理",
    teacher: "邓辉",
    department: "城市与环境学院",
    reviewCount: 145,
    overallScore: 4.0,
    tags: ["实践性强", "讲课生动", "给分好"],
    type: "general",
  },
  {
    id: "1339320",
    name: "中国历史地理",
    teacher: "韩茂莉",
    department: "城市与环境学院",
    reviewCount: 112,
    overallScore: 5.0,
    tags: ["理论深入", "讲课生动", "考试难"],
    type: "general",
  },
  {
    id: "2039130",
    name: "民俗研究",
    teacher: "王娟",
    department: "中国语言文学系",
    reviewCount: 92,
    overallScore: 5.0,
    tags: ["理论深入", "课件详细", "无论文"],
    type: "general",
  },
  {
    id: "2939991",
    name: "英美侵权法",
    teacher: "徐爱国",
    department: "法学院",
    reviewCount: 98,
    overallScore: 5.0,
    tags: ["讲课生动", "给分好", "无考试"],
    type: "general",
  },
];


// 课程类型选项
const courseTypes = [
  { id: "all", name: "全部课程" },
  { id: "public-math", name: "公共数学课" },
  { id: "computer", name: "计算机课程" },
  { id: "ideology", name: "思想政治课" },
  { id: "general", name: "通识教育课" },
  { id: "sports", name: "体育课" },
  { id: "english", name: "大学英语" },
  { id: "ideology-elective", name: "思政选择性必修" },
  { id: "labor", name: "劳动教育课" },
];



export function CourseGrid() {
  const [selectedType, setSelectedType] = useState<string>("all");

  // 根据选中的类型过滤课程
  const filteredCourses =
    selectedType === "all"
      ? courses
      : courses.filter((course) => course.type === selectedType);

  // 渲染星级评分，支持半星
  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // 全星
        stars.push(
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // 半星
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 fill-gray-300 absolute" />
            <div className="overflow-hidden w-2 absolute">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      } else {
        // 空星
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300 fill-gray-300" />
        );
      }
    }

    return stars;
  };

  return (
    <div>
      {/* 课程类型筛选器 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">课程类型</h2>
          <div className="text-sm text-gray-500">
            共 {filteredCourses.length} 门课程
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {courseTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  selectedType === type.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* 筛选提示 */}
        {selectedType !== "all" && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              当前筛选:{" "}
              <span className="font-medium">
                {courseTypes.find((t) => t.id === selectedType)?.name}
              </span>
            </div>
            <button
              onClick={() => setSelectedType("all")}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              清除筛选
            </button>
          </div>
        )}
      </div>

      {/* 课程网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link 
            to={`/courses/${course.id}`} 
            key={course.id}
            className="block"
          >
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group h-full flex flex-col">
              {/* 课程标题和基本信息 */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.name}
                  </h3>
                  {/* 课程类型标签 */}
                  <div className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium flex-shrink-0 ml-2">
                    {courseTypes.find((t) => t.id === course.type)?.name ||
                      "通识教育"}
                  </div>
                </div>
                
                {/* 教师和院系信息 - 增加字体大小 */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                    <span className="text-base font-medium">{course.teacher}</span>
                  </div>
                  <div className="text-gray-600 text-sm ml-5.5">
                    {course.department}
                  </div>
                </div>

                {/* 评价数量 */}
                <div className="flex items-center gap-2 text-gray-600 ml-5.5 mb-3">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">{course.reviewCount} 条评价</span>
                </div>

                {/* 综合评分 - 移动到热门课程标签前面 */}
                <div className="flex items-center gap-2 ml-5.5 mb-2">
                  <span className="text-gray-600 text-sm font-medium">综合评分:</span>
                  <div className="flex items-center gap-0.5">
                    {renderStars(course.overallScore)}
                  </div>
                  <span className="text-gray-700 font-medium text-sm">
                    {course.overallScore.toFixed(1)}
                  </span>
                </div>

                {/* Trending 指示器 - 移到综合评分后面 */}
                {course.reviewCount > 200 && (
                  <div className="flex items-center gap-1 text-blue-600 ml-5.5">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs">热门课程</span>
                  </div>
                )}
              </div>

              {/* 底部区域：特色标签 */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 空状态提示 */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <BookOpen className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-gray-600 font-medium mb-1">暂无相关课程</h3>
          <p className="text-gray-500 text-sm mb-4">
            当前筛选条件下没有找到课程
          </p>
          <button
            onClick={() => setSelectedType("all")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看所有课程
          </button>
        </div>
      )}
    </div>
  );
}