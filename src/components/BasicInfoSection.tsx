import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormSection from "./FormSection";
import DateRangeInput from "./DataRangeInput";
import { FormData } from "@/schemas/reportSchema";

interface BasicInfoSectionProps  {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export const BasicInfoSection = ({ register, errors }: BasicInfoSectionProps) => {
  return (
    <FormSection title="基本情報">
      <DateRangeInput
        label="報告対象期間"
        isRequired={true}
        startDateRegister={register("startDate")}
        endDateRegister={register("endDate")}
        startDateError={errors.startDate?.message}
        endDateError={errors.endDate?.message}
        width="w-48"
      />
    </FormSection>
  );
};