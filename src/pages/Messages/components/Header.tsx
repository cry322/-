export function Header() {
  return (
    <div className="bg-[#2563eb] text-white py-4 px-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="white" fillOpacity="0.2"/>
              <path d="M8 12h16M8 16h16M8 20h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h1 className="text-xl">北京大学课程测评平台</h1>
          </div>
          <span className="text-white/80 ml-2">/ 个人消息中心</span>
        </div>
      </div>
    </div>
  );
}