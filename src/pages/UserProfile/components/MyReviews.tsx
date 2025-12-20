import { Eye, ThumbsUp, MessageCircle, Edit, Trash2 } from "lucide-react";

interface Review {
  id: string;
  courseCode: string;
  courseName: string;
  rating: number;
  excerpt: string;
  publishTime: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
}

const mockReviews: Review[] = [
  {
    id: "1",
    courseCode: "3230900",
    courseName: "政治学原理",
    rating: 4.5,
    excerpt: "这门课是我大二上学期选的，整体体验非常好。老师讲课思路清晰，PPT 制作精良...",
    publishTime: "2024-11-15T10:30:00",
    views: 1847,
    likes: 234,
    comments: 45,
    tags: ["作业多", "收获大", "老师认真"],
  },
  {
    id: "2",
    courseCode: "2939991",
    courseName: "英美侵权法",
    rating: 4.2,
    excerpt: "课程内容丰富，涵盖了侵权法的各个方面。老师讲解细致，配合案例效果很好...",
    publishTime: "2024-11-08T14:20:00",
    views: 1234,
    likes: 189,
    comments: 32,
    tags: ["实践性强", "考试难度适中"],
  },
  {
    id: "3",
    courseCode: "2039130",
    courseName: "民俗研究",
    rating: 4.8,
    excerpt: "非常推荐的一门课！通过这门课深入理解了等信仰、游艺、集体性核心概念...",
    publishTime: "2024-10-25T09:15:00",
    views: 2156,
    likes: 312,
    comments: 67,
    tags: ["硬核", "收获巨大", "推荐"],
  },
];

export function MyReviews() {
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
      {mockReviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-gray-900">
                  {review.courseCode} - {review.courseName}
                </h3>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm">
                  {review.rating.toFixed(1)} 分
                </span>
              </div>
              <p className="text-gray-600 mb-3">{review.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {review.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6 text-gray-500 text-sm">
                <span>{formatDate(review.publishTime)}</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {review.views}
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {review.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {review.comments}
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
