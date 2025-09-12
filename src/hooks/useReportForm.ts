"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reportSchema, FormData } from "@/schemas/reportSchema";
import api from "@/utils/axios";
import { getLatestReport, setDraftReport, setReport, updateDraftReport, updateReport, updateReportDraft, updateReportDraftToPublished } from "@/lib/report";
import { transformFormDataToReport, transformReportToFormData } from "@/utils/reportHelper";
import { useModal } from "./useModal";
import { MAX_TASKS } from "@/Constants/reportConstants";
import { useToastsAndNavigation } from "./useToastsAndNavigation";
import { useReportDeletion } from "./useReportDeletion";
import { createDiscardModalState, createLoadLatestModalState, createTaskDeletionModalState } from "@/utils/modelHelper";

export const useReportForm = (initialData: FormData) => {
  const router = useRouter();
  // 最新データ有無の状態
  const [hasReports, setHasReports] = useState(false);
  // フォーム画面と確認画面の切り替え状態
  const [step, setStep] = useState<"input" | "confirm">("input");
  // モーダルの表示状態
  const { modalState, showModal, closeModal } = useModal();
  // タスク削除対象の状態
  const [taskToRemoveIndex, setTaskToRemoveIndex] = useState<number | null>(null);
  // フォームエラー時にアラートを表示する状態
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  // 成功、エラー時の通知
  const { handleSuccess, handleError } = useToastsAndNavigation();
  // データ削除のハンドラー
  const { handleRemoveReport, performRemoveReport } = useReportDeletion({ modalState, showModal, closeModal });

  // フォームのバディデーション機能初期化
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: yupResolver(reportSchema),
    defaultValues: initialData,
  });

  // フォームのバディデーション機能初期化（タスク） 
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  // フォーム入力状態を監視
  const formData = watch();

  // 先頭フォーム画面と確認画面で切り替えときに先頭にスクロール
  useEffect(() => {
    if (step === "confirm" || step === "input") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [step]);

  // 報告書データの存在確認（初回レンダリング時）
  useEffect(() => {
    const checkReports = async () => {
      try {
        const response = await api.get<boolean>("/reports/has-data");
        setHasReports(response.data);
      } catch (error) {
        console.error("報告書の存在確認に失敗しました:", error);
      }
    };
    checkReports();
  }, []);

  // ブラウザバック時のフォーム未保存の検知
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  // 一覧へ戻る操作処理
  const performBackToList = () => {
    router.push("/reports");
  };

  // 詳細へ戻る操作処理
  const performBackToDetail = (reportId: string | number | null) => {
    router.push(`/reports/${reportId}`);
  };

  // タスク削除処理
  const performRemoveTask = () => {
    try {
      if (taskToRemoveIndex !== null) {
        remove(taskToRemoveIndex);
        handleSuccess(`タスク${taskToRemoveIndex} が削除されました。`);
        setTaskToRemoveIndex(null);
        // closeModal();
      }
    } catch (error) {
      handleError(error as Error, `タスク${taskToRemoveIndex} の削除が失敗しました。`);
    } finally {
      // closeModal();
    }
  };

  // 報告書の登録処理
  const performRegisterReport = async () => {
    await setReport(transformFormDataToReport(formData));
  };

  // 報告書の更新処理
  const performUpdateReport = async (reportId: string | number) => {
    await updateReport(reportId, transformFormDataToReport(formData));
  };

  // 下書きデータの更新処理
  const performUpdateReportDraft = async (reportId: string | number) => {
    await updateReportDraft(reportId, transformFormDataToReport(formData));
  };

  // 報告書の更新処理(下書きから公開済みへ)
  const performUpdateReportDraftToPublished = async (reportId: string | number) => {
    await updateReportDraftToPublished(reportId, transformFormDataToReport(formData));
  };

  // 下書き報告書の登録処理
  const performResisterDraftReport = async () => {
    await setDraftReport(transformFormDataToReport(formData));
  };

  // 最新の報告書取得処理
  const fetchLatestReportData = async (): Promise<FormData | null> => {
    const response = await getLatestReport();
    // const latestReport = transformReportToFormData(response);
    return transformReportToFormData(response);
  }

  // フォームの内容をリセット
  const performResetFormWithData = (data: FormData | null) => {
    reset(data);
  };

  // 最新の報告書ロード処理
  const performLoadLatest = async () => {
    try {
      const loadedData = await fetchLatestReportData();
      performResetFormWithData(loadedData);
      handleSuccess("最新の報告書データを読み込みました。");
    } catch (error) {
      handleError(error as Error, "最新の報告書データが見つかりませんでした。");
    } finally {
      closeModal();
    }
  };

  // 「最新の報告書を読み込む」ボタン押下時のハンドラー
  const handleLoadLatest = () => {
    if (isDirty) {
      showModal(createLoadLatestModalState(performLoadLatest, closeModal));
    } else {
      performLoadLatest();
    }
  };

  // 「タスク追加」ボタン押下時のハンドラー
  const handleAddTask = () => {
    if (fields.length < MAX_TASKS) {
      append({ taskName: "", taskProgress: "", taskProblem: "" });
    }
  };

  // 「タスク削除」リンク押下時のハンドラー
  const handleRemoveTask = (index: number) => {
    setTaskToRemoveIndex(index);
    showModal(createTaskDeletionModalState(index, performRemoveTask, closeModal));
  };

  // 「確認画面へ進む」ボタン押下時のハンドラー
  const handleSubmitToConfirm: SubmitHandler<FormData> = (formData: FormData) => {
    setShowErrorAlert(false); // 成功した場合はエラーアラートを非表示
    setStep("confirm");
  };

  // バリデーション失敗時のハンドラー
  const onValidationFailure = () => {
    setShowErrorAlert(true); // 失敗した場合はエラーアラートを表示
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // フォームのonSubmitに渡す関数
  const onSubmitHandler = handleSubmit(handleSubmitToConfirm, onValidationFailure);

  // 「この内容で登録する」ボタン押下時のハンドラー
  const handleApiPost = async () => {
    try {
      await performRegisterReport();
      handleSuccess("報告書を登録しました。", "/reports");
    } catch (error) {
      handleError(error as Error, "報告書の登録に失敗しました。");
    }
  };

  // 「この内容で更新する」ボタン押下時のハンドラー
  const handleApiPut = async (reportId: string | number, status: "published" | "draft") => {
    const successMessage = status === "published" ?
      `報告書（ID:${reportId}）を更新しました。`
      :
      `下書きデータ（ID:${reportId}）を更新しました。`;

    const errorMessage = status === "published" ?
      `報告書（ID:${reportId}）の更新に失敗しました。`
      :
      `下書きデータ（ID:${reportId}）の更新に失敗しました。`;

    try {
      await performUpdateReport(reportId);
      handleSuccess(successMessage, "/reports");
    } catch (error) {
      handleError(error as Error, errorMessage);
    }
  };

  // 「下書き保存する」ボタン押下時のハンドラー（下書き編集画面用）
  const handleApiPutDraft = async (reportId: string | number) => {
    try {
      await performUpdateReportDraft(reportId);
      handleSuccess(`下書きデータ（ID:${reportId}）を更新しました。`, "/reports");
    } catch (error) {
      handleError(error as Error, `下書きデータ（ID:${reportId}）の更新に失敗しました。`);
    }
  };

  // 「この内容で登録する」ボタン押下時のハンドラー(下書きデータを公開済みにする)
  const handleApiPutDraftToPublished = async (reportId: string | number) => {
    try {
      await performUpdateReportDraftToPublished(reportId);
      handleSuccess(`下書きデータ（ID:${reportId}）を報告書として登録しました。`, "/reports");
    } catch (error) {
      handleError(error as Error, `下書きデータ（ID:${reportId}）から報告書への登録に失敗しました。`);
    }
  };


  // 下書き保存処理のハンドラー
  const handleSaveAsDraft = async () => {
    try {
      await performResisterDraftReport();
      handleSuccess("下書きの報告書を登録しました。", "/reports");
    } catch (error) {
      handleError(error as Error, "下書きの報告書の登録に失敗しました。");
    }
  };

  // 「一覧へ戻る」ボタン押下時のハンドラー
  const handleBackToList = (e: React.MouseEvent) => {
    if (isDirty) {
      e.preventDefault();
      showModal(createDiscardModalState(performBackToList, closeModal));
    } else {
      // フォームの変更なしの場合Linkのデフォルト動作で遷移。
    }
  };

  // 「詳細へ戻る」ボタン押下時のハンドラー
  const handleBackToDetail = (e: React.MouseEvent, reportId: string | number | null) => {
    if (isDirty) {
      e.preventDefault();
      showModal(createDiscardModalState(() => performBackToDetail(reportId), closeModal));
    } else {
      performBackToDetail(reportId);
    }
  };

  return {
    step,
    isDirty,
    hasReports,
    control,
    errors,
    fields,
    formData,
    modalState,
    showErrorAlert,
    setStep,
    register,
    handleSubmit: onSubmitHandler,
    handleAddTask,
    handleRemoveTask,
    handleSubmitToConfirm,
    handleApiPost,
    handleApiPut,
    handleApiPutDraft,
    handleApiPutDraftToPublished,
    handleLoadLatest,
    handleBackToList,
    handleBackToDetail,
    handleSaveAsDraft,
    handleRemoveReport,
    performLoadLatest,
    performBackToList,
    performBackToDetail,
    performRemoveTask,
    performRemoveReport,
    closeModal,
  };
};