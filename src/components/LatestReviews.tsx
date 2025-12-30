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
    id: '1', // 测评id
    courseName: '微观经济学',
    rating: 5,
    comment: '老师人美心善，课程深入浅出，值得一选。课程内容：先进行引入，接下来依次推进消费者理论、风险理论、生...',
    timestamp: '刚刚',
    isAnonymous: true
  },
  {
    id: '2',
    courseName: '民主的历史与现实',
    rating: 4,
    comment: '这门课是国际关系学院的专业课，也是二类通识核心课。课程内容就是民主的历史与现实，包括早期民主、代议...',
    timestamp: '2小时前',
    isAnonymous: true
  },
  {
    id: '3',
    courseName: '世界文化地理',
    rating: 4,
    comment: '【课程任务】有一定数量的考勤，但任务量很小。每节课后会在教学网上发布10道对应的课程习题（填空和...',
    timestamp: '3小时前',
    isAnonymous: true
  },
  {
    id: '4',
    courseName: '日本经济',
    rating: 4,
    comment: '【课程任务】记忆中似乎只有期中考试和期末考试，期中闭卷期末开卷，主要都是课上讲的知识，考察相对会比...',
    timestamp: '1天前',
    isAnonymous: true
  },
  {
    id: '5',
    courseName: '美索不达米亚艺术与文明',
    rating: 4,
    comment: '【课程任务】20%课堂考勤+60%图录作业+20%期末开卷考试。暑校的课堂考勤还是比较频繁的，七天大...',
    timestamp: '1天前',
    isAnonymous: true
  },
  {
    id: '6',
    courseName: '大学国文',
    rating: 3,
    comment: '【考核方式】：0.4的作业（两个老师分别一次作业）0.6的期末考试 【课堂】：dz每节课都去，但没怎么...',
    timestamp: '2天前',
    isAnonymous: true
  },
  {
    id: '7',
    courseName: '心理学导论',
    rating: 4,
    comment: '【心理学导论】心导 毛利华 mlh dz得分【90，95】 通识课，两学分 【考核方式】：0.05被试（参加...',
    timestamp: '3天前',
    isAnonymous: true
  },
  {
    id: '8',
    courseName: '心理学导论',
    rating: 4,
    comment: '心理学导论/心导 毛利华 mlh 得分：【80,85） 一门从标题上看就非常有趣的好课。毛利华老师的授课...',
    timestamp: '3天前',
    isAnonymous: true
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