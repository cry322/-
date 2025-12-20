import {
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
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
            {[
              { name: "数据结构与算法", count: 45 },
              { name: "微观经济学", count: 38 },
              { name: "操作系统原理", count: 32 },
              { name: "大学英语(3)", count: 28 },
              { name: "高等数学 A(1)", count: 25 },
            ].map((item, index) => (
              <Link
                key={index}
                to="/courses"
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 text-sm">{item.name}</span>
                </div>
                <span className="text-gray-400 text-xs">{item.count}次浏览</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 帮助链接 */}
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