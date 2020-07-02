import Materialize from 'materialize-css';

// init Materialize components
const initSideNavs = () => {
  const rightNav = document.querySelectorAll('#sidenav-right');
  const leftNav = document.querySelectorAll('#sidenav-left');
  Materialize.Sidenav.init(leftNav);
  Materialize.Sidenav.init(rightNav, {
    edge: 'right',
  });
};

const initFixedNavBtn = () => {
  const elems = document.querySelectorAll('.fixed-action-btn');
  Materialize.FloatingActionButton.init(elems);
};

document.addEventListener('DOMContentLoaded', () => {
  initSideNavs();
  initFixedNavBtn();
});

const initDictionaryTabs = () => {
  const el = document.querySelector('.tabs');
  Materialize.Tabs.init(el);
};

export default initDictionaryTabs;
