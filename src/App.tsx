import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import './App.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 页面内容区域 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet /> {/* 这里会显示当前路由对应的页面 */}
      </main>
      
      {/* 页脚 */}
      <footer className="mt-12 py-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">© 2024 选课宝典 - 课程测评网站</p>
              <p className="text-gray-500 text-sm mt-1">让选课更简单，让学习更高效</p>
            </div>
            
            <div className="flex gap-6">
              <a href="/help" className="text-gray-600 hover:text-blue-600 transition-colors">
                帮助中心
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                关于我们
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                联系我们
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                用户协议
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              本网站仅供学习交流使用，所有课程评价来自真实用户分享
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;