import { FilterSidebar } from './components/FilterSidebar';
import { SearchBar } from './components/SearchBar';
import { CourseTable } from './components/CourseTable';
import { useState, useMemo, useEffect } from 'react'; // 添加 useEffect
import courseHeaderBg from '../../assets/course-back.jpg';
import { Home, ChevronRight } from "lucide-react";
import { Link, useSearchParams, useNavigate } from 'react-router-dom'; // 添加 useNavigate

interface Course {
  id: number;
  courseNo: string;
  courseName: string;
  credits: number;
  teacher: string;
  department: string;
  rating: number;
}
// 模拟课程数据
const mockCourses = [
  { id: 2838360, courseNo: '2838360', courseName: '微观经济学', credits: 3, teacher: '高彧', department: '光华管理学院', rating: 5 },
  { id: 2432210, courseNo: '2432210', courseName: '民主的历史与现实', credits: 3, teacher: '汪卫华', department: '国际关系学院', rating: 4 },
  { id: 1339180, courseNo: '1339180', courseName: '世界文化地理', credits: 2, teacher: '邓辉', department: '城市与环境学院', rating: 4 },
  { id: 3232080, courseNo: '3232080', courseName: '日本经济', credits: 2, teacher: '宋磊', department: '政府管理学院', rating: 4 },
  { id: 4334017, courseNo: '4334017', courseName: '美索不达米亚艺术与文明', credits: 2, teacher: '贾妍', department: '艺术学院', rating: 4 },
  { id: 2034300, courseNo: '2034300', courseName: '大学国文', credits: 2, teacher: '李林芳，范晓蕾', department: '中国语言文学系', rating: 3 },
  { id: 1630079, courseNo: '1630079', courseName: '心理学导论', credits: 2, teacher: '毛利华', department: '心理与认知科学学院', rating: 4 },
  { id: 1233170, courseNo: '1233170', courseName: '地震概论', credits: 2, teacher: '赵克常', department: '地球与空间科学学院', rating: 4 },
  { id: 2039130, courseNo: '2039130', courseName: '民俗研究', credits: 2, teacher: '王娟', department: '中国语言文学系', rating: 3 },
  { id: 4334010, courseNo: '4334010', courseName: '古代西亚北非神话与艺术', credits: 2, teacher: '贾妍', department: '艺术学院', rating: 5 },
  { id: 1233571, courseNo: '1233571', courseName: '太阳系中的科学', credits: 2, teacher: '周煦之', department: '地球与空间科学学院', rating: 4 },
  { id: 23200001, courseNo: '23200001', courseName: '材料与时代', credits: 2, teacher: '曹安源', department: '材料科学与工程学院', rating: 3 },
  { id: 1635020, courseNo: '1635020', courseName: '生活中的心理学', credits: 2, teacher: '方新', department: '心理与认知科学学院', rating: 3 },
  { id: 4031890, courseNo: '4031890', courseName: '李大钊思想研究', credits: 2, teacher: '王久高', department: '马克思主义学院', rating: 4 },
  { id: 4332710, courseNo: '4332710', courseName: '西方美术史', credits: 2, teacher: '丁宁', department: '艺术学院', rating: 4 },
  { id: 2432161, courseNo: '2432161', courseName: '社会科学定量方法', credits: 3, teacher: '罗杭', department: '国际关系学院', rating: 1 },
  { id: 430171, courseNo: '430171', courseName: '人类生存发展与核科学', credits: 2, teacher: '郭秋菊', department: '物理学院', rating: 4 },
  { id: 3230020, courseNo: '3230020', courseName: '政治学原理', credits: 3, teacher: '马啸', department: '政府管理学院', rating: 5 },
  { id: 3230900, courseNo: '3230900', courseName: '政治学原理', credits: 2, teacher: '马啸', department: '政府管理学院', rating: 5 },
  { id: 1536830, courseNo: '1536830', courseName: '生态学与环境变化', credits: 2, teacher: '方精云', department: '城市与环境学院', rating: 5 },
  { id: 1630740, courseNo: '1630740', courseName: '爱的心理学', credits: 2, teacher: '李同归', department: '心理与认知科学学院', rating: 3 },
  { id: 1339320, courseNo: '1339320', courseName: '中国历史地理', credits: 2, teacher: '韩茂莉', department: '城市与环境学院', rating: 5 },
  { id: 2939991, courseNo: '2939991', courseName: '英美侵权法', credits: 2, teacher: '徐爱国', department: '法学院', rating: 5 },
  { id: 2930187, courseNo: '2930187', courseName: '中国当代法律和社会', credits: 2, teacher: '彭錞', department: '法学院', rating: 5 },
  { id: 2332323, courseNo: '2332323', courseName: '坛经', credits: 2, teacher: '周学农', department: '哲学系', rating: 4 },
  { id: 1831990, courseNo: '1831990', courseName: '跨文化交流学', credits: 2, teacher: '关世杰', department: '新闻与传播学院', rating: 1 },
  { id: 2132990, courseNo: '2132990', courseName: '中共党史专题', credits: 2, teacher: '黄道炫', department: '历史学系', rating: 4 },
  { id: 3034040, courseNo: '3034040', courseName: '数据科学导引 C', credits: 3, teacher: '黄文彬，步一，孟凡', department: '信息管理系', rating: 5 },
  { id: 2132864, courseNo: '2132864', courseName: '《史记》解读', credits: 2, teacher: '李霖', department: '历史学系', rating: 4 },
  { id: 2432440, courseNo: '2432440', courseName: '国际法与国际关系', credits: 3, teacher: '赖华夏', department: '国际关系学院', rating: 5 },
  { id: 6232000, courseNo: '6232000', courseName: '经济学原理', credits: 4, teacher: '张维迎，汪浩', department: '国家发展研究院', rating: 4 },
  { id: 137975, courseNo: '137975', courseName: '音乐与数学', credits: 3, teacher: '王杰', department: '数学科学学院', rating: 3 },
  { id: 2034540, courseNo: '2034540', courseName: '影片精读', credits: 3, teacher: '戴锦华', department: '中国语言文学系', rating: 5 },
  { id: 136700, courseNo: '136700', courseName: '普通统计学', credits: 3, teacher: '艾明要', department: '数学科学学院', rating: 4 },
  { id: 1230410, courseNo: '1230410', courseName: '地球与人类文明', credits: 2, teacher: '陈斌', department: '地球与空间科学学院', rating: 3 },
  { id: 4834350, courseNo: '4834350', courseName: '医学通识：信息时代的健康素养', credits: 2, teacher: '陆俊林', department: '信息科学技术学院', rating: 3 },
  { id: 3930100, courseNo: '3930100', courseName: '全球视野下的犹太文明', credits: 2, teacher: '杨梦', department: '外国语学院', rating: 4 },
  { id: 2330003, courseNo: '2330003', courseName: '哲学导论', credits: 3, teacher: '李猛，赵新侃，李麒麟，赵斌', department: '哲学系', rating: 3 },
  { id: 2131580, courseNo: '2131580', courseName: '中美关系史', credits: 2, teacher: '张静', department: '历史学系', rating: 4 },
  { id: 1832760, courseNo: '1832760', courseName: '英语新闻阅读', credits: 2, teacher: '何姝', department: '新闻与传播学院', rating: 3 },
  { id: 2930228, courseNo: '2930228', courseName: '民事司法与纠纷解决', credits: 2, teacher: '曹志勋', department: '法学院', rating: 4 },
  { id: 4332210, courseNo: '4332210', courseName: '中国电影史', credits: 2, teacher: '李道新', department: '艺术学院', rating: 3 },
  { id: 4330335, courseNo: '4330335', courseName: '颗粒艺术', credits: 2, teacher: '王楠', department: '艺术学院', rating: 4 },
  { id: 1132688, courseNo: '1132688', courseName: '葡萄酒背后的科学与文化', credits: 2, teacher: '彭宜本', department: '生命科学学院', rating: 5 },
  { id: 3634030, courseNo: '3634030', courseName: '传记文学：经典人物研究', credits: 2, teacher: '赵白生', department: '外国语学院', rating: 3 },
  { id: 4330688, courseNo: '4330688', courseName: '艺术与审美', credits: 2, teacher: '彭锋，顾春芳，陈均', department: '艺术学院', rating: 4 },
  { id: 4330111, courseNo: '4330111', courseName: '经典昆曲欣赏', credits: 2, teacher: '陈均', department: '艺术学院', rating: 4 },
  { id: 1831760, courseNo: '1831760', courseName: '世界电影史', credits: 2, teacher: '陆绍阳', department: '新闻与传播学院', rating: 4 },
  { id: 4332350, courseNo: '4332350', courseName: '中国流行音乐流变', credits: 2, teacher: '周映辰', department: '艺术学院', rating: 4 },
  { id: 4331921, courseNo: '4331921', courseName: '艺术经典里的百年中国', credits: 2, teacher: '彭锋，陈均，顾春芳，刘晨等', department: '艺术学院', rating: 3 },
  { id: 1430950, courseNo: '1430950', courseName: '地球环境与人类社会', credits: 2, teacher: '赵永红', department: '地球与空间科学学院', rating: 4 },
  { id: 1034030, courseNo: '1034030', courseName: '魅力化学', credits: 2, teacher: '黄建彬', department: '化学与分子工程学院', rating: 3 },
];

