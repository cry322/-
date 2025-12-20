import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}

export function StarRating({ value, onChange, size = 24 }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (rating: number) => {
    onChange(rating);
  };

  const handleMouseEnter = (rating: number) => {
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const displayValue = hoverValue || value;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => {
        const isFilled = rating <= displayValue;
        const isHalfFilled = rating - 0.5 === displayValue;

        return (
          <button
            key={rating}
            type="button"
            className="relative cursor-pointer transition-transform hover:scale-110 focus:outline-none"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background star */}
            <Star
              className="text-gray-300"
              size={size}
              fill="currentColor"
            />
            {/* Filled star */}
            {isFilled && (
              <Star
                className="absolute top-0 left-0 text-[#FFB800] transition-colors"
                size={size}
                fill="currentColor"
              />
            )}
            {/* Half filled star */}
            {isHalfFilled && (
              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                <Star
                  className="text-[#FFB800]"
                  size={size}
                  fill="currentColor"
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
