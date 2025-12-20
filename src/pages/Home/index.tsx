import { HeroSection } from "../../components/HeroSection";
import { CourseGrid } from "../../components/CourseGrid";
import { LatestReviews } from "../../components/LatestReviews";
import { Sidebar } from "../../components/Sidebar";
export default function HomePage() {
 
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧主要内容 */}
        <div className="flex-1">
          {/* 引导区 */}
          <HeroSection  />

          {/* 热门课程推荐 */}
          <section className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">高分课程</h2>
              <a
                href="/courses"
                className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
              >
                查看更多
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
            <CourseGrid />
          </section>

          {/* 最新评价滚动 */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">最新评价</h2>
              <a
                href="/reviews"
                className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
              >
                查看全部
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
            <LatestReviews />
          </section>
        </div>

        {/* 右侧边栏 */}
        <Sidebar />
      </div>
    </>
  );
}