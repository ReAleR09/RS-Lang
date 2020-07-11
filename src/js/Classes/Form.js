export default class Form {
  constructor(type) {
    this.type = type; // SIGN UP or SIGN IN
  }

  render() {
    let describe = 'Зарегистрируйтесь чтобы НАЧАТЬ';
    let question = 'Уже есть аккаунт?';
    let offer = 'Войти';
    let autocompleteOff = 'autocomplete="new-password"';
    let passwordHint = `<div>
      Пароль должен содержать минимум 8 символов,
      минимум одну цифру,
      минимум одну прописную и одну заглавную букву латинского алфавита,
      а так же минимум один из спец-симолов +-_@$!%*?&#.,;:[]{}
    </div>`;
    if (this.type === 'SIGN IN') {
      describe = 'Войдите чтобы ПРОДОЛЖИТЬ';
      question = 'Нет аккаунта?';
      offer = 'Зарегистрироваться';
      autocompleteOff = '';
      passwordHint = '';
    }
    const html = `
    <div class="authorization-registration">
    <div class="description container">
      <h6 class="description__title container">Учите Английский язык с <span>RSLANG</span></h6>
      <ul class="description__features">
        <li class="feature feature-one"> - 3600 слов</li>
        <li class="feature feature-two"> - Интерактивные игры</li>
        <li class="feature feature-three"> - Ежедневная статистика</li>
        <li class="feature feature-four"> - Гибкие настройки</li>
        <li class="feature feature-five"> - Спроектировано для оптимального запоминания</li>
      </ul>
    </div>

    <div class="form-action container">
      <p>${describe}</p>
      <form class="form">
        <input class="email" type="email" title="Емейл должен содержать '@' и '.'">
        <input class="password" type="password" minlength="8" ${autocompleteOff}>
        ${passwordHint}
        <button class="waves-effect waves-light btn">${this.type}</button>
      </form>
      <p>${question} <a href="#" id="form-link">${offer}</a></p>
    </div>
    </div>`;

    return html;
  }
}
