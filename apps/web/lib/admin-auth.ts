export type AdminRole = "admin" | "sales" | "content" | "product";

export type AdminSession = {
  email: string;
  role: AdminRole;
  createdAt: number;
};

const KEY = "sk_admin_session_v1";

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function readAdminSession(): AdminSession | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AdminSession;
    if (!parsed?.email || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeAdminSession(session: AdminSession) {
  if (!canUseStorage()) return;
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  if (!canUseStorage()) return;
  localStorage.removeItem(KEY);
}
