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
    <div className="space-y-8 text-gray-700">
      {/* 修正箇所：isEditModeの値に応じてメッセージを切り替える */}
      {/* <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert"> */}

      {isConfirm &&
        <div className="bg-blue-100 border-blue-500 text-blue-700 p-4 rounded-md" role="alert">
          <p className="font-bold">内容をご確認ください。</p>
          {isEditMode ? (
            <p>以下の内容でよろしければ、「この内容で更新する」ボタンを押してください。</p>
          ) : (
            <p>以下の内容でよろしければ、「この内容で登録する」ボタンを押してください。</p>
          )}
        </div>
      }

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