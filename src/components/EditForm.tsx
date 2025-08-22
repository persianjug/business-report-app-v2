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
    handleSaveAsDraft,
  } = useReportForm(initialData);

  const formId = "edit-report-form";

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
      {/* ヘッダー */}
      {step === "input" && (
        <PageHeader
          title={`業務報告書の修正（ID: ${reportId}）`}
          description={
            <>
              <p className="text-gray-700">
                業務報告書を編集します。必要事項を修正し、「確認画面へ進む」ボタンを押してください
              </p>
            </>
          }
          actions={
            <>
              <Link href={`/reports/${reportId}`} className="text-blue-600 hover:underline px-4 py-2" onClick={handleBackToDetail}>詳細に戻る</Link>
              <DropdownMenu items={dropDownMenuItems} />
            </>
          }
          isSticky
        />
      )}
      {step === "confirm" && (
        <PageHeader
          title={"修正内容の確認"}
          description={
            <div className="text-blue-700">
              <p className="font-bold">内容をご確認ください。</p>
              <p>以下の内容でよろしければ、「この内容で更新する」ボタンを押してください。</p>
            </div>
          }
          actions={
            <>
              <Link href="#" className="text-blue-600 hover:underline px-4 py-2" onClick={() => setStep("input")}>編集に戻る</Link>
            </>
          }
          isSticky
        />
      )}

      {step === "input" && (
        <>
          <form onSubmit={handleSubmit(onSubmitToConfirm)} id={formId} className="space-y-6 text-sm">
            <InputForm
              register={register}
              control={control}
              errors={errors}
              fields={fields}
              handleAddTask={handleAddTask}
              handleRemoveTask={handleRemoveTask}
              handleLoadLatest={handleLoadLatest}
              handleSaveAsDraft={handleSaveAsDraft}
              hasReports={hasReports}
              isEditMode={true}
            />
          </form>
          <div className="flex justify-end mt-6 gap-x-4">
            <Button type="button" variant="secondary" onClick={handleSaveAsDraft} form={formId}>下書き保存</Button>
            <Button type="submit" variant="primary" form={formId}>確認画面へ進む</Button>
          </div>
        </>
      )}
      {step === "confirm" && (
        <div className="space-y-6">
          <div className="text-sm">
            <ConfirmationView formData={formData} isConfirm={true} isEditMode={true} />
          </div>
          <div className="flex justify-end mt-6">
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
          onConfirm={modalState.type === "removeTask" ? performRemoveTask : (
            modalState.type === "backToList" ? performBackToList : () => performBackToDetail(reportId)
          )}
          title={modalState.title}
          message={modalState.message}
          variant={"confirm"}
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