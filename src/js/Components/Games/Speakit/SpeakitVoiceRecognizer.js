const DEFAULT_LOCALE = 'en-US';

export default class SpeakitVoiceRecognizer {
  constructor(phraseRecognizedCallback) {
    this.phraseRecognizedCallback = phraseRecognizedCallback;
    this.stopRecognitionFunction = null;
  }

  startRecognition() {
    if (this.stopRecognitionFunction) return;

    const SpeechApi = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognizer = new SpeechApi();
    recognizer.interimResults = false;
    recognizer.lang = DEFAULT_LOCALE;
    recognizer.maxAlternatives = 2;

    // storing link to the handler to remove it later
    const onPhraseFullyRecognized = (event) => {
      const resultPhrases = Array.from(event.results[0]).map((obj) => obj.transcript.toLowerCase());

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
