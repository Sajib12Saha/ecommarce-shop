import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatDate = (date: Date): string => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long", // e.g., September
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // ✅ 12-hour format with AM/PM
  });
};

export const  getPaginationRange = (currentPage: number, totalPages: number): (number | "ellipsis")[] =>  {
  const delta = 1; 
  const range: (number | "ellipsis")[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "ellipsis") {
      range.push("ellipsis");
    }
  }

  return range;
}