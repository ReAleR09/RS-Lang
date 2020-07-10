import Materialize from 'materialize-css';

const showToast = (text, styles = '') => {
  Materialize.toast({ html: text, classes: styles });
};

export default {
  showToast,
};
