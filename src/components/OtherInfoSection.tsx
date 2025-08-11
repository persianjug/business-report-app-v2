import { FormData } from "@/schemas/reportSchema";
import { UseFormRegister } from "react-hook-form";
import FormSection from "./FormSection";
import Textarea from "./Textarea";

type OtherInfoSectionProps = {
  register: UseFormRegister<FormData>;
};

export const OtherInfoSection = ({ register }: OtherInfoSectionProps) => {
  return (
    <FormSection title="その他">
      <Textarea
        label="顧客状況"
        id="customerStatus"
        register={register("otherInfo.customerStatus")}
      />
      <Textarea
        label="営業情報"
        id="salesInfo"
        register={register("otherInfo.salesInfo")}
      />
      <Textarea
        label="健康状態"
        id="healthStatus"
        register={register("otherInfo.healthStatus")}
      />
      <Textarea
        label="休暇予定"
        id="vacationPlans"
        register={register("otherInfo.vacationPlans")}
      />
    </FormSection>
  );
};