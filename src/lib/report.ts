import api from "@/utils/axios";
import { Report } from "@/types/Report";

export const getReport = async (reportId: string | number): Promise<Report | null> => {
  try {
    const res = await api.get(`/reports/${reportId}`);
    return res.data;
  } catch (error) {
    console.error("報告書の取得に失敗しました:", error);
    return null;
  }
}

export const getReports = async (): Promise<Report[] | null> => {
  try {
    const res = await api.get<Report[]>("/reports", { cache: "no-store" });
    return res.data;
  } catch (error) {
    console.error("APIから報告書を取得できませんでした:", error);
    return null;
  }
}

export const setReport = async (report: Report): Promise<void> => {
  try {
    await api.post("/reports", report);
  } catch (error) {
    console.error("報告書の作成に失敗しました:", error);
  }
}

export const updateReport = async (report: Report): Promise<void> => {
  try {
    await api.put("/reports", report);
  } catch (error) {
    console.error("報告書の更新に失敗しました:", error);
  }
}

export const deleteReport = async (reportId: string | number): Promise<void> => {
  try {
    await api.delete(`/reports/${reportId}`);
  } catch (error) {
    console.error("報告書の削除に失敗しました:", error);
  }
}

export const fetchExcelFile = async (reportId: string | number): Promise<void> => {
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
  }
}