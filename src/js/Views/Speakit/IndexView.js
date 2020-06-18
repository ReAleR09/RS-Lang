import View from '../../lib/View';

// FC stands for Funcional Class - the one that IS NOT responsible for styles
const FC_ROOT_ID = 'speakit_root_id';

export default class IndexView extends View {
  // when we are visiting this view, we will modify someParamPassToView
  // (which is passed from the controller)
  onMount() {
    const stringToDisplay = `${this.props.someParamPassToView} ${Math.random()}`;
    const rootDiv = this.element.querySelector(`#${FC_ROOT_ID}`);
    rootDiv.innerHTML = stringToDisplay;
  }

  // onUnmount() {
  // }

  // creating markup of the view and returning it
  // eslint-disable-next-line class-methods-use-this
  render() {
    const html = `<div>
      <div id="${FC_ROOT_ID}"></div>
    </div>`;

    return html;
  }
}
