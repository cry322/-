import { useState } from 'react';
import { ArrowLeft, GraduationCap, FileText, Award, Lightbulb, Scale, HelpCircle, BookOpen, Users, Home, AlertCircle, Star } from 'lucide-react';
import { StarRating } from './components/StarRating';
import { RatingDimension } from './components/RatingDimension';
import { TagSelector } from './components/TagSelector';
import { TextEditor } from './components/TextEditor';
import { SuccessModal } from './components/SuccessModal';
import { GradeRangeSelector } from './components/GradeRangeSelector';
import { useNavigate } from 'react-router-dom';

interface RatingDimension {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: number;
}

export default function WriteReviewView() {
  const navigate = useNavigate();
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
  const [allowComments, setAllowComments] = useState(true);
  const [showErrors, setShowErrors] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [gradeRange, setGradeRange] = useState('');

  const ratingDimensions = [
    { id: 'overall', label: '综合评分', icon: <Star className="w-5 h-5" />, description: '对课程整体打分' },
    { id: 'teaching', label: '教学质量', icon: <GraduationCap className="w-5 h-5" />, description: '讲课清晰度、教学方法' },
    { id: 'workload', label: '任务量', icon: <FileText className="w-5 h-5" />, description: '课业负担程度' },
    { id: 'grading', label: '给分友好度', icon: <Award className="w-5 h-5" />, description: '成绩评定宽松度' },
    { id: 'learning', label: '课堂收获', icon: <Lightbulb className="w-5 h-5" />, description: '知识获得与能力提升' },
    { id: 'assessment', label: '课程难度', icon: <Scale className="w-5 h-5" />, description: '考试内容与难度' },
  ];

  const courseTags = {
    courseFeatures: [
      '课程干货多',
      '理论深入',
      '实践性强',
      '前沿内容',
    ],
    assessmentStyle: [
      '考试难',
      '开卷考试',
      '无考试',
      '无论文',
      '考勤严格',
      '不考勤',
      '任务量大',
    ],
    teachingStyle: [
      '讲课生动',
      '互动性强',
      '注重讨论',
      '课件详细',
      '答疑及时',
      '给分好',
    ],
  };

  const handleRatingChange = (id: string, value: number) => {
    setRatings(prev => ({ ...prev, [id]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handlePublish = () => {
    // Validate ratings
    const unratedDimensions = ratingDimensions.filter(d => !ratings[d.id] || ratings[d.id] === 0);
    if (unratedDimensions.length > 0) {
      setShowErrors(true);
      // Scroll to rating section
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    if (!reviewText.trim() || reviewText.length < 50) {
      setShowErrors(true);
      return;
    }

    // Simulate publish
    setShowSuccessModal(true);
    setShowErrors(false);
  };

  const hasUnratedDimensions = ratingDimensions.some(d => !ratings[d.id] || ratings[d.id] === 0);
  const isReviewTooShort = reviewText.length < 50;

  const averageRating = Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).filter(v => v > 0).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/courses/101')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回</span>
            </button>

            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-gray-900">发布课程评价</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Error Banner */}
        {showErrors && (hasUnratedDimensions || isReviewTooShort) && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-red-900 mb-1">请完善以下信息后再发布</div>
              <ul className="text-red-700 space-y-1">
                {hasUnratedDimensions && <li>• 请完成所有评分维度的评分</li>}
                {isReviewTooShort && <li>• 详细评价至少需要50个字符</li>}
              </ul>
            </div>
            <button 
              onClick={() => setShowErrors(false)}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Course Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-2">数据结构与算法</h2>
              <p className="text-gray-600 mb-4">张华教授 · 2024年秋季学期</p>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">课程代码:</span>
                  <span>CS101</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">学分:</span>
                  <span>4.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">开课学院:</span>
                  <span>信息科学技术学院</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">课程性质:</span>
                  <span>专业必修</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Rating Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rating Dimensions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900 mb-1">课程评分</h3>
                  <p className="text-gray-500">请为以下各个维度进行评分</p>
                </div>
                {averageRating > 0 && (
                  <div className="text-center">
                    <div className="text-gray-500 mb-1">综合评分</div>
                    <div className="text-blue-600">{averageRating.toFixed(1)}</div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {ratingDimensions.map((dimension) => (
                  <RatingDimension
                    key={dimension.id}
                    icon={dimension.icon}
                    label={dimension.label}
                    description={dimension.description}
                    value={ratings[dimension.id]}
                    onChange={(value) => handleRatingChange(dimension.id, value)}
                  />
                ))}
              </div>
            </div>

            {/* Tags Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-1">选择课程标签</h3>
              <p className="text-gray-500 mb-6">可选，帮助其他同学快速了解课程特点</p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-gray-700 mb-3">课程特点</h4>
                  <TagSelector
                    tags={courseTags.courseFeatures}
                    selectedTags={selectedTags}
                    onToggle={handleTagToggle}
                  />
                </div>

                <div>
                  <h4 className="text-gray-700 mb-3">考核方式</h4>
                  <TagSelector
                    tags={courseTags.assessmentStyle}
                    selectedTags={selectedTags}
                    onToggle={handleTagToggle}
                  />
                </div>

                <div>
                  <h4 className="text-gray-700 mb-3">教师风格</h4>
                  <TagSelector
                    tags={courseTags.teachingStyle}
                    selectedTags={selectedTags}
                    onToggle={handleTagToggle}
                  />
                </div>
              </div>
            </div>

            {/* Grade Range Selector */}
            <GradeRangeSelector value={gradeRange} onChange={setGradeRange} />

            {/* Review Text Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-1">详细评价</h3>
              <p className="text-gray-500 mb-4">分享你的课程体验，建议包含：课程内容、教学方式、考核体验等</p>
              <TextEditor value={reviewText} onChange={setReviewText} />
            </div>

            {/* Settings Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">发布设置</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <div className="text-gray-900">匿名发布</div>
                    <div className="text-gray-500">不显示你的个人信息</div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                保存草稿
              </button>
              <div className="flex gap-4">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                  取消
                </button>
                <button
                  onClick={handlePublish}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm"
                >
                  发布评价
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preview/Tips */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-gray-900 mb-4">评价提示</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600">1</span>
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">客观公正</div>
                    <div className="text-gray-500">请基于真实体验进行评价，避免极端情绪化表达</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600">2</span>
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">详细具体</div>
                    <div className="text-gray-500">提供具体的例子和细节，帮助其他同学更好地了解课程</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600">3</span>
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">尊重他人</div>
                    <div className="text-gray-500">保持礼貌和尊重，避免人身攻击或不当言论</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600">4</span>
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">全面评价</div>
                    <div className="text-gray-500">涵盖课程内容、教学方法、作业考核等多个方面</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex gap-2 mb-2">
                  <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div className="text-amber-900">温馨提示</div>
                </div>
                <p className="text-amber-800">评价一经发布将无法修改，请认真填写。如需修改请联系管理员。</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
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