import { FormData } from "@/schemas/reportSchema";
import ConfirmationField from "./ConfirmationField";
import ConfirmationSection from "./ConfirmationSection";

interface Props {
  formData: FormData;
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "未入力";
  return new Date(dateString).toLocaleDateString("ja-JP");
};

const ConfirmationBasicInfoSection = ({ formData }: Props) => {
  return (
    <ConfirmationSection title="基本情報">
      <ConfirmationField
        label="報告対象期間"
        value={`${formatDate(formData.startDate)} 〜 ${formatDate(formData.endDate)}`}
        isLast
      />
    </ConfirmationSection>
  );
};
export default ConfirmationBasicInfoSection;