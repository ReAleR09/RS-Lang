import M from 'materialize-css';
import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';

const whatDidEvgenyMentor = 'Gave advice';
const whatDidBogdan = 'Drove his hands';
const whatDidMasha = 'Game savannah, user authorization page, dictionary, promo page';
const whatDidKirill = 'Settings, toasts and some fixes';
const whatDidEvgeny = 'Back End API, Learning Word Components, Testing mode of knowledge of English, Mini-games Field of Miracles';
const whatDidVlad = 'Game EnglishPuzzle!!!';
const whatDidBoris = 'Game Sprint, game AudioCall and this magnificence)';

const nameButton = 'Contribution';

export default class IndexView extends View {
  /**
   * This method will be automatically called oncewhen navigation to the page occured,
   * but before html is added to browser's DOM.
   * We can use it to add some subscriptions, timers, calculations etc
   * Plus, we init any logic objects here.
   *
   * Also, if you need to update DOM from here, this.element is available,
   * it references actual DOM root element of this view
   */
  onMount() {
    this.componentDidUpdate();
  }

  /**
   * This method will be automatically called oncewhen user leaving the page
   * This is used to release resources: cancel timers, subscriptions, cancel some async actions etc
   */
  onUnmount() {
    clearInterval(this.timer);
  }

  /**
   * this method is automatically called when navigation to page occured
   * Must return html markup.
   * Note that there should only one root element!
   */
  render() {
    this.eslint = true;
    const html = `
      <div class="page__about-team">
        <div class="row center-align">
          <div class="col s12">
            <h2 class="about-team__title">About Team</h2>
          </div>
          <div class="col s12">
            <h3>
              Present to your attention!
            </h3>
            <h4>
              Our magnificent six and one mentor!=)
            </h4>
          </div>
        </div>
        <div class="divider"></div>
        <div class="row center-align about-team__photo-container">
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="/assets/img/teamPhoto/yauhenMentor1.jpg">
            <img class="about-team__person-photo-visible" src="/assets/img/teamPhoto/yauhenMentor2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Evgeny</strong>
              <span class="about-team__position"> - Mentor</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidEvgenyMentor}">${nameButton}</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="/assets/img/teamPhoto/bogdan1.jpg">
            <img class="about-team__person-photo-visible" src="/assets/img/teamPhoto/bogdan2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Bogdan</strong>
              <span class="about-team__position"> - Team leader</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidBogdan}">${nameButton}</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="/assets/img/teamPhoto/masha1.jpg">
            <img class="about-team__person-photo-visible" src="/assets/img/teamPhoto/masha2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Masha</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn"
              data-tooltip="${whatDidMasha}">${nameButton}</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="/assets/img/teamPhoto/kirill1.jpg">
            <img class="about-team__person-photo-visible" src="/assets/img/teamPhoto/kirill2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Kirill</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidKirill}">${nameButton}</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="/assets/img/teamPhoto/evgeny1.jpg">
            <img class="about-team__person-photo-visible" src="/assets/img/teamPhoto/evgeny2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Evgeny</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidEvgeny}">${nameButton}</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="/assets/img/teamPhoto/vlad1.jpg">
            <img class="about-team__person-photo-visible" src="/assets/img/teamPhoto/vlad2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Vlad</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidVlad}">${nameButton}</a>
            </div>
          </div>
          <div class="col s12 m6 offset-m3 l4 offset-l4">
            <img class="about-team__person-photo-hide" src="/assets/img/teamPhoto/boris1.jpg">
            <img class="about-team__person-photo-visible" src="/assets/img/teamPhoto/boris2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Boris</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidBoris}">${nameButton}</a>
            </div>
          </div>
        </div>
      </div>`;
    return html;
  }

  componentDidUpdate() {
    this.hz = true;
    document.querySelectorAll('.tooltipped').forEach((el) => {
      M.Tooltip.init(el, {
        position: 'top',
        transitionMovement: 0,
        inDuration: 150,
        outDuration: 100,
      });
    });
  }
}
