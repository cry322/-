import { useState, MouseEvent } from 'react';

const UserProfilePage = () => {
  const [activePage, setActivePage] = useState<string>('reviews-page');

  // 显示指定页面
  const showPage = (pageId: string) => {
    setActivePage(pageId);
  };

  // 查看测评详情
  const viewReviewDetail = (reviewId: string) => {
    alert(`跳转到测评详情页面，测评ID: ${reviewId}`);
    // 实际应用中这里应该跳转到测评详情页
    // window.location.href = `/review-detail.html?id=${reviewId}`;
  };

  // 查看课程详情
  const viewCourseDetail = (courseCode: string) => {
    alert(`跳转到课程详情页面，课程代码: ${courseCode}`);
    // 实际应用中这里应该跳转到课程详情页
    // window.location.href = `/course-detail.html?code=${courseCode}`;
  };

  // 查看我的测评
  const viewMyReview = (courseCode: string) => {
    alert(`查看我在课程 ${courseCode} 的测评`);
    // 实际应用中这里可以跳转到对应的测评页面
  };

  // 写测评
  const writeReview = (courseCode: string) => {
    alert(`为课程 ${courseCode} 写测评`);
    // 实际应用中这里应该跳转到写测评页面
    // window.location.href = `/write-review.html?course=${courseCode}`;
  };

  // 查看评论来源
  const viewCommentSource = (commentId: string) => {
    alert(`跳转到评论所在的测评页面，评论ID: ${commentId}`);
    // 实际应用中这里应该跳转到包含该评论的测评详情页
  };

  // 查看收藏的测评
  const viewFavoriteReview = (reviewId: string) => {
    alert(`查看收藏的测评详情，测评ID: ${reviewId}`);
    // 实际应用中这里应该跳转到测评详情页
  };

  // 防止事件冒泡
  const stopPropagation = (
    e: MouseEvent<HTMLButtonElement>, 
    callback: (...args: any[]) => void, 
    ...args: any[]
  ) => {
    e.stopPropagation();
    callback(...args);
  };

  return (
    <div className="user-profile-page">
      {/* 内联样式作为字符串嵌入 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .user-profile-page {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f9fafb;
            color: #1f2937;
            line-height: 1.6;
            padding: 20px;
          }

          /* 容器和布局 */
          .container {
            max-width: 1280px;
            margin: 0 auto;
          }

          .grid {
            display: grid;
            gap: 1.5rem;
          }

          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

          .flex { display: flex; }
          .flex-col { flex-direction: column; }
          .items-center { align-items: center; }
          .justify-between { justify-content: space-between; }
          .gap-1 { gap: 0.25rem; }
          .gap-2 { gap: 0.5rem; }
          .gap-3 { gap: 0.75rem; }
          .gap-4 { gap: 1rem; }
          .gap-6 { gap: 1.5rem; }

          /* 按钮 */
          .btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
          }

          .btn-primary {
            background: #2563eb;
            color: white;
          }

          .btn-primary:hover {
            background: #1d4ed8;
          }

          .btn-secondary {
            background: white;
            color: #4b5563;
            border: 1px solid #d1d5db;
          }

          .btn-secondary:hover {
            background: #f3f4f6;
          }

          .btn-outline {
            background: transparent;
            color: #2563eb;
            border: 1px solid #2563eb;
          }

          .btn-outline:hover {
            background: #eff6ff;
          }

          /* 卡片 */
          .card {
            background: white;
            border-radius: 0.75rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
            transition: box-shadow 0.2s;
          }

          .card:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          /* 标签 */
          .tag {
            display: inline-flex;
            padding: 0.25rem 0.75rem;
            background: #eff6ff;
            color: #2563eb;
            border-radius: 9999px;
            font-size: 0.875rem;
          }

          /* 头像 */
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }

          .avatar-lg {
            width: 80px;
            height: 80px;
          }

          /* 工具类 */
          .hidden { display: none; }
          .text-center { text-align: center; }
          .text-sm { font-size: 0.875rem; }
          .text-xs { font-size: 0.75rem; }
          .font-bold { font-weight: 700; }
          .text-gray-500 { color: #6b7280; }
          .text-gray-600 { color: #4b5563; }
          .text-gray-700 { color: #374151; }
          .text-blue-600 { color: #2563eb; }
          .bg-gray-50 { background: #f9fafb; }
          .rounded { border-radius: 0.5rem; }
          .rounded-lg { border-radius: 0.75rem; }
          .p-4 { padding: 1rem; }
          .p-6 { padding: 1.5rem; }
          .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
          .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
          .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mb-4 { margin-bottom: 1rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mt-4 { margin-top: 1rem; }
          .mt-6 { margin-top: 1.5rem; }

          /* 统计卡片 */
          .stat-card {
            text-align: center;
            padding: 1.5rem;
            background: #f3f4f6;
            border-radius: 0.75rem;
          }

          .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: #2563eb;
            margin-bottom: 0.5rem;
          }

          .stat-label {
            color: #6b7280;
          }

          /* Tab 标签页 */
          .tabs {
            display: flex;
            gap: 2rem;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 2rem;
          }

          .tab {
            padding: 1rem 0;
            cursor: pointer;
            color: #6b5563;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-block;
            background: none;
            border: none;
            font-size: 1rem;
            font-family: inherit;
          }

          .tab:hover {
            color: #2563eb;
          }

          .tab.active {
            color: #2563eb;
            border-bottom-color: #2563eb;
          }

          .page {
            display: none;
          }

          .page.active {
            display: block;
          }

          /* 响应式 */
          @media (max-width: 768px) {
            .grid-cols-2,
            .grid-cols-3,
            .grid-cols-4 {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
            
            .tabs {
              flex-wrap: wrap;
              gap: 1rem;
            }
          }

          h1 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
          h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; }
          h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
        `
      }} />

      <div className="container py-8">
        {/* 用户信息卡片 */}
        <div className="card mb-6">
          <div className="flex gap-6">
            <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100" alt="用户头像" className="avatar-lg" />
            <div style={{ flex: 1 }}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="mb-2">kiki</h1>
                </div>
                <button className="btn btn-secondary">编辑资料</button>
              </div>
              <p className="text-gray-700 mb-6">热爱学习，乐于分享课程体验。希望通过我的测评帮助大家选到合适的课程！</p>
              
              {/* 统计数据 */}
              <div className="grid grid-cols-4 gap-4">
                <div className="stat-card">
                  <div className="stat-value">3</div>
                  <div className="stat-label">发布测评</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">5</div>
                  <div className="stat-label">选修课程</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">4</div>
                  <div className="stat-label">发表评论</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">5</div>
                  <div className="stat-label">收藏内容</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 标签页 */}
        <div className="tabs">
          <button 
            className={`tab ${activePage === 'reviews-page' ? 'active' : ''}`} 
            onClick={() => showPage('reviews-page')}
          >
            我的测评 (3)
          </button>
          <button 
            className={`tab ${activePage === 'courses-page' ? 'active' : ''}`} 
            onClick={() => showPage('courses-page')}
          >
            我的课程 (5)
          </button>
          <button 
            className={`tab ${activePage === 'comments-page' ? 'active' : ''}`} 
            onClick={() => showPage('comments-page')}
          >
            我的评论 (4)
          </button>
          <button 
            className={`tab ${activePage === 'favorites-page' ? 'active' : ''}`} 
            onClick={() => showPage('favorites-page')}
          >
            收藏 (5)
          </button>
        </div>

        {/* 我的测评页面 */}
        <div id="reviews-page" className={`page ${activePage === 'reviews-page' ? 'active' : ''}`}>
          <div className="grid grid-cols-1">
            <div className="card mb-4" onClick={() => viewReviewDetail('1')} style={{ cursor: 'pointer' }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="mb-1">政治学原理</h3>
                  <p className="text-sm text-gray-500">3230900 · 2024秋季</p>
                </div>
                <div className="text-blue-600 font-bold">4.3</div>
              </div>
              <p className="text-gray-600 text-sm mb-3">这门课非常有趣，老师讲课生动，能够引发思考...</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👍 89</span>
                <span>💬 23</span>
                <span>👁 567</span>
              </div>
            </div>

            <div className="card mb-4" onClick={() => viewReviewDetail('2')} style={{ cursor: 'pointer' }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="mb-1">地震概论</h3>
                  <p className="text-sm text-gray-500">1233170 · 2024秋季</p>
                </div>
                <div className="text-blue-600 font-bold">4.1</div>
              </div>
              <p className="text-gray-600 text-sm mb-3">轻松愉快的一门课，老师讲解深入浅出...</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👍 67</span>
                <span>💬 18</span>
                <span>👁 423</span>
              </div>
            </div>

            <div className="card mb-4" onClick={() => viewReviewDetail('3')} style={{ cursor: 'pointer' }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="mb-1">英美侵权法</h3>
                  <p className="text-sm text-gray-500">2939991 · 2024春季</p>
                </div>
                <div className="text-blue-600 font-bold">4.5</div>
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
        <div id="courses-page" className={`page ${activePage === 'courses-page' ? 'active' : ''}`}>
          <div className="grid grid-cols-2">
            <div className="card" onClick={() => viewCourseDetail('3230900')} style={{ cursor: 'pointer' }}>
              <div className="mb-3">
                <h3 className="mb-1">3230900 - 政治学原理</h3>
                <div className="flex gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 2024秋季</span>
                  <span>📚 3 学分</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-yellow-500">⭐ 4.3</span>
                  <span className="text-gray-500 text-sm">156 条测评</span>
                </div>
              </div>
              <div className="flex gap-2" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, viewCourseDetail, '3230900')}
                >
                  查看课程
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, viewMyReview, '3230900')}
                >
                  查看我的测评
                </button>
              </div>
            </div>

            <div className="card" onClick={() => viewCourseDetail('1233170')} style={{ cursor: 'pointer' }}>
              <div className="mb-3">
                <h3 className="mb-1">1233170 - 地震概论</h3>
                <div className="flex gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 2024秋季</span>
                  <span>📚 2 学分</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-yellow-500">⭐ 4.1</span>
                  <span className="text-gray-500 text-sm">142 条测评</span>
                </div>
              </div>
              <div className="flex gap-2" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, viewCourseDetail, '1233170')}
                >
                  查看课程
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, viewMyReview, '1233170')}
                >
                  查看我的测评
                </button>
              </div>
            </div>

            <div className="card" onClick={() => viewCourseDetail('2939991')} style={{ cursor: 'pointer' }}>
              <div className="mb-3">
                <h3 className="mb-1">2939991 - 英美侵权法</h3>
                <div className="flex gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 2024春季</span>
                  <span>📚 2 学分</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-yellow-500">⭐ 4.5</span>
                  <span className="text-gray-500 text-sm">178 条测评</span>
                </div>
              </div>
              <div className="flex gap-2" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, viewCourseDetail, '2939991')}
                >
                  查看课程
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, viewMyReview, '2939991')}
                >
                  查看我的测评
                </button>
              </div>
            </div>

            <div className="card" onClick={() => viewCourseDetail('2039130')} style={{ cursor: 'pointer' }}>
              <div className="mb-3">
                <h3 className="mb-1">2039130 - 民俗研究</h3>
                <div className="flex gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 2024春季</span>
                  <span>📚 2 学分</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-yellow-500">⭐ 3.8</span>
                  <span className="text-gray-500 text-sm">89 条测评</span>
                </div>
              </div>
              <div className="flex gap-2" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, viewCourseDetail, '2039130')}
                >
                  查看课程
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, writeReview, '2039130')}
                >
                  写测评
                </button>
              </div>
            </div>

            <div className="card" onClick={() => viewCourseDetail('2930187')} style={{ cursor: 'pointer' }}>
              <div className="mb-3">
                <h3 className="mb-1">2930187 - 中国当代法律与社会</h3>
                <div className="flex gap-4 text-sm text-gray-600 mb-2">
                  <span>📅 2023秋季</span>
                  <span>📚 2 学分</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-yellow-500">⭐ 4.2</span>
                  <span className="text-gray-500 text-sm">134 条测评</span>
                </div>
              </div>
              <div className="flex gap-2" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, viewCourseDetail, '2930187')}
                >
                  查看课程
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ flex: 1 }}
                  onClick={(e) => stopPropagation(e, writeReview, '2930187')}
                >
                  写测评
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 我的评论页面 */}
        <div id="comments-page" className={`page ${activePage === 'comments-page' ? 'active' : ''}`}>
          <div className="grid grid-cols-1">
            <div className="card mb-4" onClick={() => viewCommentSource('1')} style={{ cursor: 'pointer' }}>
              <div className="text-sm text-gray-500 mb-2">
                评论了 <span className="text-blue-600">@王同学</span> 的测评 · 2天前
              </div>
              <div className="mb-2">
                <span className="text-gray-400">关于</span>
                <span className="text-blue-600"> 《政治学原理》</span>
              </div>
              <p className="bg-gray-50 p-4 rounded-lg mb-3 text-gray-700">说得太对了！我也是这学期选的这门课，作业确实多但是收获很大。期末考试建议多刷题。</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👍 12 点赞</span>
                <span>💬 3 回复</span>
              </div>
            </div>

            <div className="card mb-4" onClick={() => viewCommentSource('2')} style={{ cursor: 'pointer' }}>
              <div className="text-sm text-gray-500 mb-2">
                评论了 <span className="text-blue-600">@张老师的学生</span> 的测评 · 4天前
              </div>
              <div className="mb-2">
                <span className="text-gray-400">关于</span>
                <span className="text-blue-600"> 《音乐与数学》</span>
              </div>
              <p className="bg-gray-50 p-4 rounded-lg mb-3 text-gray-700">请问这门课的难度大吗？需要提前准备什么吗？</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>👍 5 点赞</span>
                <span>💬 1 回复</span>
              </div>
            </div>
          </div>
        </div>

        {/* 收藏页面 */}
        <div id="favorites-page" className={`page ${activePage === 'favorites-page' ? 'active' : ''}`}>
          <div className="grid grid-cols-1">
            <div className="card mb-4" onClick={() => viewFavoriteReview('1')} style={{ cursor: 'pointer' }}>
              <div className="flex gap-4">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="用户头像" className="avatar" />
                <div style={{ flex: 1 }}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className="font-bold">momo1号</span>
                      <span className="text-gray-500 text-sm"> · 2024年11月10日</span>
                    </div>
                    <div className="text-blue-600 font-bold">4.8</div>
                  </div>
                  <h3 className="mb-2">数据结构与算法 - 值得推荐</h3>
                  <p className="text-gray-600 text-sm mb-3">非常推荐这门课！虽然作业量确实比较大，但是每次作业都能学到很多东西...</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>👍 156</span>
                    <span>💬 32</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4" onClick={() => viewFavoriteReview('2')} style={{ cursor: 'pointer' }}>
              <div className="flex gap-4">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="用户头像" className="avatar" />
                <div style={{ flex: 1 }}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className="font-bold">我不是momo</span>
                      <span className="text-gray-500 text-sm"> · 2024年11月8日</span>
                    </div>
                    <div className="text-blue-600 font-bold">4.6</div>
                  </div>
                  <h3 className="mb-2">哲学导论 - 思维训练的好课</h3>
                  <p className="text-gray-600 text-sm mb-3">这门课让我学会了批判性思考，老师引导很好...</p>
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