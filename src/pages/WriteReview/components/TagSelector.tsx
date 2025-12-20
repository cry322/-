interface TagSelectorProps {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

export function TagSelector({ tags, selectedTags, onToggle }: TagSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              isSelected
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent text-white shadow-sm'
                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}