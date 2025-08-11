import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (num: number): string => {
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  if (!Number.isFinite(num)) return num.toString();
  if (Number.isNaN(num)) return "NaN";

  let result: string;
  if (absNum >= 1000000) {
    result = (absNum / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (absNum >= 1000) {
    result = (absNum / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    result = absNum.toLocaleString();
  }

  return isNegative ? "-" + result : result;
};
