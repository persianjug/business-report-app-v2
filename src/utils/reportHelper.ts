import { Report, Task } from "@/types/Report"
import { formatNewlines } from "./stringHelper"

export const reportFormatNewLines = (report: Report | null): Report | null => {
  return {
    ...report,
    overallProgress: formatNewlines(report?.overallProgress),
    futurePlans:  formatNewlines(report?.futurePlans),
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