"use client";

import { useReportForm } from "@/hooks/useReportForm";
import Button from "./Button";
import ConfirmationView from "./ConfirmationView";
import InputForm from "./InputForm";
import { notFound } from "next/navigation";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";
import PageHeader from "./PageHeader";
import { Report } from "@/types/Report";
import ConfirmationModal from "./ConfirmationModal";
import NotificationBanner from "./NotificationBanner";

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
    handleBackToListFromEdit,
    handleBackToDetail,
    performBackToList,
    performBackToDetail,
    modalState,
    bannerState,
    closeModal,
    closeBanner,
    performRemoveTask,
  } = useReportForm(initialData);

  // const { handleBackToDetail } = useReportEditActions(reportId);

  const dropDownMenuItems = [
    {
      label: "一覧へ戻る",
      onClick: handleBackToListFromEdit,
      disabled: false,
    },
  ];

  if (!initialData) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <PageHeader
        title={`${step === "confirm" ? "修正内容の確認" : `業務報告書の修正（ID: ${reportId}）`}`}
        description={step === "input" ? "業務報告書を編集します。必要事項を修正し、「確認画面へ進む」ボタンを押してください。" : undefined}
        actions={step === "input" ? (
          <>
            <Link href={`/reports/${reportId}`} className="text-blue-600 hover:underline px-4 py-2" onClick={handleBackToDetail}>詳細に戻る</Link>
            <DropdownMenu items={dropDownMenuItems} />
          </>
        ) : (
          <>
            <Link href="#" className="text-blue-600 hover:underline px-4 py-2" onClick={() => setStep("input")}>入力に戻る</Link>
            {/* <Button variant="secondary" onClick={() => setStep("input")} >編集へ戻る</Button> */}
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
          <div className="flex justify-end mt-6">
            {/* <Button
              variant="secondary"
              onClick={() => setStep("input")} >修正する</Button> */}
            <Button
              type="button"
              variant="success"
              onClick={() => handleApiPutSubmit(reportId)}>この内容で更新する</Button>
          </div>
        </div>
      )}

      {/* モーダルコンポーネント */}
      {modalState.isOpen && (
        <ConfirmationModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          // onConfirm={modalState.type === "backToList" ? performBackToList : () => performBackToDetail(reportId)}
          onConfirm={modalState.type === "removeTask" ? performRemoveTask : (
            modalState.type === "backToList" ? performBackToList : () => performBackToDetail(reportId)
          )}
          title={modalState.title}
          message={modalState.message}
          variant={"confirm"}
          // confirmButtonText={modalState.type === "backToList" ? "破棄して一覧へ戻る" : "破棄して詳細へ戻る"}
          confirmButtonText={modalState.type === "removeTask" ? "タスクを削除する" : (
            modalState.type === "backToList" ? "破棄して一覧へ戻る" : "破棄して詳細へ戻る"
          )}
          cancelButtonText="キャンセル"
        />
      )}

      {/* ノーティフィケーションバナーコンポーネント */}
      {bannerState.isVisible && (
        <NotificationBanner
          message={bannerState.message}
          type={bannerState.type!}
          onClose={closeBanner}
        />
      )}




    </div>
  );
}

export default EditForm;