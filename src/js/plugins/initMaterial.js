/* eslint-disable */
import 'materialize-css';

// init Materialize components
const initSideNavs = () => {
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems);
};

document.addEventListener('DOMContentLoaded', function() {
  initSideNavs ();
});


