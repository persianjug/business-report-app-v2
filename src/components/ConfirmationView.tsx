import { FormData } from "@/schemas/reportSchema";
import ConfirmationBasicInfoSection from "./ConfirmationBasicInfoSection";
import ConfirmationConsultationSection from "./ConfirmationConsultationSection";
import ConfirmationCustomerInfoSection from "./ConfirmationCustomerInfoSection";
import ConfirmationOtherInfoSection from "./ConfirmationOtherInfoSection";
import ConfirmationProgressInfoSection from "./ConfirmationProgressInfoSection";
import ConfirmationProjectInfoSection from "./ConfirmationProjectInfoSection";

interface ConfirmationViewProps {
  formData: FormData;
  isConfirm?: boolean;
  isEditMode?: boolean;
}

const ConfirmationView = ({ formData, isConfirm = true, isEditMode = false }: ConfirmationViewProps) => {
  return (
    <div className="space-y-8">
      <ConfirmationBasicInfoSection formData={formData} />
      <ConfirmationCustomerInfoSection formData={formData} />
      <ConfirmationProjectInfoSection formData={formData} />
      <ConfirmationProgressInfoSection formData={formData} />
      <ConfirmationOtherInfoSection formData={formData} />
      <ConfirmationConsultationSection formData={formData} />
    </div>
  );
};

export default ConfirmationView;