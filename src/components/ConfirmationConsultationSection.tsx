import { FormData } from "@/schemas/reportSchema";
import ConfirmationField from "./ConfirmationField";
import ConfirmationSection from "./ConfirmationSection";

interface Props {
  formData: FormData;
}

const ConfirmationConsultationSection = ({ formData }: Props) => {
  return (
    <ConfirmationSection title="上司へ相談">
      <ConfirmationField label="相談内容" value={formData.consultation} isLast />
    </ConfirmationSection>
  );
};

export default ConfirmationConsultationSection;