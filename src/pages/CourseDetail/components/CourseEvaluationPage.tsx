// src/pages/CourseDetail/components/CourseEvaluationPage.tsx
import React, { useEffect, useState } from "react";
import { Star, ChevronRight, ThumbsUp, Users } from "lucide-react";
import { courseApi, TeacherDTO } from "../../../services/courseApi";
import { CourseInfoCard } from "./CourseInfoCard";
import { TeacherCard } from "./TeacherCard";
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

interface CourseEvaluationPageProps {
  courseId: number; 
}

export function CourseEvaluationPage({ courseId }: CourseEvaluationPageProps) {
  const [teachers, setTeachers] = useState<TeacherDTO[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("全部");

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    courseApi.getCourseTeachers(courseId)
      .then((data) => {
        if (!ac.signal.aborted) {
          setTeachers(data);
        }
      })
      .catch((err) => {
        if (!ac.signal.aborted) {
          setError(err?.message ?? "加载教师信息失败");
        }
      })
      .finally(() => {
        if (!ac.signal.aborted) {
          setLoading(false);
        }
      });

    return () => ac.abort();
  }, [courseId]);

  const teacherTitles = teachers
    ? Array.from(new Set(teachers.map(t => t.title).filter(Boolean)))
    : [];

  const filteredTeachers = selectedTeacher === "全部"
    ? teachers
    : teachers?.filter(t => t.title === selectedTeacher) || [];

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
                { label: '民主的历史与现实' }
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
            <CourseInfoCard />
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
                    <TeacherCard key={`skeleton-${i}`} isPlaceholder colorIndex={i} />
                  ))
                ) : filteredTeachers && filteredTeachers.length > 0 ? (
                  filteredTeachers.map((t, i) => (
                    <TeacherCard
                      key={t.id}
                      id={t.id.toString()}
                      title={t.title}
                      subtitle={t.subtitle}
                      description={t.description}
                      weeks={t.weeks}
                      about={t.about}
                      reviewDetail={t.reviewDetail}
                      capacity={t.capacity}
                      likes={t.likes}
                      colorIndex={i}
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