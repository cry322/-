import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ReviewDetailPage.css';
import reviewData from './review_data.json';

// 定义数据类型
interface ReviewData {
  id: number;
  courseId: string;
  courseName: string;
  teacher: string;
  semester: string;
  overallScore: number;
  taskLoad: number;
  difficulty: number;
  grading: number;
  teaching: number;
  harvest: number;
  content: string;
  fullContent: string;
  scoreRange: string;
}

interface CourseData {
  id: number;
  courseId: string;
  name: string;
  department: string;
  credits: number;
  category: string;
  subCategory: string;
  type: string;
  semester: string;
  assessment: string;
}

interface FullCourseData {
  course: CourseData;
  teachers: any[];
  reviews: ReviewData[];
}

// Use shared global declaration in custom.d.ts; no local augmentation here.

const ReviewDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [echartsLoaded, setEchartsLoaded] = useState(false);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  
  // 数据状态
  const [review, setReview] = useState<ReviewData | null>(null);
  const [course, setCourse] = useState<CourseData | null>(null);

  // 根据ID加载数据
  useEffect(() => {
    if (id) {
      const reviewId = parseInt(id);
      
      // 遍历所有课程数据
      for (const courseItem of reviewData as FullCourseData[]) {
        // 查找匹配的测评
        const foundReview = courseItem.reviews.find(r => r.id === reviewId);
        if (foundReview) {
          setReview(foundReview);
          setCourse(courseItem.course);
          break;
        }
      }
    }
  }, [id]);

  // 动态加载 ECharts
  useEffect(() => {
    const loadECharts = async () => {
      try {
        if (typeof window !== 'undefined' && typeof window.echarts !== 'undefined') {
          setEchartsLoaded(true);
          return;
        }

        const echartsModule = await import('echarts');
        const echarts = (echartsModule as any).default || echartsModule;
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
    if (!echartsLoaded || !chartRef.current || !review) return;

    const myChart = window.echarts.init(chartRef.current);

    // 使用实际评分数据
    const radarValues = [
      review.taskLoad,
      review.grading,
      review.harvest,
      review.difficulty,
      review.teaching
    ];

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
          value: radarValues,
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
        formatter: function(params: any) {
          if (params.componentSubType === 'radar') {
            return params.name + ': ' + params.value[params.axisIndex];
          }
          return '';
        }
      }
    };

    // 这里直接断言为 any，避免与 ECharts 类型定义的细节冲突
    myChart.setOption(option as any);

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
  }, [echartsLoaded, review]);

  // 创建星星评分组件
  const renderStars = (rating: number) => {
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

  // 处理回复按钮点击
  const handleReplyClick = (commentId: number) => {
    setReplyToCommentId(commentId);
    setShowReplyInput(true);
  };

  // 处理回复提交
  const handleReplySubmit = () => {
    if (replyText.trim() === '') return;
    
    console.log(`回复评论 ${replyToCommentId}: ${replyText}`);
    
    setReplyText('');
    setShowReplyInput(false);
    setReplyToCommentId(null);
  };

  // 评论数据
  const comments = [
    {
      id: 1,
      name: '我怎么吃不饱',
      date: '2025-11-16',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangxiaohong',
      content: '我也上过这门课，确实很棒！学到了很多东西。',
      likes: 12,
      replies: []
    },
    {
      id: 2,
      name: 'momo',
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
      date: '2025-10-17',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenghao2',
      content: '请问平时作业和课堂内容关联度大吗？我在考虑下学期是否选这门课。',
      likes: 8,
      replies: []
    },
    {
      id: 4,
      name: 'momo',
      date: '2025-08-18',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liufang',
      content: '考试知识量确实比较大，但收获也很大。建议参考《心理学与生活》这本书。',
      likes: 5,
      replies: []
    }
  ];

  // 标签数据（可以根据评分动态生成）
  const generateTags = () => {
    const tags = [];
    if (!review) return ['理论深入', '不考勤', '讲课生动', '论文要求高'];
    
    if (review.taskLoad <= 2) tags.push('任务量少');
    if (review.grading >= 4) tags.push('给分友好');
    if (review.harvest >= 4) tags.push('收获大');
    if (review.teaching >= 4) tags.push('讲课生动');
    
    if (review.fullContent.includes('论文')) tags.push('论文要求');
    if (review.fullContent.includes('考试')) tags.push('考试');
    if (review.fullContent.includes('签到')) tags.push('考勤');
    if (review.fullContent.includes('pre') || review.fullContent.includes('展示')) tags.push('有展示');
    
    if (tags.length < 4) {
      return [...tags, '理论深入', '课程充实'];
    }
    return tags.slice(0, 4);
  };

  const tags = generateTags();

  // 如果数据还在加载中，显示加载状态
  if (!review || !course) {
    return (
      <div className="review-detail-container">
        <div className="main-content">
          <div className="review-card">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <div className="loading-text">加载测评中...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="review-detail-container">
      <div className="main-content">
        <div className="review-card">
          {/* 顶部课程信息 */}
          <div className="course-info">
            <h1 className="course-title">{course.name}</h1>
            <div className="course-meta">
              <div className="meta-item">
                <span className="meta-icon">#</span>
                <span>{course.courseId}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">👨‍🏫</span>
                <span>{review.teacher}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🏫</span>
                <span>{course.department}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span>{review.semester || course.semester}</span>
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
                <div className="author-stats">已发布12篇测评</div>
              </div>
            </div>
            <div className="review-meta">
              <div className="review-date">{review.semester}</div>
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
                <div className="rating-score">{review.overallScore.toFixed(1)}</div>
                <div className="rating-stars">
                  {renderStars(review.overallScore)}
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
            <h2 className="review-title">
              {review.content.split('\n')[0].length > 25 
                ? review.content.split('\n')[0].slice(0, 25) + '...'
                : review.content.split('\n')[0]
              }
            </h2>
            <div className="review-text">
              {review.fullContent.split('\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
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
                        <span className="comment-date">{comment.date}</span>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                      <div className="comment-actions">
                        <button className="comment-action-btn">
                          <span className="action-icon">👍</span>
                          <span>{comment.likes}</span>
                        </button>
                        <button
                          className="comment-action-btn reply-btn"
                          onClick={() => handleReplyClick(comment.id)}
                        >
                          回复
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 回复输入框（当点击回复时显示） */}
                  {replyToCommentId === comment.id && showReplyInput && (
                    <div className="reply-input-container">
                      <div className="reply-input-wrapper">
                        <input
                          type="text"
                          className="reply-input"
                          placeholder={`回复${comment.name}...`}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          autoFocus
                        />
                        <div className="reply-input-actions">
                          <button
                            className="reply-cancel-btn"
                            onClick={() => {
                              setShowReplyInput(false);
                              setReplyToCommentId(null);
                              setReplyText('');
                            }}
                          >
                            取消
                          </button>
                          <button
                            className="reply-submit-btn"
                            onClick={handleReplySubmit}
                            disabled={!replyText.trim()}
                          >
                            发送
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 回复列表 */}
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
                                <button
                                  className="reply-action-btn reply-btn"
                                  onClick={() => handleReplyClick(comment.id)}
                                >
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