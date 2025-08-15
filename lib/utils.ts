import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
{/*
 * Utility function to format date strings into a more readable format.
 * This function takes a date string as input and returns a formatted date string.
 * It uses the `toLocaleDateString` method to format the date according to the user's locale.
 */}
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
