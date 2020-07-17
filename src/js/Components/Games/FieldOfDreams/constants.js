export const fieldOfDreamsComponent = 'field-of-dreams';

// every difficulty has 600 words, 600 / 10 (words per round) = 60 rounds
export const difficulties = [
  60, 60, 60,
  60, 60, 60,
];

export const title = 'Поле Чудес. Мини-игра';
export const description = 'Здесь нужно угадывать буквы и называть слово с первого раза';

export const roundSize = 10;

export const hintsCount = 3;

export const phraseAboutMicrophone = 'Назовите слово целиком!';
export const alphabet = 'abcdefghijklmnopqrstuvwxyz';
export const instructions = 'Выберите 3 буквы и затем назовите слово целиком!';

export const soundEffects = {
  success: 'success',
  error: 'error',
  letterTrue: 'letterTrue',
  letterFalse: 'letterFalse',
};

export const soundsSources = {
  [soundEffects.success]: '/assets/audio/FieldOfDreams-word-true.mp3',
  [soundEffects.error]: '/assets/audio/FieldOfDreams-word-false.mp3',
  [soundEffects.letterTrue]: '/assets/audio/FieldOfDreams-letter-true.mp3',
  [soundEffects.letterFalse]: '/assets/audio/FieldOfDreams-letter-false.mp3',
};
