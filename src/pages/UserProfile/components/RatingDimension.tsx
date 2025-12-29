interface RatingDimensionProps {
  label: string;
  value: number;
  description?: string;
}

export function RatingDimension({ label, value, description }: RatingDimensionProps) {
  const percentage = (value / 5) * 100;
  
  // 根据分数确定颜色
  const getColor = (val: number) => {
    if (val >= 4.5) return "bg-green-500";
    if (val >= 3.5) return "bg-blue-500";
    if (val >= 2.5) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-700">{value.toFixed(1)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div
          className={`h-full ${getColor(value)} transition-all duration-300 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}