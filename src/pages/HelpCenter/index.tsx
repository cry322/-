// src/pages/HelpCenter/index.tsx
import React from 'react';
import { HelpCircle, Mail } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import HelpFAQSection from '../../components/HelpFAQSection';
import helpHeaderBg from '../../assets/help_back.jpg';

const HelpCenter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <Breadcrumbs items={[{ label: '帮助中心' }]} />
      </div>

      {/* 页面头部 - 调整为py-16 */}
      <div 
        className="relative text-white py-14" // 从py-20调整为py-16
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${helpHeaderBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">帮助中心</h1> {/* 减小mb-4为mb-3 */}
          <p className="text-xl md:text-2xl text-gray-200 mb-4">常见问题解答与使用指南</p> {/* 减小mb-8为mb-6 */}
          
          {/* 装饰性分隔线 */}
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-14"> {/* 减小md:py-16为md:py-14 */}
        {/* 常见问题解答 - 调整负边距 */}
        <div className="mb-12 md:mb-14 -mt-6"> {/* 减小-mt-8为-mt-6，减小md:mb-16为md:mb-14 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">常见问题</h2>
          </div>
          <HelpFAQSection />
        </div>

        {/* 联系支持 - 调整内边距 */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-9 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"> {/* 减小图标容器 */}
              <Mail className="w-6 h-6 text-blue-600" /> {/* 减小图标 */}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">需要更多帮助？</h3>
              <p className="text-gray-600">我们的支持团队随时为您服务</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2">联系邮箱</h4>
              <p className="text-gray-700">support@xuankebao.com</p>
              <p className="text-sm text-gray-500 mt-2">通常会在24小时内回复</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2">服务时间</h4>
              <p className="text-gray-700">周一至周五 9:00-18:00</p>
              <p className="text-sm text-gray-500 mt-2">节假日除外</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;