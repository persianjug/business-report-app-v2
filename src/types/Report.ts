export interface Report {
  id: number;
  startDate: string;
  endDate: string;
  customerInfo: CustomerInfo;
  projectInfo: ProjectInfo;
  overallProgress: string;
  tasks: Task[];
  futurePlans: string;
  otherInfo: OtherInfo;
  consultation: string;
  createdAt: string;
  updateAt: string;
}

export interface CustomerInfo {
  endClient: string;
  upperClient: string;
  industry: string;
  nearestStation: string;
}

export interface ProjectInfo {
  projectName: string;
  participationDate: string;
  numberOfParticipants: number;
  commuteHours: number;
  commuteMinutes: number;
  workStyle: string;
  position: string;
  mainTechnology: string;
  database: string;
}

export interface Task {
  taskName: string;
  status: string;
  problem: string;
}

export interface OtherInfo {
  customerStatus: string;
  salesInfo: string;
  healthStatus: string;
  vacationPlans: string;
}

// Enumの定義を追加
export type Position = "PG" | "SE" | "SE(社員代替)" | "テスター" | "オペレーター" | "PL" | "PM" | "社員代替";
export type WorkStyle = "併用勤務(在宅率6割以上)" | "併用勤務(在宅率6割未満)" | "現場勤務" | "在宅勤務";