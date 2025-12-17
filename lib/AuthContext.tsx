// lib/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserType {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  user: UserType | null;
  users: UserType[];
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, name?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);

  const login = (email: string, password: string) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string, name?: string) => {
    const exists = users.find(u => u.email === email);
    if (exists) return false;
    const newUser: UserType = { email, password, name, avatar: "https://i.pravatar.cc/40" };
    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, users, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};
