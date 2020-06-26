function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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

const Utils = {
  arrayShuffle,
  getRandomInt,
};

export default Utils;
