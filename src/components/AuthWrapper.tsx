// "use client";

// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { isAuthenticated } from "@/utils/auth";

// const publicPaths = ["/login"]; // 認証が不要なパス

// export default function AuthWrapper({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     // クライアントサイドでのみ実行
//     const isAuth = isAuthenticated();

//     // 保護されたページにいて、かつ認証されていない場合
//     if (!publicPaths.includes(pathname) && !isAuth) {
//       router.push("/login");
//     }

//     // ログインページにいて、かつ認証済みの場合
//     if (publicPaths.includes(pathname) && isAuth) {
//       router.push("/reports");
//     }
//   }, [pathname, router]);

//   return (
//     <>{children}</>
//   );
// }
