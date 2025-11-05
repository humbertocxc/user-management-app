"use client";

import { createContext, useContext, ReactNode } from "react";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  zipCode?: string;
  bairro?: string;
  city?: string;
  state?: string;
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface ApiContextType {
  registerUser: (
    data: Omit<SignUpData, "confirmPassword">
  ) => Promise<RegisterResponse>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within ApiProvider");
  return context;
};

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const registerUser = async (data: Omit<SignUpData, "confirmPassword">) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    return response.json();
  };

  return (
    <ApiContext.Provider value={{ registerUser }}>
      {children}
    </ApiContext.Provider>
  );
};
