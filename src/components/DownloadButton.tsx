"use client";

import { MouseEvent } from "react";

// ダウンロード処理を担うコンポーネント
export default function DownloadButton({ reportId }: { reportId: number }) {
  const handleDownload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // 親のリンクへの遷移を防ぐ
    event.stopPropagation(); // イベントのバブリングも停止する

    try {
      const response = await fetch(`http://localhost:8080/api/reports/${reportId}/excel`);
      if (!response.ok) {
        throw new Error("Failed to download Excel file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${reportId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Excelファイルのダウンロードに失敗しました:", error);
      alert("Excelファイルのダウンロードに失敗しました。");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
    >
      Excel出力
    </button>
  );
}