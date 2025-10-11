import { Report, Task } from "@/types/Report"
import { formatNewlines } from "./stringHelper"
import { FormData } from "@/schemas/reportSchema"

export const transformReportToFormData = (report: Report | null): FormData | null => {
  if (!report) {
    return null;
  }

  return {
    ...report,
    overallProgress: formatNewlines(report?.overallProgress),
    futurePlans: formatNewlines(report?.futurePlans),
    tasks:
      report?.tasks.map((task: Task) => ({
        ...task,
        taskProgress: formatNewlines(task.taskProgress),
        taskProblem: formatNewlines(task.taskProblem),
      })),
    otherInfo: {
      customerStatus: formatNewlines(report?.otherInfo.customerStatus),
      salesInfo: formatNewlines(report?.otherInfo.salesInfo),
      healthStatus: formatNewlines(report?.otherInfo.healthStatus),
      vacationPlans: formatNewlines(report?.otherInfo.vacationPlans),
    },
    consultation: formatNewlines(report?.consultation),
  }
}

export const transformFormDataToReport = (formData: FormData, reportId?: string | number): Report | null => {
  if (!formData) {
    return null;
  }

  return {
    id: reportId ? (typeof reportId === "string" ? parseInt(reportId, 10) : reportId) : 0, // 新規作成の場合は0
    startDate: formData.startDate,
    endDate: formData.endDate,
    overallProgress: formData.overallProgress,
    futurePlans: formData.futurePlans,
    customerInfo: formData.customerInfo,
    projectInfo: formData.projectInfo,
    otherInfo: formData.otherInfo,
    tasks: formData.tasks.map(task => ({
      taskName: task.taskName,
      taskProgress: task.taskProgress,
      taskProblem: task.taskProblem,
    })),
    consultation: formData.consultation,
    status: "",
    createdAt: "",
    updatedAt: "",
  };
};