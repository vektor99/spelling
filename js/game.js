//SOUND FUNCTIONALITY vol 1
var vol = document.getElementById("vol");
vol.addEventListener("click", toggleMusic);
var soundStatusIcon = "glyphicon glyphicon-volume-off";
var sound = false;
var back_sound = document.getElementById("audio");
var sound_effect = document.getElementById("sound_effect");
console.log(back_sound);
function toggleMusic() {
  if (soundStatusIcon == "glyphicon glyphicon-volume-off") {
    sound = true;
    vol.setAttribute("class", "glyphicon glyphicon-volume-up");
    soundStatusIcon = "glyphicon glyphicon-volume-up";
    back_sound.play();
  } else {
    sound = false;
    vol.setAttribute("class", "glyphicon glyphicon-volume-off");
    soundStatusIcon = "glyphicon glyphicon-volume-off";
    back_sound.pause();
  }
}

function toggleSoundEffect() {
  if (soundStatusIcon == "glyphicon glyphicon-volume-off") {
    sound = false;
  } else {
    sound = true;
  }
  if (sound == true) {
    sound_effect.play();
  }
}

var click_area = document.getElementById("click_area");
var availableQuest;
let isDecideAndCorrect;

if (gameMode == "one-word-two-forms") {
  availableQuest = [...questions.oneWordTwoForms];
  click_area.addEventListener("click", gameType);
} else if (gameMode == "find-correct") {
  availableQuest = [...questions.findCorrect];
  click_area.addEventListener("click", gameType);
} else if (gameMode == "find-misspelled") {
  availableQuest = [...questions.findMisspelled];
  click_area.addEventListener("click", gameType);
} else if (gameMode == "which-letter") {
  availableQuest = [...questions.whichLetter];
  click_area.addEventListener("click", whichLetter);
} else if (gameMode == "decide") {
  availableQuest = [...questions.decide];
  isDecideAndCorrect = false;
  click_area.addEventListener("click", decide);
} else if (gameMode == "decide-correct") {
  availableQuest = [...questions.decideCorrect];
  isDecideAndCorrect = true;
  click_area.addEventListener("click", decide);
} else if (gameMode == "multiple-choices") {
  availableQuest = [...questions.multipleChoices];
  click_area.addEventListener("click", multipleChoices);
} else {
  click_area.addEventListener("click", () => {
    alert("Ensure you select a game mode");
  });
}

//REFERENCING DOM ELEMENTS (GENERAL)
var score = document.getElementById("score");
var content = document.getElementById("content");
var start = document.getElementById("start");
var title = document.getElementById("title");
var lifeContainer = document.getElementById("life-container");
var lifes = document.querySelectorAll(".life");
var pages = document.querySelectorAll(".page");
var time = document.getElementById("time");
var counter = document.getElementById("counter");
var gameOverMsgOne = document.getElementById("game-over-msg-one");
var gameOverMsgTwo = document.getElementById("game-over-msg-two");

//REFERENCING DOM ELEMENTS (ONE-WORD-TWO-FORMS)
const questionDiv = document.getElementById("question");
const optionOne = document.getElementById("option-one");
const iconSpanOne = document.getElementById("icon-span-one");
const checkboxOne = document.getElementById("checkbox-one");

const optionTwo = document.getElementById("option-two");
const iconSpanTwo = document.getElementById("icon-span-two");
const checkboxTwo = document.getElementById("checkbox-two");

const optionThree = document.getElementById("option-three");
const iconSpanThree = document.getElementById("icon-span-three");
const checkboxThree = document.getElementById("checkbox-three");

const optionFour = document.getElementById("option-four");
const iconSpanFour = document.getElementById("icon-span-four");
const checkboxFour = document.getElementById("checkbox-four");

// GLOBAL VARIABLES
var noQuestAns = 0;
var maxQuestion = 7;
var correctAns = 0;
var refAns = null;

//TO UPDATE SCORES & TIME
var trials = 5;
var scores = 0;
score.textContent = scores;
time.style.opacity = 1;
var count_down = 30;
time.textContent = count_down;

//function to remove child ELEMENTS
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  //REMOVES START DIV
  start.remove();
}

//display a specific page
function displayPage(pageName) {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].classList.contains(pageName)) {
      pages[i].classList.remove("none");
    } else {
      pages[i].classList.add("none");
    }
    // console.log(pages[i].getAttribute("id"), pages[i].classList);
  }
}

