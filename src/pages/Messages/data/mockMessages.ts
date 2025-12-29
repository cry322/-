import { Message } from '../types/message';

export const mockMessages: Message[] = [
  // =========================
  // 真实测评 A：微观经济学 review.id = 1
  // courseId = 2838360
  // relatedUrl = /reviews/1
  // =========================
  {
    id: '1',
    type: 'comment_reply',
    category: 'interaction',
    sender: {
      id: 'u1',
      name: '张晓明',
      avatar:
        'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaGVhZHNob3R8ZW58MXx8fHwxNzY0ODQ1NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      role: '信息科学技术学院 2022级',
    },
    title: '回复了你的评价',
    preview: '我也觉得这门课讲得很清楚，作业量也还可以，期末复习需要早点开始...',
    content:
      '我也觉得这门课讲得很清楚，作业量还可以，期末复习需要早点开始。你那段关于“读懂题就变成小学应用题”的描述特别真实。',
    time: '2小时前',
    isRead: false,
    course: {
      id: '2838360',
      name: '微观经济学',
      code: '2838360',
    },
    relatedUrl: '/reviews/2838360',
  },

  {
    id: '2',
    type: 'like',
    category: 'interaction',
    sender: {
      id: 'u2',
      name: '李华',
      avatar:
        'https://images.unsplash.com/photo-1639654655546-68bc1f21e9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDc2Nzg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      role: '数学学院 2021级',
    },
    title: '赞了你的评价',
    preview: '对《微观经济学》的评价很有帮助 👍',
    content: '用户“李华”觉得你对《微观经济学》的评价很有帮助，并点了赞。',
    time: '2天前',
    isRead: true,
    course: {
      id: '2838360',
      name: '微观经济学',
      code: '2838360',
    },
    relatedUrl: '/reviews/2838360',
  },

  {
    id: '3',
    type: 'mention',
    category: 'interaction',
    sender: {
      id: 'u3',
      name: '王芳',
      avatar:
        'https://images.unsplash.com/photo-1612190219911-286df0e14656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzb3IlMjBhc2lhbnxlbnwxfHx8fDE3NjQ4NDU1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      role: '经济学院 2023级',
    },
    title: '在评论中提到了你',
    preview: '@你 你说的“期末出现作业原题”是真的吗？大概会怎么考？',
    content:
      '@你 你说的“期末出现作业原题”是真的吗？大概会怎么考？我在犹豫要不要选这门课，想听听你的建议。',
    time: '3天前',
    isRead: true,
    course: {
      id: '2838360',
      name: '微观经济学',
      code: '2838360',
    },
    relatedUrl: '/reviews/2838360',
  },

  // =========================
  // 真实测评 B：民主的历史与现实 review.id = 2
  // courseId = 2432210
  // relatedUrl = /reviews/2
  // =========================
  {
    id: '4',
    type: 'review_approved',
    category: 'system',
    sender: {
      id: 'system',
      name: '审核通知',
      role: '内容审核',
    },
    title: '你的课程评价已通过审核',
    preview: '你对《民主的历史与现实》的评价已通过审核并成功发布，感谢你的分享！',
    content:
      '你对《民主的历史与现实》的评价已通过审核并成功发布，感谢你的分享！提醒：期末复习建议以课堂笔记为主。',
    time: '昨天',
    isRead: true,
    course: {
      id: '2432210',
      name: '民主的历史与现实',
      code: '2432210',
    },
    relatedUrl: '/reviews/2432210',
  },

  {
    id: '5',
    type: 'comment_reply',
    category: 'interaction',
    sender: {
      id: 'u4',
      name: '刘洋',
      role: '物理学院 2022级',
    },
    title: '回复了你的评价',
    preview: '同意！这门课知识密度太高了，但真的能学到东西...',
    content: '同意！这门课知识密度太高了，但真的能学到东西。你写的“十道填空+两道大题”那段很实用。',
    time: '1周前',
    isRead: true,
    course: {
      id: '2432210',
      name: '民主的历史与现实',
      code: '2432210',
    },
    relatedUrl: '/reviews/2432210',
  },

  // 系统公告也给一个“真实测评”的入口（不虚构 id，只是引导去看一条真实测评）
  {
    id: '6',
    type: 'system_announcement',
    category: 'system',
    sender: {
      id: 'system',
      name: '系统通知',
      role: '平台管理员',
    },
    title: '平台功能更新说明',
    preview: '消息中心已支持“查看详情”跳转到测评详情页。',
    content:
      '消息中心已支持“查看详情”跳转到测评详情页。你可以点击下方按钮查看示例测评详情（不会影响你的数据）。',
    time: '5小时前',
    isRead: false,
    course: {
      id: '2838360',
      name: '微观经济学',
      code: '2838360',
    },
    relatedUrl: '/reviews/2838360',
  },
];
