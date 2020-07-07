const languages = {
  en: 'en-US',
  ru: 'ru-RU',
};

const defaultVolume = 0.5;

export default class VoiceApi {
  constructor(acceptAnswerCallback) {
    this.phraseRecognizedCallback = acceptAnswerCallback;
    this.isWorking = false;

    this.results = [];
    this.volume = defaultVolume;
    this.speechSynth = window.speechSynthesis;
  }

  get lastResult() {
    return this.results[this.results.length - 1];
  }

  setVolume(value) {
    this.volume = value;
  }

  speak(text) {
    if (this.speechSynth.speaking) {
      return;
    }
    const speechUtterance = new SpeechSynthesisUtterance(text);

    speechUtterance.onerror = (error) => {
      this.onError(error);
    };
    speechUtterance.volume = this.volume;
    speechUtterance.lang = languages.ru;
    this.speechSynth.speak(speechUtterance);
  }

  // eslint-disable-next-line class-methods-use-this
  onError(error) {
    console.log(error);
  }

  startRecognition() {
    if (this.stopRecognitionFunction) return;

    const SpeechApi = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognizer = new SpeechApi();
    recognizer.interimResults = false;
    recognizer.lang = languages.en;
    recognizer.maxAlternatives = 2;

    // storing link to the handler to remove it later
    const onPhraseFullyRecognized = (event) => {
      const resultPhrases = Array.from(event.results[0]).map((obj) => obj.transcript.toLowerCase());
      this.results.push(resultPhrases);
      this.phraseRecognizedCallback(resultPhrases);
    };
    recognizer.addEventListener('result', onPhraseFullyRecognized);

    // storing link to the handler to remove it later
    const onRecognitionEnd = () => {
      recognizer.start();
    };
    recognizer.addEventListener('end', onRecognitionEnd);

    // we will call this callback to stop recognition and free resources in this.stopRecognition()
    this.stopRecognitionFunction = () => {
      recognizer.removeEventListener('result', onPhraseFullyRecognized);
      recognizer.removeEventListener('end', onRecognitionEnd);
      recognizer.stop();
      recognizer = null;
    };
    // and starting recognition
    recognizer.start();
  }

  stopRecognition() {
    if (this.stopRecognitionFunction) {
      this.stopRecognitionFunction();
      this.stopRecognitionFunction = null;
    }
  }
}
