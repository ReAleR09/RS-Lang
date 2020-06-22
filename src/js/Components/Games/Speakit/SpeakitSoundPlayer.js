export default class SpeakitSoundPlayer {
  constructor() {
    this.wordSounds = {};
  }

  initWordsSounds(wordsSet) {
    const wordSounds = {};
    wordsSet.forEach((wordInfo) => {
      const audio = new Audio(wordInfo.audio);
      wordSounds[wordInfo.id] = audio;
    });

    this.wordSounds = wordSounds;
  }

  playWordSound(wordid) {
    const audioObject = this.wordSounds[wordid];
    if (!audioObject) {
      console.error(`No sound for word id ${wordid}`);
      return;
    }
    if (audioObject.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      // если объект аудио уже успел подгрузить достаточно аудио, воспроизвести
      audioObject.play();
    } else {
      // иначе слушаем, пока не прогрузит
      audioObject.addEventListener('canplaythrough', () => {
        audioObject.play();
      });
    }
  }
}
