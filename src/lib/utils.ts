import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const API_URL = "https://api.example.com"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const response = await fetch(`${API_URL}/verifyToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  return (response.ok && response.status === 200)
}