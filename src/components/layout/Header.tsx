import {
  Search,
  Bell,
  User,
  BookOpen,
  ClipboardCheck,
  HelpCircle,
  Home,
} from "lucide-react";
import logo from "D:/vs demo/course-e/src/assets/选课宝典logo.png"; // 使用@别名
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const hasNotification = false; // 假设没有通知

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo 和主导航 */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-4 hover:opacity-90 transition"
              >
                <img src={logo} alt="选课宝典" className="w-16 h-16" />
                <span className="text-gray-900 text-2xl">选课宝典</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`flex items-center gap-1 transition-colors ${
                  location.pathname === "/"
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <Home className="w-4 h-4" />
                首页
              </Link>
              <Link
                to="/courses"
                className={`flex items-center gap-1 transition-colors ${
                  location.pathname === "/courses"
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                课程库
              </Link>
              <Link
                to="/reviews"  // 改成Link组件
                className={`flex items-center gap-1 transition-colors ${
                  location.pathname === "/reviews"
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                测评库
              </Link>
              <Link
                to="/help"
                className={`flex items-center gap-1 transition-colors ${
                  location.pathname === "/help"
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                帮助中心
              </Link>
            </nav>
          </div>

          {/* 搜索框和用户操作 */}
          <div className="flex items-center gap-4">
            {/* 搜索框 */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索课程、教师..."
                className="bg-transparent border-none outline-none ml-2 w-full text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* 消息通知 */}
            <Link 
              to="/messages" 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {hasNotification && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Link>

            {/* 用户中心 */}
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-700 hidden lg:block">用户中心</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}