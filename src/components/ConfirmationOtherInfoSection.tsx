import { FormData } from "@/schemas/reportSchema";
import ConfirmationField from "./ConfirmationField";
import ConfirmationSection from "./ConfirmationSection";

interface Props {
  formData: FormData;
}

const ConfirmationOtherInfoSection = ({ formData }: Props) => {
  return (
    <ConfirmationSection title="その他">
      <ConfirmationField label="顧客状況" value={formData.otherInfo?.customerStatus} />
      <ConfirmationField label="営業情報" value={formData.otherInfo?.salesInfo} />
      <ConfirmationField label="健康状況" value={formData.otherInfo?.healthStatus} />
      <ConfirmationField label="休暇予定" value={formData.otherInfo?.vacationPlans} isLast />
    </ConfirmationSection>
  );
};

export default ConfirmationOtherInfoSection;