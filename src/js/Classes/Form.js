export default class Form {
  constructor(type) {
    this.type = type; // SIGN UP or SIGN IN
  }

  render() {
    let describe = 'Sign UP to START';
    let question = 'Already have an account?';
    let offer = 'Log in';
    let autocompleteOff = 'autocomplete="new-password"';
    if (this.type === 'SIGN IN') {
      describe = 'Sign IN to CONTINUE';
      question = 'No account?';
      offer = 'Create one';
      autocompleteOff = '';
    }
    const html = `
    <div class="authorization-registration">
    <div class="description">
      <p class="description__title">Learn English WITH <span>RSLANG</span></p>
      <div class="description__features">
        <div class="feature feature-one">3600 words</div>
        <div class="feature feature-two">Interactive games</div>
        <div class="feature feature-three">Get statistic every Day</div>
        <div class="feature feature-four">Change a lot of settings</div>
        <div class="feature feature-five">Design for better memorization</div>
      </div>
    </div>

    <div class="form-action">
      <p>${describe}</p>
      <form class="form">
        <input class="email" type="email" title="Email should contains '@' and '.'">
        <input class="password" type="password" minlength="8" ${autocompleteOff} title="Password should be > 8 characters and contains one digit, one letter(uppercase), one letter(lowercase) and one special char">
        <button class="waves-effect waves-light btn">${this.type}</button>
      </form>
      <p>${question} <a href="#" id="form-link">${offer}</a></p>
    </div>
    </div>`;

    return html;
  }
}
