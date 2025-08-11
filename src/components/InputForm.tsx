import { UseFormRegister, FieldErrors, UseFieldArrayReturn, UseFormHandleSubmit } from "react-hook-form";
import { FormData } from "@/schemas/reportSchema";
import Button from "./Button";
import LoadLatestReportButton from "./LoadLatestReportButton";
import { BasicInfoSection } from "./BasicInfoSection";
import { ConsultationSection } from "./ConsultationSection";
import { CustomerInfoSection } from "./CustomerInfoSection";
import { OtherInfoSection } from "./OtherInfoSection";
import { ProgressInfoSection } from "./ProgressInfoSection";
import { ProjectInfoSection } from "./ProjectInfoSection";

interface InputFormProps {
  handleSubmit: UseFormHandleSubmit<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  fields: UseFieldArrayReturn<FormData, "tasks">["fields"];
  handleAddTask: () => void;
  handleRemoveTask: (index: number) => void;
  handleLoadLatest: () => void;
  hasReports: boolean;
  isEditMode?: boolean;
  onBackToDetail?: () => void;
};

const InputForm = ({
  handleSubmit,
  register,
  errors,
  fields,
  handleAddTask,
  handleRemoveTask,
  isEditMode = false,
  onBackToDetail,
}: InputFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 最新の報告書を読む込む */}
      <div className="flex justify-end mb-6">
        {/* <LoadLatestReportButton onClick={handleLoadLatest} disabled={!hasReports} /> */}
        {/* 編集モードの場合は「詳細へ戻る」ボタンを表示 */}
        {isEditMode && onBackToDetail && (
          <Button type="button" variant="secondary" onClick={onBackToDetail}>
            詳細へ戻る
          </Button>
        )}
        {/* 新規作成モードの場合は「最新の報告書の読み込み」ボタンを表示 */}
        {/* {!isEditMode && (
          <LoadLatestReportButton onClick={handleLoadLatest} disabled={!hasReports} />
        )} */}
      </div>

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

      {/* 確認画面へ進む */}
      <div className="flex justify-end mt-6">
        <Button type="submit" variant="primary">確認画面へ進む</Button>
      </div>
    </form>
  );
};

export default InputForm;
