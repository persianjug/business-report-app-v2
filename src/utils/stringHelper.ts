import { Report } from "@/types/Report";

/**
 * 文字列内のエスケープされた改行コード（\\n）を、実際の改行コード（\n）に変換します。
 * @param text 変換する文字列
 * @returns 変換後の文字列
 */
export const formatNewlines = (text: string | null | undefined): string => {
  if (typeof text !== "string") {
    return ""; // 文字列でない場合は空文字列を返す
  }
  return text.replace(/\\n/g, '\n');
};
