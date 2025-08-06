// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Cookies from "js-cookie";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         username,
//         password,
//       });

//       // 認証成功
//       const token = response.data.token;
//       // トークンをローカルストレージに保存
//       localStorage.setItem("jwtToken", token);
//       // トークンをクッキーに保存(1日)
//       Cookies.set("jwtToken", token, { expires: 1 });

//       alert("ログインに成功しました！");
//       router.push("/reports"); // 報告書一覧ページにリダイレクト
//     } catch (error) {
//       alert("ログインに失敗しました。ユーザー名またはパスワードが正しくありません。");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
//         <h2 className="text-center text-3xl font-bold text-gray-900">
//           ログイン
//         </h2>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               ユーザー名
//             </label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               パスワード
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               ログイン
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
