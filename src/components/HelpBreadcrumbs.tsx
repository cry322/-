// src/pages/HelpCenter/components/HelpBreadcrumbs.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

const HelpBreadcrumbs: React.FC = () => {
  return (
    <nav className="flex items-center text-sm">
      <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition">
        <Home className="w-4 h-4 mr-1" />
        首页
      </Link>
      <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
      <span className="text-blue-600 font-medium">帮助中心</span> {/* 改为蓝色 */}
    </nav>
  );
};

export default HelpBreadcrumbs;