//DISPLAYS ALL LIVES AFTER PROGRESS BAR IS FINISHED
function lifeHud() {
  title.classList.add("none");
  lifeContainer.classList.remove("none");
}

// reduce life
function reduceLife(numberOfLifesLeft, lifesArr) {
  //console.log(lifesArr.length, trials);
  for (let i = lifesArr.length - 1; i >= 0; i--) {
    if (i == numberOfLifesLeft) {
      lifesArr[i].setAttribute("class", "glyphicon glyphicon-heart-empty");
    }
  }
  if (numberOfLifesLeft == 1) {
    lifes[0].setAttribute("id", "last_life");
  }
  if (numberOfLifesLeft == 0) {
    lifes[0].removeAttribute("id", "last_life");
  }
}

function gameOver() {
  if (trials <= 0 || (correctAns == maxQuestion && noQuestAns >= maxQuestion)) {
    setTimeout(function () {
      displayPage("game-over");

      if (JSON.parse(localStorage.getItem(gameMode)) == null) {
        localStorage.setItem(gameMode, JSON.stringify([scores, 0]));
      } else {
        var getScore = JSON.parse(localStorage.getItem(gameMode));
        var scoreArr = [getScore[0], scores];
        localStorage.setItem(gameMode, JSON.stringify(scoreArr));
      }

      if (scores > JSON.parse(localStorage.getItem(gameMode))[0]) {
        gameOverMsgOne.textContent = "You have a new high score!";
      }
      gameOverMsgTwo.textContent = "Your score is: " + scores;
    }, 150);
  }
}

//LOAD NEW QUESTIONS AFTER A PARTICULAR TIME INTERVAL
function one_interval(getQuestion, question) {
  var interval = setInterval(() => {
    if (count_down < 0) {
      return;
    } else {
      count_down--;
    }
    time.textContent = count_down;

    if (count_down == 0) {
      count_down = 30;
      trials--;
      correctAns++;
      gameOver(question);
      reduceLife(trials, lifes);

      if (
        gameMode == "one-word-two-forms" ||
        gameMode == "find-misspelled" ||
        gameMode == "find-correct"
      ) {
        iconSpanOne.style.opacity = 0;
        iconSpanTwo.style.opacity = 0;
        iconSpanThree.style.opacity = 0;
        iconSpanFour.style.opacity = 0;

        optionOne.style.opacity = 1;
        optionTwo.style.opacity = 1;
        optionThree.style.opacity = 1;
        optionFour.style.opacity = 1;
      }
      getQuestion(optionOne, optionTwo, optionThree, optionFour);
    }

    if (trials == 0 || correctAns == maxQuestion) {
      clearInterval(interval);
      time.style.opacity = 0;
    }
  }, 1000);
}

function check(
  e,
  refAns,
  optionOne,
  optionTwo,
  optionThree,
  optionFour,
  iconSpanOne,
  iconSpanTwo,
  iconSpanThree,
  iconSpanFour,
  getNewQuestion
) {
  let focus = e.target;
  //console.log(correctAns);
  if (focus.dataset.clicked === "false") {
    focus.dataset.clicked = "true";

    if (refAns.toUpperCase() == focus.textContent.toUpperCase()) {
      optionOne.dataset.clicked = false;
      optionTwo.dataset.clicked = false;
      optionThree.dataset.clicked = false;
      optionFour.dataset.clicked = false;
      scores = scores + 10 + count_down;

      focus.nextElementSibling.classList.add("glyphicon-ok");
      focus.nextElementSibling.style.opacity = 1;
      focus.nextElementSibling.style.color = "rgb(59, 255, 0)";

      toggleSoundEffect();

      correctAns++;

      setTimeout(function display_ok() {
        getNewQuestion(optionOne, optionTwo, optionThree, optionFour);

        count_down = 30;

        focus.nextElementSibling.classList.remove("glyphicon-ok");

        optionOne.style.opacity = 1;
        iconSpanOne.style.opacity = 0;

        optionTwo.style.opacity = 1;
        iconSpanTwo.style.opacity = 0;

        optionThree.style.opacity = 1;
        iconSpanThree.style.opacity = 0;

        optionFour.style.opacity = 1;
        iconSpanFour.style.opacity = 0;
      }, 350);
    } else {
      /*using a different variable because in the if statement evaluation, the conditional is evaluated i.e 10 is subtracted
in the conditional and the else statement making a subtration of 20
*/
      let scoreObtained = scores;

      if ((scoreObtained -= 10) <= 0) {
        scores = 0;
      } else {
        scores -= 10;
      }

      focus.style.opacity = 0.3;
      focus.nextElementSibling.classList.add("glyphicon-remove");
      focus.nextElementSibling.style.opacity = 1;
      focus.nextElementSibling.style.color = "#ff0000";

      setTimeout(function display_remove() {
        focus.nextElementSibling.classList.remove("glyphicon-remove");
        focus.nextElementSibling.style.opacity = 0;
      }, 350);

      trials--;
      reduceLife(trials, lifes);
    }
    score.textContent = scores;

    gameOver(question);
  } else {
    alert("You have already clicked, choose another option");
  }
}

