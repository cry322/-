import { useEffect, useState } from 'react';
import { Star, Clock, User } from 'lucide-react';
import { Link } from "react-router-dom";

interface Review {
  id: string;
  courseName: string;
  rating: number;
  comment: string;
  timestamp: string;
  isAnonymous: boolean;
  userName?: string;
}

const reviews: Review[] = [
  {
    id: '1',
    courseName: '数据结构与算法',
    rating: 5,
    comment: '张教授讲课非常清晰，作业量适中，考试题目公平，强烈推荐！',
    timestamp: '5分钟前',
    isAnonymous: false,
    userName: '李同学'
  },
  {
    id: '2',
    courseName: '微观经济学',
    rating: 4,
    comment: '课程内容丰富，案例分析很有趣，但是考试题目有点难。',
    timestamp: '12分钟前',
    isAnonymous: true
  },
  {
    id: '3',
    courseName: '操作系统原理',
    rating: 5,
    comment: '陈教授的课程设计很合理，实验项目很有挑战性，学到了很多实际技能。',
    timestamp: '23分钟前',
    isAnonymous: false,
    userName: '王同学'
  },
  {
    id: '4',
    courseName: '大学英语(3)',
    rating: 4,
    comment: '赵老师人很好，课堂互动多，对口语提升帮助很大。',
    timestamp: '35分钟前',
    isAnonymous: true
  },
  {
    id: '5',
    courseName: '高等数学 A(1)',
    rating: 3,
    comment: '作业量比较大，但是老师讲解很详细，需要花时间消化。',
    timestamp: '1小时前',
    isAnonymous: false,
    userName: '张同学'
  }
];

export function LatestReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">实时更新中...</span>
          <div className="flex gap-1">
            {reviews.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {getVisibleReviews().map((review) => (
          <Link 
            to={`/reviews/${review.id}`} 
            key={review.id}
            className="block"
          >
            <div className="p-5 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                {/* 用户头像 */}
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>

                {/* 评价内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-900">
                      {review.isAnonymous ? '匿名用户' : review.userName}
                    </span>
                    <span className="text-gray-400">评价了</span>
                    <span className="text-blue-600">{review.courseName}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-2 line-clamp-2">
                    {review.comment}
                  </p>

                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{review.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
        <Link 
          to="/reviews"  // 跳转到测评库页面
          className="inline-block text-blue-600 hover:text-blue-700 transition-colors font-medium"
        >
          查看全部评价 →
        </Link>
      </div>
    </div>
  );
}