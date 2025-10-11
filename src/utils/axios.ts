import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // すべてのAPIリクエストのベースURLを設定
});

export default api;