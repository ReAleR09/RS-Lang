/* eslint-disable */
import 'materialize-css';

// init Materialize components
const initSideNavs = () => {
  const rightNav = document.querySelectorAll('#sidenav-right');
  const leftNav = document.querySelectorAll('#sidenav-left');
  const instanceLeft = M.Sidenav.init(leftNav);
  const instanceRight = M.Sidenav.init(rightNav, {
    edge: 'right',
  });
};

const initFixedNavBtn = () => {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems);
};

document.addEventListener('DOMContentLoaded', function() {
  initSideNavs();
  initFixedNavBtn();
});


