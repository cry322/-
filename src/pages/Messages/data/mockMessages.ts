import { Message } from '../types/message';

export const mockMessages: Message[] = [
  {
    id: '1',
    type: 'comment_reply',
    category: 'interaction',
    sender: {
      id: 'u1',
      name: '张晓明',
      avatar: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaGVhZHNob3R8ZW58MXx8fHwxNzY0ODQ1NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      role: '信息科学技术学院 2022级'
    },
    title: '回复了你的评价',
    preview: '我也觉得这门课程的作业量比较适中，老师讲解得很清晰。不过期末考试确实有一定难度...',
    content: '我也觉得这门课程的作业量比较适中，老师讲解得很清晰。不过期末考试确实有一定难度，需要提前做好准备。整体来说是一门值得选修的好课。',
    time: '2小时前',
    isRead: false,
    course: {
      id: 'c1',
      name: '心理学导论',
      code: '1630079'
    },
    relatedUrl: '/courses/cs201'
  },
  {
    id: '2',
    type: 'system_announcement',
    category: 'system',
    sender: {
      id: 'system',
      name: '系统通知',
      role: '平台管理员'
    },
    title: '平台升级公告',
    preview: '为了提升用户体验，本平台将于12月8日凌晨2:00-4:00进行系统升级维护...',
    content: '为了提升用户体验，本平台将于12月8日凌晨2:00-4:00进行系统升级维护。届时平台将暂停访问，请各位用户提前做好安排。升级后将新增消息提醒功能和课程对比功能，敬请期待！',
    time: '5小时前',
    isRead: false
  },
  {
    id: '4',
    type: 'review_approved',
    category: 'system',
    sender: {
      id: 'system',
      name: '审核通知',
      role: '内容审核'
    },
    title: '您的课程评价已通过审核',
    preview: '您对《概率论与数理统计》的评价已通过审核并成功发布，感谢您的分享...',
    content: '您对《概率论与数理统计》的评价已通过审核并成功发布，感谢您的分享！您的评价已获得12个赞。',
    time: '昨天',
    isRead: true,
    course: {
      id: 'c3',
      name: '概率论与数理统计',
      code: 'MATH203'
    },
    relatedUrl: '/courses/math203/reviews/456'
  },
  {
    id: '5',
    type: 'like',
    category: 'interaction',
    sender: {
      id: 'u2',
      name: '李华',
      avatar: 'https://images.unsplash.com/photo-1639654655546-68bc1f21e9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDc2Nzg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      role: '数学学院 2021级'
    },
    title: '赞了你的评价',
    preview: '对《线性代数》课程的评价',
    content: '用户"李华"觉得您对《线性代数》课程的评价很有帮助。',
    time: '2天前',
    isRead: true,
    course: {
      id: 'c4',
      name: '线性代数',
      code: 'MATH101'
    }
  },
  {
    id: '6',
    type: 'mention',
    category: 'interaction',
    sender: {
      id: 'u3',
      name: '王芳',
      avatar: 'https://images.unsplash.com/photo-1612190219911-286df0e14656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzb3IlMjBhc2lhbnxlbnwxfHx8fDE3NjQ4NDU1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      role: '经济学院 2023级'
    },
    title: '在评论中提到了你',
    preview: '@张三 请问这门课的期末考试形式是什么样的？是开卷还是闭卷？',
    content: '@张三 请问这门课的期末考试形式是什么样的？是开卷还是闭卷？我看你上学期选过这门课，想咨询一下你的经验。',
    time: '3天前',
    isRead: true,
    course: {
      id: 'c5',
      name: '微观经济学',
      code: 'ECON101'
    },
    relatedUrl: '/courses/econ101/reviews/789'
  },
  {
    id: '8',
    type: 'comment_reply',
    category: 'interaction',
    sender: {
      id: 'u4',
      name: '刘洋',
      role: '物理学院 2022级'
    },
    title: '回复了你的评价',
    preview: '同意！这位老师上课真的超级认真，板书也很工整，就是作业确实多了点...',
    content: '同意！这位老师上课真的超级认真，板书也很工整，就是作业确实多了点。但是认真完成作业后确实能学到很多东西，期末复习也会轻松很多。',
    time: '1周前',
    isRead: true,
    course: {
      id: 'c6',
      name: '大学物理',
      code: 'PHYS101'
    }
  }
];