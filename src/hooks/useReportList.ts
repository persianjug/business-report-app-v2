import { MouseEvent } from "react";

export const useReportList = () => {
  // ボタンクリック時のイベントハンドラ
  // サーバーサイドで生成されたExcelファイルをダウンロードするため、apiインスタンスを使用するとBlob形式で扱いにくいため、ここではそのままfetchAPIを使用
  const handleDownload = async (e: MouseEvent<HTMLButtonElement>, reportId: number) => {
    e.preventDefault(); // リンクへの遷移を防ぐ
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

  return {
    handleDownload,
  }
}