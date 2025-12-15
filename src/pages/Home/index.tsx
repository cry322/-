import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  TrendingUp, 
  Users, 
  BookOpen,
  ChevronRight,
} from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* 英雄区域 */}
      <div className="text-center py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          找到最适合你的课程
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          基于真实学生评价，帮你做出更好的选课决策。已有超过10,000+课程评价。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/courses" 
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            浏览课程库
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
          <Link 
            to="/write-review" 
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            分享你的评价
          </Link>
        </div>
      </div>

      {/* 功能特性 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">真实评价</h3>
          </div>
          <p className="text-gray-600">所有评价均来自真实学生，确保信息的可靠性和实用性。</p>
        </div>
        
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">数据可视化</h3>
          </div>
          <p className="text-gray-600">通过图表直观展示课程评分分布，帮助你快速了解课程质量。</p>
        </div>
        
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">社区互动</h3>
          </div>
          <p className="text-gray-600">与同学交流选课经验，提问和解答关于课程的疑问。</p>
        </div>
      </div>

      {/* 热门课程预览 */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">热门课程</h2>
          <Link to="/courses" className="text-blue-600 hover:text-blue-800 flex items-center">
            查看全部课程
            <ChevronRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-lg mr-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">课程名称 {i}</h4>
                  <p className="text-gray-600 text-sm">张老师 · 计算机学院</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 font-medium">4.8</span>
                  <span className="ml-2 text-gray-500">(1,234评价)</span>
                </div>
              </div>
              
              <Link 
                to={`/courses/${i}`}
                className="block w-full py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-600 transition-colors"
              >
                查看详情
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-6 lg:mb-0 lg:mr-8">
            <h3 className="text-2xl font-bold mb-4">开始你的选课之旅</h3>
            <p className="text-blue-100">加入上万名学生，分享你的课程体验，帮助更多人做出明智选择。</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/write-review"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors text-center"
            >
              写评价
            </Link>
            <Link 
              to="/courses"
              className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              浏览课程
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;