// CustomerInfoSection.tsx
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/schemas/reportSchema";
import FormSection from "./FormSection";
import Input from "./Input";

type CustomerInfoSectionProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export const CustomerInfoSection = ({ register, errors }: CustomerInfoSectionProps) => {
  return (
    <FormSection title="顧客情報">
      <Input
        label="エンド企業"
        id="endClient"
        isRequired={true}
        register={register("customerInfo.endClient")}
        errorMessage={errors.customerInfo?.endClient?.message}
      />
      <Input
        label="上位企業"
        id="upperClient"
        isRequired={true}
        register={register("customerInfo.upperClient")}
        errorMessage={errors.customerInfo?.upperClient?.message}
      />
      <Input
        label="業種"
        id="industry"
        isRequired={true}
        register={register("customerInfo.industry")}
        errorMessage={errors.customerInfo?.industry?.message}
      />
      <Input
        label="職場最寄駅"
        id="nearestStation"
        isRequired={true}
        register={register("customerInfo.nearestStation")}
        errorMessage={errors.customerInfo?.nearestStation?.message}
      />
    </FormSection>
  );
};