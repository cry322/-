import { Star, ChevronRight, ThumbsUp, Users } from "lucide-react"; /*读入一些图标*/
import { CourseInfoCard } from "./CourseInfoCard"; /*读入本地组件*/
import { TeacherCard } from "./TeacherCard"; /*读入本地组件*/

export function CourseEvaluationPage() { /*声明一个 React 函数组件，名为 CourseEvaluationPage
使用 export 导出，以便其他文件（如路由）可以引入并渲染它*/
  const teacherSections = [
    {
      id: 1,
      title: "开课教师1",
      subtitle: "课程内容详细，理论整理清晰且能理论联系实际",
      description: "理论扎实广泛结合实际场景",
      weeks: ["周次1", "周次2", "周次3", "周次4", "周次5"],
      about: "关于教师",
      reviewDetail: "评分详情",
      capacity: "满课人数及状态",
      likes: "点赞排行"
    },
    {
      id: 2,
      title: "开课教师2",
      subtitle: "往年有数据支持了本科课程和专业知识补强",
      description: "理论广泛扎实结合实际",
      weeks: ["周次1", "周次2", "周次3", "周次4", "周次5"],
      about: "关于教师",
      reviewDetail: "评分详情",
      capacity: "满课人数及状态",
      likes: "点赞"
    },
    {
      id: 3,
      title: "开课教师3",
      subtitle: "",
      description: "选课扑击到成功消息消极而非",
      weeks: ["周次1", "周次2", "周次3", "周次4", "周次5"],
      about: "关于教师",
      reviewDetail: "评分详情",
      capacity: "满课人数及状态",
      likes: ""
    }
  ];

  const additionalSections = [ /*用于占位的额外教师卡片*/
    { id: 4 },
    { id: 5 },
    { id: 6 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-center text-gray-800 mb-4">导航栏-测评详情界面,这个部分后续要和主页统一一下？</h1>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>通识课</span>
            <span>&gt;</span>
            <span>通识核心课</span>
            <span>&gt;</span>
            <span>民主的历史与现实</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Left Column - Course Info */}
          <div className="w-80 flex-shrink-0">
            <CourseInfoCard />
          </div>

          {/* Right Column - Teacher Sections */}
          <div className="flex-1 bg-white/50 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {teacherSections.map((section, index) => (
                <TeacherCard key={section.id} {...section} colorIndex={index} />
              ))}
              {additionalSections.map((section, index) => (
                <TeacherCard key={section.id} isPlaceholder colorIndex={teacherSections.length + index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}