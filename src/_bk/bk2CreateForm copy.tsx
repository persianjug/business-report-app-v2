"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import ConfirmationView from "./ConfirmationView";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// 選択肢を定数として定義
const positions = ["PG", "SE", "SE(社員代替)", "テスター", "オペレーター", "PL", "PM", "社員代替"];
const workStyles = ["併用勤務(在宅率6割以上)", "併用勤務(在宅率6割未満)", "現場勤務", "在宅勤務"];

// yupによるバリデーションスキーマ
const reportSchema = yup.object().shape({
  startDate: yup.string().required("報告対象期間の開始日は必須です。"),
  endDate: yup.string()
    .required("報告対象期間の終了日は必須です。")
    .test(
      "is-after-start-date", // テストの識別子
      "終了日は開始日以降の日付を選択してください。", // エラーメッセージ
      function (value) { // 終了日(value)と開始日を比較する関数
        const { startDate } = this.parent;
        // 開始日と終了日の両方が存在する場合にのみバリデーションを実行
        if (!startDate || !value) {
          return true; // 未入力の場合はこのテストは成功とみなす
        }

        // Dateオブジェクトに変換して比較
        const start = new Date(startDate);
        const end = new Date(value);

        return end >= start;
      }
    ),
  customerInfo: yup.object().shape({
    endClient: yup.string().required("エンド企業名は必須です。"),
    upperClient: yup.string().required("上位企業名は必須です。"),
    industry: yup.string().required("業種は必須です。"),
    nearestStation: yup.string().required("職場最寄駅は必須です。"),
  }),
  projectInfo: yup.object().shape({
    projectName: yup.string().required("案件名は必須です。"),
    participationDate: yup.string().required("参画日は必須です。"),
    numberOfParticipants: yup.number().min(1, "参画人数は1以上である必要があります。"),
    commuteHours: yup.number().min(0, "時間は0以上である必要があります。"),
    commuteMinutes: yup.number().min(0, "分は0以上である必要があります。").max(59, "分は59以下である必要があります。").nullable(),
    workStyle: yup.string().required("勤務形態は必須です。"),
    position: yup.string().required("ポジションは必須です。"),
    mainTechnology: yup.string().required("主要技術は必須です。"),
    database: yup.string().required("データベースは必須です。"),
  }),
  overallProgress: yup.string().required("全体状況は必須です。"),
  tasks: yup.array().of(
    yup.object().shape({
      taskName: yup.string().required("タスク名は必須です。"),
      status: yup.string().required("状況は必須です。"),
      problem: yup.string().nullable(),
    })
  ).min(1, "タスクは最低1つは必要です。"),
  futurePlans: yup.string().required("今後の予定は必須です。"),
  otherInfo: yup.object().shape({
    customerStatus: yup.string().nullable(),
    salesInfo: yup.string().nullable(),
    healthStatus: yup.string().nullable(),
    vacationPlans: yup.string().nullable(),
  }),
  consultation: yup.string().nullable(),
});

type FormData = yup.InferType<typeof reportSchema>;

