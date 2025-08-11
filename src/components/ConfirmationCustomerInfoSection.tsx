import { FormData } from "@/schemas/reportSchema";
import ConfirmationField from "./ConfirmationField";
import ConfirmationSection from "./ConfirmationSection";

interface Props {
  formData: FormData;
}

const ConfirmationCustomerInfoSection = ({ formData }: Props) => {
  return (
    <ConfirmationSection title="顧客情報">
      <ConfirmationField label="エンド企業" value={formData.customerInfo?.endClient} />
      <ConfirmationField label="上位企業" value={formData.customerInfo?.upperClient} />
      <ConfirmationField label="業種" value={formData.customerInfo?.industry} />
      <ConfirmationField label="職場最寄駅" value={formData.customerInfo?.nearestStation} isLast />
    </ConfirmationSection>
  );
};

export default ConfirmationCustomerInfoSection;