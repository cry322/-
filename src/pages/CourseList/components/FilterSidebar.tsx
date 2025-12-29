interface FilterSidebarProps {
  selectedCredits: string;
  setSelectedCredits: (value: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
}

export function FilterSidebar({ 
  selectedCredits, 
  setSelectedCredits,
  selectedDepartment,
  setSelectedDepartment 
}: FilterSidebarProps) {
  const departments = [
    '光华管理学院',
    '国际关系学院',
    '城市与环境学院',
    '政府管理学院',
    '艺术学院',
    '中国语言文学系',
    '心理与认知科学学院',
    '地球与空间科学学院',
    '材料科学与工程学院',
    '马克思主义学院',
    '物理学院',
    '法学院',
    '哲学系',
    '新闻与传播学院',
    '历史学系',
    '信息管理系',
    '国家发展研究院',
    '数学科学学院',
    '外国语学院',
    '生命科学学院',
    '化学与分子工程学院',
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-sm border-r border-purple-100 p-6 shadow-sm">
      <h2 className="mb-6 text-center text-gray-700">筛选</h2>
      
      {/* 学分筛选 */}
      <div className="mb-8">
        <h3 className="mb-3 text-gray-600">学分</h3>
        <select 
          value={selectedCredits}
          onChange={(e) => setSelectedCredits(e.target.value)}
          className="w-full px-3 py-2 border border-purple-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="all">全部</option>
          <option value="2">2学分</option>
          <option value="3">3学分</option>
          <option value="4">4学分</option>
        </select>
      </div>

      {/* 开课单位筛选 */}
      <div>
        <h3 className="mb-3 text-gray-600">开课单位</h3>
        <select 
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full px-3 py-2 border border-purple-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="all">全部</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}