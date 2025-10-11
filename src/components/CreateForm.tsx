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
import ConfirmationModal from "./ConfirmationModal";
import ScrollButtons from "./ScrollButtons";
import { useScrollLock } from "@/hooks/useScrollLock";
import PageDescription from "./PageDescription";
import ErrorAlert from "./ErrorAlert";
import { transformReportToFormData } from "@/utils/reportHelper";

const CreateForm = () => {
  const {
    step,
    setStep,
    register,
    handleSubmit,
    errors,
    fields,
    formData,
    handleAddTask,
    handleRemoveTask,
    handleApiPost,
    handleLoadLatest,
    handleBackToList,
    modalState,
    handleSaveAsDraft,
    showErrorAlert,
  } = useReportForm(transformReportToFormData(REPORT_INITIAL_DATA)!);

  // モーダル表示時のスクロール禁止制御
  useScrollLock([modalState.isOpen]);

  // ドロップダウンリストのメニュー
  const dropDownMenuItems = [
    {
      label: "最新の報告書を読み込む",
      onClick: handleLoadLatest,
      disabled: false,
      isDestructive: false,
      icon: BiLoaderAlt,
    },
  ];

  // フォームID
  // InputFormコンポーネントでフォーム外で送信処理を行うため指定が必要
  const formId = "create-report-form";

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* ヘッダー：新規作成画面 */}
      {step === "input" && (
        <PageHeader
          title={"業務報告書の登録内容入力"}
          description={
            <>
              {showErrorAlert ?
                <ErrorAlert
                  message="入力内容に不備があります。"
                  subMessage="すべての項目が正しく入力されているか確認してください。"
                />
                :
                <PageDescription>
                  業務報告書を新規作成します。必要事項を入力し、「確認画面へ進む」ボタンを押してください。
                </PageDescription>
              }
            </>
          }
          actions={
            <>
              <Link href="/reports" className="text-blue-600 hover:underline px-4 py-2" onClick={handleBackToList}>一覧に戻る</Link>
              <DropdownMenu items={dropDownMenuItems} />
            </>
          }
          isSticky
        />
      )}

      {step === "confirm" && (
        <PageHeader
          title={"登録内容の確認"}
          description={
            <PageDescription>
              <p className="font-bold">内容をご確認ください。</p>
              <p>以下の内容でよろしければ、「この内容で登録する」ボタンを押してください。</p>
            </PageDescription>
          }
          actions={
            <>
              <Link href="#" className="text-blue-600 hover:underline px-4 py-2" onClick={() => setStep("input")}>入力に戻る</Link>
            </>
          }
          isSticky
        />
      )}

      {/* メインコンテンツ：新規作成画面 */}
      {step === "input" && (
        <div className="space-y-6">
          <form id={formId} onSubmit={handleSubmit} className="space-y-6 text-sm">
            <InputForm
              register={register}
              errors={errors}
              fields={fields}
              handleAddTask={handleAddTask}
              handleRemoveTask={handleRemoveTask}
            />
          </form>
          <div className="flex justify-end mt-6 gap-x-4">
            <Button type="button" variant="outline" onClick={handleSaveAsDraft} form={formId}>下書き保存</Button>
            <Button type="submit" variant="primary" form={formId}>確認画面へ進む</Button>
          </div>
        </div>
      )}

      {/* メインコンテンツ：確認画面 */}
      {step === "confirm" && (
        <div className="space-y-6">
          <div className="text-sm">
            <ConfirmationView formData={formData} isConfirm={true} isEditMode={false} />
          </div>
          <div className="flex justify-end mt-6">
            <Button
              type="button"
              variant="success"
              onClick={handleApiPost}>この内容で登録する</Button>
          </div>
        </div>
      )}

      {/* ページ上部、下部へスクロールボタン */}
      <ScrollButtons />

      {/* モーダル */}
      {modalState.isOpen && (
        <ConfirmationModal
          isOpen={modalState.isOpen}
          variant={modalState.variant}
          title={modalState.title}
          message={modalState.message}
          confirmButtonText={modalState.confirmButtonText}
          cancelButtonText={modalState.cancelButtonText}
          onClose={modalState.onClose || (() => { })}
          onConfirm={modalState.onConfirm || (() => { })}
        />
      )}
    </div>
  );
}

export default CreateForm;
