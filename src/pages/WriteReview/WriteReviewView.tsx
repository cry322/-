import { useEffect, useState } from 'react';
import {
  GraduationCap,
  FileText,
  Award,
  Lightbulb,
  Scale,
  HelpCircle,
  BookOpen,
  AlertCircle,
  Star,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { RatingDimension } from './components/RatingDimension';
import { TagSelector } from './components/TagSelector';
import { TextEditor } from './components/TextEditor';
import { SuccessModal } from './components/SuccessModal';
import { GradeRangeSelector } from './components/GradeRangeSelector';

export default function WriteReviewView() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId?: string }>();
  const hasCourse = Boolean(courseId);

  /* ================= 状态 ================= */
  const [ratings, setRatings] = useState<Record<string, number>>({
    overall: 0,
    teaching: 0,
    workload: 0,
    grading: 0,
    learning: 0,
    assessment: 0,
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [gradeRange, setGradeRange] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /* ================= 草稿恢复 ================= */
  useEffect(() => {
    const saved = localStorage.getItem('write-review-draft');
    if (!saved) return;

    try {
      const draft = JSON.parse(saved);
      setRatings(draft.ratings ?? {});
      setSelectedTags(draft.selectedTags ?? []);
      setReviewText(draft.reviewText ?? '');
      setIsAnonymous(draft.isAnonymous ?? true);
      setGradeRange(draft.gradeRange ?? '');
    } catch {
      console.warn('草稿解析失败');
    }
  }, []);

  /* ================= 常量 ================= */
  const ratingDimensions = [
    { id: 'overall', label: '综合评分', icon: <Star className="w-5 h-5" />, description: '对课程整体打分' },
    { id: 'teaching', label: '教学质量', icon: <GraduationCap className="w-5 h-5" />, description: '讲课清晰度、教学方法' },
    { id: 'workload', label: '任务量', icon: <FileText className="w-5 h-5" />, description: '课业负担程度' },
    { id: 'grading', label: '给分友好度', icon: <Award className="w-5 h-5" />, description: '成绩评定宽松度' },
    { id: 'learning', label: '课堂收获', icon: <Lightbulb className="w-5 h-5" />, description: '知识获得与能力提升' },
    { id: 'assessment', label: '课程难度', icon: <Scale className="w-5 h-5" />, description: '考试内容与难度' },
  ];

  const courseTags = {
    courseFeatures: ['课程干货多', '理论深入', '实践性强', '前沿内容'],
    assessmentStyle: ['考试难', '开卷考试', '无考试', '无论文', '考勤严格', '不考勤', '任务量大'],
    teachingStyle: ['讲课生动', '互动性强', '注重讨论', '课件详细', '答疑及时', '给分好'],
  };

  /* ================= 计算 ================= */
  const hasUnratedDimensions = ratingDimensions.some(
    (d) => !ratings[d.id] || ratings[d.id] === 0
  );
  const isReviewTooShort = reviewText.trim().length < 50;

  const averageRating =
    Object.values(ratings).filter((v) => v > 0).length === 0
      ? 0
      : Object.values(ratings).reduce((a, b) => a + b, 0) /
        Object.values(ratings).filter((v) => v > 0).length;

  /* ================= 事件 ================= */
  const handleRatingChange = (id: string, value: number) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSaveDraft = () => {
    const draft = {
      ratings,
      selectedTags,
      reviewText,
      isAnonymous,
      gradeRange,
      savedAt: Date.now(),
    };
    localStorage.setItem('write-review-draft', JSON.stringify(draft));
    alert('草稿已保存');
  };

  const handlePublish = () => {
    if (hasUnratedDimensions || isReviewTooShort || !hasCourse) {
      setShowErrors(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    localStorage.removeItem('write-review-draft');
    setShowErrors(false);
    setShowSuccessModal(true);
  };

  /* ================= 渲染 ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        {showErrors && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="text-red-700 text-sm">
              {!hasCourse && <div>• 请先选择课程</div>}
              {hasUnratedDimensions && <div>• 请完成所有评分维度</div>}
              {isReviewTooShort && <div>• 详细评价不少于 50 字</div>}
            </div>
          </div>
        )}

        {/* 课程信息 */}
        {hasCourse ? (
          <div className="bg-white rounded-xl border p-6 mb-6 flex gap-4">
            <div className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg">课程 ID：{courseId}</h2>
              <p className="text-gray-500">（后续可根据 courseId 获取真实课程信息）</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-dashed p-6 mb-6 text-center">
            <p className="text-gray-500 mb-4">请先选择要评价的课程</p>
            <button
              onClick={() => navigate('/courses')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              去选择课程
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左栏 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h3>课程评分</h3>
                  <p className="text-gray-500">请为各维度评分</p>
                </div>
                {averageRating > 0 && (
                  <div className="text-blue-600">{averageRating.toFixed(1)}</div>
                )}
              </div>

              {ratingDimensions.map((d) => (
                <RatingDimension
                  key={d.id}
                  icon={d.icon}
                  label={d.label}
                  description={d.description}
                  value={ratings[d.id]}
                  onChange={(v) => handleRatingChange(d.id, v)}
                />
              ))}
            </div>

            <div className="bg-white rounded-xl border p-6 space-y-6">
              <TagSelector
                tags={courseTags.courseFeatures}
                selectedTags={selectedTags}
                onToggle={handleTagToggle}
              />
              <TagSelector
                tags={courseTags.assessmentStyle}
                selectedTags={selectedTags}
                onToggle={handleTagToggle}
              />
              <TagSelector
                tags={courseTags.teachingStyle}
                selectedTags={selectedTags}
                onToggle={handleTagToggle}
              />
            </div>

            <GradeRangeSelector value={gradeRange} onChange={setGradeRange} />

            <div className="bg-white rounded-xl border p-6">
              <TextEditor value={reviewText} onChange={setReviewText} />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 border rounded-xl"
              >
                保存草稿
              </button>

              <button
                onClick={handlePublish}
                className="px-8 py-3 bg-blue-500 text-white rounded-xl"
              >
                发布评价
              </button>
            </div>
          </div>

          {/* 右栏 */}
          <div className="bg-white rounded-xl border p-6 h-fit sticky top-24">
            <h3 className="mb-4">评价提示</h3>
            <p className="text-gray-500 text-sm">
              请基于真实体验，客观公正地进行评价。
            </p>
          </div>
        </div>
      </main>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/reviews/456');
        }}
      />
    </div>
  );
}
