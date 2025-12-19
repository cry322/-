import { Award } from 'lucide-react';

interface GradeRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function GradeRangeSelector({ value, onChange }: GradeRangeSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <Award className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">我的得分区间</h3>
          <p className="text-gray-500">可选填写，方便其他同学参考课程给分情况</p>
        </div>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="例如：A-/B+、85-89分、3.7等"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
      />

      <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
        <p className="text-gray-600">💡 填写得分区间可以帮助其他同学了解课程的给分水平</p>
      </div>
    </div>
  );
}