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
}

const courses: Course[] = [
  {
    id: "1",
    name: "数据结构与算法",
    teacher: "陈彬",
    department: "信科学院",
    reviewCount: 234,
    overallScore: 4.5,
    tags: ["作业量大", "讲解清晰", "考试公平"],
  },
  {
    id: "2",
    name: "高等数学 C",
    teacher: "王正栋",
    department: "数学科学学院",
    reviewCount: 456,
    overallScore: 4.2,
    tags: ["作业多", "知识点全面", "期末压力大"],
  },
  {
    id: "3",
    name: "心理学导论",
    teacher: "毛利华",
    department: "心理与认知科学学院",
    reviewCount: 189,
    overallScore: 4.5,
    tags: ["内容有趣", "老师幽默", "收获大"],
  },
  {
    id: "4",
    name: "信息架构设计与实践",
    teacher: "孟凡",
    department: "信息管理系",
    reviewCount: 167,
    overallScore: 4.8,
    tags: ["课程硬核", "项目有趣", "老师负责"],
  },
  {
    id: "5",
    name: "微观经济学",
    teacher: "刘老师",
    department: "经济学院",
    reviewCount: 203,
    overallScore: 4.6,
    tags: ["逻辑清晰", "案例丰富", "考试难度适中"],
  },
  {
    id: "6",
    name: "英美词汇",
    teacher: "赵老师",
    department: "外国语学院",
    reviewCount: 312,
    overallScore: 4.7,
    tags: ["互动多", "提升口语", "给分友好"],
  },
  {
    id: "7",
    name: "思想道德与法治",
    teacher: "孙教授",
    department: "马克思主义学院",
    reviewCount: 287,
    overallScore: 4.5,
    tags: ["课堂活跃", "内容实用", "考核多样"],
  },
  {
    id: "8",
    name: "篮球",
    teacher: "周教练",
    department: "体育教研部",
    reviewCount: 156,
    overallScore: 4.8,
    tags: ["趣味性强", "锻炼身体", "轻松愉快"],
  },
  {
    id: "9",
    name: "中国近现代史纲要",
    teacher: "吴教授",
    department: "马克思主义学院",
    reviewCount: 198,
    overallScore: 4.4,
    tags: ["历史故事", "启发思考", "作业合理"],
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

// 添加一个函数来根据课程信息判断课程类型
const getCourseType = (course: Course): string => {
  const { name, department } = course;

  if (name.includes("数学") || department === "数学学院") {
    return "public-math";
  } else if (
    department === "计算机学院" ||
    name.includes("数据") ||
    name.includes("操作") ||
    name.includes("算法")
  ) {
    return "computer";
  } else if (name.includes("英语") || department === "外国语学院") {
    return "english";
  } else if (
    department === "马克思主义学院" ||
    name.includes("思想") ||
    name.includes("法律") ||
    name.includes("近现代史")
  ) {
    return "ideology";
  } else if (department === "体育部" || name.includes("体育")) {
    return "sports";
  } else if (department === "经济学院") {
    return "general"; // 微观经济学属于通识教育
  } else if (department === "物理学院") {
    return "general"; // 大学物理实验属于通识教育
  }

  return "general"; // 默认归为通识教育
};

// 给每个课程添加类型信息
const coursesWithType = courses.map((course) => ({
  ...course,
  type: getCourseType(course),
}));

export function CourseGrid() {
  const [selectedType, setSelectedType] = useState<string>("all");

  // 根据选中的类型过滤课程
  const filteredCourses =
    selectedType === "all"
      ? coursesWithType
      : coursesWithType.filter((course) => course.type === selectedType);

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