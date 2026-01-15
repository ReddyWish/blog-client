export function getItem(key: string) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function setItem<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}
