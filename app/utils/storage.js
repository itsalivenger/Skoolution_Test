// Save any value (object, string, etc.) under a dynamic key in localStorage
export function saveInStorage(key, value) {
  if (typeof window === 'undefined') return; // prevent server-side access
  try {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (error) {
    console.error(`Error saving to localStorage with key "${key}":`, error);
  }
}

// Retrieve and parse JSON data from localStorage by key
export function getFromStorage(key) {
  if (typeof window === 'undefined') return null; // prevent server-side access
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  } catch (error) {
    console.error(`Error reading from localStorage with key "${key}":`, error);
    return null;
  }
}

export function removeFromStorage(key) {
  if (typeof window === 'undefined') return; // prevent server-side access
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage with key "${key}":`, error);
  }
}
