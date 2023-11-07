import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uuid() {
  return v4();
}
