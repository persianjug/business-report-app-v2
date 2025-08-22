import { Task } from "@/types/Report";

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable = ({ tasks }: TaskTableProps) => {
  if (!tasks || tasks.length === 0) {
    return <p className="pl-4">タスクは登録されていません。</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border border-gray-300">作業名</th>
            <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border border-gray-300">状況</th>
            <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border border-gray-300">課題・問題点</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border border-gray-300">{task.taskName || "未入力"}</td>
              <td className="px-4 py-2 whitespace-pre-wrap border border-gray-300">{task.taskProgress || "未入力"}</td>
              <td className="px-4 py-2 whitespace-pre-wrap border border-gray-300">{task.taskProblem || "未入力"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;