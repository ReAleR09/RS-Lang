export default class LearningWordsSoundPlayer {
  constructor(model) {
    this.model = model;
    this.sounds = [];
    this.queue = [];
  }

  clearPlayQueue() {
    this.queue = [];
    this.sounds = [];
  }

  addAudioToQueue(audioFileLink) {
    this.sounds.push(new Audio(audioFileLink));
  }

  play() {
    this.queue = this.sounds.slice();
    this.playThrough();
  }

  playThrough() {
    if (!this.queue.length) return; // Здесь можно обратиться обратно в модель или кинуть событие.
    const audioInstance = this.queue.shift();
    this.playSound(audioInstance);
  }

  playSound(audioInstance) {
    audioInstance.addEventListener('ended', () => {
      this.playThrough();
    });
    if (audioInstance.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      // если объект аудио уже успел подгрузить достаточно аудио, воспроизвести
      audioInstance.play();
    } else {
      // иначе слушаем, пока не прогрузит
      audioInstance.addEventListener('canplaythrough', () => {
        audioInstance.play();
      });
    }
  }
}
