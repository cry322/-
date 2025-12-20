import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/Home';
// ✅ 明确指向 index.tsx
import CourseListPage from '../pages/CourseList/index';
import ReviewListPage from '../pages/ReviewList';
import CourseDetailPage from '../pages/CourseDetail'; //CourseDetailPage：这是你导入后使用的变量名，代表那个模块默认导出（export default）的 React 组件。
import ReviewDetailPage from '../pages/ReviewDetail';
import UserProfilePage from '../pages/UserProfile';
import MessagesPage from '../pages/Messages';
import WriteReviewView from '../pages/WriteReview/WriteReviewView';
import HelpCenterPage from '../pages/HelpCenter';



// 创建路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'courses',
        element: <CourseListPage />,
      },
      {
        path: 'courses/:id',
        element: <CourseDetailPage />,
      },
      {
        path: 'reviews',  // 测评库
        element: <ReviewListPage />,
      },
      {
        path: 'reviews/:id',
        element: <ReviewDetailPage />,
      },
      {
        path: 'profile',
        element: <UserProfilePage />,
      },
      {
        path: 'messages',
        element: <MessagesPage />,
      },
      
      // ✅ 写测评（首页入口：无课程）
      {
        path: 'write-review',
        element: <WriteReviewView />,
      },

      // ✅ 写测评（课程详情入口：已选课程）
      {
        path: 'courses/:courseId/write-review',
        element: <WriteReviewView />,
      },

      {
        path: '/courses/:courseId/write-review',
        element: <WriteReviewView />,
      },
      {
        path: 'help',
        element: <HelpCenterPage />,
      },
    ],
  },
  // 404页面
  {
    path: '*',
    element: (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1 className="text-3xl font-bold mb-4">404 - 页面未找到</h1>
        <p className="mb-6">您访问的页面不存在</p>
        <a href="/" className="text-blue-600 hover:underline">返回首页</a>
      </div>
    ),
  },
]);

export default router;