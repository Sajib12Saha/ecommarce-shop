"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loaded: boolean; // true after we attempted at least one check
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refreshUser = async () => {
    try {
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/user/cookies-auth`, {
        method: "GET",
        credentials: "include", 
      });

      if (!res.ok) {
        console.warn("Auth check failed:", res.status);
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user || null);
    } catch (err) {
      console.error("Refresh user error:", err);
      setUser(null);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loaded, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
