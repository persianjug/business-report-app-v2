"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";
import Cookies from "js-cookie";

export default function Header() {
  const router = useRouter();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    Cookies.remove("jwtToken");
    router.push("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          業務報告書システム
        </Link>
        {isAuth ? (
          <div className="flex space-x-4 items-center">
            <Link href="/reports" className="hover:text-gray-300">
              報告書一覧
            </Link>
            <Link href="/report/create" className="hover:text-gray-300">
              新規作成
            </Link>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded text-sm">
              ログアウト
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-4 rounded text-sm">
            ログイン
          </Link>
        )}
      </nav>
    </header>
  );
}
