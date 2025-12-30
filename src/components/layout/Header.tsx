import {
  Search,
  Bell,
  User,
  BookOpen,
  ClipboardCheck,
  HelpCircle,
  Home,
  Menu,
  X,
} from 'lucide-react';
import logo from '../../assets/选课宝典logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hasNotification = false;

  // 点击外部关闭搜索建议框和移动菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 关闭搜索建议
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }

      // 关闭移动菜单
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-menu-button]')
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 处理搜索
  const handleSearch = (query: string = searchQuery) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/courses?q=${encodeURIComponent(trimmedQuery)}`);
      setShowSuggestions(false);
      setSearchQuery(trimmedQuery);
      // 在移动端搜索后关闭菜单
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // 处理移动端菜单切换
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 关闭移动菜单
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // 示例搜索建议
  const searchSuggestions = [
    '计算机科学导论',
    '数据结构',
    '微积分',
    '大学英语',
    '线性代数',
    '概率论与数理统计',
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo 和汉堡菜单按钮 */}
          <div className="flex items-center gap-4">
            {/* 汉堡菜单按钮 - 小屏幕显示 */}
            <button
              data-menu-button
              onClick={toggleMobileMenu}
              className="xl:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="打开菜单"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-3 hover:opacity-90 transition"
                onClick={closeMobileMenu}
              >
                <img src={logo} alt="选课宝典" className="w-10 h-10 sm:w-12 sm:h-12" />
                <span className="text-gray-900 text-lg sm:text-xl font-medium">选课宝典</span>
              </Link>
            </div>

            {/* 主导航 - 大部分屏幕都显示 */}
            <nav className="hidden xl:flex items-center gap-2 ml-6">
              <Link
                to="/"
                className={`flex items-center gap-1.5 transition-colors px-3 py-2 rounded-lg ${
                  location.pathname === '/'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>首页</span>
              </Link>
              <Link
                to="/courses"
                className={`flex items-center gap-1.5 transition-colors px-3 py-2 rounded-lg ${
                  location.pathname === '/courses' || location.pathname.startsWith('/courses/')
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>课程库</span>
              </Link>
              <Link
                to="/reviews"
                className={`flex items-center gap-1.5 transition-colors px-3 py-2 rounded-lg ${
                  location.pathname === '/reviews'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>测评库</span>
              </Link>
              <Link
                to="/help"
                className={`flex items-center gap-1.5 transition-colors px-3 py-2 rounded-lg ${
                  location.pathname === '/help'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>帮助中心</span>
              </Link>
            </nav>

            {/* 中等屏幕显示的简化导航 - 只有图标 */}
            <nav className="hidden lg:flex xl:hidden items-center gap-1 ml-4">
              <Link
                to="/"
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === '/'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                title="首页"
              >
                <Home className="w-5 h-5" />
              </Link>
              <Link
                to="/courses"
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === '/courses' || location.pathname.startsWith('/courses/')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                title="课程库"
              >
                <BookOpen className="w-5 h-5" />
              </Link>
              <Link
                to="/reviews"
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === '/reviews'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                title="测评库"
              >
                <ClipboardCheck className="w-5 h-5" />
              </Link>
              <Link
                to="/help"
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === '/help'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                title="帮助中心"
              >
                <HelpCircle className="w-5 h-5" />
              </Link>
            </nav>
          </div>

          {/* 搜索框和用户操作 */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* 搜索框 - 大部分屏幕都显示 */}
            <div ref={searchRef} className="hidden sm:flex flex-col relative">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-40 md:w-48 lg:w-52 xl:w-64">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="搜索课程、教师..."
                  className="bg-transparent border-none outline-none ml-2 w-full text-gray-700 placeholder-gray-400 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch()}
                    className="ml-2 p-1 hover:bg-gray-200 rounded flex-shrink-0"
                    title="搜索"
                  >
                    <Search className="w-4 h-4 text-blue-600" />
                  </button>
                )}
              </div>

              {/* 搜索建议下拉框 */}
              {showSuggestions && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => handleSearch()}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                  >
                    <Search className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium truncate">搜索 "{searchQuery}"</div>
                      <div className="text-xs text-gray-500 truncate">在所有课程中搜索</div>
                    </div>
                  </button>

                  <div className="px-4 pt-3 pb-1 text-xs text-gray-400 font-medium">热门搜索</div>
                  {searchSuggestions
                    .filter(suggestion =>
                      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice(0, 5)
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                      >
                        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{suggestion}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* 移动端搜索按钮 - 小屏幕显示 */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="搜索"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* 消息通知 */}
            <Link
              to="/messages"
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {hasNotification && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Link>

            {/* 用户中心 */}
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 sm:px-3 py-2 transition-colors"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-700 hidden lg:block">用户中心</span>
            </Link>
          </div>
        </div>

        {/* 移动端菜单 - 小屏幕显示 */}
        <div
          ref={mobileMenuRef}
          className={`xl:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out z-40 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="px-4 py-4 space-y-4">
            {/* 移动端搜索框 */}
            <div ref={searchRef} className="mb-2">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-3">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="搜索课程、教师..."
                  className="bg-transparent border-none outline-none ml-2 w-full text-gray-700 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch()}
                    className="ml-2 p-1 hover:bg-gray-200 rounded flex-shrink-0"
                    title="搜索"
                  >
                    <Search className="w-4 h-4 text-blue-600" />
                  </button>
                )}
              </div>

              {/* 移动端搜索建议 */}
              {showSuggestions && searchQuery && (
                <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <button
                    onClick={() => handleSearch()}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                  >
                    <Search className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium truncate">搜索 "{searchQuery}"</div>
                      <div className="text-xs text-gray-500 truncate">在所有课程中搜索</div>
                    </div>
                  </button>

                  {searchSuggestions
                    .filter(suggestion =>
                      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice(0, 5)
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm"
                      >
                        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{suggestion}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* 移动端导航链接 */}
            <div className="space-y-1">
              <Link
                to="/"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMobileMenu}
              >
                <Home className="w-5 h-5 flex-shrink-0" />
                <span>首页</span>
              </Link>
              <Link
                to="/courses"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/courses' || location.pathname.startsWith('/courses/')
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMobileMenu}
              >
                <BookOpen className="w-5 h-5 flex-shrink-0" />
                <span>课程库</span>
              </Link>
              <Link
                to="/reviews"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/reviews'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMobileMenu}
              >
                <ClipboardCheck className="w-5 h-5 flex-shrink-0" />
                <span>测评库</span>
              </Link>
              <Link
                to="/help"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/help'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMobileMenu}
              >
                <HelpCircle className="w-5 h-5 flex-shrink-0" />
                <span>帮助中心</span>
              </Link>

              {/* 移动端额外的用户相关链接 */}
              <Link
                to="/profile"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/profile'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMobileMenu}
              >
                <User className="w-5 h-5 flex-shrink-0" />
                <span>用户中心</span>
              </Link>
              <Link
                to="/messages"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/messages'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMobileMenu}
              >
                <Bell className="w-5 h-5 flex-shrink-0" />
                <span>消息通知</span>
                {hasNotification && (
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
