"use client";

import { useReportForm } from "@/hooks/useReportForm";
import Button from "./Button";
import ConfirmationView from "./ConfirmationView";
import InputForm from "./InputForm";
import { notFound, useRouter } from "next/navigation";
import DropdownMenu from "./DropdownMenu";
import BackToDetailButton from "./BackToDetailButton";
import { deleteReport } from "@/lib/report";
import { useReportEditActions } from "@/hooks/useReportEditActions";
import { BiLeftArrow } from "react-icons/bi";
import { TbArrowBigLeft } from "react-icons/tb";
import Link from "next/link";
import PageHeader from "./PageHeader";

interface EditFormProps {
  reportId: string | number;
  initialData: Report;
}

const EditForm = ({ reportId, initialData }: EditFormProps) => {
  const {
    step,
    setStep,
    hasReports,
    register,
    handleSubmit,
    control,
    errors,
    fields,
    formData,
    handleAddTask,
    handleRemoveTask,
    onSubmitToConfirm,
    handleApiPutSubmit,
    handleLoadLatest,
    handleBackToList,
  } = useReportForm(initialData);

  const { handleBackToDetail } = useReportEditActions(reportId);

  const dropDownMenuItems = [
    {
      label: "一覧へ戻る",
      onClick: handleBackToList,
      disabled: false,
    },
  ];

  if (!initialData) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <PageHeader
        title={`業務報告書の${step === "confirm" ? "修正内容確認" : "更新"}`}
        description={step === "input" ? "業務報告書を編集します。必要事項を修正し、「確認画面へ進む」ボタンを押してください。" : undefined}
        actions={step === "input" && (
          <>
            <Link href={`/reports/${reportId}`} className="text-blue-600 hover:underline px-4 py-2">詳細に戻る</Link>
            <DropdownMenu items={dropDownMenuItems} />
          </>
        )}
        isSticky
      />

      {step === "input" ? (
        <InputForm
          handleSubmit={handleSubmit(onSubmitToConfirm)}
          register={register}
          control={control}
          errors={errors}
          fields={fields}
          handleAddTask={handleAddTask}
          handleRemoveTask={handleRemoveTask}
          handleLoadLatest={handleLoadLatest}
          hasReports={hasReports}
          isEditMode={true}
        // onBackToDetail={handleBackToDetail}
        />
      ) : (
        <div className="space-y-6">
          <ConfirmationView formData={formData} isConfirm={true} isEditMode={true} />
          <div className="flex justify-between mt-6">
            <Button
              variant="secondary"
              onClick={() => setStep("input")} >修正する</Button>
            <Button
              type="button"
              variant="success"
              onClick={handleApiPutSubmit}>この内容で更新する</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditForm;