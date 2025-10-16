'use client';

const ORGANIZER_SESSION_KEY = 'rockslist_organizer_session';

export const organizerSession = {
  getSession(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ORGANIZER_SESSION_KEY);
  },

  setSession(sessionId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ORGANIZER_SESSION_KEY, sessionId);
  },

  clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ORGANIZER_SESSION_KEY);
  },

  // Generate a simple session ID based on email
  generateSessionId(email: string): string {
    return btoa(email + Date.now());
  },
}; 