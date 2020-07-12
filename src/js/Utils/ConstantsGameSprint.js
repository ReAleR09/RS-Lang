const IN_PROGRESS_SPRINT_GAME = 'in-progress';
const FINISHED_SPRINT_GAME = 'finished';
const EVENT_NAME_SPRINT_GAME = 'status';

export { IN_PROGRESS_SPRINT_GAME, FINISHED_SPRINT_GAME, EVENT_NAME_SPRINT_GAME };

// every difficulty has 600 words, 600 / 10 (words per round) = 60 rounds
export const difficulties = [
  60, 60, 60,
  60, 60, 60,
];

export const title = 'Sprint: мини-игра';
export const description = 'В этой игре нужно подтвердить или опровергнуть, правильно ли переведено слово.';

export const roundSize = 20;
