/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/CourseDetail/components/CourseEvaluationPage.tsx
import React, { useEffect, useState } from "react";
import { CourseInfoCard } from "./CourseInfoCard";
import { TeacherCard } from "./TeacherCard";
import { Link, useNavigate } from 'react-router-dom'; // 添加 useNavigate
import Breadcrumbs from '../../../components/Breadcrumbs';
import courseData from "../course_data.json";

// 组件属性定义
interface CourseEvaluationPageProps {
  courseId: number; 
}

// 本地课程数据中教师的结构（与 TeacherCardProps 对齐）
interface LocalTeacher {
  id: string;
  name: string;
  alias?: string;
  title: string;
  subtitle?: string;
  description?: string;
  weeks?: string; // 本地 JSON 中是字符串，比如 "1-16周"
  about?: string;
  capacity?: number;
  reviewDetail?: any; // 结构与 TeacherCard 内部的 TeacherReviewDetail 一致，这里用 any 简化
}

// 课程评价页面组件
export function CourseEvaluationPage({ courseId }: CourseEvaluationPageProps) {
  const [teachers, setTeachers] = useState<LocalTeacher[] | null>(null); // 教师列表（本地模拟数据）
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState<string | null>(null); // 错误信息
  const [selectedTeacher, setSelectedTeacher] = useState<string>("全部"); // 选中的教师姓名
  const [courseName, setCourseName] = useState<string>(""); // 当前课程名称
  
  const navigate = useNavigate(); // 添加导航钩子

  // 从本地 JSON 获取教师列表
  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    // 在本地模拟数据中查找对应课程
    const matchedCourse = (courseData as any[]).find((item) => {
      const c = item.course || {};
      return c.courseId === String(courseId) || c.id === courseId;
    });

    if (!ac.signal.aborted) {
      if (matchedCourse) {
        setCourseName(matchedCourse.course?.name ?? "");
        const localTeachers: LocalTeacher[] = (matchedCourse.teachers || []).map((t: any) => ({
          id: String(t.id),
          name: t.name || t.title || "",
          alias: t.alias,
          title: t.title || t.name || "",
          subtitle: t.subtitle,
          description: t.description,
          weeks: t.weeks, // 本地是字符串
          about: t.about,
          capacity: typeof t.capacity === "number" ? t.capacity : Number(t.capacity) || 0,
          reviewDetail: t.reviewDetail,
        }));
        setTeachers(localTeachers);
      } else {
        setCourseName("");
        setTeachers([]);
        setError("未在本地模拟数据中找到该课程");
      }
      setLoading(false);
    }

    return () => ac.abort();
  }, [courseId]);

  // 处理教师卡片点击事件
  const handleTeacherClick = (teacherId: string) => {
    // 跳转到教师详情页面，这里假设路由是 /teacher/:teacherId
    // 或者跳转到课程详情下的教师页面：/courses/:courseId/teachers/:teacherId
    navigate(`/courses/${courseId}/teachers/${teacherId}`);
    
    // 如果你希望跳转到专门的教师详情页（不依赖于课程）：
    // navigate(`/teachers/${teacherId}`);
  };

  // 提取唯一教师标题列表用于筛选
  const teacherTitles = teachers
    ? Array.from(new Set(teachers.map(t => t.name || t.title).filter(Boolean)))
    : [];

  const filteredTeachers = selectedTeacher === "全部"
    ? teachers
    : teachers?.filter(t => (t.name || t.title) === selectedTeacher) || [];

  // 渲染组件
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
            <Breadcrumbs
              items={[
                { label: '课程库', path: '/courses' },
                { label: courseName || '课程详情' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Course Info */}
          <div className="lg:w-80 flex-shrink-0">
            <CourseInfoCard courseId={courseId} />
          </div>

          {/* Right Column - Teacher Sections */}
          <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl p-6 space-y-6 min-h-[300px] shadow-sm">
            {/* 操作栏：筛选 + 写测评按钮 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* 筛选教师下拉框 */}
              {!loading && !error && teachers && teachers.length > 0 && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">筛选教师：</label>
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  >
                    <option value="全部">全部</option>
                    {teacherTitles.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* 写入测评按钮 */}
              <Link
                to={`/courses/${courseId}/write-review`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                ✍️ 写入测评
              </Link>
            </div>

            {/* 教师卡片区域 */}
            {error ? (
              <div className="py-6 text-center text-red-500">加载失败：{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <TeacherCard
                      key={`skeleton-${i}`}
                      id={`skeleton-${i}`}
                      name="占位教师"
                      title="占位教师职称"
                      isPlaceholder
                      colorIndex={i}
                    />
                  ))
                ) : filteredTeachers && filteredTeachers.length > 0 ? (
                  filteredTeachers.map((t, i) => (
                    <TeacherCard
                      key={t.id}
                      id={t.id}
                      name={t.name || t.title}
                      alias={t.alias}
                      title={t.title}
                      subtitle={t.subtitle}
                      description={t.description}
                      weeks={t.weeks}
                      about={t.about}
                      reviewDetail={t.reviewDetail}
                      capacity={t.capacity}
                      courseId={String(courseId)}
                      courseName={courseName}
                      colorIndex={i}
                      onClick={() => handleTeacherClick(t.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center text-gray-500">
                    暂无符合条件的教师信息
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>  
    </div>
  );
}