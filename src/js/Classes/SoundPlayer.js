const volumeDefault = 0.1;
export default class SoundPlayer {
  constructor(emptyPlayQueueCallback) {
    this.emptyPlayQueueCallback = emptyPlayQueueCallback;
    this.sounds = [];
    this.queue = [];
    this.volume = volumeDefault;
  }

  clearPlayQueue() {
    this.queue = [];
    this.sounds = [];
  }

  addAudioToQueue(audioFileLink) {
    const audio = new Audio(audioFileLink);
    audio.volume = this.volume;
    this.sounds.push(audio);
  }

  play() {
    this.queue = this.sounds.slice();
    this.sounds = [];
    this.playThrough();
  }

  playThrough() {
    if (!this.queue.length) {
      if (this.emptyPlayQueueCallback) {
        // Здесь можно обратиться обратно в модель
        this.emptyPlayQueueCallback();
      }
      return;
    }
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
