const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');

//todo localStorage GET
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore')

// 1
// localStorage.setItem('highScores', [ ])   //! NULL
    // localStorage.setItem('highScores1', [])
    // console.log(localStorage.getItem('highScores1'));
// console.log(localStorage.getItem('highScores'));

// ! localStorage.setItem => JSON.stringify  
// ! localStorage.getItem => JSON.parse

// 2
// localStorage.setItem('highScores', JSON.stringify([]));  //! []
// console.log(JSON.parse(localStorage.getItem('highScores')));  //! >[]

// 3
//todo мы хотим получить из localStorage или его нет то ПУСТОЙ Array !!! 
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores); //! первый раз возврашает NULL без || [], а с || [] возвращает []

const MAX_HIGH_SCORES = 5 //* ДЛИНА СПИСКА РАВНО 5, т.е. (6) Шестой не будет включен в список


finalScore.innerHTML = mostRecentScore;

username.addEventListener('keyup', () => {
  // console.log(username.value);
  saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {

  console.log('clicked the save button');
  e.preventDefault();

  //? create score Object
  const score = {
    // для проверки списка с длиной 5 результатов
    score: Math.floor(Math.random() * 100),
    // score: mostRecentScore,
    name: username.value 
  };
  highScores.push(score);

  //todo sort
  // highScores.sort( (a, b) => {
  //   return b.score - a.score
  // });
  //! same
  highScores.sort( (a, b) => b.score - a.score );
  //todo 
  // a
  // b subtract a //вычесть
  // if b.score higher THAN a.score, THAN put b BEFORE a

  //TODO in INDEX 5 CUTTING OF everything AFTER that
  highScores.splice(5);

  //TODO in UPDATE LOCALSTORAGE
  localStorage.setItem('highScores', JSON.stringify(highScores))

  // console.log(highScores, score);
  
  //TODO AFTER SAVE GO TO THE MAIN PAGE
  window.location.assign('/');

}