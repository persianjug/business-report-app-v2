import Link from "next/link";
import { Report } from '@/types/Report';

interface ReportRowProps {
  report: Report;
}

const ReportRow = ({ report }: ReportRowProps) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "未入力";
    return new Date(dateString).toLocaleDateString("ja-JP");
  };

  return (
    <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <Link href={`/reports/${report.id}`} className="block w-full h-full text-blue-600  hover:text-blue-800">
          {report.id}
        </Link>
      </td>
      <td className="py-3 px-6 text-left">
        <Link href={`/reports/${report.id}`} className="block w-full h-full text-gray-800">
          {formatDate(report.startDate)} 〜 {formatDate(report.endDate)}
        </Link>
      </td>
      <td className="py-3 px-6 text-left">
        <Link href={`/reports/${report.id}`} className="block w-full h-full text-gray-800">
          {report.projectInfo.projectName}
        </Link>
      </td>
      <td className="py-3 px-6 text-left">
        <Link href={`/reports/${report.id}`} className="block w-full h-full text-gray-800">
          {report.customerInfo.endClient}
        </Link>
      </td>
      <td className="py-3 px-6 text-left">
        <Link href={`/reports/${report.id}`} className="block w-full h-full text-gray-800">
          {report.createdAt}
        </Link>
      </td>
      <td className="py-3 px-6 text-left">
        {/* 操作ボタンをここに配置する */}
      </td>
    </tr>
  );
};

export default ReportRow;