import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const API_URL = process.env.NODE_ENV === 'development' 
  ? '/api'
  : process.env.VITE_API_URL || '/api'

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