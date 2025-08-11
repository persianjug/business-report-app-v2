import { Report } from "@/types/Report";
import * as yup from "yup";

// yupによるバリデーションスキーマ
export const reportSchema = yup.object<Report>().shape({
  startDate: yup.string().required("報告対象期間の開始日は必須です。"),
  endDate: yup.string()
    .required("報告対象期間の終了日は必須です。")
    .test(
      "is-after-start-date",
      "終了日は開始日以降の日付を選択してください。",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) {
          return true;
        }
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

export type FormData = yup.InferType<typeof reportSchema>;
