const set = (key, value) => {
  localStorage.setItem(key, value);
};

const get = (key) => {
  localStorage.getItem(key);
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
