import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

export default class IndexView extends View {
  onMount() {
    document.querySelectorAll('.container')[1].classList.add('promo-container');
    document.querySelector('.promo__start-button').addEventListener('click', () => {
      AppNavigator.go('registration');
    });

    document.querySelector('.promo__login-button').addEventListener('click', () => {
      AppNavigator.go('authorization');
    });

  }

  onUnmount() {
    document.querySelectorAll('.container')[1].classList.remove('promo-container');
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const html = `
    <div class="promo">
      <div class="promo__start">
        <h1>Максимально увеличьте свой словарный запас с RSLANG</h1>
        <div class="promo__start-button">Начать</div>
        <div class="promo__login-button">Войти</div>
      </div>
      <div class="promo__description">
        <h2>RSLANG представляет собой оптимальный интеллектуальный способ изучения слов английского языка.</h2>
        <div class="description-item">
          <i class="fas fa-skiing fa-5x"></i>
          <h3>Быстрый</h3>
          <p> RSLANG знает, какое слово в какой момент вам нужно учить. Вы ускоряете обучение, удаляя ненужный вам материал.</p>
        </div>
        <div class="description-item">
          <i class="fas fa-user-check fa-5x"></i>
          <h3>Персонализированный</h3>
          <p> RSLANG имеет индивидуальный подход к каждому учащемуся - с помощью интервального повторения мы подгоняем обучение под каждого ученика, чтобы вы смогли наиболее быстро и эффективно пополнить словарный запас.</p>
        </div>
        <div class="description-item">
          <i class="fas fa-calendar-check fa-5x"></i>
          <h3>Целенаправленный</h3>
          <p> С RSLANG ничто не будет препятствовать вашему движению вперёд. RSLANG дает вам возможность сосредоточиться на учебном потоке без отвлекающих факторов.</p>
        </div>
        <div class="description-item">
          <i class="fas fa-laptop fa-5x"></i>
          <h3>Всегда доступен</h3>
          <p> Учитесь где и когда вам удобно - в транспорте, стоя в очереди или во время обеда. Единственное что нужно, это интернет и ваше желание</p>
        </div>
      </div>
      <div class="promo__video">
        <h2>Совершенствуй свои языковые познания</h2>
        <div class="promo-video"></div>
      </div>

    </div>`;

    return html;
  }
}
