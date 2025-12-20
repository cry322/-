import { useEffect, useRef, useState } from 'react';
import './ReviewDetailPage.css'; // 创建对应的 CSS 文件

const ReviewDetailPage = () => {
  const chartRef = useRef(null);
  const [echartsLoaded, setEchartsLoaded] = useState(false);

  // 动态加载 ECharts
  useEffect(() => {
    const loadECharts = async () => {
      try {
        // 如果已经全局加载了 ECharts，可以直接使用
        if (typeof window.echarts !== 'undefined') {
          setEchartsLoaded(true);
          return;
        }

        // 动态导入 ECharts
        const echarts = await import('echarts');
        window.echarts = echarts;
        setEchartsLoaded(true);
      } catch (error) {
        console.error('Failed to load ECharts:', error);
      }
    };

    loadECharts();
  }, []);

  // 初始化雷达图
  useEffect(() => {
    if (!echartsLoaded || !chartRef.current) return;

    const myChart = window.echarts.init(chartRef.current);

    const option = {
      radar: {
        indicator: [
          { name: '任务量', max: 5 },
          { name: '给分', max: 5 },
          { name: '收获', max: 5 },
          { name: '难度', max: 5 },
          { name: '听感', max: 5 }
        ],
        radius: '65%',
        axisName: {
          color: '#666',
          fontSize: 12
        }
      },
      series: [{
        type: 'radar',
        data: [{
          value: [4.2, 4.5, 4.8, 3.9, 4.3],
          name: '评分',
          areaStyle: {
            color: 'rgba(24, 144, 255, 0.2)'
          },
          lineStyle: {
            color: '#1890FF',
            width: 2
          },
          symbol: 'circle',
          symbolSize: 6,
          label: {
            show: true,
            formatter: '{c}',
            color: '#1890FF',
            fontSize: 11,
            fontWeight: 'bold'
          }
        }]
      }],
      tooltip: {
        trigger: 'item',
        formatter: function(params:any) {
          if (params.componentSubType === 'radar') {
            return params.name + ': ' + params.value[params.axisIndex];
          }
          return '';
        }
      }
    };

    myChart.setOption(option);

    // 响应窗口大小变化
    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [echartsLoaded]);

  // 创建星星评分组件
  const renderStars = (rating:number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="star-filled">★</span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="star-half">★</span>
        );
      } else {
        stars.push(
          <span key={i} className="star-empty">☆</span>
        );
      }
    }
    return stars;
  };

  // 评论数据
  const comments = [
    {
      id: 1,
      name: '我怎么吃不饱',
      major: '大三',
      date: '2025-11-16',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangxiaohong',
      content: '我也上过这门课，确实很棒！学到了很多东西。',
      likes: 12,
      replies: []
    },
    {
      id: 2,
      name: 'momo',
      major: '',
      date: '2025-11-06',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liming',
      content: '对的！教授上课很有激情。',
      likes: 3,
      replies: [
        {
          id: 2.1,
          name: '浩浩',
          date: '回复momo · 2025-11-07',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenghao',
          content: '完全同意！他的讲课方式让复杂的概念变得很容易理解。',
          likes: 2
        }
      ]
    },
    {
      id: 3,
      name: '土豆饼子',
      major: '大一',
      date: '2025-10-17',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenghao2',
      content: '请问平时作业和课堂内容关联度大吗？我在考虑下学期是否选这门课。',
      likes: 8,
      replies: []
    },
    {
      id: 4,
      name: 'momo',
      major: '大四',
      date: '2025-08-18',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liufang',
      content: '考试知识量确实比较大，但收获也很大。建议参考《心理学与生活》这本书。',
      likes: 5,
      replies: []
    }
  ];

  // 标签数据
  const tags = ['理论深入', '不考勤', '讲课生动', '论文要求高'];

  return (
    <div className="review-detail-container">
      {/* 页眉导航栏 */}
      <header className="review-header">
        <div className="header-content">
          <div className="header-logo">
            <span className="logo-text" style={{ fontFamily: 'SourceHanSerif', fontWeight: 700 }}>
              选课宝典
            </span>
          </div>
          <div className="header-actions">
            <button className="icon-button">
              <span className="icon">🔔</span>
              <span className="notification-dot"></span>
            </button>
            <button className="icon-button">
              <span className="icon">👤</span>
            </button>
          </div>
        </div>
      </header>

      {/* 面包屑导航 */}
      <nav className="breadcrumb-nav">
        <div className="breadcrumb-content">
          <a href="#" className="breadcrumb-link">通识课</a>
          <span className="breadcrumb-separator">/</span>
          <a href="#" className="breadcrumb-link">通识核心课</a>
          <span className="breadcrumb-separator">/</span>
          <a href="#" className="breadcrumb-link">心理学导论</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">测评</span>
        </div>
      </nav>

      <div className="main-content">
        <div className="review-card">
          {/* 顶部课程信息 */}
          <div className="course-info">
            <h1 className="course-title">心理学导论</h1>
            <div className="course-meta">
              <div className="meta-item">
                <span className="meta-icon">#</span>
                <span>1630079</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">👨‍🏫</span>
                <span>毛利华</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🏫</span>
                <span>心理与认知科学学院</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span>2025春季</span>
              </div>
            </div>
          </div>

          {/* 用户评价头部 */}
          <div className="review-header-section">
            <div className="review-author">
              <img 
                src="https://modao.cc/agent-py/media/user_assets/2025-12-08/b207d33584f1439cab96158416be60ec.jpeg" 
                alt="User avatar" 
                className="author-avatar"
              />
              <div className="author-info">
                <div className="author-name">我怎么睡不醒</div>
                <div className="author-details">本科二年级 · 历史学系</div>
                <div className="author-stats">已发布12篇测评</div>
              </div>
            </div>
            <div className="review-meta">
              <div className="review-date">2025-8-15</div>
              <div className="review-views">
                <span className="view-icon">👁️</span>
                <span>1240次浏览</span>
              </div>
            </div>
          </div>

          {/* 评分区域 */}
          <div className="rating-section">
            <div className="rating-content">
              <div className="overall-rating">
                <div className="rating-score">4.5</div>
                <div className="rating-stars">
                  {renderStars(4.5)}
                </div>
                <div className="rating-label">综合评分</div>
              </div>
              
              {/* 雷达图容器 */}
              <div 
                ref={chartRef} 
                className="radar-chart" 
                style={{ width: '224px', height: '224px' }}
              />
            </div>
          </div>

          {/* 评价正文 */}
          <div className="review-content">
            <h2 className="review-title">非常优秀的心理学入门课程</h2>
            <div className="review-text">
              <p>
                毛利华老师的授课水平很高，既幽默风趣又深挚真诚，尽管经常拖堂几分钟到十几分钟不等，但也让人十分陶醉。这是dz大一下学期听得最认真也是最投入的好课，但却也是得分断档最低的（）。<br/><br/>
                课程有两次课堂作业（35%），一次被试（5%），白送考勤分数（10%）和期末考试（50%），尽管dz上课听得很认真，并且对于课上讲的东西自认为是基本完全吸收了，但是期末考的核心概念（163个）之中有约60%在课上并没有提到或者讲得很少，所以这也是一门教考分离比较严重的课（推荐阅读书目《心理学与生活》中确实都有这些概念，但是老师讲的章节里这些内容也并非都是重点，所以都列入期末考范围会造成一定的复习压力）。另外平时作业分dz得的很低，完成的态度是比较认真的，感觉也有自己的见解，可能是需要卷一下形式和字数，dz没有注意，算是交了学费。不同于一般交了作业就至少能得80-90%分数的课，心导的作业可能区分度还比较大，这一点想要得高分的同学要注意，可以做得更有创意或者写成规范完整的论文形式。<br/><br/>
                期末考的难度比较适中，能够忠实地反映复习情况而不是平时学习情况，dz考前看错了考试时间，复习比较仓促，感觉至少要两到三天的时间集中突击才能得到比较好的分数。<br/><br/>
                因此心导从内容上是一门实打实的超级好课，但是如果想要靠它刷分可能有些难度，因为期末复习的压力不小，平时也要注意作业完成的情况。<br/><br/>
                总之，还是非常非常推荐心导这门课程的，毛利华老师的确非常有魅力！尽管在通识里面可能不是给分最好的，但选择通识课的主要目的不就是为了拓展自己的知识边界吗？
              </p>
            </div>
          </div>

          {/* 标签与互动区 */}
          <div className="tags-interaction-section">
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="interaction-buttons">
              <button className="interaction-btn like-btn">
                <span className="btn-icon">👍</span>
                <span>有用(156)</span>
              </button>
              <button className="interaction-btn dislike-btn">
                <span className="btn-icon">👎</span>
                <span>没用(1)</span>
              </button>
              <button className="interaction-btn bookmark-btn">
                <span className="btn-icon">🔖</span>
                <span>收藏</span>
              </button>
            </div>
          </div>

          {/* 评论区 */}
          <div className="comments-section">
            <h3 className="comments-title">全部评论(4)</h3>
            
            {/* 评论输入框 */}
            <div className="comment-input-container">
              <input 
                type="text" 
                className="comment-input" 
                placeholder="写下你的评论..." 
              />
              <button className="comment-submit-btn">发表评论</button>
            </div>

            {/* 评论列表 */}
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <img 
                      src={comment.avatar} 
                      alt={`${comment.name}头像`} 
                      className="comment-avatar"
                    />
                    <div className="comment-info">
                      <div className="comment-meta">
                        <span className="comment-name">{comment.name}</span>
                        {comment.major && (
                          <span className="comment-major">{comment.major}</span>
                        )}
                        <span className="comment-date">{comment.date}</span>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                      <div className="comment-actions">
                        <button className="comment-action-btn">
                          <span className="action-icon">👍</span>
                          <span>{comment.likes}</span>
                        </button>
                        <button className="comment-action-btn reply-btn">
                          回复
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 回复 */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="replies-container">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="reply-item">
                          <div className="reply-header">
                            <img 
                              src={reply.avatar} 
                              alt={`${reply.name}头像`} 
                              className="reply-avatar"
                            />
                            <div className="reply-info">
                              <div className="reply-meta">
                                <span className="reply-name">{reply.name}</span>
                                <span className="reply-date">{reply.date}</span>
                              </div>
                              <p className="reply-content">{reply.content}</p>
                              <div className="reply-actions">
                                <button className="reply-action-btn">
                                  <span className="action-icon">👍</span>
                                  <span>{reply.likes}</span>
                                </button>
                                <button className="reply-action-btn reply-btn">
                                  回复
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailPage;