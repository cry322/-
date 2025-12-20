import { FilterSidebar } from './components/FilterSidebar';
import { SearchBar } from './components/SearchBar';
import { CourseTable } from './components/CourseTable';
import { useState, useEffect } from 'react';


// 模拟课程数据
const mockCourses = [
  { id: 1, courseNo: '2838360', courseName: '微观经济学', credits: 3, teacher: '高彧', department: '光华管理学院', rating: 5 },
  { id: 2, courseNo: '2432210', courseName: '民主的历史与现实', credits: 3, teacher: '汪卫华', department: '国际关系学院', rating: 4 },
  { id: 3, courseNo: '1339180', courseName: '世界文化地理', credits: 2, teacher: '邓辉', department: '城市与环境学院', rating: 4 },
  { id: 4, courseNo: '3232080', courseName: '日本经济', credits: 2, teacher: '宋磊', department: '政府管理学院', rating: 4 },
  { id: 5, courseNo: '4334017', courseName: '美索不达米亚艺术与文明', credits: 2, teacher: '贾妍', department: '艺术学院', rating: 4 },
  { id: 6, courseNo: '2034300', courseName: '大学国文', credits: 2, teacher: '李林芳，范晓蕾', department: '中国语言文学系', rating: 3 },
  { id: 7, courseNo: '1630079', courseName: '心理学导论', credits: 2, teacher: '毛利华', department: '心理与认知科学学院', rating: 4 },
  { id: 9, courseNo: '1233170', courseName: '地震概论', credits: 2, teacher: '赵克常', department: '地球与空间科学学院', rating: 4 },
  { id: 10, courseNo: '2039130', courseName: '民俗研究', credits: 2, teacher: '王娟', department: '中国语言文学系', rating: 3 },
  { id: 11, courseNo: '4334010', courseName: '古代西亚北非神话与艺术', credits: 2, teacher: '贾妍', department: '艺术学院', rating: 5 },
  { id: 12, courseNo: '1233571', courseName: '太阳系中的科学', credits: 2, teacher: '周煦之', department: '地球与空间科学学院', rating: 4 },
  { id: 13, courseNo: '23200001', courseName: '材料与时代', credits: 2, teacher: '曹安源', department: '材料科学与工程学院', rating: 3 },
  { id: 14, courseNo: '1635020', courseName: '生活中的心理学', credits: 2, teacher: '方新', department: '心理与认知科学学院', rating: 3 },
  { id: 15, courseNo: '4031890', courseName: '李大钊思想研究', credits: 2, teacher: '王久高', department: '马克思主义学院', rating: 4 },
  { id: 16, courseNo: '4332710', courseName: '西方美术史', credits: 2, teacher: '丁宁', department: '艺术学院', rating: 4 },
  { id: 18, courseNo: '2432161', courseName: '社会科学定量方法', credits: 3, teacher: '罗杭', department: '国际关系学院', rating: 1 },
  { id: 19, courseNo: '430171', courseName: '人类生存发展与核科学', credits: 2, teacher: '郭秋菊', department: '物理学院', rating: 4 },
  { id: 20, courseNo: '3230020', courseName: '政治学原理', credits: 3, teacher: '马啸', department: '政府管理学院', rating: 5 },
  { id: 21, courseNo: '3230900', courseName: '政治学原理', credits: 2, teacher: '马啸', department: '政府管理学院', rating: 5 },
  { id: 22, courseNo: '1536830', courseName: '生态学与环境变化', credits: 2, teacher: '方精云', department: '城市与环境学院', rating: 5 },
  { id: 23, courseNo: '1630740', courseName: '爱的心理学', credits: 2, teacher: '李同归', department: '心理与认知科学学院', rating: 3 },
  { id: 24, courseNo: '1339320', courseName: '中国历史地理', credits: 2, teacher: '韩茂莉', department: '城市与环境学院', rating: 5 },
  { id: 26, courseNo: '2939991', courseName: '英美侵权法', credits: 2, teacher: '徐爱国', department: '法学院', rating: 5 },
  { id: 28, courseNo: '2930187', courseName: '中国当代法律和社会', credits: 2, teacher: '彭錞', department: '法学院', rating: 5 },
  { id: 29, courseNo: '2332323', courseName: '坛经', credits: 2, teacher: '周学农', department: '哲学系', rating: 4 },
  { id: 30, courseNo: '1831990', courseName: '跨文化交流学', credits: 2, teacher: '关世杰', department: '新闻与传播学院', rating: 1 },
  { id: 31, courseNo: '2132990', courseName: '中共党史专题', credits: 2, teacher: '黄道炫', department: '历史学系', rating: 4 },
  { id: 32, courseNo: '3034040', courseName: '数据科学导引 C', credits: 3, teacher: '黄文彬，步一，孟凡', department: '信息管理系', rating: 5 },
  { id: 33, courseNo: '2132864', courseName: '《史记》解读', credits: 2, teacher: '李霖', department: '历史学系', rating: 4 },
  { id: 34, courseNo: '2432440', courseName: '国际法与国际关系', credits: 3, teacher: '赖华夏', department: '国际关系学院', rating: 5 },
  { id: 35, courseNo: '6232000', courseName: '经济学原理', credits: 4, teacher: '张维迎，汪浩', department: '国家发展研究院', rating: 4 },
  { id: 37, courseNo: '137975', courseName: '音乐与数学', credits: 3, teacher: '王杰', department: '数学科学学院', rating: 3 },
  { id: 38, courseNo: '2034540', courseName: '影片精读', credits: 3, teacher: '戴锦华', department: '中国语言文学系', rating: 5 },
  { id: 39, courseNo: '136700', courseName: '普通统计学', credits: 3, teacher: '艾明要', department: '数学科学学院', rating: 4 },
  { id: 40, courseNo: '1230410', courseName: '地球与人类文明', credits: 2, teacher: '陈斌', department: '地球与空间科学学院', rating: 3 },
  { id: 43, courseNo: '4834350', courseName: '医学通识：信息时代的健康素养', credits: 2, teacher: '陆俊林', department: '信息科学技术学院', rating: 3 },
  { id: 44, courseNo: '3930100', courseName: '全球视野下的犹太文明', credits: 2, teacher: '杨梦', department: '外国语学院', rating: 4 },
  { id: 45, courseNo: '2330003', courseName: '哲学导论', credits: 3, teacher: '李猛，赵新侃，李麒麟，赵斌', department: '哲学系', rating: 3 },
  { id: 46, courseNo: '2131580', courseName: '中美关系史', credits: 2, teacher: '张静', department: '历史学系', rating: 4 },
  { id: 47, courseNo: '1832760', courseName: '英语新闻阅读', credits: 2, teacher: '何姝', department: '新闻与传播学院', rating: 3 },
  { id: 48, courseNo: '2930228', courseName: '民事司法与纠纷解决', credits: 2, teacher: '曹志勋', department: '法学院', rating: 4 },
  { id: 49, courseNo: '4332210', courseName: '中国电影史', credits: 2, teacher: '李道新', department: '艺术学院', rating: 3 },
  { id: 50, courseNo: '4330335', courseName: '颗粒艺术', credits: 2, teacher: '王楠', department: '艺术学院', rating: 4 },
  { id: 51, courseNo: '1132688', courseName: '葡萄酒背后的科学与文化', credits: 2, teacher: '彭宜本', department: '生命科学学院', rating: 5 },
  { id: 52, courseNo: '3634030', courseName: '传记文学：经典人物研究', credits: 2, teacher: '赵白生', department: '外国语学院', rating: 3 },
  { id: 53, courseNo: '4330688', courseName: '艺术与审美', credits: 2, teacher: '彭锋，顾春芳，陈均', department: '艺术学院', rating: 4 },
  { id: 54, courseNo: '4330111', courseName: '经典昆曲欣赏', credits: 2, teacher: '陈均', department: '艺术学院', rating: 4 },
  { id: 55, courseNo: '1831760', courseName: '世界电影史', credits: 2, teacher: '陆绍阳', department: '新闻与传播学院', rating: 4 },
  { id: 56, courseNo: '4332350', courseName: '中国流行音乐流变', credits: 2, teacher: '周映辰', department: '艺术学院', rating: 4 },
  { id: 57, courseNo: '4331921', courseName: '艺术经典里的百年中国', credits: 2, teacher: '彭锋，陈均，顾春芳，刘晨等', department: '艺术学院', rating: 3 },
  { id: 58, courseNo: '1430950', courseName: '地球环境与人类社会', credits: 2, teacher: '赵永红', department: '地球与空间科学学院', rating: 4 },
  { id: 59, courseNo: '1034030', courseName: '魅力化学', credits: 2, teacher: '黄建彬', department: '化学与分子工程学院', rating: 3 },
];

