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
    id: '430171', // 课程号
    courseName: '人类生存发展与核科学',
    rating: 4,
    comment: '课程内容非常容易理解，文科生也没太大理解难度。任务量小，可以刷分，挺难选的但据说补退选能蹲到。缺IV类通选的同学可冲！',
    timestamp: '刚刚',
    isAnonymous: true
  },
  {
    id: '1630079',
    courseName: '心理学导论',
    rating: 4,
    comment: '课程知识密度极大，完全舍不得玩手机，全程着急记笔记。老师的措辞、语速、逻辑都让人极度舒适。',
    timestamp: '2小时前',
    isAnonymous: true
  },
  {
    id: '1339180',
    courseName: '世界文化地理',
    rating: 4,
    comment: '自然地理部分是高中地理知识，人文地理部分也不会太学术，对高中选科地理的同学相当友好。给分状况好，在四类通识课里选就完事。',
    timestamp: '3小时前',
    isAnonymous: true
  },
  {
    id: '3230020',
    courseName: '政治学原理',
    rating: 5,
    comment: '伟大无需多言，mx老师yyds！内容涉及个人、集体、社会、国家、国际等多个话题，讲述基础理论和现实案例，关注时政和热点问题。',
    timestamp: '1天前',
    isAnonymous: true
  },
  {
    id: '2838360',
    courseName: '微观经济学',
    rating: 5,
    comment: '老师人美心善，课程深入浅出，值得一选。和nsd中微对比可以感受到老师真的很用心在打磨课堂内容，有很多有趣的小例子。',
    timestamp: '1天前',
    isAnonymous: true
  },
  {
    id: '2939991',
    courseName: '英美侵权法',
    rating: 5,
    comment: '老师讲案例会很有意思，助教和老师人很好。任务量超小，是既可以刷分也可以对侵权法有不少了解的好课。最后还是要夸夸超nice的老师和助教学长！',
    timestamp: '2天前',
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