/* eslint-disable class-methods-use-this */
export default class EnglisPuzzleView {
  attach(element) {
    this.element = element;
    // this.initDifficultySwitcher();
    // this.initWordSoundButtonClick();
    // this.initBeginButton();
    // this.initFinishButton();
  }

  getGameLayout() {
    const html = `
    <div>
    <div class="flex-between">
      <div class="input-field">
        <select>
          <option value="" disabled selected>Choose your option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <label>Choose difficulty</label>
    </div>
    <div class="engPuz__tooltips flex-between">
      <a class="engPuz__tooltips-autoPlay btn-floating waves-effect"> <i class="medium material-icons">volume_up</i></a>
      <a class="engPuz__tooltips-translation btn-floating circle waves-effect"> <i class="medium material-icons">translate</i></a>
      <a class="engPuz__tooltips-audioSwitcher btn-floating circle waves-effect"> <i class="medium material-icons">music_video</i></a>
      <a class="engPuz__tooltips-picture btn-floating circle waves-effect"> <i class="medium material-icons">photo</i></a>
    </div>
    </div>
    <div class="flex-center">
    <a class="engPuz__audio #ffb74d orange lighten-2 center btn waves-effect waves-purple "><i class="material-icons">volume_up</i></a>
    </div>
    <div class="flex-center">
    <blockquote class="engPuz__translation center flex-center">Sentes translation</blockquote>
    </div>
    <div class="engPuz__dragdrop card-panel"><h2>Puzzle sentences go here</h2></div>
      <div class="engPuz__bottom-btn flex-center">
      <a class="engPuz__bottom-idk #fce4ec pink lighten-3 btn waves-effect"><i class="material-icons">cancel</i>don't know</a>
      <a class="engPuz__bottom-check #81c784 green lighten-1 btn waves-effect"><i class="material-icons">done_all</i>Check</a>
      </div>
    </div>
    `;
    return html;
  }
}
