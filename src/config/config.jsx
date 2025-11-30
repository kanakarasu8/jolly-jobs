// src/config.js
const DEV_API_BASE = "http://localhost:8081/api";
const PROD_API_BASE = "https://yourproductiondomain.com/api";

const ENV = process.env.NODE_ENV || "development";

const config = {
  apiBase: ENV === "production" ? PROD_API_BASE : DEV_API_BASE
};

export default config;
