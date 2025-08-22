import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from "react-hook-form";
import { FormData } from "@/schemas/reportSchema";
import { BasicInfoSection } from "./BasicInfoSection";
import { ConsultationSection } from "./ConsultationSection";
import { CustomerInfoSection } from "./CustomerInfoSection";
import { OtherInfoSection } from "./OtherInfoSection";
import { ProgressInfoSection } from "./ProgressInfoSection";
import { ProjectInfoSection } from "./ProjectInfoSection";

interface InputFormProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  fields: UseFieldArrayReturn<FormData, "tasks">["fields"];
  handleAddTask: () => void;
  handleRemoveTask: (index: number) => void;
};

const InputForm = ({
  register,
  errors,
  fields,
  handleAddTask,
  handleRemoveTask,
}: InputFormProps) => {
  return (
    <>
      {/* 基本情報セクション */}
      <BasicInfoSection register={register} errors={errors} />
      {/* 顧客情報セクション */}
      <CustomerInfoSection register={register} errors={errors} />
      {/* 案件情報セクション */}
      <ProjectInfoSection register={register} errors={errors} />
      {/* 進捗状況セクション */}
      <ProgressInfoSection
        register={register}
        errors={errors}
        fields={fields}
        handleAddTask={handleAddTask}
        handleRemoveTask={handleRemoveTask}
      />
      {/* その他セクション */}
      <OtherInfoSection register={register} />
      {/* 上司へ相談セクション */}
      <ConsultationSection register={register} />
    </>
  );
};

export default InputForm;
