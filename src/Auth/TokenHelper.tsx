export const login = (key: string, value: any) => {
  if (value !== null && value !== "null") {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    logout();
  }
};

export const getLocalStorage = (key: string, initialValue: any) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
};

export const logout = async () => {
  window.localStorage.removeItem("authState");
};
