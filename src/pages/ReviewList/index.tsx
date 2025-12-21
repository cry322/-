// src/pages/ReviewList/index.tsx
import { useState, useMemo ,useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Search, ArrowUpDown, ArrowUp, ArrowDown, BookOpen, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { ReviewCard } from "./components/ReviewCard";
import reviewHeaderBg from '../../assets/review_back.jpg';

// 定义 Review 接口
interface Review {
  id: number;
  courseName: string;
  teacher: string;
  semester: string;
  publishDate: string;
  overallScore: number;
  taskLoad: number;
  difficulty: number;
  grading: number;
  teaching: number;
  harvest: number;
  content: string;
}

// 模拟数据
const mockReviews: Review[] = [
  {
    id: 1,
    courseName: "数据结构与算法",
    teacher: "张教授",
    semester: "2024秋季",
    publishDate: "2024-12-05",
    overallScore: 4.6,
    taskLoad: 4.3,
    difficulty: 4.5,
    grading: 3.8,
    teaching: 4.8,
    harvest: 4.5,
    content: "这门课程内容非常充实，张教授讲课思路清晰，深入浅出。课程作业量适中，能够很好地巩固课堂所学。期末考试难度适中，只要认真听课做作业基本都能取得不错的成绩。强烈推荐对算法感兴趣的同学选修。",
  },
  {
    id: 2,
    courseName: "机器学习基础",
    teacher: "李副教授",
    semester: "2024秋季",
    publishDate: "2024-12-03",
    overallScore: 4.4,
    taskLoad: 4.5,
    difficulty: 4.3,
    grading: 4.0,
    teaching: 4.5,
    harvest: 4.8,
    content: "李老师授课风格生动有趣，课程项目设置合理，能学到很多实用的机器学习技术。作业量较大但都很有意义，建议提前预留足够时间。给分相对公平，付出就有回报。",
  },
  {
    id: 3,
    courseName: "计算机网络",
    teacher: "王教授",
    semester: "2024春季",
    publishDate: "2024-11-28",
    overallScore: 3.8,
    taskLoad: 3.5,
    difficulty: 3.8,
    grading: 4.3,
    teaching: 3.5,
    harvest: 3.8,
    content: "课程内容比较传统，主要讲解网络协议和原理。王教授讲课偏向理论，实践环节较少。作业主要是习题，期末考试题型固定。给分比较宽松，容易及格但拿高分需要深入理解。",
  },
  {
    id: 4,
    courseName: "软件工程",
    teacher: "赵老师",
    semester: "2024春季",
    publishDate: "2024-11-25",
    overallScore: 4.3,
    taskLoad: 4.0,
    difficulty: 3.5,
    grading: 4.3,
    teaching: 4.3,
    harvest: 4.0,
    content: "非常实用的一门课，赵老师会结合实际项目案例讲解软件工程的各个环节。课程项目是团队合作形式，能锻炼协作能力。考核方式多元化，包括项目、报告和考试。",
  },
  {
    id: 5,
    courseName: "操作系统",
    teacher: "陈教授",
    semester: "2023秋季",
    publishDate: "2024-11-20",
    overallScore: 4.5,
    taskLoad: 4.8,
    difficulty: 4.8,
    grading: 3.5,
    teaching: 4.5,
    harvest: 4.8,
    content: "课程难度很大，作业量也很多，但收获满满。陈教授对操作系统的理解非常深刻，课堂讨论很有深度。实验项目非常有挑战性，建议有充足时间和精力再选。给分偏严格，但学到的东西绝对值得。",
  },
  {
    id: 6,
    courseName: "数据库系统",
    teacher: "刘副教授",
    semester: "2023秋季",
    publishDate: "2024-11-15",
    overallScore: 4.2,
    taskLoad: 3.8,
    difficulty: 3.5,
    grading: 4.5,
    teaching: 4.0,
    harvest: 4.3,
    content: "刘老师讲课很有条理，课程内容覆盖数据库的各个方面。实验项目设计合理，从SQL到NoSQL都有涉及。给分非常宽松，平时认真完成作业基本都能拿到不错的分数。",
  },
  {
    id: 7,
    courseName: "人工智能导论",
    teacher: "周教授",
    semester: "2024春季",
    publishDate: "2024-11-10",
    overallScore: 4.4,
    taskLoad: 4.0,
    difficulty: 4.0,
    grading: 4.3,
    teaching: 4.5,
    harvest: 4.5,
    content: "周教授是AI领域的专家，课程内容紧跟前沿技术。会介绍最新的研究成果和应用案例。课程项目可以选择自己感兴趣的方向，自由度很高。考核方式灵活，鼓励创新。",
  },
  {
    id: 8,
    courseName: "编译原理",
    teacher: "吴教授",
    semester: "2023春季",
    publishDate: "2024-11-05",
    overallScore: 3.9,
    taskLoad: 4.5,
    difficulty: 4.5,
    grading: 3.8,
    teaching: 3.8,
    harvest: 4.3,
    content: "编译原理本身就是比较难的课程，吴教授讲解还算清楚。课程作业量大且难度高，需要投入大量时间。期末考试理论题较多，需要记忆的内容不少。给分中规中矩。",
  },
];

type SortOption = "overall" | "taskLoad" | "difficulty" | "grading" | "teaching" | "harvest" | "publishDate";
type SortDirection = "asc" | "desc";

const ReviewList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("overall");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 每页显示5条测评
  const [isSticky, setIsSticky] = useState(false);

  const sortOptions = [
    { value: "overall" as SortOption, label: "综合评分" },
    { value: "taskLoad" as SortOption, label: "任务量" },
    { value: "difficulty" as SortOption, label: "难度" },
    { value: "grading" as SortOption, label: "给分宽严" },
    { value: "teaching" as SortOption, label: "听课体验" },
    { value: "harvest" as SortOption, label: "收获程度" },
    { value: "publishDate" as SortOption, label: "发布时间" },
  ];
  
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const stickySentinelRef = useRef<HTMLDivElement>(null);

  // 监听滚动，实现固定搜索框
  useEffect(() => {
    const handleScroll = () => {
      if (stickySentinelRef.current) {
        const sentinelRect = stickySentinelRef.current.getBoundingClientRect();
        setIsSticky(sentinelRect.top < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 当搜索或排序条件变化时，重置到第一页
  // 修改搜索处理函数
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // 搜索时重置到第一页
  };

  // 修改排序处理函数
  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1); // 排序时重置到第一页
  };

  // 修改排序方向处理函数
  const handleSortDirectionToggle = () => {
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    setCurrentPage(1); // 排序方向变化时重置到第一页
  };
  // 根据排序字段获取对应的分数
  const getSortScore = (review: Review): number => {
    switch (sortBy) {
      case "overall": return review.overallScore;
      case "taskLoad": return review.taskLoad;
      case "difficulty": return review.difficulty;
      case "grading": return review.grading;
      case "teaching": return review.teaching;
      case "harvest": return review.harvest;
      case "publishDate": 
        return new Date(review.publishDate).getTime();
      default: return review.overallScore;
    }
  };

  // 获取排序字段对应的标签
  const getSortLabel = (): string => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : "综合评分";
  };

  // 获取排序字段对应的显示值
  const getDisplayValue = (review: Review): string | number => {
    if (sortBy === "publishDate") {
      return review.publishDate;
    }
    return getSortScore(review).toFixed(1);
  };

  // 筛选和排序逻辑 - 内联 getSortScore 函数
  const filteredAndSortedReviews: Review[] = useMemo(() => {
    let result = [...mockReviews];

    // 搜索过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (review) =>
          review.courseName.toLowerCase().includes(term) ||
          review.teacher.toLowerCase().includes(term) ||
          review.content.toLowerCase().includes(term)
      );
    }

    // 排序 - 内联 getSortScore 逻辑
    result.sort((a, b) => {
      // 内联的排序函数
      const getValue = (review: Review): number => {
        switch (sortBy) {
          case "overall": return review.overallScore;
          case "taskLoad": return review.taskLoad;
          case "difficulty": return review.difficulty;
          case "grading": return review.grading;
          case "teaching": return review.teaching;
          case "harvest": return review.harvest;
          case "publishDate": 
            return new Date(review.publishDate).getTime();
          default: return review.overallScore;
        }
      };
      
      const aValue = getValue(a);
      const bValue = getValue(b);
      return sortDirection === "desc" ? bValue - aValue : aValue - bValue;
    });

    return result;
  }, [searchTerm, sortBy, sortDirection]); // 只依赖这三个变量

  // 计算总页数
  const totalPages = Math.ceil(filteredAndSortedReviews.length / itemsPerPage);

  // 获取当前页的数据
  const currentReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedReviews.slice(startIndex, endIndex);
  }, [filteredAndSortedReviews, currentPage, itemsPerPage]);

  // 修改 getPageNumbers 函数
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 10;
    
    // 如果总页数小于等于最大可见页数，显示所有页码
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // 计算起始和结束页码
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // 调整以保证显示5个页码（如果可能）
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 5);
    }
    
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 4);
    }
    
    // 总是添加第一页
    pageNumbers.push(1);
    
    // 如果第一页和第二页之间有间隔，添加省略号
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // 如果最后一页和倒数第二页之间有间隔，添加省略号
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // 总是添加最后一页（除非总页数只有1页）
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // 处理页码点击
  const handlePageClick = (pageNumber: number | string) => {
    if (typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 - 放在头部区域上面 */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <nav className="flex items-center text-sm">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <Home className="w-4 h-4 mr-1" />
            首页
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-blue-600 font-medium">测评库</span>
        </nav>
      </div>

      {/* 页面头部 - 使用背景图片 */}
      <div 
        className="relative text-white py-12 md:py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${reviewHeaderBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">测评库</h1>
          <p className="text-xl text-gray-200">查看学长学姐们的真实课程评价，为你的选课提供参考</p>
        </div>
      </div>
      {/* 用于检测滚动位置的哨兵元素 */}
      <div ref={stickySentinelRef} className="h-0"></div>
       {/* 用于检测滚动位置的哨兵元素 */}
      <div ref={stickySentinelRef} className="h-0"></div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 固定搜索框（滚动时显示） */}
        {isSticky && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg py-3 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-3">
                {/* 搜索框 */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索课程名、教师或测评内容..."
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* 排序选择 */}
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-900 bg-white cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* 排序方向 */}
                  <button
                    onClick={handleSortDirectionToggle}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                    title={sortDirection === "desc" ? "降序" : "升序"}
                  >
                    {sortDirection === "desc" ? (
                      <ArrowDown className="w-4 h-4" />
                    ) : (
                      <ArrowUp className="w-4 h-4" />
                    )}
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 原始搜索框区域 */}
        <div ref={searchBoxRef} className={`bg-white rounded-xl p-6 border border-gray-200 mb-6 transition-all duration-300 ${isSticky ? 'mt-16' : ''}`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索课程名、教师或测评内容..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* 排序选择 */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-gray-900 bg-white cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* 排序方向 */}
              <button
                onClick={handleSortDirectionToggle}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                title={sortDirection === "desc" ? "降序" : "asc"}
              >
                {sortDirection === "desc" ? (
                  <ArrowDown className="w-4 h-4" />
                ) : (
                  <ArrowUp className="w-4 h-4" />
                )}
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>


          {/* 结果统计 */}
          <div className="mt-4 text-sm text-gray-500">
            共找到 {filteredAndSortedReviews.length} 条测评
            {searchTerm && `，搜索关键词："${searchTerm}"`}
            {filteredAndSortedReviews.length > itemsPerPage && `，第 ${currentPage} 页，共 ${totalPages} 页`}
          </div>
        </div>

        {/* 快速写测评引导 */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">分享你的课程体验</h3>
                <p className="text-gray-600">帮助其他同学做出更好的选课决策</p>
              </div>
            </div>
            <a
              href="/write-review"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              写测评
            </a>
          </div>
        </div>

        {/* 测评列表 */}
        <div className="grid gap-4 mb-8">
          {currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <ReviewCard
                key={review.id}
                id={review.id}
                courseName={review.courseName}
                teacher={review.teacher}
                semester={review.semester}
                publishDate={review.publishDate}
                overallScore={review.overallScore}
                content={review.content}
                // 根据当前排序字段传递对应的分数和标签
                sortScore={getSortScore(review)}
                sortLabel={getSortLabel()}
                displayValue={getDisplayValue(review)}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">未找到相关测评</p>
              <p className="text-gray-500">请尝试其他搜索词或清除筛选条件</p>
            </div>
          )}
        </div>

        {/* 分页导航 - 只有在有多页数据时才显示 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            <nav className="flex items-center gap-1">
              {/* 上一页按钮 */}
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                上一页
              </button>

              {/* 页码按钮 */}
              {getPageNumbers().map((pageNumber, index) => (
                pageNumber === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber as number)}
                    className={`px-3 py-2 min-w-[40px] rounded-lg ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              ))}

              {/* 下一页按钮 */}
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                下一页
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </nav>

            {/* 跳转到指定页 */}
            <div className="ml-6 flex items-center gap-2">
              <span className="text-sm text-gray-600">跳至</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  }
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
              />
              <span className="text-sm text-gray-600">页</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;