/* eslint-disable */
import 'materialize-css';

// init Materialize components
const initSideNavs = () => {
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems);
};

const initFixedNavBtn = () => {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems);
};

document.addEventListener('DOMContentLoaded', function() {
  initSideNavs();
  initFixedNavBtn();
});


