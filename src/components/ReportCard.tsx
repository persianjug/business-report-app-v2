import { Report } from "@/types/Report";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";
import StatusBadge from "./StatusBadge";

interface ReportCardProps {
  report: Report;
}

const ReportCard = ({ report }: ReportCardProps) => {
  const formatDateWithWeekday = (dateString: string | undefined) => {
    if (!dateString) return "未入力";
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const weekday = date.toLocaleDateString("ja-JP", { weekday: "short" });
    return [formattedDate, weekday];
  };

  const formatUpdatedAt = (dateString: string | undefined) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) + " " + date.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const [startDateFormatted, startWeekday] = formatDateWithWeekday(report.startDate);
  const [endDateFormatted, endWeekday] = formatDateWithWeekday(report.endDate);
  const createdAtFormatted = formatUpdatedAt(report.createdAt);
  const updatedAtFormatted = formatUpdatedAt(report.updateAt);

  return (
    <Link href={`/reports/${report.id}${report.status === "draft" ? "/draft" : ""}`}
      className="block relative p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="absolute inset-0 z-10" aria-label={`${report.id} の詳細へ`}></div>

      <div className="flex flex-row items-center gap-x-12">
        {/* ステータスバッチ */}
        <div><StatusBadge status={report.status} /></div>

        {/* 明細 */}
        <div>
          {/* ID */}
          <p className="text-gray-500 font-medium text-lg mb-4">
            <span className="text-sm">#</span>
            <span>{String(report.id).padStart(3, "0")}</span>
          </p>

          {/* <div className="flex justify-between items-start mb-4">
            <div className="flex items-start space-x-4">
              <div className="flex flex-col">
                <p className="text-gray-500 font-medium text-lg">
                  <span className="text-sm">#</span>
                  <span>{String(report.id).padStart(3, "0")}</span>
                </p>
              </div>
            </div>
          </div> */}

          {/* 報告対象期間 */}
          <div className="flex items-center space-x-4 text-2xl md:text-3xl text-blue-900 font-extrabold mb-4">
            <div className="flex items-end">
              <span>{startDateFormatted}</span>
              <span className="text-base font-extralight">{`(${startWeekday})`}</span>
            </div>
            <div className="flex items-end">
              <MdPlayArrow className="w-8 h-8" />
            </div>
            <div className="flex items-end">
              <span>{endDateFormatted}</span>
              <span className="text-base font-extralight">{`(${endWeekday})`}</span>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="grid gap-x-4 gap-y-1 text-sm text-gray-600">
            <div className="flex">
              <p className="font-semibold w-28">エンド企業名:</p>
              <p>{report.customerInfo?.endClient}</p>
            </div>
            <div className="flex">
              <p className="font-semibold w-28">上位顧客名:</p>
              <p>{report.customerInfo?.upperClient}</p>
            </div>
            <div className="flex">
              <p className="font-semibold w-28">案件名:</p>
              <p>{report.projectInfo?.projectName}</p>
            </div>
            <div className="flex">
              <p className="font-semibold w-28">更新日:</p>
              <p>{updatedAtFormatted === "---" ? createdAtFormatted : updatedAtFormatted}</p>
            </div>
          </div>

          {/* 矢印アイコン */}
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <FaChevronRight className="w-12 h-12 text-gray-400 z-20" />
          </div>
        </div>

      </div>

    </Link>
  );
};

export default ReportCard;
