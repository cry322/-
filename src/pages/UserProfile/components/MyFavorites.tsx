import { Star, Eye, ThumbsUp, Calendar, Bookmark } from "lucide-react";

interface Favorite {
  id: string;
  type: "review" | "course";
  courseCode: string;
  courseName: string;
  author?: string;
  rating?: number;
  excerpt?: string;
  addedTime: string;
  views?: number;
  likes?: number;
  avgRating?: number;
  reviewCount?: number;
}

const mockFavorites: Favorite[] = [
  {
    id: "1",
    type: "review",
    courseCode: "6232000",
    courseName: "经济学原理",
    author: "经济学爱好者",
    rating: 4.8,
    excerpt: "是经济学的入门课程，课上案例丰富有趣，理论也讲解的很容易理解，课上氛围比较好，能够带动思考...",
    addedTime: "2024-11-28T10:30:00",
    views: 3245,
    likes: 456,
  },
  {
    id: "2",
    type: "course",
    courseCode: "2131580",
    courseName: "中美关系史",
    addedTime: "2024-11-25T14:20:00",
    avgRating: 4.3,
    reviewCount: 89,
  },
  {
    id: "3",
    type: "review",
    courseCode: "3034040",
    courseName: "数据科学导论",
    author: "数学达人",
    rating: 4.5,
    excerpt: "这门课对计算机专业学生很重要，老师讲得很好，配合习题集效果显著...",
    addedTime: "2024-11-20T09:15:00",
    views: 1567,
    likes: 234,
  },
  {
    id: "4",
    type: "course",
    courseCode: "4330688",
    courseName: "艺术与审美",
    addedTime: "2024-11-18T16:45:00",
    avgRating: 4.6,
    reviewCount: 67,
  },
  {
    id: "5",
    type: "review",
    courseCode: "2432161",
    courseName: "社会科学定量方法",
    author: "AAA小王",
    rating: 4.7,
    excerpt: "非常硬核的一门课，深入理解了定量的核心概念和步骤。课程项目很有实践价值...",
    addedTime: "2024-11-15T11:00:00",
    views: 2134,
    likes: 312,
  },
];

export function MyFavorites() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {mockFavorites.map((favorite) => (
        <div
          key={favorite.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    favorite.type === "review"
                      ? "bg-purple-50 text-purple-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {favorite.type === "review" ? "测评" : "课程"}
                </span>
                <h3 className="text-gray-900">
                  {favorite.courseCode} - {favorite.courseName}
                </h3>
              </div>

              {favorite.type === "review" ? (
                <>
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                    <span>作者：{favorite.author}</span>
                    <span>·</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-gray-700">{favorite.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{favorite.excerpt}</p>
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {favorite.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {favorite.likes}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-gray-700">
                        {favorite.avgRating?.toFixed(1)}
                      </span>
                    </div>
                    <span>{favorite.reviewCount} 条测评</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    查看课程
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col items-end gap-2 ml-4">
              <button className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors">
                <Bookmark className="w-5 h-5 fill-current" />
              </button>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(favorite.addedTime)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
