// "use client";
// import Cookies from "js-cookie";

// // この関数はクライアントサイドでのみ動作します
// export function isAuthenticated(): boolean {
//     // if (typeof window !== "undefined") {
//     //     const token = localStorage.getItem("jwtToken");
//     //     // トークンの有無で認証状態を判断
//     //     return !!token;
//     // }
//     // return false;
//     const token = Cookies.get("jwtToken");
//     // トークンが存在すれば認証済みと判断
//     return !!token;
// }
