import { CourseEvaluationPage } from './components/CourseEvaluationPage';
import { useParams } from 'react-router-dom';

export default function CourseDetailPage() {
  const { id } = useParams();

  if (!id) return <div>课程ID不存在</div>;

  return (
    <div className="p-6">
      <h1>课程详情：{id}</h1>
      <CourseEvaluationPage courseId={Number(id)} />
    </div>
  );
}