import Controller from '../lib/Controller';
import IndexView from '../Views/Promo/IndexView';
// import LocalStorageAdapter from '../Utils/LocalStorageAdapter';

export default class PromoController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
    };
    super(viewClasses);
  }

  // eslint-disable-next-line class-methods-use-this
  indexAction() {

  }
}
