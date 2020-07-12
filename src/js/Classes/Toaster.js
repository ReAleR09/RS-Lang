import Materialize from 'materialize-css';

const showToast = (html, classes = '', displayLength = 4000) => {
  Materialize.toast({ html, classes, displayLength });
};

export default {
  showToast,
};
