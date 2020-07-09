import Materialize from 'materialize-css';

const showToast = (text) => {
  Materialize.toast({ html: text });
};

export default {
  showToast,
};