export default function CourseList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCredits, setSelectedCredits] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [courses, setCourses] = useState(mockCourses);
  // 新增：排序状态（默认未排序）
  const [sortType, setSortType] = useState<'none' | 'desc' | 'asc'>('none');

  // 预留后端接口位置（不变）
  useEffect(() => {
    async function fetchCourses() {
      setCourses(mockCourses);
    }
    fetchCourses();
  }, []);

  // 筛选逻辑（不变）
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseNo.includes(searchQuery);

    const matchesCredits =
      selectedCredits === 'all' || course.credits === parseInt(selectedCredits);

    const matchesDepartment =
      selectedDepartment === 'all' || course.department === selectedDepartment;

    return matchesSearch && matchesCredits && matchesDepartment;
  });

  // 新增：排序逻辑（由父组件处理）
  const handleSortByRating = (coursesToSort: typeof filteredCourses) => {
    const sorted = [...coursesToSort].sort((a, b) => {
      const ratingA = Number(a.rating);
      const ratingB = Number(b.rating);
      // 根据当前排序方向决定升序/降序
      if (sortType === 'desc' || sortType === 'none') {
        setSortType('asc');
        return ratingB - ratingA; // 首次点击：降序
      } else {
        setSortType('desc');
        return ratingA - ratingB; // 再次点击：升序
      }
    });
    return sorted;
  };

  return (
    <div className="flex">
      <FilterSidebar
        selectedCredits={selectedCredits}
        setSelectedCredits={setSelectedCredits}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
      />

      <main className="flex-1 p-8">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {/* 传递筛选后的课程 + 排序回调 */}
        <CourseTable 
          courses={filteredCourses} 
          onSortByRating={handleSortByRating} 
        />
      </main>
    </div>
  );
}