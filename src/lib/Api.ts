// import axios from "axios";

// const BASE_URL = "https://api-staging.vechtron.com/auth";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
 
// });

// export const signup = async (data: {
//   email: string;
//   password: string;
//   username: string;
//   first_name: string;
//   last_name: string;
//   confirm_password: string;
// }) => {
//   try {
//     const response = await axiosInstance.post(
//       "/api/v1/auth/account/signup",
//       data
//     );
//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       throw new Error(error.response.data?.message || "Sign up failed.");
//     } else if (error.request) {
//       throw new Error("No response from server. Please try again later.");
//     } else {
//       throw new Error(error.message || "An unexpected error occurred.");
//     }
//   }
// };

// // LogIn API
// export const login = async (data: { email: string; password: string }) => {
//   try {
//     const response = await axiosInstance.post(
//       "/api/v1/auth/account/login",
//       data
//     );
//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       throw new Error(error.response.data?.message || "Login failed");
//     } else if (error.request) {
//       throw new Error("No response from server. Please try again later");
//     } else {
//       throw new Error(error.message || "An unexpected error occured.");
//     }
//   }
// };

// // Request an OTP
// export const forgetPassword = async (data: { email: string }) => {
//   const response = await axiosInstance.post(
//     "/api/v1/auth/account/forgot-password/",
//     data
//   );
//   return response.data;
// };

// // Verify OTP
// export const verifyOTP = async (otp: string) => {
//   const response = await axiosInstance.post("/verify-otp", { otp });
//   return response.data;
// };
// // Reset Password
// export const resetPassword = async (data: {
//   password: string;
//   confirmPassword: string;
// }) => {
//   const response = await axiosInstance.post("/reset-password", data);
//   return response.data;
// };
