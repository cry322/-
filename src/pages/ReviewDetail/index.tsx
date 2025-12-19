import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ReviewDetailPage = () => {
  const { id } = useParams();

  useEffect(() => {
    // TODO: 后续在这里根据 id 请求测评详情接口
    // TODO: 如果使用 echarts，在这里初始化图表
    console.log('当前测评ID:', id);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        {/* 页面标题 */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold mb-2">课程测评详情</h1>
          <p className="text-sm text-gray-500">测评编号：{id}</p>
        </div>

        {/* 课程基本信息 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">课程信息</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">课程名称：</span>示例课程</div>
            <div><span className="font-medium">授课教师：</span>张老师</div>
            <div><span className="font-medium">开课学院：</span>信息管理系</div>
            <div><span className="font-medium">学期：</span>2024-2025-1</div>
          </div>
        </section>

        {/* 综合评分 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">综合评分</h2>
          <div className="flex items-center gap-6">
            <div className="text-4xl font-bold text-blue-600">4.6</div>
            <div className="text-sm text-gray-500">基于 128 条测评</div>
          </div>
        </section>

        {/* 图表区域 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">评分分布</h2>
          <div id="scoreChart" className="w-full h-64 bg-gray-50 rounded" />
        </section>

        {/* 学生评价列表 */}
        <section>
          <h2 className="text-lg font-semibold mb-4">学生评价</h2>
          <div className="space-y-4">
            <div className="border rounded p-4">
              <div className="text-sm text-gray-600 mb-2">匿名同学 · 2024-11-20</div>
              <p className="text-gray-800">课程内容充实，老师讲解清晰，作业有一定挑战性。</p>
            </div>
            <div className="border rounded p-4">
              <div className="text-sm text-gray-600 mb-2">匿名同学 · 2024-11-18</div>
              <p className="text-gray-800">节奏稍快，但收获很大，适合有基础的同学。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReviewDetailPage;
