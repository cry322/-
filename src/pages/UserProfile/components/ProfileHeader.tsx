import { Edit, Mail, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProfileHeaderProps {
  user: {
    avatar: string;
    nickname: string;
    bio: string;
    stats: {
      reviews: number;
      courses: number;
      comments: number;
      favorites: number;
    };
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* 头像 */}
          <div className="flex-shrink-0">
            <ImageWithFallback
              src={user.avatar}
              alt={user.nickname}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            />
          </div>

          {/* 用户信息 */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-gray-900 mb-2">{user.nickname}</h1>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                编辑资料
              </button>
            </div>

            {/* 个人简介 */}
            <p className="text-gray-700 mb-6 max-w-2xl">{user.bio}</p>

            {/* 统计数据 */}
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 mb-1">{user.stats.reviews}</div>
                <div className="text-gray-600">发布测评</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 mb-1">{user.stats.courses}</div>
                <div className="text-gray-600">选修课程</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 mb-1">{user.stats.comments}</div>
                <div className="text-gray-600">发表评论</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 mb-1">{user.stats.favorites}</div>
                <div className="text-gray-600">收藏内容</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}