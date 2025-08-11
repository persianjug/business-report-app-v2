import { useRouter } from "next/navigation";
import { deleteReport } from "@/lib/report";

export const useReportEditActions = (reportId: string | number) => {
  const router = useRouter();

  const handleBackToDetail = () => {
    router.push(`/reports/${reportId}`);
  };

  return {
    handleBackToDetail,
  };
};
