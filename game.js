const question = document.getElementById('question');
// const choices = document.getElementsByClassName('choice-text');
const choices = Array.from(document.getElementsByClassName('choice-text'));
// console.log(choices); 

// const questionCounterText = document.getElementById('questionCounter');
const progressText = document.getElementById('progressText');

const scoreText = document.getAnimations('score')

const progressBarFull = document.getElementById('progressBarFull');

//! loader
const loader = document.getElementById('loader');
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

//! URL
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")

//! local json
// fetch("question.jsson")
// fetch("question.jsson") //! чтобы поймать например ошибку в .catch
  .then( response => {
    // console.log(response);
    return response.json()
  })
  .then(loadQuestions => {
    // console.log(loadQuestions.results); //todo see downloaded json
    //!local json
    // questions = loadQuestions;
    // startGame();

    //downloaded json
    questions = loadQuestions.results.map(loadQuestion => {
      const formattedQuestions = {
        question: loadQuestion.question
      };

      const answerChoices = [...loadQuestion.incorrect_answers];
      formattedQuestions.answer = Math.floor(Math.random() * 3 + 1);
      answerChoices.splice(formattedQuestions.answer -1, 0, loadQuestion.correct_answer);
      answerChoices.forEach((choice, index) => {
        formattedQuestions["choice" + (index+1)] = choice;
      })

      return formattedQuestions;
    })

    // loader.classList.add('hidden');
    // game.classList.remove('hidden'); 
    startGame();
  })
  .catch(err => {
    console.log(err);
  })

//todo мы будем загружать из файла lsn11
// [
//   {
//     question: "Inside which HTML element do we put the JavaScript??",
//     choice1: "<script>",
//     choice2: "<javascript>",
//     choice3: "<js>",
//     choice4: "<scripting>",
//     answer: 1
//   },
//   {
//     question:
//       "What is the correct syntax for referring to an external script called 'xxx.js'?",
//     choice1: "<script href='xxx.js'>",
//     choice2: "<script name='xxx.js'>",
//     choice3: "<script src='xxx.js'>",
//     choice4: "<script file='xxx.js'>",
//     answer: 3
//   },
//   {
//     question: " How do you write 'Hello World' in an alert box?",
//     choice1: "msgBox('Hello World');",
//     choice2: "alertBox('Hello World');",
//     choice3: "msg('Hello World');",
//     choice4: "alert('Hello World');",
//     answer: 4
//   }
// ];

// CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  loader.classList.add('hidden');
    game.classList.remove('hidden'); 
};

getNewQuestion = () => {

  if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
    //todo localStorage SET
    localStorage.setItem('mostRecentScore', score);
    
    //! go to the end page
    return window.location.assign('./end.html')

  } 

  questionCounter++;
// questionCounterText.innerText = questionCounter + '/' + MAX_QUESTIONS; 
// questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`; 
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; 
  //todo Update the progress
  // console.log((questionCounter/MAX_QUESTIONS) * 100);  //! make %

  progressBarFull.style.width = ` ${(questionCounter/MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    // console.log(selectedAnswer, currentQuestion.answer);

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == 'correct') {
      incrementScore(CORRECT_BONUS);
    }
      
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

  })
})

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

// startGame();