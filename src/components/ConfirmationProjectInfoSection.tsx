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

const ConfirmationProjectInfoSection = ({ formData }: Props) => {
  return (
    <ConfirmationSection title="案件情報">
      <ConfirmationField label="案件名" value={formData.projectInfo?.projectName} />
      <ConfirmationField label="参画日" value={formatDate(formData.projectInfo?.participationDate)} />
      <ConfirmationField label="参画人数" value={formData.projectInfo?.numberOfParticipants ? `${formData.projectInfo?.numberOfParticipants}人` : "未入力"} />
      <ConfirmationField label="通勤時間" value={`${formData.projectInfo?.commuteHours || "0"}時間 ${formData.projectInfo?.commuteMinutes || "0"}分`} />
      <ConfirmationField label="勤務形態" value={formData.projectInfo?.workStyle} />
      <ConfirmationField label="ポジション" value={formData.projectInfo?.position} />
      <ConfirmationField label="主要技術" value={formData.projectInfo?.mainTechnology} />
      <ConfirmationField label="データベース" value={formData.projectInfo?.database} isLast />
    </ConfirmationSection>
  );
};

export default ConfirmationProjectInfoSection;