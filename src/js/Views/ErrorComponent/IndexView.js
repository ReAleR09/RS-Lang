import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';
// import LearningWordsView from '../../Components/LearningWords/LearningWordsView';

export default class IndexView extends View {
  onMount() {
    this.props.someData = {};
    const catImg = this.element.querySelector('.errors__img');
    this.props.catImg = catImg;
    catImg.classList.remove('opacity-hidden');
  }

  onUnmount() {
    this.props.catImg.classList.add('opacity-hidden');
  }

  render() {
    const { errors } = this.props;

    console.log(errors);

    const html = `<div>
    <h3 class="center">Что-то пошло не так...:(</h3>
    <div class="flex-center">
      <img class="errors__img opacity-hidden" src="assets/img/cat.jpg">
    </div>
    <div class="card-panel Errors__panel hoverable">
      <h4 class="">Ошибка ${errors.code}</h4>
      <div class="divider margin-bottom"></div>
      <div class="Errors__text">${errors.info}</div>
    </div>
    </div>`;

    return html;
  }
}
