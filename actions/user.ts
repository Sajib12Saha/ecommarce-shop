import axios from "axios";

export type userInput = {
  name?: string;
  mobileNumber?: string;
  address?: string;
};

export type User = {
  id: string;
  email: string;
  name: string | null;
  address: string | null;
  mobileNumber: string | null;
  image: string | null;
  role: "ADMIN" | "USER";
};

export type UserResponse = {
  success: boolean;
  user?: User;
  message?: string;
  error?: string;
};

// 🔹 cache store
let cachedUser: User | null = null;
let cacheTimestamp: number | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export const getUser = async (forceRefresh = false): Promise<UserResponse> => {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      return { success: false, error: "No token found" };
    }

    const now = Date.now();

    // ✅ Return cached value if still valid
    if (
      !forceRefresh &&
      cachedUser &&
      cacheTimestamp &&
      now - cacheTimestamp < CACHE_TTL
    ) {
      return { success: true, user: cachedUser };
    }

    // ✅ Otherwise, fetch fresh user
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/user/get-profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    cachedUser = res.data.user;
    cacheTimestamp = now;

    return { success: true, user: res.data.user };
  } catch (err: any) {
    console.error("Get user error:", err.response?.data || err.message);
    return {
      success: false,
      error: err.response?.data?.error || "Failed to fetch user",
    };
  }
};

export const updateUser = async (
  data: userInput
): Promise<UserResponse> => {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      return { success: false, error: "No token found" };
    }

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/user/update-profile`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // ✅ update cache after profile update
    cachedUser = res.data.user;
    cacheTimestamp = Date.now();

    return {
      success: true,
      user: res.data.user,
      message: res.data.message,
    };
  } catch (err: any) {
    console.error("Update user error:", err.response?.data || err.message);
    return {
      success: false,
      error: err.response?.data?.error || "Failed to update user",
    };
  }
};
