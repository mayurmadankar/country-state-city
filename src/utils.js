export function uid(prefix = "") {
  return (
    prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

export const STORAGE_KEY = "csc_app_v1";

export function saveToStorage(countries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(countries));
}

export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse storage", e);
    return null;
  }
}
