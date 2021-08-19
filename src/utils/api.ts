const api = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://192.168.100.133:1390/"
      : "http://localhost:1390/",
};

export default api;
