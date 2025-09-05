"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode"; 
import { getUser, User } from "@/actions/user";


interface UserContextType {
  user: User | null;
  loaded: boolean;
  refreshUser: (tokenFromCallback?: string) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refreshUser = async (tokenFromCallback?: string) => {
    try {
      const token = tokenFromCallback || localStorage.getItem("auth_token");
      if (!token) {
        setUser(null);
        setLoaded(true);
        return;
      }

      // ✅ Decode JWT safely
      let decoded: Partial<User> | null = null;
      try {
        decoded = jwtDecode<Partial<User>>(token);
        console.log("Decoded JWT:", decoded);
      } catch (err) {
        console.warn("Invalid JWT:", err);
        localStorage.removeItem("auth_token");
        setUser(null);
        setLoaded(true);
        return;
      }

      // ✅ Fetch user from backend
      const response = await getUser();

      if (response.success && response.user) {
        // Merge backend user with decoded fallback
        setUser({
          ...decoded,        // image, name, etc. from token
          ...response.user,  // backend fields (mobileNumber, address, etc.)
        });
      } else {
        // fallback → at least keep decoded JWT values
        setUser(decoded as User);
      }
    } catch (err) {
      console.error("refreshUser error:", err);
      localStorage.removeItem("auth_token");
      setUser(null);
    } finally {
      setLoaded(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  useEffect(() => {
    refreshUser(); // run once on mount
  }, []);

  return (
    <UserContext.Provider value={{ user, loaded, refreshUser, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
