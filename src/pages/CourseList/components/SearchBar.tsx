import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="mb-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-purple-100 shadow-sm">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="请在此处搜索课程（支持课程简称）/教师名（支持教师简称）"
          className="w-full px-4 py-3 pr-12 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400" size={24} />
      </div>
    </div>
  );
}