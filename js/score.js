const category1 = document.getElementById('category-one');
const category2 = document.getElementById('category-two');
const category3 = document.getElementById('category-three');
const category4 = document.getElementById('category-four');
const category5 = document.getElementById('category-five');
const category6 = document.getElementById('category-six');
const category7 = document.getElementById('category-seven');
const category8 = document.getElementById('category-eight');
const overall = document.getElementById("overall");

const scoreArray = [];
const gameArray = ["one-word-two-forms", "find-correct", "find-misspelled","which-letter", "decide", "decide-correct", "multiple-choices"];

localStorage.setItem("gameMode", null);

async function setGameModeAsync (key, value) {
  return new Promise((resolve, reject) => {
  try {
    resolve(localStorage.setItem(key, value));
  } catch (error) {
    reject(error);
  }
 });
}

async function setGameMode (key, value) {
  try { 
    await setGameModeAsync(key, value);
    console.log("game mode has been set");
    return window.location.assign("game.html");
  } catch (error) {
    console.error("Error setting local storage item", error);
  }
}

//STORING GAME MODE IN LOCAL STORAGE
category1.addEventListener("click", () => {
  setGameMode("gameMode", "one-word-two-forms");
});
category2.addEventListener("click", () => {
  setGameMode("gameMode", "find-misspelled");
});
category3.addEventListener("click", () => {
  setGameMode("gameMode", "find-correct");
});
category4.addEventListener("click", () => {
  setGameMode("gameMode", "which-letter");
});
category5.addEventListener("click", () => {
  setGameMode("gameMode", "decide");
});
category6.addEventListener("click", () => {
  setGameMode("gameMode", "decide-correct");
});
category7.addEventListener("click", () => {
  setGameMode("gameMode", "multiple-choices");
});
category8.addEventListener("click", () => {
  setGameMode("gameMode", gameArray[Math.floor(Math.random() * gameArray.length)]);
});

// UNIVERSAL FUNCTION TO GET SCORES FOR EACH GAME MODE
function getScore(whichGame, bestScore) {
  var bestScoreSpan = document.getElementById(bestScore);
  var score = JSON.parse(localStorage.getItem(whichGame));
  if (score) {
    if (score[0] > score[1]) {
      bestScoreSpan.textContent = score[0];
      scoreArray.push(score[0]);
    } else {
      bestScoreSpan.textContent = score[1];
      scoreArray.push(score[1]);
      localStorage.setItem(whichGame, JSON.stringify([score[1], score[0]]));
    }
  } else {
    localStorage.setItem(whichGame, JSON.stringify([0, 0]));
    scoreArray.push(0);
    bestScoreSpan.textContent = 0;
  }
}


//STORAGE FOR ONE WORD TWO FORMS
getScore("one-word-two-forms", "bs1");

//STORAGE FOR FIND MISSPELLED
getScore("find-misspelled", "bs2");

//STORAGE FOR FIND CORRECT
getScore("find-correct", "bs3");

//STORAGE FOR WHICH LETTER
getScore("which-letter", "bs4");

//STORAGE FOR DECIDE
getScore("decide", "bs5");

//STORAGE FOR DECIDE AND CORRECT
getScore("decide-correct", "bs6");

//STORAGE FOR MULTIPLE CHOICES
getScore("multiple-choices", "bs7");

//GET OVERALL SCORES
let totalScore = 0;
for (let i = 0; i < scoreArray.length; i++) {
  totalScore += scoreArray[i];
}
overall.textContent = totalScore;