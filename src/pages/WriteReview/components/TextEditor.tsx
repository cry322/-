import { useState } from 'react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function TextEditor({ value, onChange, maxLength = 500 }: TextEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <div
        className={`rounded-xl border-2 transition-colors ${
          isFocused ? 'border-blue-400 ring-4 ring-blue-100' : 'border-gray-200'
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          placeholder="请详细描述你的课程体验...&#10;&#10;建议包含：&#10;• 课程内容的质量和深度&#10;• 教师的教学方法和风格&#10;• 作业和考核的难度与合理性&#10;• 个人的收获和建议"
          className="w-full px-4 py-3 bg-transparent resize-none focus:outline-none min-h-[200px]"
          rows={8}
        />
      </div>
      
      <div className="flex items-center justify-between mt-2 px-1">
        <div className="text-gray-500">
          {value.length > 0 && value.length < 50 && (
            <span className="text-orange-600">建议至少输入50个字符</span>
          )}
        </div>
        <div className={`${value.length >= maxLength ? 'text-red-600' : 'text-gray-500'}`}>
          {value.length} / {maxLength}
        </div>
      </div>
    </div>
  );
}