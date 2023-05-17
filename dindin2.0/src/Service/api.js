import axios from "axios";

export default axios.create({
  baseURL: "https://cubos-pay-m05.onrender.com",
  // baseURL: "http://localhost:3001",
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});
