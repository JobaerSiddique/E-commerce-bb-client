import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  email: string;
  
}

export const decodedToken = (token: string): DecodedToken => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("JWT Decoding Error:", error);
    throw new Error("Invalid token format");
  }
};