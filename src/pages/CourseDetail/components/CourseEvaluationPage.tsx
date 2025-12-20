// src/pages/CourseDetail/components/CourseEvaluationPage.tsx
import React, { useEffect, useState } from "react";
import { Star, ChevronRight, ThumbsUp, Users } from "lucide-react";
import { courseApi, TeacherDTO } from "../../../services/courseApi";
import { CourseInfoCard } from "./CourseInfoCard";
import { TeacherCard } from "./TeacherCard";


interface CourseEvaluationPageProps {
  courseId: number; // 或 string，取决于你的路由参数类型
}
export function CourseEvaluationPage({ courseId }: CourseEvaluationPageProps) {
  const [teachers, setTeachers] = useState<TeacherDTO[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    // courseId 已经是 number 类型，直接使用
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-center text-gray-800 mb-4">导航栏-测评详情界面,这个部分后续要和主页统一一下？</h1>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>通识课</span>
            <span>&gt;</span>
            <span>通识核心课</span>
            <span>&gt;</span>
            <span>民主的历史与现实</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Left Column - Course Info */}
          <div className="w-80 flex-shrink-0">
            <CourseInfoCard />
          </div>

          {/* Right Column - Teacher Sections */}
          <div className="flex-1 bg-white/50 rounded-2xl p-6">
            {/* 显示 loading / error */}
            {loading && <div>加载中...</div>}
            {error && <div className="text-red-500">错误：{error}</div>}

            {/* 成功或空态渲染 */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {teachers && teachers.length > 0 ? (
                  // 将后端数据映射为 TeacherCard
                  teachers.map((t, i) => <TeacherCard key={t.id} {...t} colorIndex={i} />)
                ) : (
                  // 空态：显示占位卡（与之前的 additionalSections 相同效果）
                  [1, 2, 3].map((n, i) => (
                    <TeacherCard key={`ph-${n}`} isPlaceholder colorIndex={i} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}