//LAYS OUT THE STRUCTURE OF THE QUESTION'S PAGE
function gameType() {
  //DISPLAYING READY MESSAGE
  displayPage("get-ready-page");

  //REMOVING EVENT LISTENER
  click_area.removeEventListener("click", gameType);

  //removes tap to start div
  start.remove();

  //SETTING TIMEOUT TO LOAD QUESTIONS
  setTimeout(function starting() {
    //REMOVING CHILD NODES RIGHT BEFORE QUESTION LOADS
    // removeAllChildNodes(content);
    displayPage("one-word-two-forms");

    content.style.padding = "10px 30px 10px 30px";

    if (gameMode == "one-word-two-forms") {
      questionDiv.textContent = "SELECT CORRECT FORM";
      questionDiv.marginTop = "80px";
      var availableQuest = [...questions.oneWordTwoForms];
    } else if (gameMode == "find-misspelled") {
      question.textContent = "FIND MISSPELLED WORD";
      questionDiv.style.margin = "60px 0px 30px 0px";
      var availableQuest = [...questions.findMisspelled];
    } else if (gameMode == "decide") {
      question.textContent = "IS THIS WORD CORRECT?";
      var availableQuest = [...questions.findCorrect];
    } else if (gameMode == "find-correct") {
      question.textContent = "FIND CORRECT WORD";
      questionDiv.style.margin = "60px 0px 30px 0px";
      var availableQuest = [...questions.findCorrect];
    }

    function startGame() {
      score.style.opacity = 1;
      lifeHud();
      one_interval(getNewQuestion, question);
      getNewQuestion(optionOne, optionTwo, optionThree, optionFour);
    }

    let options = [];

    function getNewQuestion(optionOne, optionTwo, optionThree, optionFour) {
      if (
        trials == 0 ||
        (correctAns == maxQuestion && noQuestAns >= maxQuestion)
      )
        return;

      const questionIndex = Math.floor(Math.random() * availableQuest.length);
      noQuestAns++;

      //WHEN GAME IS OVER, DO NOT TO DISPLAY MORE THAN MAX QUEST
      if (noQuestAns < maxQuestion) {
        counter.textContent = noQuestAns + "/" + maxQuestion;
      } else {
        counter.textContent = maxQuestion + "/" + maxQuestion;
      }
      //console.log(optionOne);
      counter.style.opacity = 1;

      //SHUFFLES QUESTION OPTIONS
      options = availableQuest[questionIndex].options;
      options = options.sort(() => Math.random() - 0.5);

      optionOne.textContent = options[0];
      optionTwo.textContent = options[1];
      if (options.length > 2) {
        optionThree.textContent = options[2];
        optionFour.textContent = options[3];
      }
      refAns = availableQuest[questionIndex].answer;

      availableQuest.splice(questionIndex, 1);
    }

    optionOne.addEventListener("click", (e) => {
      check(
        e,
        refAns,
        optionOne,
        optionTwo,
        optionThree,
        optionFour,
        iconSpanOne,
        iconSpanTwo,
        iconSpanThree,
        iconSpanFour,
        getNewQuestion
      );
    });
    optionTwo.addEventListener("click", (e) => {
      check(
        e,
        refAns,
        optionOne,
        optionTwo,
        optionThree,
        optionFour,
        iconSpanOne,
        iconSpanTwo,
        iconSpanThree,
        iconSpanFour,
        getNewQuestion
      );
    });
    optionThree.addEventListener("click", (e) => {
      check(
        e,
        refAns,
        optionOne,
        optionTwo,
        optionThree,
        optionFour,
        iconSpanOne,
        iconSpanTwo,
        iconSpanThree,
        iconSpanFour,
        getNewQuestion
      );
    });
    optionFour.addEventListener("click", (e) => {
      check(
        e,
        refAns,
        optionOne,
        optionTwo,
        optionThree,
        optionFour,
        iconSpanOne,
        iconSpanTwo,
        iconSpanThree,
        iconSpanFour,
        getNewQuestion
      );
    });
    startGame();
  }, 3000);
}

