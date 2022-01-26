import { MILLIS_PER_DAY } from '../Classes/Api/constants';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntInRange(mini, maxi) {
  const min = Math.ceil(mini);
  const max = Math.floor(maxi);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fisher-Yates shuffle
function arrayShuffle(oldArray) {
  const array = oldArray.slice(0); // shallow copy
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function getDateNoTime(date) {
  let result = new Date();
  if (date) result = date;

  result = new Date(result.getFullYear(), result.getMonth(), result.getDate());
  return result;
}

export function getNextDay(date) {
  let resultDate = date;
  if (!date) resultDate = new Date();
  return new Date(resultDate.getTime() + MILLIS_PER_DAY);
}

const Utils = {
  arrayShuffle,
  getRandomInt,
  getDateNoTime,
  getNextDay,
  getRandomIntInRange,
};

export default Utils;
