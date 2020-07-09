import Materialize from 'materialize-css';
import View from '../../lib/View';
import { STATISTICS_HTML } from '../../Components/Statistics/Templates';
import {
  showPreloader,
  hidePreloader,
} from '../../Classes/Preloader';
import StatisticsPageManager from '../../Components/Statistics/StatisticsPageManager';

export default class IndexView extends View {
  // eslint-disable-next-line class-methods-use-this
  async onMount() {
    showPreloader();
    // init tabs
    const mainTabsEl = this.element.querySelectorAll('.tabs');
    Materialize.Tabs.init(mainTabsEl);

    const pageManager = new StatisticsPageManager(this.element);
    await pageManager.drawStatistics();
    hidePreloader();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return STATISTICS_HTML;
  }
}
