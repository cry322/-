import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ChevronRight } from "lucide-react";
const UserProfilePage = () => {
  const [activePage, setActivePage] = useState<string>('reviews-page');
  const navigate = useNavigate();

  // 显示指定页面
  const showPage = (pageId: string) => {
    setActivePage(pageId);
  };

  // 查看测评详情
  const viewReviewDetail = (reviewId: string) => {
    navigate(`/reviews/${reviewId}`);
  };

  // 查看课程详情
  const viewCourseDetail = (courseCode: string) => {
    navigate(`/courses/${courseCode}`);
  };

  // 查看我的测评
  const viewMyReview = (reviewId: string) => {
    navigate(`/reviews/${reviewId}`);
  };

  // 写测评
  const writeReview = (courseCode: string) => {
    navigate(`/courses/${courseCode}/write-review`);
  };

  // 查看评论来源
  const viewCommentSource = (commentId: string) => {
    navigate(`/reviews/${commentId}`);
  };

  // 查看收藏的测评
  const viewFavoriteReview = (reviewId: string) => {
    navigate(`/reviews/${reviewId}`);
  };

  // 编辑资料
  const editProfile = () => {
    alert('编辑资料功能开发中...');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <nav className="flex items-center text-sm">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <Home className="w-4 h-4 mr-1" />
            首页
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-blue-600 font-medium">用户中心</span>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100" 
              alt="用户头像" 
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover self-center md:self-start"
            />
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">kiki</h1>
                  <p className="text-gray-500 text-sm">北京大学 · 大三</p>
                </div>
                <button 
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm w-full md:w-auto"
                  onClick={editProfile}
                >
                  编辑资料
                </button>
              </div>
              <p className="text-gray-700 mb-6">
                热爱学习，乐于分享课程体验。希望通过我的测评帮助大家选到合适的课程！
              </p>
              
              {/* 统计数据 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
                  <div className="text-gray-600 text-sm">发布测评</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">5</div>
                  <div className="text-gray-600 text-sm">选修课程</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-1">2</div>
                  <div className="text-gray-600 text-sm">发表评论</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">2</div>
                  <div className="text-gray-600 text-sm">收藏内容</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 标签页 */}
        <div className="flex gap-2 md:gap-8 border-b border-gray-200 mb-6 md:mb-8 overflow-x-auto">
          <button
            className={`px-2 py-3 md:px-0 md:py-4 text-sm md:text-base whitespace-nowrap border-b-2 transition-colors ${activePage === 'reviews-page' 
              ? 'text-blue-600 border-blue-600 font-medium' 
              : 'text-gray-600 border-transparent hover:text-blue-600'}`}
            onClick={() => showPage('reviews-page')}
          >
            我的测评
          </button>
          <button
            className={`px-2 py-3 md:px-0 md:py-4 text-sm md:text-base whitespace-nowrap border-b-2 transition-colors ${activePage === 'courses-page' 
              ? 'text-blue-600 border-blue-600 font-medium' 
              : 'text-gray-600 border-transparent hover:text-blue-600'}`}
            onClick={() => showPage('courses-page')}
          >
            我的课程
          </button>
          <button
            className={`px-2 py-3 md:px-0 md:py-4 text-sm md:text-base whitespace-nowrap border-b-2 transition-colors ${activePage === 'comments-page' 
              ? 'text-blue-600 border-blue-600 font-medium' 
              : 'text-gray-600 border-transparent hover:text-blue-600'}`}
            onClick={() => showPage('comments-page')}
          >
            我的评论
          </button>
          <button
            className={`px-2 py-3 md:px-0 md:py-4 text-sm md:text-base whitespace-nowrap border-b-2 transition-colors ${activePage === 'favorites-page' 
              ? 'text-blue-600 border-blue-600 font-medium' 
              : 'text-gray-600 border-transparent hover:text-blue-600'}`}
            onClick={() => showPage('favorites-page')}
          >
            我的收藏
          </button>
        </div>

        {/* 我的测评页面 */}
        <div className={`${activePage === 'reviews-page' ? 'block' : 'hidden'}`}>
          <div className="space-y-4">
            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewReviewDetail('1')}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">政治学原理</h3>
                  <p className="text-sm text-gray-500">3230900 · 2024秋季</p>
                </div>
                <div className="text-blue-600 font-bold text-lg">4.3</div>
              </div>
              <p className="text-gray-600 text-sm mb-3">这门课非常有趣，老师讲课生动，能够引发思考...</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👍 89</span>
                <span>💬 23</span>
                <span>👁 567</span>
              </div>
            </div>

            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewReviewDetail('2')}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">地震概论</h3>
                  <p className="text-sm text-gray-500">1233170 · 2024秋季</p>
                </div>
                <div className="text-blue-600 font-bold text-lg">4.1</div>
              </div>
              <p className="text-gray-600 text-sm mb-3">轻松愉快的一门课，老师讲解深入浅出...</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👍 67</span>
                <span>💬 18</span>
                <span>👁 423</span>
              </div>
            </div>

            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewReviewDetail('3')}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">英美侵权法</h3>
                  <p className="text-sm text-gray-500">2939991 · 2024春季</p>
                </div>
                <div className="text-blue-600 font-bold text-lg">4.5</div>
              </div>
              <p className="text-gray-600 text-sm mb-3">非常专业的一门课程，收获很多...</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👍 112</span>
                <span>💬 34</span>
                <span>👁 789</span>
              </div>
            </div>
          </div>
        </div>

        {/* 我的课程页面 */}
        <div className={`${activePage === 'courses-page' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewCourseDetail('3230900')}
            >
              <div className="mb-3">
                <h3 className="font-bold text-lg mb-1">3230900 - 政治学原理</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 2024秋季</span>
                  <span>📚 3 学分</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-yellow-500 flex items-center">
                    <span className="text-lg">⭐</span> 4.3
                  </span>
                  <span className="text-gray-500 text-sm">156 条测评</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button 
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewCourseDetail('3230900');
                  }}
                >
                  查看课程
                </button>
                <button 
                  className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewMyReview('3230900');
                  }}
                >
                  我的测评
                </button>
              </div>
            </div>

            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewCourseDetail('1233170')}
            >
              <div className="mb-3">
                <h3 className="font-bold text-lg mb-1">1233170 - 地震概论</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 2024秋季</span>
                  <span>📚 2 学分</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-yellow-500 flex items-center">
                    <span className="text-lg">⭐</span> 4.1
                  </span>
                  <span className="text-gray-500 text-sm">142 条测评</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button 
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewCourseDetail('1233170');
                  }}
                >
                  查看课程
                </button>
                <button 
                  className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewMyReview('1233170');
                  }}
                >
                  我的测评
                </button>
              </div>
            </div>

            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewCourseDetail('2939991')}
            >
              <div className="mb-3">
                <h3 className="font-bold text-lg mb-1">2939991 - 英美侵权法</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 2024春季</span>
                  <span>📚 2 学分</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-yellow-500 flex items-center">
                    <span className="text-lg">⭐</span> 4.5
                  </span>
                  <span className="text-gray-500 text-sm">178 条测评</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button 
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewCourseDetail('2939991');
                  }}
                >
                  查看课程
                </button>
                <button 
                  className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewMyReview('2939991');
                  }}
                >
                  我的测评
                </button>
              </div>
            </div>

            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewCourseDetail('2039130')}
            >
              <div className="mb-3">
                <h3 className="font-bold text-lg mb-1">2039130 - 民俗研究</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 2024春季</span>
                  <span>📚 2 学分</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-yellow-500 flex items-center">
                    <span className="text-lg">⭐</span> 3.8
                  </span>
                  <span className="text-gray-500 text-sm">89 条测评</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button 
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewCourseDetail('2039130');
                  }}
                >
                  查看课程
                </button>
                <button 
                  className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm border border-blue-600 text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    writeReview('2039130');
                  }}
                >
                  写测评
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 我的评论页面 */}
        <div className={`${activePage === 'comments-page' ? 'block' : 'hidden'}`}>
          <div className="space-y-4">
            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewCommentSource('1')}
            >
              <div className="text-sm text-gray-500 mb-2">
                评论了 <span className="text-blue-600">@王同学</span> 的测评 · 2天前
              </div>
              <div className="mb-2">
                <span className="text-gray-400">关于</span>
                <span className="text-blue-600 font-medium">《政治学原理》</span>
              </div>
              <p className="bg-gray-50 p-4 rounded-lg mb-3 text-gray-700">
                说得太对了！我也是这学期选的这门课，作业确实多但是收获很大。期末考试建议多刷题。
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👍 12 点赞</span>
                <span>💬 3 回复</span>
              </div>
            </div>

            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewCommentSource('2')}
            >
              <div className="text-sm text-gray-500 mb-2">
                评论了 <span className="text-blue-600">@张老师的学生</span> 的测评 · 4天前
              </div>
              <div className="mb-2">
                <span className="text-gray-400">关于</span>
                <span className="text-blue-600 font-medium">《音乐与数学》</span>
              </div>
              <p className="bg-gray-50 p-4 rounded-lg mb-3 text-gray-700">
                请问这门课的难度大吗？需要提前准备什么吗？
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👍 5 点赞</span>
                <span>💬 1 回复</span>
              </div>
            </div>
          </div>
        </div>

        {/* 收藏页面 */}
        <div className={`${activePage === 'favorites-page' ? 'block' : 'hidden'}`}>
          <div className="space-y-4">
            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewFavoriteReview('1')}
            >
              <div className="flex gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" 
                  alt="用户头像" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className="font-bold">momo1号</span>
                      <span className="text-gray-500 text-sm ml-2">· 2024年11月10日</span>
                    </div>
                    <div className="text-blue-600 font-bold">4.8</div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">数据结构与算法 - 值得推荐</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    非常推荐这门课！虽然作业量确实比较大，但是每次作业都能学到很多东西...
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>👍 156</span>
                    <span>💬 32</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewFavoriteReview('2')}
            >
              <div className="flex gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" 
                  alt="用户头像" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className="font-bold">我不是momo</span>
                      <span className="text-gray-500 text-sm ml-2">· 2024年11月8日</span>
                    </div>
                    <div className="text-blue-600 font-bold">4.6</div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">哲学导论 - 思维训练的好课</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    这门课让我学会了批判性思考，老师引导很好...
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>👍 98</span>
                    <span>💬 27</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;