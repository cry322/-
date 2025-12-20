import { useState } from "react";
import { Bell, Settings, Edit, Mail } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { MessageBox } from "./MessageBox";
import { MyReviews } from "./MyReviews";
import { MyCourses } from "./MyCourses";
import { MyComments } from "./MyComments";
import { MyFavorites } from "./MyFavorites";

// 模拟用户数据
const mockUser = {
  id: "user123",
  avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0NTgxODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  nickname: "kiki",
  bio: "热爱学习，乐于分享课程体验。希望通过我的测评帮助大家选到合适的课程！",
  stats: {
    reviews: 3,
    courses: 5,
    comments: 4,
    favorites: 5,
  },
  unreadMessages: 3,
};

type TabType = "reviews" | "courses" | "comments" | "favorites";

export function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("reviews");
  const [showMessageBox, setShowMessageBox] = useState(false);

  const tabs = [
    { id: "reviews" as TabType, label: "我的测评", count: mockUser.stats.reviews },
    { id: "courses" as TabType, label: "我的课程", count: mockUser.stats.courses },
    { id: "comments" as TabType, label: "我的评论", count: mockUser.stats.comments },
    { id: "favorites" as TabType, label: "收藏", count: mockUser.stats.favorites },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-gray-900">个人主页</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMessageBox(true)}
                className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                消息
                {mockUser.unreadMessages > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                    {mockUser.unreadMessages}
                  </span>
                )}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                设置
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 用户信息区域 */}
      <ProfileHeader user={mockUser} />

      {/* Tab 导航 */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "reviews" && <MyReviews />}
        {activeTab === "courses" && <MyCourses />}
        {activeTab === "comments" && <MyComments />}
        {activeTab === "favorites" && <MyFavorites />}
      </div>

      {/* 消息箱弹出框 */}
      {showMessageBox && (
        <MessageBox
          onClose={() => setShowMessageBox(false)}
          unreadCount={mockUser.unreadMessages}
        />
      )}
    </div>
  );
}