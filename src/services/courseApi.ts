// src/services/courseApi.ts

/**
 * TeacherDTO: 前端使用的教师数据结构
 */
export type TeacherDTO = {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  weeks?: string[];
  about?: string;
  reviewDetail?: string;
  capacity?: string;
  likes?: string | number;
};

export const courseApi = {
  /**
   * 获取某课程的任课教师列表
   * 当前为 mock 实现，后端准备好后可解除注释启用真实请求
   */
  getCourseTeachers: async (courseId:  number): Promise<TeacherDTO[]> => {
    // 模拟延迟与数据（开发阶段使用）
    await new Promise((r) => setTimeout(r, 300)); // 可去掉
    return [
      {
        id: 1,
        title: "毛利华",
        subtitle: "一门从标题上看就非常有趣的好课。毛利华老师的授课水平很高，既幽默风趣又深挚真诚，尽管经常拖堂几分钟到十几分钟不等，但也让人十分陶醉。这是dz大一下学期听得最认真也是最投入的好课，但却也是得分断档最低的（）",
        description: "理论扎实广泛结合实际场景",
        weeks: ["周次1", "周次2", "周次3"],
        about: "关于教师1",
        reviewDetail: "评分详情1",
        capacity: "已满",
        likes: 42
      },
      {
        id: 2,
        title: "开课教师2",
        subtitle: "老师的课堂组织还有slides蛮好，有几节课我感兴趣，其余的有时候会陷入哲学。课堂人满为患。 【考试】：前面有十道选择题比较刁钻，很难做对。然后是六道名词解释，在135个名词中选6个，这个阶段在备考的时候还是很重要的，dz也在这个阶段学到了许多。",
        description: "结合实际案例讲解",
        weeks: ["周次1", "周次2"],
        about: "关于教师2",
        reviewDetail: "评分详情2",
        capacity: "有空位",
        likes: 18
      }
    ];

    // --------- 如果后端准备好，替换为下面的真实请求代码 ---------
    /*
    const res = await fetch(`${API_BASE_URL}/courses/${courseId}/teachers`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include" // 如果需要带 Cookie
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`API error ${res.status}: ${txt}`);
    }
    const body = await res.json();
    // 兼容 { data: [...] } 或直接返回数组的后端格式
    return body.data ?? body;
    */
  }
};