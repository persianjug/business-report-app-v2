import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reportSchema, FormData } from "@/schemas/reportSchema";
import api from "@/utils/axios";

export const useReportForm = () => {
  const router = useRouter();
  const [hasReports, setHasReports] = useState(false);
  const [step, setStep] = useState<"input" | "confirm">("input");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: yupResolver(reportSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      customerInfo: {
        endClient: "",
        upperClient: "",
        industry: "",
        nearestStation: "",
      },
      projectInfo: {
        projectName: "",
        participationDate: "",
        numberOfParticipants: 0,
        commuteHours: 0,
        commuteMinutes: 0,
        workStyle: "",
        position: "",
        mainTechnology: "",
        database: "",
      },
      overallProgress: "",
      tasks: [{ taskName: "", status: "", problem: "" }],
      futurePlans: "",
      otherInfo: {
        customerStatus: "",
        salesInfo: "",
        healthStatus: "",
        vacationPlans: "",
      },
      consultation: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const formData = watch();

  useEffect(() => {
    if (step === "confirm" || step === "input") {
      // 画面の先頭（x座標: 0, y座標: 0）にスムーズにスクロール
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [step]); // stepの状態が変わるたびにこのエフェクトが実行される

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

  const handleAddTask = () => {
    if (fields.length < 5) {
      append({ taskName: "", status: "", problem: "" });
    }
  };

  const handleRemoveTask = (index: number) => {
    if (window.confirm("本当にこのタスクを削除しますか？")) {
      remove(index);
    }
  };

  const onSubmitToConfirm = async (data: FormData) => {
    setStep("confirm");
  };

  const handleApiSubmit = async () => {
    try {
      await api.post("/reports", formData);
      alert("報告書が正常に作成されました");
      router.push("/reports");
    } catch (error) {
      console.error("報告書の作成に失敗しました:", error);
      alert("報告書の作成に失敗しました");
    }
  };

  const handleLoadLatest = async () => {
    if (isDirty) {
      const shouldLoad = window.confirm("現在入力中の内容は保存されません。最新の報告書を読み込みますか？");
      if (!shouldLoad) return;
    }
    try {
      const response = await api.get<any>("/reports/latest");
      const latestReport = response.data;
      reset({
        ...latestReport,
        startDate: "",
        endDate: "",
        overallProgress: "",
        tasks: latestReport.tasks?.length > 0
          ? latestReport.tasks.map((task: any) => ({ ...task, status: "", problem: "" }))
          : [{ taskName: "", status: "", problem: "" }],
      });
      alert("最新の報告書データを読み込みました");
    } catch (error) {
      console.error("最新の報告書データの取得に失敗しました:", error);
      alert("最新の報告書データが見つかりませんでした");
    }
  };

  const handleBackToList = () => {
    if (isDirty) {
      const shouldDiscard = window.confirm("入力中の内容が破棄されますがよろしいですか？");
      if (shouldDiscard) router.push("/reports");
    } else {
      router.push("/reports");
    }
  };

  return {
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
    handleApiSubmit,
    handleLoadLatest,
    handleBackToList,
  };
};