function whichLetter() {
  const numberWords = [
    "FIRST",
    "SECOND",
    "THIRD",
    "FOURTH",
    "FIFTH",
    "SIXTH",
    "SEVENTH",
    "EIGHT",
    "NINTH",
    "TENTH",
    "ELEVENTH",
    "TWELFTH",
  ];

  let letters = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ];

  const question = document.getElementById("which-letter-header");
  const whichLetterOptions = document.getElementById("which-letter-options");
  const startSpans = document.getElementById("which-letter-start");
  const startSpanOne = document.getElementById("startSpanOne");
  const startSpanTwo = document.getElementById("startSpanTwo");
  const wordDiv = document.getElementById("which-letter-word");

  function getNewQuestion() {
    noQuestAns++;

    whichLetterOptions.setAttribute("class", "none");
    question.textContent = "REMEMBER WORD";
    const questionIndex = Math.floor(Math.random() * availableQuest.length);
    const whichLetterIndex = Math.floor(
      Math.random() * availableQuest[questionIndex].length
    );
    refAns = availableQuest[questionIndex][whichLetterIndex];

    if (noQuestAns < maxQuestion) {
      counter.textContent = noQuestAns + "/" + maxQuestion;
    } else {
      counter.textContent = maxQuestion + "/" + maxQuestion;
    }

    if (noQuestAns > 5) {
      wordDiv.textContent = "";
      startSpanOne.textContent = "";
      startSpanTwo.textContent = "";
    } else {
      wordDiv.textContent = availableQuest[questionIndex];
    }
    wordDiv.setAttribute("class", "word");
    startSpans.setAttribute("class", "start");

    availableQuest.splice(questionIndex, 1);

    function startGame() {
      content.style.padding = "0";
      wordDiv.textContent = "";

      question.textContent =
        "THE " + numberWords[whichLetterIndex] + " LETTER IS?";

      startSpans.setAttribute("class", "none");
      wordDiv.setAttribute("class", "none");

      whichLetterOptions.classList.remove("none");
      whichLetterOptions.setAttribute("class", "wrapper");
      removeAllChildNodes(whichLetterOptions);

      //SHUFFLE THE LETTER ARRAY EACH TIME A NEW QUESTION LOADS
      letters = letters.sort(() => Math.random() - 0.5);
      letters.map((letter) => {
        var letterOptions = document.createElement("div");
        whichLetterOptions.appendChild(letterOptions);
        letterOptions.setAttribute("class", "letterOptions");
        letterOptions.textContent = letter;
        letterOptions.addEventListener("click", checkMatch);
      });
    }
    startSpans.addEventListener("click", startGame);
  }

  function checkMatch(e) {
    if (e.target.textContent == refAns) {
      scores = scores + 10 + count_down;
      toggleSoundEffect();
      correctAns++;
      startSpans.classList.remove("none");
      wordDiv.classList.remove("none");
      getNewQuestion();
      count_down = 30;
    } else {
      scores = scores - 10;
      e.target.removeEventListener("click", checkMatch);
      e.target.style.opacity = 0.3;
      trials--;
      reduceLife(trials, lifes);
    }
    if (scores < 0) {
      scores = 0;
    }

    score.textContent = scores;
    gameOver(question);
  }

  click_area.removeEventListener("click", whichLetter);

  lifeHud();
  displayPage("get-ready-page");
  start.remove();

  setTimeout(() => {
    displayPage("which-letter");
    question.textContent = "REMEMBER WORD";
    startSpanOne.textContent = "I'M READY!";
    startSpanTwo.textContent = "TAP TO START!";
    counter.style.opacity = 1;
    score.style.opacity = 1;
    one_interval(getNewQuestion, question);
    getNewQuestion();
  }, 3000);
}

