import {
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
  // 从Excel表中挑选的热门课程数据
  const hotCourses = [
    { id: "1630079", name: "心理学导论", count: 128, rating: 4 },
    { id: "2838360", name: "微观经济学", count: 112, rating: 5 },
    { id: "3230020", name: "政治学原理", count: 98, rating: 5 },
    { id: "1339180", name: "世界文化地理", count: 85, rating: 4 },
    { id: "430171", name: "人类生存发展与核科学", count: 76, rating: 4 }
  ];

  return (
    <aside className="hidden xl:block w-80 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* 最近热门 */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="text-gray-900">最近热门课程</h3>
          </div>
          <div className="space-y-3">
            {hotCourses.map((item, index) => (
              <Link
                key={item.id}
                to={`/courses/${item.id}`}  // 使用动态课程ID
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </span>
                    
                  </div>
                </div>
                <span className="text-gray-400 text-xs">{item.count}次浏览</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 帮助链接 - 保持不变 */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-900">常见问题</h3>
          </div>
          <div className="space-y-2 text-sm">
            <Link
              to="/help"
              className="block text-gray-600 hover:text-blue-600 transition-colors"
            >
              如何写一条有帮助的测评？
            </Link>
            <Link
              to="/help"
              className="block text-gray-600 hover:text-blue-600 transition-colors"
            >
              匿名评价会被发现吗？
            </Link>
            <Link
              to="/help"
              className="block text-gray-600 hover:text-blue-600 transition-colors"
            >
              如何举报不当内容？
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}