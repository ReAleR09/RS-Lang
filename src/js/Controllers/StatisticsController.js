import Controller from '../lib/Controller';
import IndexView from '../Views/Statistics/IndexView';

export default class StatisticsController extends Controller {
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
