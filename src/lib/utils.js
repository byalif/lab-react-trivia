function shuffleArray(arr) {
  let array = [arr.correct_answer];
  if (Array.isArray(arr.incorrect_answers)) {
    array = [...array, ...arr.incorrect_answers];
  }
  let shuffled = [];
  while (array.length > 0) {
    let randomIndex = Math.floor(Math.random() * array.length);
    shuffled.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return shuffled;
}

export { shuffleArray };
