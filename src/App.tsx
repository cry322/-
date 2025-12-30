import { useEffect } from 'react';
import { useLocation, Outlet, Link } from 'react-router-dom';
import { Header } from './components/layout/Header';
import './App.css';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // 每次路由变化时滚动到顶部
    window.scrollTo(0, 0);
  }, [location.pathname]); // 监听路径变化
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
              <p className="text-gray-600">© 2025 选课宝典 - 课程测评网站</p>
              <p className="text-gray-500 text-sm mt-1">让选课更简单，让学习更高效</p>
            </div>

            <div className="flex gap-6">
              <Link to="/help" className="text-gray-600 hover:text-blue-600 transition-colors">
                帮助中心
              </Link>
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
