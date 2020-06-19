export default class Form {
  constructor(type) {
    this.type = type; // SIGN UP or SIGN IN
    this.render = this.render.bind(this);
  }

  render() {
    let describe = 'Sign UP to START';
    let question = 'Already have an account?';
    let offer = 'Log in';
    if (this.type === 'SIGN IN') {
      describe = 'Sign IN to CONTINUE';
      question = 'No account?';
      offer = 'Create one';
    }
    const html = `
    <div class="authorization">
      <p>${describe}</p>
      <form>
        <input class="email" type="email">
        <input class="password" type="password">
        <button>${this.type}</button>
      </form>
      <p>${question} <a>${offer}</a></p> 
    </div>`;

    console.log(html);
    return html;
  }
}
