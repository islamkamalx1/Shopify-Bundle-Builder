import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNumericPrice = (value: number | string | undefined) => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const match = value.match(/(\d+(?:\.\d+)?)/);
    return match ? Number(match[1]) : 0;
  }

  return 0;
};
