import { FormData } from "@/schemas/reportSchema";
import ConfirmationField from "./ConfirmationField";
import ConfirmationSection from "./ConfirmationSection";
import TaskTable from "./TaskTable";

interface Props {
  formData: FormData;
}

const ConfirmationProgressInfoSection = ({ formData }: Props) => {
  return (
    <ConfirmationSection title="進捗状況">
      <ConfirmationField label="全体状況" value={formData.overallProgress} />
      <h3 className="font-semibold mt-6 mb-2">タスク一覧</h3>
      <TaskTable tasks={formData.tasks || []} />
      <div className="mt-6">
        <ConfirmationField label="今後の予定" value={formData.futurePlans} isLast />
      </div>
    </ConfirmationSection>
  );
};

export default ConfirmationProgressInfoSection;