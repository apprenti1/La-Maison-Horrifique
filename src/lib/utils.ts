import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const API_URL = "https://api.example.com"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
