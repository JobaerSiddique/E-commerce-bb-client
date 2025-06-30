

import { authKey } from "@/types";
import { jwtDecode } from "jwt-decode";

// Client-side localStorage utilities
export const getFromLocalStorage = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("LocalStorage access error:", error);
    return null;
  }
};

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(authKey, accessToken);
    return true;
  } catch (error) {
    console.error("Failed to store token:", error);
    return false;
  }
};

export const getCurrentUser = (): any | null => {
  const token = getFromLocalStorage(authKey);
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    return {
      ...decoded,
      role: decoded?.role?.toLowerCase(),
    };
    console.log(decoded);
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};

export const isLoggedIn = (): boolean => {
  return !!getFromLocalStorage(authKey);
};

export const removeUser = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(authKey);
    return true;
  } catch (error) {
    console.error("Failed to remove user:", error);
    return false;
  }
};

export const getAuthToken = (): string | null => {
  return getFromLocalStorage(authKey);
};