import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

export default class IndexView extends View {
  onMount() {
    document.querySelectorAll('.container')[1].classList.add('promo-container');
    this.element.querySelector('.promo__start-button').addEventListener('click', () => {
      AppNavigator.go('registration');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onUnmount() {
    document.querySelectorAll('.container')[1].classList.remove('promo-container');
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const html = `
    <div class="promo">
      <div class="promo__start">
        <h1>Максимально увеличьте свой словарный запас с RSLANG</h1>
        <div class="promo__start-button waves-effect waves-light btn #ce93d8 purple pulse">Начать</div>
        <!--<div class="promo__login-button">Войти</div>-->
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

      <div class="promo__description promo-app">
        <h2>Основные принципы работы приложения</h2>
        <div class="description-item">
        <i class="fas fa-sort-amount-up-alt fa-5x"></i>
          <h3>Для заучивания иностранных слов используется методика интервального повторения</h3>
          <p> Каждый правильный ответ увеличивает интервал, через который придётся повторять данное слово, а неправильный, в свою очередь, наоборот сокращает интервал. При достижении значения интервала до максимума, заданного в настройках приложения, слово считается полностью изученным и в дальнейшем изучении не участвует (сложные слова можно повторять отдельно, запустив данный режим из словаря).</p>
        </div>
        <div class="description-item">
          <i class="fas fa-gamepad fa-5x"></i>
          <h3>Для отслеживания прогресса и геймификации обучения используются мини-игры</h3>
          <p> Если пользователь превысит установленный лимит карточек на день, то он не сможет продолжать обучение в рамках модуля изучения слов. Продолжить обучение можно в рамках повторения изученных слов  в мини-играх, либо просто играть в мини-игры по раундам</p>
        </div>
        <div class="description-item">
          <i class="far fa-chart-bar fa-5x"></i>
          <h3>Ведётся статистика </h3>
          <p> Собирается и предоставляется пользователю статистика изучения слов, как краткосрочная – по результатам каждой тренировки, так и долгосрочная – за весь период обучения</p>
        </div>
      </div>

      <div class="promo__description promo-interval">
        <h2>Принцип интервального повторения</h2>
        <div class="description-item">
          <i class="fas fa-chart-line fa-5x"></i>
          <h3>Первый раз слово должно повторится в течение дня или даже одной тренировки.</h3>
          <p>Поэтому есть параметр в настройках Первичный интервал, он должен быть меньше часа. Спустя это время слово попадает в список слов, требующих повторения.
          Второй раз слово будет предлагаться к повторению уже через Базовый интервал, также указанный в настройках приложения.</p>
        </div>
        <div class="description-item">
          <i class="fas fa-cogs fa-5x"></i>
          <h3>В последующие разы начинают работать множители.</h3>
          <p>Они заданы в настройках для слова в зависимости от оценки его личной сложности для вас при первом его изучении. Соответственно, есть базовый множитель, множитель сложных и множитель легких слов. Каждый последующий интервал увеличивается по сравнению с предыдущим интервалом согласно соответствующего слову множителя.</p>
        </div>
        <div class="description-item">
          <i class="fas fa-exclamation fa-5x"></i>
          <h3>Стоит отметить</h3>
          <p> Если пользователь допускает ошибку, либо нажимает оценку слова “совсем не запомнил”, то слово разово отправляется в повторения через Первичный интервал (то есть попадет в ближайшую тренировку). Однако в случае ошибки, дополнительно, уменьшается на 1 шаг интервал повторений(иными словами падает прогресс изучения слова).</p>
        </div>
      </div>

      <div class="promo__description promo-games">
        <h2>Описание Игр</h2>
        <div class="description-item">
          <i class="fab fa-fly fa-5x"></i>
          <h3>САВАННА</h3>
          <p>Дано слово. Игрок должен выбрать правильный перевод за определенное время.</p>
        </div>
        <div class="description-item">
          <i class="fas fa-microphone fa-5x"></i>
          <h3>SPEAKIT</h3>
          <p>Игрок нажимает на слово, чтобы услышать его звучание. Затем произносит это слово в микрофон до достижения правильного варианта.</p>
        </div>
        <div class="description-item">
          <i class="fab fa-sketch fa-5x"></i>
          <h3>ENGLISH PUZZLE</h3>
          <p> Игроку дано предложение на русском языке. Необходимо сделать его перевод из приведенных слов на английском.</p>
        </div>
        <div class="description-item">
          <i class="fas fa-headset fa-5x"></i>
          <h3>АУДИОВЫЗОВ</h3>
          <p> В игре подбираем произнесённому на английском языке слову русский перевод.</p>
        </div>
        <div class="description-item">
          <i class="fas fa-gavel fa-5x"></i>
          <h3>SPRINT</h3>
          <p> Дано слово и перевод, а также два варианта ответа - верно или нет. Игрок выбирает один из них.</p>
        </div>
        <div class="description-item">
          <i class="fas fa-magic fa-5x"></i>
          <h3>ПОЛЕ ЧУДЕС</h3>
          <p> Зарегестрируйся и получи доступ к описанию данной игры </p>
        </div>
      </div>

      <div class="promo__video">
        <h2>Совершенствуй свои языковые познания</h2>
        <div class="promo-video">
        <iframe width="90%" height="415" src="https://www.youtube.com/embed/GgV1w0RaVU4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <h3 class="center"><i class="material-icons">book</i><a class="promo__repolink" target="_blank" href="https://github.com/ReAleR09/RS-Lang">Project GitHub Repo</a></h3>
      </div>

    </div>`;

    return html;
  }
}
