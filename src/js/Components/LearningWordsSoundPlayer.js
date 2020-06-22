export default class LearningWordsSoundPlayer {
  constructor(model) {
    this.model = model;
    this.sounds = [];
  }

  clearPlayQueue() {
    this.sounds = [];
  }

  addAudioToQueue(audioFileLink) {
    this.sounds.push(new Audio(audioFileLink));
  }

  playThrough() {
    if (!this.sounds.length) return; // Здесь можно обратиться обратно в модель или кинуть событие.
    const audioInstance = this.sounds.shift();
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