export default function CreateForm() {
  const router = useRouter();
  const [hasReports, setHasReports] = useState(false); // 報告書が存在するかどうかを管理する状態
  const [step, setStep] = useState<"input" | "confirm">("input");

  // const [isDirty, setIsDirty] = useState(false);
  // const [formData, setFormData] = useState({
  //   startDate: "",
  //   endDate: "",
  //   customerInfo: {
  //     endClient: "",
  //     upperClient: "",
  //     industry: "",
  //     nearestStation: "",
  //   },
  //   projectInfo: {
  //     projectName: "",
  //     participationDate: "",
  //     numberOfParticipants: 0,
  //     commuteHours: 0,
  //     commuteMinutes: 0,
  //     workStyle: "",
  //     position: "",
  //     mainTechnology: "",
  //     database: "",
  //   },
  //   overallProgress: "",
  //   tasks: [{ taskName: "", status: "", problem: "" }],
  //   futurePlans: "",
  //   otherInfo: {
  //     customerStatus: "",
  //     salesInfo: "",
  //     healthStatus: "",
  //     vacationPlans: "",
  //   },
  //   consultation: "",
  // });

  // // フォームの初期値を設定する
  // useEffect(() => {
  //   setFormData({
  //     startDate: "",
  //     endDate: "",
  //     customerInfo: {
  //       endClient: "", upperClient: "", industry: "", nearestStation: "",
  //     },
  //     projectInfo: {
  //       projectName: "",
  //       participationDate: "",
  //       numberOfParticipants: 0,
  //       commuteHours: 0,
  //       commuteMinutes: 0,
  //       workStyle: "",
  //       position: "",
  //       mainTechnology: "",
  //       database: "",
  //     },
  //     overallProgress: "",
  //     tasks: [{ taskName: "", status: "", problem: "" }],
  //     futurePlans: "",
  //     otherInfo: {
  //       customerStatus: "",
  //       salesInfo: "",
  //       healthStatus: "",
  //       vacationPlans: "",
  //     },
  //     consultation: "",
  //     // id: undefined, // 新規作成のためIDは不要
  //     // createdAt: undefined // 新規作成のため作成日は不要
  //   });
  // }, []);


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

  // タスク欄を動的に追加、削除するための準備
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  // フォームの入力内容を監視
  const formData = watch();

  // 報告書が存在するかどうかをAPIから確認
  useEffect(() => {
    const checkReports = async () => {
      try {
        const response = await api.get<boolean>("/reports/has-data");
        setHasReports(response.data);
        console.log(`hasReports: ${hasReports}`);
      } catch (error) {
        console.error("報告書の存在確認に失敗しました:", error);
      }
    };
    checkReports();
  }, []);

  // ブラウザバック対策
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

  // タスク追加のハンドラー
  const handleAddTask = () => {
    if (fields.length < 5) {
      append({ taskName: "", status: "", problem: "" });
    }
  };

  // タスク削除のハンドラー
  const handleRemoveTask = (index: number) => {
    if (window.confirm("本当にこのタスクを削除しますか？")) {
      remove(index);
    }
  };

  // 確認画面への切り替えハンドラー
  const onSubmitToConfirm = async (data: FormData) => {
    setStep("confirm");
  };

  // APIを呼び出してデータを登録/更新する
  const handleApiSubmit = async () => {
    try {
      // 登録処理
      await api.post("/reports", formData);
      alert("報告書が正常に作成されました");
      router.push("/reports");
    } catch (error) {
      console.error("報告書の作成に失敗しました:", error);
      alert("報告書の作成に失敗しました");
    }
  };

  // 最新の報告書データを読み出すハンドラー
  const handleLoadLatest = async () => {
    if (isDirty) {
      const shouldLoad = window.confirm(
        "現在入力中の内容は保存されません。最新の報告書を読み込みますか？"
      );
      if (!shouldLoad) {
        return;
      }
    }

    try {
      const response = await api.get<Report>("/reports/latest");
      const latestReport = response.data;
      reset({
        ...latestReport,
        startDate: "",
        endDate: "",
        overallProgress: "",
        tasks: latestReport.tasks && latestReport.tasks.length > 0
          ? latestReport.tasks.map(task => ({ ...task, status: "", problem: "" }))
          : [{ taskName: "", status: "", problem: "" }],
      });
      alert("最新の報告書データを読み込みました");
    } catch (error) {
      console.error("最新の報告書データの取得に失敗しました:", error);
      alert("最新の報告書データが見つかりませんでした");
    }
  };

  // 一覧画面へ戻るためのハンドラー
  const handleBackToList = () => {
    if (isDirty) {
      const shouldDiscard = window.confirm(
        "入力中の内容が破棄されますがよろしいですか？"
      );
      if (shouldDiscard) {
        router.push("/reports");
      }
    } else {
      router.push("/reports");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">業務報告書{step === "confirm" ? "確認" : "作成"}</h1>
        {step === "input" && (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleLoadLatest}
              disabled={!hasReports}
              className={`
                font-bold py-2 px-4 rounded-md shadow-md
                ${hasReports
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"}
              `}
            >
              最新の報告書を読み込む
            </button>
          </div>
        )}
      </div>

      {step === "input" ? (
        <form onSubmit={handleSubmit(onSubmitToConfirm)} className="space-y-6">
          <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <h2 className="text-xl font-semibold mb-3">基本情報</h2>
            <div>
              <label className="block text-sm font-bold text-gray-700">報告対象期間</label>
              <div className="mt-1 flex space-x-4">
                <input
                  type="date"
                  {...register("startDate")}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="self-center">〜</span>
                <input
                  type="date"
                  {...register("endDate")}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {errors.startDate && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.startDate.message}</p>
                </div>
              )}
              {errors.endDate && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.endDate.message}</p>
                </div>
              )}
              {/* {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>}
              {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>} */}
            </div>
          </section>

          <section className="p-4 border rounded-lg bg-gray-50 space-y-8">
            <h2 className="text-xl font-semibold mb-3">顧客情報</h2>
            <div>
              <label htmlFor="endClient" className="block text-sm font-semibold text-gray-700">エンド企業</label>
              <input
                type="text"
                id="endClient"
                {...register("customerInfo.endClient")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.customerInfo?.endClient && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.customerInfo.endClient.message}</p>
                </div>
              )}
              {/* {errors.customerInfo?.endClient && <p className="mt-1 text-sm text-red-500">{errors.customerInfo.endClient.message}</p>} */}
            </div>
            <div>
              <label htmlFor="upperClient" className="block text-sm font-semibold text-gray-700">上位企業</label>
              <input
                type="text"
                id="upperClient"
                {...register("customerInfo.upperClient")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.customerInfo?.upperClient && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.customerInfo.upperClient.message}</p>
                </div>
              )}
              {/* {errors.customerInfo?.upperClient && <p className="mt-1 text-sm text-red-500">{errors.customerInfo.upperClient.message}</p>} */}
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-semibold text-gray-700">業種</label>
              <input
                type="text"
                id="industry"
                {...register("customerInfo.industry")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.customerInfo?.industry && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.customerInfo.industry.message}</p>
                </div>
              )}
              {/* {errors.customerInfo?.industry && <p className="mt-1 text-sm text-red-500">{errors.customerInfo.industry.message}</p>} */}
            </div>
            <div>
              <label htmlFor="nearestStation" className="block text-sm font-semibold text-gray-700">職場最寄駅</label>
              <input
                type="text"
                id="nearestStation"
                {...register("customerInfo.nearestStation")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.customerInfo?.nearestStation && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.customerInfo.nearestStation.message}</p>
                </div>
              )}
              {/* {errors.customerInfo?.nearestStation && <p className="mt-1 text-sm text-red-500">{errors.customerInfo.nearestStation.message}</p>} */}
            </div>
          </section>

          <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <h2 className="text-xl font-semibold mb-3">案件情報</h2>
            <div>
              <label htmlFor="projectName" className="block text-sm font-semibold text-gray-700">案件名</label>
              <input
                type="text"
                id="projectName"
                {...register("projectInfo.projectName")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.projectInfo?.projectName && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.projectInfo.projectName.message}</p>
                </div>
              )}
              {/* {errors.projectInfo?.projectName && <p className="mt-1 text-sm text-red-500">{errors.projectInfo.projectName.message}</p>} */}
            </div>
            <div>
              <label htmlFor="participationDate" className="block text-sm font-semibold text-gray-700">参画日</label>
              <input
                type="date"
                id="participationDate"
                {...register("projectInfo.participationDate")}
                className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.projectInfo?.participationDate && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.projectInfo.participationDate.message}</p>
                </div>
              )}
              {/* {errors.projectInfo?.participationDate && <p className="mt-1 text-sm text-red-500">{errors.projectInfo.participationDate.message}</p>} */}
            </div>
            <div>
              <label htmlFor="numberOfParticipants" className="block text-sm font-semibold text-gray-700">参画人数</label>
              <input
                type="number"
                id="numberOfParticipants"
                {...register("projectInfo.numberOfParticipants", { valueAsNumber: true })}
                className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.projectInfo?.numberOfParticipants && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.projectInfo.numberOfParticipants.message}</p>
                </div>
              )}
              {/* {errors.projectInfo?.numberOfParticipants && <p className="mt-1 text-sm text-red-500">{errors.projectInfo.numberOfParticipants.message}</p>} */}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">通勤時間</label>
              <div className="mt-1 flex space-x-2 items-center">
                <input
                  type="number"
                  {...register("projectInfo.commuteHours", { valueAsNumber: true })}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="text-gray-500">時間</span>
                <input
                  type="number"
                  {...register("projectInfo.commuteMinutes", { valueAsNumber: true })}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="text-gray-500">分</span>
              </div>
              {errors.projectInfo?.commuteHours && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.projectInfo.commuteHours.message}</p>
                </div>
              )}
              {errors.projectInfo?.commuteMinutes && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.projectInfo.commuteMinutes.message}</p>
                </div>
              )}
              {/* {errors.projectInfo?.commuteHours && <p className="mt-1 text-sm text-red-500">{errors.projectInfo.commuteHours.message}</p>} */}
              {/* {errors.projectInfo?.commuteMinutes && <p className="mt-1 text-sm text-red-500">{errors.projectInfo.commuteMinutes.message}</p>} */}
            </div>
            <div>
              <label htmlFor="workStyle" className="block text-sm font-semibold text-gray-700">勤務形態</label>
              <select
                id="workStyle"
                {...register("projectInfo.workStyle")}
                className="mt-1 block w-72 border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">選択してください</option>
                {workStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              {errors.projectInfo?.workStyle && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.projectInfo.workStyle.message}</p>
                </div>
              )}
              {/* {errors.projectInfo?.workStyle && <p className="mt-1 text-sm text-red-500">{errors.projectInfo.workStyle.message}</p>} */}
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-semibold text-gray-700">ポジション</label>
              <select
                id="position"
                {...register("projectInfo.position")}
                className="mt-1 block w-72 border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">選択してください</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              {errors.projectInfo?.position && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.projectInfo.position.message}</p>
                </div>
              )}
              {/* {errors.projectInfo?.position && <p className="mt-1 text-sm text-red-500">{errors.projectInfo.position.message}</p>} */}
            </div>
            <div>
              <label htmlFor="mainTechnology" className="block text-sm font-semibold text-gray-700">主要技術(言語、FW)</label>
              <input
                type="text"
                id="mainTechnology"
                {...register("projectInfo.mainTechnology")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.projectInfo?.mainTechnology && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.projectInfo.mainTechnology.message}</p>
                </div>
              )}
              {/* {errors.projectInfo?.mainTechnology && <p className="mt-1 text-sm text-red-500">{errors.projectInfo.mainTechnology.message}</p>} */}
            </div>
            <div>
              <label htmlFor="database" className="block text-sm font-semibold text-gray-700">データベース</label>
              <input
                type="text"
                id="database"
                {...register("projectInfo.database")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.projectInfo?.database && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.projectInfo.database.message}</p>
                </div>
              )}
              {/* {errors.projectInfo?.database && <p className="mt-1 text-sm text-red-500">{errors.projectInfo.database.message}</p>} */}
            </div>
          </section>

          <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <h2 className="text-xl font-semibold mb-3">進捗状況</h2>
            <div>
              <label htmlFor="overallProgress" className="block text-sm font-semibold text-gray-700">全体状況</label>
              <textarea
                id="overallProgress"
                {...register("overallProgress")}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.overallProgress && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.overallProgress.message}</p>
                </div>
              )}
              {/* {errors.overallProgress && <p className="mt-1 text-sm text-red-500">{errors.overallProgress.message}</p>} */}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">タスク(最大5つ)</h3>
                <button
                  type="button"
                  onClick={handleAddTask}
                  disabled={fields.length >= 5}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-full text-sm disabled:bg-gray-400"
                >
                  タスク追加
                </button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-2 border p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-600">タスク {index + 1}</h4>
                    {fields.length > 1 && (
                      <button type="button"
                        onClick={() => handleRemoveTask(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        削除
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">タスク名</label>
                    <input
                      type="text"
                      {...register(`tasks.${index}.taskName`)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.tasks?.[index]?.taskName && (
                      <div className="flex items-center mt-1">
                        <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-red-500">{errors.tasks?.[index]?.taskName.message}</p>
                      </div>
                    )}
                    {/* {errors.tasks?.[index]?.taskName && <p className="mt-1 text-sm text-red-500">{errors.tasks[index].taskName.message}</p>} */}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">状況</label>
                    <textarea
                      {...register(`tasks.${index}.status`)}
                      rows={2}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                    {errors.tasks?.[index]?.status && (
                      <div className="flex items-center mt-1">
                        <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-red-500">{errors.tasks?.[index]?.status.message}</p>
                      </div>
                    )}
                    {/* {errors.tasks?.[index]?.status && <p className="mt-1 text-sm text-red-500">{errors.tasks[index].status.message}</p>} */}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">問題・課題</label>
                    <textarea
                      {...register(`tasks.${index}.problem`)}
                      rows={2}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                  </div>
                </div>
              ))}
              {errors.tasks?.message && <p className="mt-1 text-sm text-red-500">{errors.tasks.message}</p>}
            </div>

            <div className="mt-6">
              <label htmlFor="futurePlans" className="block text-sm font-semibold text-gray-700">今後の予定</label>
              <textarea
                id="futurePlans"
                {...register("futurePlans")}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.futurePlans && (
                <div className="flex items-center mt-1">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-500">{errors.futurePlans.message}</p>
                </div>
              )}
              {/* {errors.futurePlans && <p className="mt-1 text-sm text-red-500">{errors.futurePlans.message}</p>} */}
            </div>
          </section>

          <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <h2 className="text-xl font-semibold mb-3">その他</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700">顧客状況</label>
              <textarea
                {...register("otherInfo.customerStatus")}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">営業情報</label>
              <textarea
                {...register("otherInfo.salesInfo")}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">健康状況</label>
              <textarea
                {...register("otherInfo.healthStatus")}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">休暇予定</label>
              <textarea
                {...register("otherInfo.vacationPlans")}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
          </section>

          <section className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <h2 className="text-xl font-semibold mb-3">上司へ相談</h2>
            <div>
              <label htmlFor="consultation" className="block text-sm font-semibold text-gray-700">相談内容</label>
              <textarea
                id="consultation"
                {...register("consultation")}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              ></textarea>
            </div>
          </section>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBackToList}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md shadow-md"
            >
              一覧に戻る
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-md"
            >
              確認画面へ
            </button>
          </div>
        </form>
      ) : (
        <div>
          <ConfirmationView formData={formData} />
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep("input")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md shadow-md"
            >
              修正する
            </button>
            <button
              type="button"
              onClick={handleApiSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-md"
            >
              この内容で提出する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}