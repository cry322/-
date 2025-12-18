import { PenSquare, Sparkles, BookOpen, ClipboardCheck } from "lucide-react";
import logo from "../assets/选课宝典logo.png";
import backgroundImage from "../assets/back.jpg";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative rounded-xl p-8 text-white shadow-lg overflow-hidden">
      {/* 背景图片层 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transformOrigin: "center",
        }}
      />
      
      {/* 渐变层 */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* 蓝色色调层 */}
      <div className="absolute inset-0 z-2 bg-blue-600/10" />
      
      {/* 内容区域 */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* 左侧：大Logo */}
          <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
            <img
              src={logo}
              alt="选课宝典"
              className="w-40 h-40 md:w-48 md:h-48 object-contain"
            />
          </div>

          {/* 右侧：内容和按钮 - 向下移动并调整字号 */}
          <div className="flex-1 mt-4 md:mt-8">
            {/* 移动端显示的标题 */}
            <div className="md:hidden mb-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-blue-100 text-xl md:text-2xl font-medium">
                  欢迎使用选课宝典
                </span>
              </div>
              <p className="text-blue-100 text-base md:text-lg">
                真实评价 · 匿名保护 · 智能推荐
              </p>
            </div>

            {/* 桌面端标题 */}
            <div className="hidden md:block mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-blue-100 text-xl md:text-2xl font-medium">
                  欢迎使用选课宝典
                </span>
              </div>
              <p className="text-blue-100 text-base md:text-lg">
                真实评价 · 匿名保护 · 智能推荐
              </p>
            </div>

            {/* 按钮区域 */}
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/write-review"
                className="bg-white text-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-md text-sm font-medium min-w-[110px]"
              >
                <PenSquare className="w-4 h-4 md:w-5 md:h-5" />
                写测评
              </Link>
              
              <Link 
                to="/courses"
                className="bg-blue-400 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md text-sm font-medium min-w-[110px]"
              >
                <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                浏览课程
              </Link>
              
              <Link 
                to="/reviews"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md text-sm font-medium min-w-[110px]"
              >
                <ClipboardCheck className="w-4 h-4 md:w-5 md:h-5" />
                浏览测评
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}