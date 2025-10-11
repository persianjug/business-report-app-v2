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
  consultation: string | null;
  createdAt: string;
  updatedAt: string;
  status: string;
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
  taskProgress: string;
  taskProblem?: string | null;
}

export interface OtherInfo {
  customerStatus: string | null;
  salesInfo: string | null;
  healthStatus: string | null;
  vacationPlans: string | null;
}

export interface PaginatedReports {
  reports: Report[];
  totalCount: number;
}

// Enumの定義を追加
export type Position = "PG" | "SE" | "SE(社員代替)" | "テスター" | "オペレーター" | "PL" | "PM" | "社員代替";
export type WorkStyle = "併用勤務(在宅率6割以上)" | "併用勤務(在宅率6割未満)" | "現場勤務" | "在宅勤務";