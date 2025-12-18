// src/pages/HelpCenter/components/HelpFAQSection.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator, Filter, Bookmark, Star, Search, User, Clock, MessageSquare } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode; // 改为React节点，支持复杂内容
  category: string;
  icon?: React.ReactNode; // 可选图标
}

const HelpFAQSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "如何搜索和浏览课程？",
      answer: (
        <div className="space-y-3">
          <p>我们提供多种搜索方式来帮助您找到需要的课程：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>关键词搜索：</strong>在顶部搜索栏输入课程名称、课程代码或教师姓名</li>
            <li><strong>高级筛选：</strong>在课程列表页面，您可以按学期、学院、学分、课程类型等进行筛选</li>
            <li><strong>热门浏览：</strong>首页展示了当前最受关注和评价最多的课程</li>
            <li><strong>分类浏览：</strong>可以按学院、专业或课程类型浏览相关课程</li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>💡 小贴士：</strong> 使用课程代码（如"CS101"）进行搜索最精确。您还可以在搜索结果中按评分、热度或开课时间排序。
            </p>
          </div>
        </div>
      ),
      category: "课程搜索",
      icon: <Search className="w-4 h-4" />
    },
    {
      id: 2,
      question: "课程的分数是如何计算的？",
      answer: (
        <div className="space-y-3">
          <p>课程的综合分数基于该课程下所有有效测评的加权平均值，具体规则如下：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>总体评分：</strong>计算所有有效测评的星级平均值（1-5星），四舍五入到0.1分</li>
            <li><strong>评分权重：</strong>近期测评（近1年内）的权重更高，确保评分反映最新的教学情况</li>
            <li><strong>评分维度：</strong>除了总体评分，我们还统计课程难度、作业量、收获度和趣味性等细分维度</li>
            <li><strong>数据清洗：</strong>系统会过滤掉明显异常的评分（如大量极端评分），确保评分的公正性</li>
            <li><strong>最低样本：</strong>一门课程需要至少3个有效测评才会显示综合评分</li>
          </ul>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>📊 统计说明：</strong> 评分旁边的数字表示评价人数，人数越多，评分越可靠。
            </p>
          </div>
        </div>
      ),
      category: "评分机制",
      icon: <Calculator className="w-4 h-4" />
    },
    {
      id: 3,
      question: "不同老师开同一门课程怎么看？",
      answer: (
        <div className="space-y-3">
          <p>我们以课程号为主要区分标准，同时提供灵活的筛选和对比功能：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>课程号区分：</strong>同一课程号（如"CS101"）下的课程会聚合展示，无论教师是谁</li>
            <li><strong>教师筛选：</strong>在课程详情页，您可以使用教师筛选器查看特定教师的评分和评价</li>
            <li><strong>教师对比：</strong>可以同时查看多位教师在同一课程上的评分对比和评价分布</li>
            <li><strong>评价标注：</strong>每条评价都会标注对应的教师和学期，方便您筛选特定教师的评价</li>
            <li><strong>教师详情页：</strong>点击教师姓名可以进入该教师的详情页，查看其所有课程的评价情况</li>
          </ul>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700">
              <strong>🎯 选课建议：</strong> 选择课程时，建议先确定课程号，再比较不同教师的评分和评价特点，选择最适合您的教师。
            </p>
          </div>
        </div>
      ),
      category: "教师相关",
      icon: <Filter className="w-4 h-4" />
    },
    {
      id: 4,
      question: "如何创建和管理选课计划？",
      answer: (
        <div className="space-y-3">
          <p>虽然我们没有专门的"选课计划"功能，但您可以通过收藏夹功能实现类似的课程管理：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>收藏课程：</strong>在任何课程详情页点击"加入收藏"按钮，将课程添加到收藏夹</li>
            <li><strong>创建分类：</strong>您可以为收藏夹创建不同分类，如"2024春季学期"、"专业必修课"、"备选课程"等</li>
            <li><strong>课程对比：</strong>在收藏夹中可以同时对比多个课程的评分、难度、作业量等信息</li>
            <li><strong>管理收藏：</strong>在个人主页的"我的收藏"中，可以批量移除、分类或导出收藏的课程</li>
            <li><strong>分享功能：</strong>可以将您的收藏课程列表生成分享链接，发送给同学或导师参考</li>
            <li><strong>隐私设置：</strong>可以选择将收藏夹设为私密（仅自己可见）或公开（可分享给他人）</li>
          </ul>
          <div className="mt-4 p-3 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-700">
              <strong>📚 使用场景：</strong> 将下个学期计划选修的课程都加入"2024春季学期"收藏夹，方便集中比较和规划，也可以作为选课备忘录。
            </p>
          </div>
        </div>
      ),
      category: "课程管理",
      icon: <Bookmark className="w-4 h-4" />
    },
    {
      id: 5,
      question: "如何撰写高质量的课程测评？",
      answer: (
        <div className="space-y-3">
          <p>高质量的测评应该包含以下要素，既能帮助他人，也能获得更多认可：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>客观多维评分：</strong>从课程难度、作业量、收获度、趣味性等多个维度给出真实评分</li>
            <li><strong>详细体验描述：</strong>分享具体的学习体验，如课堂氛围、教学方式、考试形式、作业类型等</li>
            <li><strong>实用学习建议：</strong>给出实用的学习建议，如推荐的学习资源、时间安排、备考策略等</li>
            <li><strong>课程对比参考：</strong>如果上过类似课程，可以提供对比分析，帮助他人选择</li>
            <li><strong>时效性信息：</strong>务必注明评价对应的学期、年份和授课教师，因为课程内容可能会有变化</li>
          </ul>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>⭐ 优质评价：</strong> 高质量的测评会被系统标记为"优质评价"，获得更多曝光，同时您也会获得相应的贡献积分。
            </p>
          </div>
        </div>
      ),
      category: "测评撰写",
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: 6,
      question: "测评的审核规则和流程是怎样的？",
      answer: (
        <div className="space-y-3">
          <p>为了确保评价质量，所有测评都会经过审核流程：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>自动审核：</strong>系统会过滤包含敏感词、广告、恶意攻击或无关内容的评价</li>
            <li><strong>人工抽查：</strong>审核团队会随机抽查部分评价，确保内容真实、客观、有帮助</li>
            <li><strong>举报机制：</strong>用户可以对不实、抄袭或违规的评价进行举报，我们会及时处理</li>
            <li><strong>审核标准：</strong>评价应基于个人真实学习体验，不得抄袭他人或虚构内容</li>
            <li><strong>隐私保护：</strong>我们严格保护评价者的隐私，所有评价默认匿名显示</li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>⏱️ 审核时间：</strong> 测评提交后通常在1-24小时内完成审核，审核通过后会立即显示在课程页面。
            </p>
          </div>
        </div>
      ),
      category: "测评审核",
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: 7,
      question: "如何管理和保护我的账户信息？",
      answer: (
        <div className="space-y-3">
          <p>您可以完全控制您的账户信息和隐私设置：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>个人信息：</strong>在个人主页可以修改昵称、头像、院系、年级等基本信息</li>
            <li><strong>隐私设置：</strong>可以控制哪些信息对其他用户可见（如评价历史、收藏课程等）</li>
            <li><strong>通知偏好：</strong>设置接收哪些类型的通知（新回复、点赞、系统公告等）</li>
            <li><strong>账号安全：</strong>可以修改密码、绑定/更换邮箱、查看登录历史等</li>
            <li><strong>数据导出：</strong>支持导出您的所有评价、收藏等个人数据</li>
          </ul>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>🔒 安全承诺：</strong> 我们采用加密技术保护您的所有个人信息，绝不会向第三方泄露。
            </p>
          </div>
        </div>
      ),
      category: "账户设置",
      icon: <User className="w-4 h-4" />
    },
    {
      id: 8,
      question: "为什么有些课程没有评分或评价很少？",
      answer: (
        <div className="space-y-3">
          <p>课程评分和评价数量取决于多个因素：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>新开课程：</strong>刚开设的课程可能还没有足够的评价积累</li>
            <li><strong>小众课程：</strong>选课人数较少的专业课程可能评价也较少</li>
            <li><strong>审核要求：</strong>课程需要至少3个有效测评才会显示综合评分</li>
            <li><strong>学期因素：</strong>某些课程只在特定学期开设，评价更新较慢</li>
          </ul>
          <p className="mt-2">如果您上过这些课程，非常欢迎您来撰写第一个评价，帮助后来的同学！</p>
          <div className="mt-4 p-3 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-700">
              <strong>🌟 成为先驱者：</strong> 为没有评价的课程撰写第一个测评，可以获得"先驱者"徽章和额外积分奖励。
            </p>
          </div>
        </div>
      ),
      category: "评价系统",
      icon: <Star className="w-4 h-4" />
    },
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
        >
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {faq.icon}
                <span>{faq.category}</span>
              </span>
              <span className="font-medium text-gray-900">{faq.question}</span>
            </div>
            {expandedId === faq.id ? (
              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
            )}
          </button>
          {expandedId === faq.id && (
            <div className="px-6 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
              <div className="text-gray-700">{faq.answer}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HelpFAQSection;