function decide() {
  click_area.removeEventListener("click", decide);
  content.style.padding = "20px 30px 10px 30px";
  let refAns = null;
  let refAns2 = null;
  let randomOptions = [];
  const colors = ["#00c2ff", "#ffa500", "#3bff00", "#f658e3", "#ea3556"];
  const question = document.getElementById("decide-question");
  const decideWord = document.getElementById("decide-word");
  const yesSpan = document.getElementById("yes");
  const noSpan = document.getElementById("no");

  yesSpan.addEventListener("click", checkMatch);
  noSpan.addEventListener("click", checkMatch);
  question.textContent = "IS THIS WORD CORRECT?";
  questionDiv.textContent = "CHOOSE THE CORRECT WORD!";

  function getNewQuestion() {
    if (trials == 0 || (correctAns == maxQuestion && noQuestAns >= maxQuestion))
      return;
    if (isDecideAndCorrect) {
      displayPage("decide");
    }

    noQuestAns++;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const questionIndex = Math.floor(Math.random() * availableQuest.length);
    if (isDecideAndCorrect) {
      if (!availableQuest[questionIndex].wrong) {
        refAns = "yes";
        decideWord.textContent =
          availableQuest[questionIndex].correct.toUpperCase();
      } else {
        decideWord.textContent =
          availableQuest[questionIndex].wrong[
            Math.floor(Math.random() * 3)
          ].toUpperCase();
        refAns = "no";
        refAns2 = availableQuest[questionIndex].correct;
        randomOptions = [
          ...availableQuest[questionIndex].wrong,
          availableQuest[questionIndex].correct,
        ];
        randomOptions = randomOptions.sort(() => Math.random() - 0.5);

        optionOne.textContent = randomOptions[0].toUpperCase();
        optionTwo.textContent = randomOptions[1].toUpperCase();
        optionThree.textContent = randomOptions[2].toUpperCase();
        optionFour.textContent = randomOptions[3].toUpperCase();
      }
    } else {
      decideWord.textContent = availableQuest[questionIndex][0];
      refAns = availableQuest[questionIndex][1];
    }
    decideWord.style.color = randomColor;

    if (noQuestAns < maxQuestion) {
      counter.textContent = noQuestAns + "/" + maxQuestion;
    } else {
      counter.textContent = maxQuestion + "/" + maxQuestion;
    }
    availableQuest.splice(questionIndex, 1);
  }

  optionOne.addEventListener("click", (e) => {
    check(
      e,
      refAns2,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      iconSpanOne,
      iconSpanTwo,
      iconSpanThree,
      iconSpanFour,
      getNewQuestion
    );
  });
  optionTwo.addEventListener("click", (e) => {
    check(
      e,
      refAns2,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      iconSpanOne,
      iconSpanTwo,
      iconSpanThree,
      iconSpanFour,
      getNewQuestion
    );
  });
  optionThree.addEventListener("click", (e) => {
    check(
      e,
      refAns2,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      iconSpanOne,
      iconSpanTwo,
      iconSpanThree,
      iconSpanFour,
      getNewQuestion
    );
  });
  optionFour.addEventListener("click", (e) => {
    check(
      e,
      refAns2,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      iconSpanOne,
      iconSpanTwo,
      iconSpanThree,
      iconSpanFour,
      getNewQuestion
    );
  });

  function checkMatch(e) {
    if (e.target.id == refAns) {
      scores = scores + 10 + count_down;
      toggleSoundEffect();
      if (isDecideAndCorrect) {
        if (refAns === "no") {
          optionOne.style.opacity = 1;
          optionTwo.style.opacity = 1;
          optionThree.style.opacity = 1;
          optionFour.style.opacity = 1;
          displayPage("one-word-two-forms");
        } else {
          correctAns++;
          setTimeout(() => {
            getNewQuestion();
            count_down = 30;
          }, 500);
        }
      } else {
        correctAns++;
        setTimeout(() => {
          getNewQuestion();
          count_down = 30;
        }, 500);
      }
    } else {
      correctAns++;
      scores -= 10;
      e.target.style.opacity = 0.3;
      trials--;
      reduceLife(trials, lifes);

      setTimeout(function moveToNextQuest() {
        getNewQuestion();
        count_down = 30;
        yesSpan.style.opacity = 1;
        noSpan.style.opacity = 1;
      }, 500);
    }
    if (scores < 0) {
      scores = 0;
    }
    score.textContent = scores;
    gameOver(question);
  }

  lifeHud();
  displayPage("get-ready-page");
  start.remove();

  setTimeout(() => {
    displayPage("decide");
    counter.style.opacity = 1;
    score.style.opacity = 1;
    one_interval(getNewQuestion, question);
    getNewQuestion();
  }, 3000);
}

