import { Report } from "@/types/Report"

// 案件のポジション選択肢
export const POSITIONS = [
  "PG",
  "SE",
  "SE(社員代替)",
  "テスター",
  "オペレーター",
  "PL",
  "PM",
  "社員代替"
];

// 勤務形態の選択肢
export const WORK_STYLES = [
  "併用勤務(在宅率6割以上)",
  "併用勤務(在宅率6割未満)",
  "現場勤務",
  "在宅勤務"
];

// 報告書データの初期値
export const REPORT_INITIAL_DATA: Report = {
  id: 0,
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
  createdAt: "",
  updateAt: ""
}

export type Tab = "published" | "drafts" | "all";
