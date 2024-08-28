/**
 * 
 * @param name - The full name of the user.
 * @returns A string representing the initials in uppercase.
 */
export const extractUserInitials = (name: string): string => {
    if (!name.trim()) return '';
    return name
      .split(' ')
      .map((part) => part[0].toUpperCase())
      .join('');
  };
  