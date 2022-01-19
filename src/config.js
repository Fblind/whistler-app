const config = {
  env: process.env.NODE_ENV || "development",
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:3001",
  defaultImageUrl: "https://picsum.photos/300?grayscale",
};
export default config;
