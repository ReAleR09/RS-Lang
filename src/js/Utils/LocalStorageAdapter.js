const set = (key, value) => {
  let savedValue = value;
  if (typeof savedValue !== 'string') {
    savedValue = JSON.stringify(savedValue);
  }
  localStorage.setItem(key, savedValue);
};

const get = (key) => {
  const value = localStorage.getItem(key);
  try {
    const objectFromJSON = JSON.parse(value);
    return objectFromJSON;
  } catch (e) {
    return value;
  }
};

const remove = (key) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

const LocalStorageAdapter = {
  set,
  get,
  remove,
  clear,
};

export default LocalStorageAdapter;
