import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';


interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  courses: { courseName: string; teacher: string; courseNo: string }[];
}

const STORAGE_KEY = 'course_search_history';

export function SearchBar({ searchQuery, setSearchQuery, courses }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed.filter((item) => typeof item === 'string'));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveHistory = (next: string[]) => {
    setHistory(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleSelect = (value: string) => {
    const trimmed = value.trim();
    setSearchQuery(trimmed);
    setIsOpen(false);
    if (!trimmed) return;

    const next = [
      trimmed,
      ...history.filter((item) => item !== trimmed),
    ].slice(0, 10);
    saveHistory(next);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const historySuggestions = useMemo(() => {
    if (!normalizedQuery) return history;
    return history.filter((item) =>
      item.toLowerCase().includes(normalizedQuery)
    );
  }, [history, normalizedQuery]);

  const courseSuggestions = useMemo(() => {
    if (!normalizedQuery) return [] as string[];
    const set = new Set<string>();

    courses.forEach((course) => {
      if (course.courseName.toLowerCase().includes(normalizedQuery)) {
        set.add(course.courseName);
      }
      if (course.teacher.toLowerCase().includes(normalizedQuery)) {
        set.add(course.teacher);
      }
      if (course.courseNo.includes(searchQuery.trim())) {
        set.add(course.courseNo);
      }
    });

    return Array.from(set).slice(0, 8);
  }, [courses, normalizedQuery, searchQuery]);

  const hasSuggestions = historySuggestions.length > 0 || courseSuggestions.length > 0;

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    setIsOpen(true);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleSelect(searchQuery);
    }
  };

  const handleClearHistory = () => {
    saveHistory([]);
  };

  return (
    <div className="mb-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-purple-100 shadow-sm relative z-30">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="请在此处搜索课程/教师名（请写全称）"
          className="w-full px-4 py-3 pr-12 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400" size={24} />

        {isOpen && (
          <div
            className="absolute left-0 right-0 mt-2 bg-white border border-purple-100 rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto"
            onMouseDown={(e) => e.preventDefault()}
          >
            {historySuggestions.length > 0 && (
              <div className="px-4 pt-3 pb-1 text-xs text-gray-400 flex items-center justify-between">
                <span>搜索历史</span>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-[11px] text-gray-400 hover:text-purple-500"
                >
                  清空
                </button>
              </div>
            )}

            {historySuggestions.map((item) => (
              <button
                key={`history-${item}`}
                type="button"
                className="w-full text-left px-4 py-2 text-sm hover:bg-purple-50 flex items-center gap-2"
                onClick={() => handleSelect(item)}
              >
                <span className="text-gray-500 text-xs">历史</span>
                <span className="truncate">{item}</span>
              </button>
            ))}

            {courseSuggestions.length > 0 && (
              <div className="px-4 pt-3 pb-1 text-xs text-gray-400">
                智能联想
              </div>
            )}

            {courseSuggestions.map((item) => (
              <button
                key={`suggest-${item}`}
                type="button"
                className="w-full text-left px-4 py-2 text-sm hover:bg-purple-50 flex items-center gap-2"
                onClick={() => handleSelect(item)}
              >
                <Search size={14} className="text-purple-400" />
                <span className="truncate">{item}</span>
              </button>
            ))}

            {!hasSuggestions && (
              <div className="px-4 py-3 text-xs text-gray-400 text-center">
                暂无搜索历史或联想结果
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}