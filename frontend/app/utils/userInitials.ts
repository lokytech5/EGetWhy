// utils/userInitials.ts

/**
 * Extracts initials from a user's full name.
 * @param name - The full name of the user.
 * @returns A string representing the initials in uppercase.
 */
export const extractUserInitials = (name: string): string => {
    if (!name.trim()) return ''; // Handles cases where name might be empty or just spaces
    return name
      .split(' ')
      .map((part) => part[0].toUpperCase())
      .join('');
  };
  