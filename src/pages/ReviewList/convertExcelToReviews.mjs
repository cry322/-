import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取 __dirname 的 ESM 方式
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('开始转换Excel数据...');
console.log('当前目录:', __dirname);

try {
  // 读取Excel文件
  const excelPath = path.join(__dirname, '元数据表_数据本身.xlsx');
  console.log('尝试读取文件:', excelPath);
  
  if (!fs.existsSync(excelPath)) {
    console.error('错误: Excel文件不存在');
    console.log('请将Excel文件放在以下位置:');
    console.log(excelPath);
    process.exit(1);
  }

  const workbook = xlsx.readFile(excelPath);
  console.log('Excel工作表:', workbook.SheetNames);

  // 使用第一个工作表
  const sheetName = workbook.SheetNames[0];
  console.log('使用工作表:', sheetName);
  
  const worksheet = workbook.Sheets[sheetName];
  
  // 将Excel数据转换为数组
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
  console.log(`读取到 ${data.length} 行数据`);
  
  // 表头行（第二行）
  const headers = data[1] || [];
  
  // 数据从第三行开始
  const rows = data.slice(2);
  
  console.log(`实际数据行数: ${rows.length}`);

  // 转换函数
  function convertRowToReview(row, index) {
    try {
      // Excel 列索引（从0开始）
      const colIndexes = {
        id: 0,          // A列：测评id
        courseName: 2,  // C列：课程名称
        teacher: 4,     // E列：授课教师
        semester: 6,    // G列：开课学期
        overallScore: 14, // O列：综合评分
        taskLoad: 15,   // P列：任务量评分
        difficulty: 17, // R列：课程难度评分
        grading: 19,    // T列：给分宽严评分
        teaching: 16,   // Q列：听课体验评分
        harvest: 18,    // S列：收获程度评分
        content: 12,    // M列：文本测评
        courseId: 21,   // V列：课程号
        publishDate:29  // AI列：测评创建时间
      };

      // 解析分数
      const parseScore = (value) => {
        if (value === undefined || value === null || value === '') return 0;
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
      };

      // 解析日期 - 处理各种格式
      const parseDate = (value) => {
        if (!value || value === '' || value === undefined || value === null) {
          // 如果为空，设置为今天
          return new Date().toISOString().split('T')[0];
        }
        
        try {
          // 如果是数字（Excel日期序列值）
          if (typeof value === 'number') {
            // Excel日期序列值转换为JavaScript日期
            // Excel日期序列值是从1900年1月1日开始的日期（注意1900年闰年错误）
            const excelEpoch = new Date(1900, 0, 1);
            // 减去1天，因为Excel错误地将1900年当作闰年
            const days = value - 1;
            const date = new Date(excelEpoch.getTime() + days * 86400000);
            
            // 验证日期是否有效
            if (isNaN(date.getTime())) {
              console.warn(`行 ${index + 1}: 无法解析Excel日期序列值: ${value}`);
              return new Date().toISOString().split('T')[0];
            }
            
            // 返回格式化日期
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
          
          // 如果是字符串
          if (typeof value === 'string') {
            // 清理字符串
            const cleaned = value.trim();
            
            if (!cleaned) {
              return new Date().toISOString().split('T')[0];
            }
            
            // 尝试解析格式：2025-08-01 00:00:00
            const dateMatch = cleaned.match(/(\d{4})-(\d{2})-(\d{2})/);
            if (dateMatch) {
              const year = dateMatch[1];
              const month = dateMatch[2];
              const day = dateMatch[3];
              return `${year}-${month}-${day}`;
            }
            
            // 尝试用Date对象解析
            const date = new Date(cleaned);
            if (!isNaN(date.getTime())) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              return `${year}-${month}-${day}`;
            }
          }
          
          // 如果都失败，返回今天
          console.warn(`行 ${index + 1}: 无法解析日期: ${value} (类型: ${typeof value})`);
          return new Date().toISOString().split('T')[0];
        } catch (error) {
          console.error(`行 ${index + 1}: 解析日期时出错:`, error);
          return new Date().toISOString().split('T')[0];
        }
      };

      // 处理教师字段
      const parseTeacher = (teacherStr) => {
        if (!teacherStr) return '未知教师';
        // 取第一个教师
        const teachers = teacherStr.toString()
          .replace(/，/g, ',')
          .split(',')[0]
          .trim();
        return teachers || '未知教师';
      };

      const courseName = row[colIndexes.courseName] || '';
      const teacher = parseTeacher(row[colIndexes.teacher]);
      const semester = row[colIndexes.semester] || '';
      const courseId = row[colIndexes.courseId] || `COURSE_${index + 1}`;
      const publishDate = parseDate(row[colIndexes.publishDate]);
      
      const id = parseInt(row[colIndexes.id]) || index + 1;
      
      // 获取分数
      const overallScore = parseScore(row[colIndexes.overallScore]);
      const taskLoad = parseScore(row[colIndexes.taskLoad]);
      const difficulty = parseScore(row[colIndexes.difficulty]);
      const grading = parseScore(row[colIndexes.grading]);
      const teachingScore = parseScore(row[colIndexes.teaching]);
      const harvest = parseScore(row[colIndexes.harvest]);

      // 获取内容并清理
      let content = row[colIndexes.content] || '';
      if (typeof content === 'string') {
        content = content
          .replace(/<br>/g, '\n')
          .replace(/<br\s*\/?>/g, '\n')
          .replace(/\r\n/g, '\n')
          .trim();
        
        // 截取适当长度
        if (content.length > 800) {
          content = content.substring(0, 800) + '...';
        }
      }

      return {
        id,
        courseId: courseId.toString(),
        courseName: courseName.toString(),
        teacher,
        semester: semester.toString(),
        publishDate,
        overallScore,
        taskLoad,
        difficulty,
        grading,
        teaching: teachingScore,
        harvest,
        content
      };
    } catch (error) {
      console.error(`转换第 ${index + 1} 行数据时出错:`, error.message);
      return null;
    }
  }

  // 转换所有行
  const reviews = [];
  for (let i = 0; i < rows.length; i++) {
    const review = convertRowToReview(rows[i], i);
    if (review && review.courseName && review.courseName.trim() !== '') {
      reviews.push(review);
    }
  }

  console.log(`成功转换 ${reviews.length} 条有效测评数据`);

  // 保存为JSON文件
  const outputPath = path.join(__dirname, 'reviews_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(reviews, null, 2), 'utf8');
  console.log(`数据已保存到: ${outputPath}`);

  // 生成TypeScript接口文件
  const tsInterface = `// 自动生成的测评数据
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

export const reviewsData: Review[] = ${JSON.stringify(reviews, null, 2)};
`;

  const tsOutputPath = path.join(__dirname, 'reviews_data.ts');
  fs.writeFileSync(tsOutputPath, tsInterface, 'utf8');
  console.log(`TypeScript文件已保存到: ${tsOutputPath}`);

  // 显示前3条数据示例
  console.log('\n前3条数据示例:');
  reviews.slice(0, 3).forEach((review, i) => {
    console.log(`\n[${i + 1}] ${review.courseName} - ${review.teacher}`);
    console.log(`  学期: ${review.semester}, ID: ${review.id}`);
    console.log(`  综合: ${review.overallScore}, 任务量: ${review.taskLoad}, 难度: ${review.difficulty}`);
    console.log(`  内容预览: ${review.content.substring(0, 80)}...`);
  });

} catch (error) {
  console.error('转换过程中发生错误:', error);
  process.exit(1);
}