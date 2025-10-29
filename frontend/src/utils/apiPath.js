export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup
    LOGIN: "/api/auth/login", // Authenticate user & return JWT token
    USER_PROFILE: "/api/auth/profile", // Get user profile
    UPDATE_PROFILE: "/api/auth/profile", // Update user profile
  },


  AI: {

    GENERATE: "/api/ai/generate",
   
  }
};
