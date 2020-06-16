const createElementFromHTML = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

const DOMUtils = {
  createElementFromHTML,
};

export default DOMUtils;
