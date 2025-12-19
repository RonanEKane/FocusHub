// Cookie utilities for user session management

export const setCookie = (name, value, days = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const isReturningUser = () => {
  return getCookie('focushub_returning_user') === 'true';
};

export const markAsReturningUser = () => {
  setCookie('focushub_returning_user', 'true', 365);
};

export const hasSeenWelcome = () => {
  return getCookie('focushub_welcome_seen') === 'true';
};

export const markWelcomeSeen = () => {
  setCookie('focushub_welcome_seen', 'true', 365);
};
