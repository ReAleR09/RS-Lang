export default class Controller {
  constructor(viewClasses) {
    this.views = viewClasses;
    this.props = {};
  }

  indexAction() {
    throw new Error(`Implement method! In ${this}`);
  }

  performAction(actionAlias) {
    const actionName = `${actionAlias}Action`;
    if (!this[actionName]) {
      throw Error(`Controller '${this.constructor.name}' doesn't have '${actionName}' action`);
    }
    // instantiating view
    const ViewClass = this.views[actionAlias];
    this.view = new ViewClass();
    // passing collected props from controller to the view
    this.view.props = this.props;
    // performing action
    this[actionName]();
    // returning the view
    return this.view;
  }
}
