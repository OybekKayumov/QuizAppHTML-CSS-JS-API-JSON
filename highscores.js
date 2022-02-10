const highScoresList = document.getElementById("highScoresList");
const highScoresNoParse = localStorage.getItem('highScores');
const highScores = JSON.parse(localStorage.getItem('highScores'));

// console.log(highScoresNoParse);
// console.log(highScores);

// console.log( //* returns array of strings
// highScoresList.innerHTML = 
  // highScores.map( score => {
    // console.log(score);

    // console.log(`<li class="high-score">${score.name} - ${score.score}</li>`);
    // return `<li class="high-score">${score.name} - ${score.score}</li>`;
  // })
  // .join("") //* join in the array with empty string

// )   //consol.log end

highScores.forEach(score => {
  highScoresList.innerHTML += `
      <li class="high-score">${score.name} - ${score.score}</li>
    `;
});
