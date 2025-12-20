import { StarRating } from './StarRating';

interface RatingDimensionProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

export function RatingDimension({ icon, label, description, value, onChange }: RatingDimensionProps) {
  const getRatingLabel = (rating: number) => {
    if (rating === 0) return '未评分';
    if (rating <= 1) return '较差';
    if (rating <= 2) return '一般';
    if (rating <= 3) return '良好';
    if (rating <= 4) return '很好';
    return '完美';
  };

  const getRatingColor = (rating: number) => {
    if (rating === 0) return 'text-gray-400';
    if (rating <= 2) return 'text-red-600';
    if (rating <= 3) return 'text-orange-600';
    if (rating <= 4) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <h4 className="text-gray-900">{label}</h4>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{description}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <StarRating value={value} onChange={onChange} size={20} />
        <div className={`min-w-[48px] text-center ${getRatingColor(value)}`}>
          {getRatingLabel(value)}
        </div>
      </div>
    </div>
  );
}
