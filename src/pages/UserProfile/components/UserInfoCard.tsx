import { FileText, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface UserInfoCardProps {
  author: {
    id: string;
    avatar: string;
    nickname: string;
    reviewCount: number;
    courseGrade: string;
  };
}

export function UserInfoCard({ author }: UserInfoCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
      <div className="text-center mb-6">
        <div className="mb-4 flex justify-center">
          <ImageWithFallback
            src={author.avatar}
            alt={author.nickname}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
          />
        </div>
        <h3 className="text-gray-900 mb-1">{author.nickname}</h3>
      </div>

      <div className="space-y-4 border-t border-gray-200 pt-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-gray-500 mb-1">已发布测评</div>
            <div className="text-gray-900">{author.reviewCount} 条</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-gray-500 mb-1">本课程成绩</div>
            <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-lg">
              {author.courseGrade}
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        查看主页
      </button>
    </div>
  );
}