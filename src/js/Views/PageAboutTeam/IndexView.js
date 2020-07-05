import M from 'materialize-css';
import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';

const whatDidEvgenyMentor = 'Gave advice';
const whatDidBogdan = 'Drove his hands';
const whatDidMasha = 'Game savannah, user authorization page';
const whatDidKirill = 'Pressed the button';
const whatDidEvgeny = 'Back End API, Learning Word Components, Testing mode of knowledge of English, Mini-games Field of Miracles';
const whatDidVlad = 'Game EnglishPuzzle!!!';
const whatDidBoris = 'Game Sprint, game AudioCall and this magnificence)';

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
      <div>
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
            <img class="about-team__person-photo-hide" src="./src/img/teamPhoto/yauhenMentor1.jpg">
            <img class="about-team__person-photo-visible" src="./src/img/teamPhoto/yauhenMentor2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Evgeny</strong>
              <span class="about-team__position"> - Mentor</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidEvgenyMentor}">Contribution</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="./src/img/teamPhoto/bogdan1.jpg">
            <img class="about-team__person-photo-visible" src="./src/img/teamPhoto/bogdan2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Bogdan</strong>
              <span class="about-team__position"> - Team leader</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidBogdan}">Contribution</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="./src/img/teamPhoto/masha1.jpg">
            <img class="about-team__person-photo-visible" src="./src/img/teamPhoto/masha2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Masha</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn"
              data-tooltip="${whatDidMasha}">Contribution</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="./src/img/teamPhoto/kirill1.jpg">
            <img class="about-team__person-photo-visible" src="./src/img/teamPhoto/kirill2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Kirill</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidKirill}">Contribution</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="./src/img/teamPhoto/evgeny1.jpg">
            <img class="about-team__person-photo-visible" src="./src/img/teamPhoto/evgeny2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Evgeny</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidEvgeny}">Contribution</a>
            </div>
          </div>
          <div class="col s12 m6 l4">
            <img class="about-team__person-photo-hide" src="./src/img/teamPhoto/vlad1.jpg">
            <img class="about-team__person-photo-visible" src="./src/img/teamPhoto/vlad2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Vlad</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidVlad}">Contribution</a>
            </div>
          </div>
          <div class="col s12 m6 offset-m3 l4 offset-l4">
            <img class="about-team__person-photo-hide" src="./src/img/teamPhoto/boris1.jpg">
            <img class="about-team__person-photo-visible" src="./src/img/teamPhoto/boris2.jpg">
            <div class="about-team__person-info">
              <strong class="about-team__name">Boris</strong>
              <span class="about-team__position"> - Developer</span>
              <br>
              <a class="btn tooltipped black about-team__btn" data-tooltip="${whatDidBoris}">Contribution</a>
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
