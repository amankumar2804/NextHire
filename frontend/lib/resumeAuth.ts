export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ANON_ID_KEY = "resumeBuilderAnonId";

/**
 * Returns a persistent anonymous ID for this browser, creating one
 * if it doesn't exist yet. This lets resumes be saved and resumed
 * later WITHOUT requiring a real login — useful until the auth
 * system is ready. Safe to call multiple times.
 */
export function getOrCreateAnonId(): string {
  if (typeof window === "undefined") return "";

  let anonId = localStorage.getItem(ANON_ID_KEY);

  if (!anonId) {
    anonId =
      "anon_" +
      Date.now().toString(36) +
      "_" +
      Math.random().toString(36).slice(2, 12);

    localStorage.setItem(ANON_ID_KEY, anonId);
  }

  return anonId;
}

/**
 * fetch() wrapper for resume builder routes. Automatically attaches
 * the browser's anonymous ID instead of a JWT token. Throws a
 * readable Error on non-OK responses so callers can just
 * try/catch and show error.message.
 */
export async function resumeFetch(path: string, options: RequestInit = {}) {
  const anonId = getOrCreateAnonId();

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  headers.set("x-anon-id", anonId);

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Server returned an invalid response");
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
