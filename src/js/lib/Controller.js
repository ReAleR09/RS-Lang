import ControllerCancelException from './ControllerCancelException';

export default class Controller {
  constructor(viewClasses) {
    this.views = viewClasses;
    this.props = {};
  }

  indexAction() {
    throw new Error(`Implement method! In ${this}`);
  }

  // eslint-disable-next-line class-methods-use-this
  cancelAction() {
    throw new ControllerCancelException('Canceled');
  }

  async performAction(actionAlias) {
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
    await this[actionName]();
    // returning the view
    return this.view;
  }
}
