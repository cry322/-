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

  // 解析教师信息
  function parseTeachers(teacherStr, teacherAliasStr) {
    if (!teacherStr) return [];
    
    const teachers = [];
    const mainTeachers = teacherStr.toString().split(/[，,]/).map(t => t.trim()).filter(Boolean); // 分割教师姓名
    const aliasTeachers = teacherAliasStr ? teacherAliasStr.toString().split(/[，,]/).map(t => t.trim()).filter(Boolean) : [];
    
    // 为每个教师创建对象
    mainTeachers.forEach((teacher, index) => {
      const teacherObj = {
        name: teacher,
        alias: aliasTeachers[index] || '',
        title: teacher, // 默认使用教师姓名作为title
        subtitle: '', // 可以为空或添加其他信息
        description: `授课教师：${teacher}`,
        about: '',
        weeks: '1-16周', // 默认周数，实际数据中可能需要调整
        capacity: 0, // 容量信息
        likes: Math.floor(Math.random() * 100) + 1, // 随机点赞数
        reviewDetail: {
          count: Math.floor(Math.random() * 50) + 1, // 随机评价数量
          avgScore: 0 // 平均分，稍后计算
        }
      };
      teachers.push(teacherObj);
    });
    
    return teachers;
  }

  // 转换函数 - 生成课程和教师数据
  function convertRowToCourseData(row, index) {
    try {
      // Excel 列索引（从0开始）
      const colIndexes = {
        id: 0,          // A列：测评id
        courseName: 2,  // C列：课程名称
        teacher: 4,     // E列：授课教师
        teacherAlias: 5, // F列：教师别称
        semester: 6,    // G列：开课学期
        courseCategory: 7, // H列：课程类别
        courseSubCategory: 8, // I列：课程子类
        courseType: 9,  // J列：通识核心/通选
        credits: 10,    // K列：学分
        assessment: 11, // L列：考核方式
        overallScore: 14, // O列：综合评分
        taskLoad: 15,   // P列：任务量评分
        difficulty: 17, // R列：课程难度评分
        grading: 19,    // T列：给分宽严评分
        teaching: 16,   // Q列：听课体验评分
        harvest: 18,    // S列：收获程度评分
        content: 12,    // M列：文本测评
        courseId: 21,   // V列：课程号
        department: 23, // X列：开课院系
        publishDate: 29 // AI列：测评创建时间
      };

      // 解析分数
      const parseScore = (value) => {
        if (value === undefined || value === null || value === '') return 0;
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
      };

      // 处理课程基本信息
      const courseName = row[colIndexes.courseName] || '';
      const courseId = row[colIndexes.courseId] || `COURSE_${index + 1}`; /// 使用课程号或生成一个唯一ID
      const semester = row[colIndexes.semester] || '';
      const courseCategory = row[colIndexes.courseCategory] || '';
      const courseSubCategory = row[colIndexes.courseSubCategory] || '';
      const courseType = row[colIndexes.courseType] || '';
      const credits = row[colIndexes.credits] || '';
      const department = row[colIndexes.department] || '';
      const assessment = row[colIndexes.assessment] || '';
      
      // 获取分数
      const overallScore = parseScore(row[colIndexes.overallScore]);
      const taskLoad = parseScore(row[colIndexes.taskLoad]);
      const difficulty = parseScore(row[colIndexes.difficulty]);
      const grading = parseScore(row[colIndexes.grading]);
      const teachingScore = parseScore(row[colIndexes.teaching]);
      const harvest = parseScore(row[colIndexes.harvest]);
      
      // 计算平均分
      const avgScore = overallScore > 0 ? overallScore : 
        (taskLoad + teachingScore + harvest + grading) / 4;

      // 获取内容并清理
      let content = row[colIndexes.content] || '';
      if (typeof content === 'string') {
        content = content
          .replace(/<br>/g, '\n')
          .replace(/<br\s*\/?>/g, '\n')
          .replace(/\r\n/g, '\n')
          .trim();
      }

      // 解析教师信息
      const teachers = parseTeachers(
        row[colIndexes.teacher], 
        row[colIndexes.teacherAlias]
      );

      // 为每个教师添加评价信息
      teachers.forEach(teacher => {
        // 为每个教师生成唯一的ID
        teacher.id = `${courseId}_${teacher.name}`.replace(/\s+/g, '_');
        teacher.reviewDetail.avgScore = avgScore;
        
        // 添加具体的评价内容（如果需要）
        teacher.reviewDetail.reviews = [{
          id: index + 1,
          content: content.length > 200 ? content.substring(0, 200) + '...' : content,
          scores: {
            overall: overallScore,
            taskLoad,
            difficulty,
            grading,
            teaching: teachingScore,
            harvest
          },
          semester
        }];
      });

      return {
        course: {
          id: parseInt(courseId) || index + 1,
          courseId: courseId.toString(),
          name: courseName,
          department,
          credits,
          category: courseCategory,
          subCategory: courseSubCategory,
          type: courseType,
          semester,
          assessment
        },
        teachers,
        reviews: [{
          id: index + 1,
          courseId: courseId.toString(),
          courseName,
          teacher: teachers.length > 0 ? teachers[0].name : '未知教师',
          semester,
          overallScore,
          taskLoad,
          difficulty,
          grading,
          teaching: teachingScore,
          harvest,
          content: content.length > 200 ? content.substring(0, 200) + '...' : content,
          fullContent: content
        }]
      };
    } catch (error) {
      console.error(`转换第 ${index + 1} 行数据时出错:`, error.message);
      return null;
    }
  }

  // 按课程ID分组数据
  const courseDataMap = new Map(); // key: courseId, value: courseData object
  
  for (let i = 0; i < rows.length; i++) {
    const data = convertRowToCourseData(rows[i], i);
    if (!data || !data.course.name || data.course.name.trim() === '') continue;
    
    const courseId = data.course.courseId;
    
    if (courseDataMap.has(courseId)) {
      // 如果已存在该课程，合并教师和评价信息
      const existing = courseDataMap.get(courseId);
      
      // 合并教师信息（避免重复）
      data.teachers.forEach(newTeacher => {
        const existingTeacher = existing.teachers.find(t => t.name === newTeacher.name);
        if (!existingTeacher) {
          existing.teachers.push(newTeacher);
        } else {
          // 合并评价信息
          if (newTeacher.reviewDetail.reviews && newTeacher.reviewDetail.reviews.length > 0) {
            existingTeacher.reviewDetail.reviews.push(...newTeacher.reviewDetail.reviews);
            existingTeacher.reviewDetail.count = existingTeacher.reviewDetail.reviews.length;
            // 重新计算平均分
            const totalScore = existingTeacher.reviewDetail.reviews.reduce((sum, review) => 
              sum + (review.scores?.overall || 0), 0);
            existingTeacher.reviewDetail.avgScore = totalScore / existingTeacher.reviewDetail.reviews.length;
          }
        }
      });
      
      // 添加新的评价
      existing.reviews.push(...data.reviews);
    } else {
      courseDataMap.set(courseId, data);
    }
  }

  // 转换为数组
  const courseData = Array.from(courseDataMap.values());
  
  console.log(`成功转换 ${courseData.length} 门课程数据`);

  // 保存为JSON文件
  const outputPath = path.join(__dirname, 'course_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(courseData, null, 2), 'utf8');
  console.log(`课程数据已保存到: ${outputPath}`);

  // 生成TypeScript接口文件
  const tsInterface = `// 自动生成的课程数据
export interface TeacherReviewDetail {
  count: number;
  avgScore: number;
  reviews?: {
    id: number;
    content: string;
    scores: {
      overall: number;
      taskLoad: number;
      difficulty: number;
      grading: number;
      teaching: number;
      harvest: number;
    };
    semester: string;
  }[];
}

export interface TeacherDTO {
  id: string;
  name: string;
  alias: string;
  title: string;
  subtitle: string;
  description: string;
  about: string;
  weeks: string;
  capacity: number;
  likes: number;
  reviewDetail: TeacherReviewDetail;
}

export interface CourseInfo {
  id: number;
  courseId: string;
  name: string;
  department: string;
  credits: string;
  category: string;
  subCategory: string;
  type: string;
  semester: string;
  assessment: string;
}

export interface CourseData {
  course: CourseInfo;
  teachers: TeacherDTO[];
  reviews: {
    id: number;
    courseId: string;
    courseName: string;
    teacher: string;
    semester: string;
    overallScore: number;
    taskLoad: number;
    difficulty: number;
    grading: number;
    teaching: number;
    harvest: number;
    content: string;
    fullContent: string;
  }[];
}

export const courseData: CourseData[] = ${JSON.stringify(courseData, null, 2)};

// 按课程ID查找的辅助函数
export function getCourseById(courseId: string | number): CourseData | undefined {
  return courseData.find(c => c.course.courseId === courseId.toString() || c.course.id === parseInt(courseId.toString()));
}

export function getCourseTeachers(courseId: string | number): TeacherDTO[] {
  const course = getCourseById(courseId);
  return course ? course.teachers : [];
}

export function getCourseReviews(courseId: string | number) {
  const course = getCourseById(courseId);
  return course ? course.reviews : [];
}
`;

  const tsOutputPath = path.join(__dirname, 'course_data.ts');
  fs.writeFileSync(tsOutputPath, tsInterface, 'utf8');
  console.log(`TypeScript文件已保存到: ${tsOutputPath}`);

  // 显示前3门课程数据示例
  console.log('\n前3门课程数据示例:');
  courseData.slice(0, 3).forEach((course, i) => {
    console.log(`\n[${i + 1}] ${course.course.name} (ID: ${course.course.courseId})`);
    console.log(`  院系: ${course.course.department}, 学分: ${course.course.credits}`);
    console.log(`  教师数量: ${course.teachers.length}, 评价数量: ${course.reviews.length}`);
    
    if (course.teachers.length > 0) {
      console.log(`  教师示例: ${course.teachers[0].name} (${course.teachers[0].alias})`);
      console.log(`    评价数: ${course.teachers[0].reviewDetail.count}, 平均分: ${course.teachers[0].reviewDetail.avgScore.toFixed(1)}`);
    }
  });

} catch (error) {
  console.error('转换过程中发生错误:', error);
  process.exit(1);
}