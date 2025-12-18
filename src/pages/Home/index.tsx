// src/pages/HelpCenter/index.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight, Search, HelpCircle, Mail } from "lucide-react";

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  // 所有常见问题数据
  const allCategories = [
    {
      id: "search",
      title: "搜索浏览",
      icon: "🔍",
      description: "查找课程、教授和评价",
      questions: [
        {
          id: "search-1",
          question: "如何找到某个教授的课程评价？",
          answer: "在搜索框直接输入教授姓名，或使用'按教师浏览'功能。点击教师名字可以查看该教师所有课程的评价汇总。",
        },
        {
          id: "search-2",
          question: "课程评分是如何计算的？",
          answer: "课程评分基于所有用户的综合评价计算得出，采用加权平均算法。评分维度包括：课程内容质量、教师教学水平、作业难度、考试难度等。每个维度权重相同，最终生成1-5星的综合评分。",
        },
        {
          id: "search-3",
          question: "如何理解课程难度星级？",
          answer: "难度星级从1星（非常简单）到5星（非常困难）。3星表示难度适中。难度评分基于学生的主观感受，仅供参考，实际难度因人而异。",
        },
      ],
    },
    {
      id: "review",
      title: "撰写测评",
      icon: "✍️",
      description: "分享你的学习体验",
      questions: [
        {
          id: "review-1",
          question: "写评价有哪些注意事项？能匿名吗？",
          answer: "所有评价默认匿名发布，仅显示'2023级学生'等模糊信息。注意事项：1) 基于真实体验撰写 2) 避免泄露个人隐私 3) 禁止抄袭他人评价 4) 不得发布广告或无关内容。违规评价将被删除，严重者可能被封号。",
        },
        {
          id: "review-2",
          question: "评价提交后什么时候会显示？",
          answer: "评价提交后会进入审核队列，通常在24小时内完成审核。审核通过后会立即在课程页面显示。您可以在'我的评价'页面查看审核状态。节假日审核可能会延迟。",
        },
        {
          id: "review-3",
          question: "可以修改或删除已发布的评价吗？",
          answer: "评价发布后的7天内可以编辑修改。超过7天后，如需修改请联系客服。您可以随时删除自己的评价，但请谨慎操作，删除后无法恢复。",
        },
      ],
    },
    {
      id: "plan",
      title: "选课计划",
      icon: "📚",
      description: "管理你的课程安排",
      questions: [
        {
          id: "plan-1",
          question: "如何创建和分享我的选课计划？",
          answer: "进入'我的计划'页面，点击'创建新计划'按钮，输入计划名称和学期信息。添加课程后，点击'分享'按钮生成分享链接，可以发送给好友。好友打开链接后可以查看您的计划，并一键复制到自己的账户。",
        },
        {
          id: "plan-2",
          question: "可以创建多少个选课计划？",
          answer: "普通用户最多可以创建5个选课计划，每个计划最多添加30门课程。如需创建更多计划，可以升级为高级会员（不限计划数量和课程数量）。",
        },
        {
          id: "plan-3",
          question: "如何导出选课计划？",
          answer: "在计划详情页点击'导出'按钮，选择导出格式（PDF或Excel）。PDF格式包含课程详细信息和评价摘要，Excel格式方便进一步编辑。导出的文件会保存课程名称、教师、时间、评分等信息。",
        },
      ],
    },
    {
      id: "account",
      title: "账户设置",
      icon: "🔐",
      description: "管理账号与隐私",
      questions: [
        {
          id: "account-1",
          question: "账号注册有什么好处？如何找回密码？",
          answer: "注册账号后可以：1) 撰写和管理课程评价 2) 创建个性化选课计划 3) 收藏喜欢的课程 4) 接收重要消息通知 5) 查看完整的课程信息。找回密码：点击登录页面的'忘记密码'，输入注册邮箱，系统会发送重置链接到您的邮箱（有效期30分钟）。",
        },
        {
          id: "account-2",
          question: "如何修改个人信息？",
          answer: "登录后进入'账户设置'页面，可以修改：1) 昵称（仅自己可见）2) 年级信息 3) 专业信息 4) 通知偏好。注意：注册邮箱和学号无法自行修改，如需修改请联系客服。",
        },
        {
          id: "account-3",
          question: "如何注销账号？",
          answer: "进入'账户设置' → '账号与安全' → '注销账号'。注销前请注意：1) 所有评价将被删除且无法恢复 2) 选课计划和收藏将被清空 3) 账号注销后30天内无法使用相同邮箱重新注册。注销需要输入密码确认，并会收到邮件通知。",
        },
      ],
    },
    {
      id: "privacy",
      title: "隐私安全",
      icon: "🛡️",
      description: "了解隐私保护政策",
      questions: [
        {
          id: "privacy-1",
          question: "我的个人信息安全吗？",
          answer: "是的，我们非常重视您的隐私安全：1) 姓名、学号仅用于身份验证，不会公开显示 2) 邮箱地址仅用于账号找回和重要通知 3) 所有数据传输采用HTTPS加密 4) 密码使用BCrypt加密存储。",
        },
        {
          id: "privacy-2",
          question: "匿名评价会被发现吗？",
          answer: "不会。所有评价默认匿名发布，仅显示'2023级学生'等模糊信息。平台管理员也无法追溯评价者身份。我们采用多重技术手段确保您的匿名性，包括数据脱敏和权限隔离。",
        },
        {
          id: "privacy-3",
          question: "如何举报不当内容？",
          answer: "如果您发现不当内容（如恶意评价、广告等），可以：1) 在该评价下方点击'举报'按钮 2) 通过帮助中心提交举报表单 3) 发送邮件至 support@xuankebao.com。我们会在24小时内处理您的举报。",
        },
      ],
    },
  ];

  // 处理展开/收起切换
  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // 处理搜索
  const searchResults = searchQuery.trim() 
    ? allCategories.flatMap(category =>
        category.questions.filter(q =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(q => ({ ...q, category: category.title }))
      )
    : [];

  // 热门问题（每个分类取前2个）
  const popularQuestions = allCategories.flatMap(category => 
    category.questions.slice(0, 2)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link 
              to="/" 
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              首页
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">帮助中心</span>
          </nav>
        </div>
      </div>

      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">帮助中心</h1>
            <p className="text-lg text-blue-100">
              有问题？在这里找到答案
            </p>
          </div>
          
          {/* 搜索框 */}
          <div className="max-w-2xl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-lg -z-10" />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索问题或关键词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-blue-500/50 shadow-lg bg-white/95 backdrop-blur-sm"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-blue-100 text-sm">
                找到 {searchResults.length} 个相关结果
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery ? (
          /* 搜索结果 */
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              搜索结果
            </h2>
            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors"
                  >
                    <button
                      onClick={() => toggleItem(result.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {result.category}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 text-left">
                          {result.question}
                        </span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                          expandedItems.has(result.id) ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {expandedItems.has(result.id) && (
                      <div className="px-6 pb-4 pt-2 text-gray-600 border-t border-gray-100">
                        {result.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  未找到相关结果
                </h3>
                <p className="text-gray-600 mb-4">
                  请尝试其他关键词或查看下面的分类问题
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  清除搜索
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* 热门问题 */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">热门问题</h2>
                <span className="text-sm text-gray-500">
                  {popularQuestions.length} 个常见问题
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularQuestions.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-all hover:border-blue-300 group"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <h3 className="font-medium text-gray-900 leading-tight">
                        {item.question}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {item.answer}
                    </p>
                    <button
                      onClick={() => {
                        const category = allCategories.find(cat => 
                          cat.questions.some(q => q.id === item.id)
                        );
                        if (category) {
                          document.getElementById(category.id)?.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          });
                          // 稍等滚动完成后展开
                          setTimeout(() => toggleItem(item.id), 300);
                        }
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    >
                      查看详情
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 分类问题列表 */}
        {!searchQuery && (
          <div className="space-y-12">
            {allCategories.map((category) => (
              <section 
                key={category.id} 
                id={category.id}
                className="scroll-mt-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {category.title}
                    </h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {category.questions.map((question) => (
                    <div
                      key={question.id}
                      className={`bg-white rounded-lg border transition-colors ${
                        expandedItems.has(question.id) 
                          ? "border-blue-300 shadow-sm" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(question.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {question.question}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                            expandedItems.has(question.id) ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {expandedItems.has(question.id) && (
                        <div className="px-6 pb-4 pt-2 text-gray-600 border-t border-gray-100">
                          {question.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* 底部联系区域 */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-xl border border-gray-200 shadow-sm w-full max-w-3xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">
                    还没找到答案？
                  </h3>
                  <p className="text-gray-600 text-sm">
                    联系我们的支持团队
                  </p>
                </div>
              </div>
              <a
                href="mailto:support@xuankebao.com"
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                support@xuankebao.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;