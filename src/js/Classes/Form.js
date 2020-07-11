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
    <div class="description container">
      <h6 class="description__title container">Learn English WITH <span>RSLANG</span></h6>
      <ul class="description__features">
        <li class="feature feature-one">3600 words</li>
        <li class="feature feature-two">Interactive games</li>
        <li class="feature feature-three">Get statistic every Day</li>
        <li class="feature feature-four">Change a lot of settings</li>
        <li class="feature feature-five">Design for better memorization</li>
      </ul>
    </div>

    <div class="form-action container">
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
