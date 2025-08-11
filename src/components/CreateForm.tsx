"use client";

import { REPORT_INITIAL_DATA } from "@/Constants/reportConstants";
import Button from "./Button";
import ConfirmationView from "./ConfirmationView";
import InputForm from "./InputForm";
import { useReportForm } from "@/hooks/useReportForm";
import DropdownMenu from "./DropdownMenu";
import { BiLoaderAlt } from "react-icons/bi";
import Link from "next/link";
import PageHeader from "./PageHeader";

export default function CreateForm() {
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
    handleApiPostSubmit,
    handleLoadLatest,
    // handleBackToList,
  } = useReportForm(REPORT_INITIAL_DATA);

  // ドロップダウンリストのメニュー
  const dropDownMenuItems = [
    {
      label: "最新の報告書を読み込む",
      onClick: handleLoadLatest,
      // disabled: hasReports,
      disabled: false,
      isDestructive: false, // 危険なアクションであることを示す
      icon: BiLoaderAlt,
      // icon: TbReload,
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <PageHeader
        title={`業務報告書${step === "confirm" ? "確認" : "作成"}`}
        description={step === "input" ? "業務報告書を新規作成します。必要事項を入力し、「確認画面へ進む」ボタンを押してください。" : undefined}
        actions={step === "input" && (
          <>
            <Link href="/reports" className="text-blue-600 hover:underline px-4 py-2">一覧に戻る</Link>
            <DropdownMenu items={dropDownMenuItems} />
          </>
        )}
        isSticky
      />

      <div className="space-y-6 text-sm">
        {step === "input" ? (
          <>
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
            />
          </>
        ) : (
          <div className="space-y-6 text-sm">
            <ConfirmationView formData={formData} isConfirm={true} isEditMode={false} />
            <div className="flex justify-between mt-6">
              <Button
                variant="secondary"
                onClick={() => setStep("input")} >修正する</Button>
              <Button
                type="button"
                variant="success"
                onClick={handleApiPostSubmit}>この内容で登録する</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}