import EditForm from "@/components/EditForm";
import Link from "next/link";

export default function EditReportPage({ params }: { params: { id: string } }) {
  const reportId = params.id;
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">業務報告書編集（ID: {params.id}）</h1>
        <div className="flex space-x-2">
          <Link
            href={`/reports/${params.id}`}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md text-sm"
          >
            詳細に戻る
          </Link>
          <Link
            href="/reports"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md text-sm"
          >
            一覧に戻る
          </Link>
        </div>
      </div>
      <EditForm reportId={reportId} />
    </div>
  );
}
