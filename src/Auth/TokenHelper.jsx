export const login = (key, value) => {
  if (value !== null && value !== "null") {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    logout();
  }
};

export const getLocalStorage = (key, initialValue) => {
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