function multipleChoices() {
  click_area.removeEventListener("click", multipleChoices);
  const checkboxes = [checkboxOne, checkboxTwo, checkboxThree, checkboxFour];
  const optionsTag = [optionOne, optionTwo, optionThree, optionFour];
  let questionIndex;
  let optionsText = [];
  let answers = [];
  let isCorrect = null;
  let questOptionsArr = [true, false];
  let time = 1000;

  // Setting some styling
  questionDiv.style.marginTop = "40px";
  optionsTag.forEach((tag) => {
    tag.nextElementSibling.style.fontFamily =
      "Helvetica Neue, Helvetica, Arial, sans-serif";
    tag.nextElementSibling.style.top = "0";
  });

  function submit(e) {
    if (e.target.dataset.clicked === "false") {
      scores += Math.floor(count_down / 3);
      e.target.dataset.clicked = "true";
      count_down = -1;
      correctAns++;
      score.textContent = scores;
      if (isCorrect) {
        for (let i = 0; i < optionsTag.length; i++) {
          setTimeout(() => {
            if (answers[i] === checkboxes[i].checked) {
              optionsTag[i].nextElementSibling.textContent = "+5";
              scores += 5;
            } else {
              optionsTag[i].nextElementSibling.textContent = "-5";
              scores -= 5;
              trials--;
              reduceLife(trials, lifes);
            }
            if (scores < 0) {
              scores = 0;
            }
            score.textContent = scores;
          }, time);
          time += 1000;
        }
      } else {
        for (let i = 0; i < optionsTag.length; i++) {
          setTimeout(() => {
            if (answers[i] === !checkboxes[i].checked) {
              optionsTag[i].nextElementSibling.textContent = "+5";
              scores += 5;
            } else {
              optionsTag[i].nextElementSibling.textContent = "-5";
              scores -= 5;
              trials--;
              reduceLife(trials, lifes);
            }
            if (scores < 0) {
              scores = 0;
            }
            score.textContent = scores;
          }, time);
          time += 1000;
        }
      }
      setTimeout(() => {
        btn.textContent = "Next";
        btn.removeEventListener("click", submit);
        btn.addEventListener("click", getNewQuestion);
        gameOver();
        e.target.dataset.clicked = "false";
        time = 1000;
        isCorrect = null;
        console.log(trials);
      }, 5000);
    } else {
      alert("Processing answers...");
    }
  }

  const btn = document.getElementsByTagName("button")[0];
  btn.classList.remove("none");

  optionsTag.forEach((tag) => {
    tag.style.fontSize = "18px";
  });

  checkboxes.forEach((box) => {
    box.style.opacity = 1;
  });

  function getNewQuestion() {
    count_down = 30;
    answers = [];
    optionsTag.forEach((tag) => {
      tag.nextElementSibling.textContent = "";
    });
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    btn.removeEventListener("click", getNewQuestion);
    btn.textContent = "Done";
    btn.addEventListener("click", submit);
    noQuestAns++;

    //WHEN GAME IS OVER, DO NOT TO DISPLAY MORE THAN MAX QUEST
    if (noQuestAns < maxQuestion) {
      counter.textContent = noQuestAns + "/" + maxQuestion;
    } else {
      counter.textContent = maxQuestion + "/" + maxQuestion;
    }

    isCorrect = questOptionsArr[Math.floor(Math.random() * 2)];
    if (isCorrect) {
      questionDiv.textContent = "SELECT CORRECT WORDS ONLY!";
    } else {
      questionDiv.textContent = "SELECT INCORRECT WORDS ONLY!";
    }
    for (let j = 0; j <= 3; j++) {
      questionIndex = Math.floor(Math.random() * availableQuest.length);
      optionsText.push(availableQuest[questionIndex]);
      availableQuest.splice(questionIndex, 1);
      optionsTag[j].textContent = optionsText[j][0];
      answers.push(optionsText[j][1]);
    }
    optionsText = [];
  }

  lifeHud();
  displayPage("get-ready-page");
  start.remove();

  setTimeout(() => {
    displayPage("multiple-choices");
    counter.style.opacity = 1;
    score.style.opacity = 1;
    one_interval(getNewQuestion, question);
    getNewQuestion();
  }, 3000);
}
