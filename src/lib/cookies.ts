const COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

export const setSessionCookie = () => {
  const expires = new Date(Date.now() + SESSION_DURATION);
  document.cookie = `${COOKIE_NAME}=true; expires=${expires.toUTCString()}; path=/; secure; samesite=strict; httponly`;
};

export const deleteSessionCookie = () => {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict; httponly`;
};

export const hasValidSession = (): boolean => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name] = cookie.trim().split('=');
    if (name === COOKIE_NAME) {
      return true;
    }
  }
  return false;
};
