import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // すべてのAPIリクエストのベースURLを設定
});

// 認証で使用する箇所
// リクエスト送信前に実行されるインターセプター
// api.interceptors.request.use(
//   (config) => {
//     // サーバーサイドで初期化処理が走るときに localStorage にアクセスしようするので、
//     // サーバーサイド（Node.jsなど）で現在の実行環境がブラウザであるかどうかを判断
//     // if (typeof window !== "undefined") {
//     //   // ローカルストレージからトークンを取得
//     //   const token = localStorage.getItem("jwtToken");

//     //   // トークンが存在する場合、Authorizationヘッダーに設定
//     //   if (token) {
//     //     config.headers.Authorization = `Bearer ${token}`;
//     //   }
//     // }
//         // ローカルストレージではなく、Cookieからトークンを取得
//     const token = Cookies.get("jwtToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     // console.log("%o", config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;