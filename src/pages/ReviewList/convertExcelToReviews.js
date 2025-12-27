const XLSX = require('xlsx');
const fs = require('fs');

// 读取Excel文件
const workbook = XLSX.readFile('元数据表_数据本身.xlsx');

// 选择工作表（这里使用Sheet1）
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 将Excel数据转换为JSON
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// 提取表头（第一行）
const headers = data[1]; // 第二行是真正的表头（第一行是空行和分类）

// 从第三行开始是数据
const rows = data.slice(2);

// 定义转换函数
function convertRowToReview(row, index) {
  // 获取对应的字段，注意Excel列索引
  const courseName = row[2] || ''; // C列：课程名称
  const teacher = row[4] || ''; // E列：授课教师
  const semester = row[6] || ''; // G列：开课学期
  const overallScore = parseFloat(row[13]) || 0; // N列：综合评分（得分0）
  const taskLoad = parseFloat(row[14]) || 0; // O列：任务量评分（得分1）
  const difficulty = parseFloat(row[16]) || 0; // Q列：课程难度评分（得分3）
  const grading = parseFloat(row[18]) || 0; // S列：给分宽严评分（得分5）
  const teaching = parseFloat(row[15]) || 0; // P列：听课体验评分（得分2）
  const harvest = parseFloat(row[17]) || 0; // R列：收获程度评分（得分4）
  const content = row[11] || ''; // L列：文本测评
  const courseId = row[19] || ''; // T列：课程号
  const publishDate = row[39] || row[37] || new Date().toISOString().split('T')[0]; // AI列或AE列
  
  // 生成测评ID（如果没有，使用行号）
  const id = parseInt(row[0]) || index + 1;
  
  return {
    id,
    courseId: courseId.toString(),
    courseName,
    teacher,
    semester,
    publishDate,
    overallScore,
    taskLoad,
    difficulty,
    grading,
    teaching,
    harvest,
    content: content.replace(/<br>/g, '\n') // 将<br>转换为换行
  };
}

// 转换所有行
const reviews = rows.map((row, index) => convertRowToReview(row, index));

// 过滤掉无效数据（至少要有课程名）
const validReviews = reviews.filter(review => 
  review.courseName && review.courseName.trim() !== ''
);

console.log(`成功转换 ${validReviews.length} 条测评数据`);

// 保存为JSON文件
fs.writeFileSync('reviews_data.json', JSON.stringify(validReviews, null, 2), 'utf8');
console.log('数据已保存到 reviews_data.json');

// 同时生成TypeScript接口文件（可选）
const tsContent = `
// 自动生成的测评数据
export interface Review {
  id: number;
  courseId: string;
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

export const reviewsData: Review[] = ${JSON.stringify(validReviews, null, 2)};
`;

fs.writeFileSync('reviews_data.ts', tsContent, 'utf8');
console.log('TypeScript文件已保存到 reviews_data.ts');