const USER_KEY = 'ths_widget.user';

export const setUser = (userId: string): string => {
  localStorage.setItem(USER_KEY, userId);
  return localStorage.getItem(USER_KEY) || '';
};

export const getUser = (): string => localStorage.getItem(USER_KEY) || '';
