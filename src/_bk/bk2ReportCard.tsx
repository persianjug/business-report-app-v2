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

  // 更新日を時分秒までフォーマットする新しい関数
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
    <Link href={`/reports/${report.id}`} className="block relative p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
      {/* 行全体をリンクにするための設定 */}
      <div className="absolute inset-0 z-10" aria-label={`${report.id} の詳細へ`}></div>

      {/* <div className="flex justify-between items-start mb-4"> */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <p className="text-gray-500 font-medium mb-1">
              <span className="text-sm">#</span>
              <span className="text-lg">{String(report.id).padStart(3, "0")}</span>
            </p>
            {/* ステータスバッジをここに配置 */}
            {/* <StatusBadge status={report.status} /> */}
          </div>

          <div className="flex items-center space-x-4 text-xl md:text-2xl text-blue-900">
            <div className="flex items-end">
              <span className="font-extrabold">{startDateFormatted}</span>
              <span className="text-base font-extralight">{`(${startWeekday})`}</span>
            </div>
            <div className="flex items-end">
              <MdPlayArrow className="w-6 h-6 mt-1" />
            </div>
            <div className="flex items-end">
              <span className="font-extrabold">{endDateFormatted}</span>
              <span className="text-base font-extralight">{`(${endWeekday})`}</span>
            </div>
            <StatusBadge status={report.status} />
          </div>
        </div>
        {/* <div className="text-right"> */}
        <div className="flex flex-col items-end justify-center">
          {/* <p className="text-xs text-gray-400"> */}
          <p className="text-xs text-gray-400 mb-1">
            {/* {report.updateAt ? report.updateAt : "---"} */}
            {updatedAtFormatted === "---" ? createdAtFormatted : updatedAtFormatted}
          </p>
          <FaChevronRight className="w-6 h-6 text-gray-400 mt-2 z-20" />
        </div>
      </div>

      {/* <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600"> */}
      <div className="grid gap-x-4 gap-y-1 text-sm text-gray-600">
        {/* <div className="flex">
          <p className="font-semibold w-28">ステータス:</p>
          <StatusBadge status={report.status} />
        </div> */}

        <div className="flex">
          <p className="font-semibold w-28">エンド企業名:</p>
          <p>{report.customerInfo.endClient}</p>
        </div>
        <div className="flex">
          <p className="font-semibold w-28">上位顧客名:</p>
          <p>{report.customerInfo.upperClient}</p>
        </div>
        <div className="flex">
          <p className="font-semibold w-28">案件名:</p>
          <p>{report.projectInfo.projectName}</p>
        </div>
      </div>
    </Link>
  );
};

export default ReportCard;
