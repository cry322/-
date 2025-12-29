// src/components/Breadcrumbs.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-sm">
      <Link 
        to="/" 
        className="flex items-center text-gray-600 hover:text-blue-600 transition"
      >
        <Home className="w-4 h-4 mr-1" />
        首页
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          {item.path ? (
            <Link 
              to={item.path} 
              className="text-gray-600 hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-blue-600 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;