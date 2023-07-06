import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post("http://localhost:8080/auth/signin", {
      username,
      password,
    });

    if (res.status === 200) {
      const data = res.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
      }
      return data;
    }
  } catch (err) {
    throw new Error("Failed to login");
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") !== null;
  }
  return false;
};

export const isAdmin = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role") === "ADMIN";
  }
  return false;
};

export function getUserName(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("username");
  }
  return null;
}

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