export default function CourseList() {
  const [searchParams, setSearchParams] = useSearchParams(); // 改为可写，添加 setSearchParams
  const navigate = useNavigate();
  
  // 从 URL 参数中获取搜索词，参数名为 'q'
  const urlSearchQuery = searchParams.get('q') || '';
  
  // 搜索查询状态
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  
  const [selectedCredits, setSelectedCredits] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [courses] = useState(mockCourses);
  const [sortConfig, setSortConfig] = useState<{
    field: keyof Course;
    direction: 'asc' | 'desc';
  } | null>(null);

  // 当 URL 参数变化时，更新搜索框的状态
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  // 处理搜索查询的变化，更新 URL 参数
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    
    // 如果查询不为空，更新 URL 参数
    if (query.trim()) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', query.trim());
      setSearchParams(newParams, { replace: true });
    } else {
      // 如果查询为空，移除 q 参数
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('q');
      setSearchParams(newParams, { replace: true });
    }
  };

  // 处理搜索提交
  const handleSearchSubmit = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    
    if (trimmedQuery) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', trimmedQuery);
      setSearchParams(newParams, { replace: true });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('q');
      setSearchParams(newParams, { replace: true });
    }
    
    // 如果需要，可以在这里添加搜索提交后的其他逻辑
    // 例如：滚动到搜索结果区域、显示搜索结果统计等
  };

  // 筛选逻辑
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const query = searchQuery.toLowerCase();
      
      // 如果搜索词为空，显示所有课程
      if (!query) {
        const matchesCredits =
          selectedCredits === 'all' || course.credits === parseInt(selectedCredits);

        const matchesDepartment =
          selectedDepartment === 'all' || course.department === selectedDepartment;

        return matchesCredits && matchesDepartment;
      }
      
      // 否则，根据搜索词筛选
      const matchesSearch =
        course.courseName.toLowerCase().includes(query) ||
        course.teacher.toLowerCase().includes(query) ||
        course.courseNo.includes(query);

      const matchesCredits =
        selectedCredits === 'all' || course.credits === parseInt(selectedCredits);

      const matchesDepartment =
        selectedDepartment === 'all' || course.department === selectedDepartment;

      return matchesSearch && matchesCredits && matchesDepartment;
    });
  }, [courses, searchQuery, selectedCredits, selectedDepartment]);

  // 排序逻辑
  const sortedCourses = useMemo(() => {
    if (!sortConfig) return filteredCourses;
    
    return [...filteredCourses].sort((a, b) => {
      let aValue = a[sortConfig.field as keyof Course];
      let bValue = b[sortConfig.field as keyof Course];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredCourses, sortConfig]);

  // 处理排序点击
  const handleSort = (field: keyof Course) => {
    setSortConfig(prevConfig => {
      if (!prevConfig || prevConfig.field !== field) {
        return { field, direction: 'desc' };
      }
      
      if (prevConfig.direction === 'desc') {
        return { field, direction: 'asc' };
      }
      
      return null;
    });
  };

  // 清空搜索
  const handleClearSearch = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    setSearchParams(newParams, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
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
          <span className="text-blue-600 font-medium">课程库</span>
        </nav>
      </div>

      {/* 页面头部 */}
      <div 
        className="relative text-white py-12 md:py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${courseHeaderBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">课程库</h1>
          <p className="text-xl text-gray-200">探索北大丰富课程，找到适合你的学习方向</p>
          
          {/* 显示当前搜索词 */}
          {searchQuery && (
            <div className="mt-4">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="mr-2">当前搜索:</span>
                <span className="font-medium">{searchQuery}</span>
                <button
                  onClick={handleClearSearch}
                  className="ml-2 p-1 hover:bg-white/20 rounded-full"
                  title="清除搜索"
                >
                  <span className="text-xs">×</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 筛选侧边栏 */}
          <div className="lg:w-1/4">
            <FilterSidebar
              selectedCredits={selectedCredits}
              setSelectedCredits={setSelectedCredits}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
            />
          </div>

          {/* 主要课程内容 */}
          <main className="lg:w-3/4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
              courses={courses}
            />
            
            {/* 快速筛选标签 */}
            <div className="flex flex-wrap gap-2 mb-4 mt-4">
              <button
                onClick={() => setSelectedCredits('all')}
                className={`px-3 py-1 rounded-full text-sm ${selectedCredits === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
              >
                全部学分
              </button>
              {[1, 2, 3, 4].map(credit => (
                <button
                  key={credit}
                  onClick={() => setSelectedCredits(credit.toString())}
                  className={`px-3 py-1 rounded-full text-sm ${selectedCredits === credit.toString() ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
                >
                  {credit}学分
                </button>
              ))}
            </div>
            
            <div className="mt-4">
              <CourseTable 
                courses={sortedCourses}
                onSort={() => handleSort('rating')}
                sortDirection={sortConfig?.field === 'rating' ? sortConfig.direction : null}
              />
            </div>
            
            {/* 课程统计信息 */}
            <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-3">课程统计</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-2xl font-bold text-blue-600">{sortedCourses.length}</div>
                  <div className="text-sm text-gray-600">筛选结果</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-2xl font-bold text-green-600">
                    {sortedCourses.length > 0 ? Math.max(...sortedCourses.map(c => c.rating)) : 0}
                  </div>
                  <div className="text-sm text-gray-600">最高评分</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded">
                  <div className="text-2xl font-bold text-purple-600">
                    {sortedCourses.length > 0 ? new Set(sortedCourses.map(c => c.department)).size : 0}
                  </div>
                  <div className="text-sm text-gray-600">涉及院系</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded">
                  <div className="text-2xl font-bold text-yellow-600">
                    {sortedCourses.length > 0 ? Math.max(...sortedCourses.map(c => c.credits)) : 0}
                  </div>
                  <div className="text-sm text-gray-600">最高学分</div>
                </div>
              </div>
              
              {/* 搜索提示 */}
              {searchQuery && sortedCourses.length === 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded text-center">
                  <p className="text-gray-600">未找到与 "<span className="font-medium">{searchQuery}</span>" 相关的课程</p>
                  <button
                    onClick={handleClearSearch}
                    className="mt-2 text-blue-600 hover:underline text-sm"
                  >
                    清空搜索词，查看所有课程
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}