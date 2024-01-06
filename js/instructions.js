const pone = document.getElementById("pone");
const ptwo = document.getElementById("ptwo");
const pthree = document.getElementById("pthree");
const pfour = document.getElementById("pfour");
let gameMode;

async function getGameModeAsync () {
  return new Promise((resolve, reject) => {
  try {
    resolve(localStorage.getItem("gameMode"));
  } catch (error) {
    reject(error);
  }
 });
}

async function getGameMode () {
  try {
    gameMode = await getGameModeAsync();

    if(gameMode == "one-word-two-forms") {
      ptwo.textContent = "1 WORD TO BE SHOWN SPELT BOTH CORRECTLY AND INCORRECTLY!";
      pthree.textContent = "CHOOSE THE CORRECT SPELLED WORD AS FAST AS POSSIBLE!"; 
    }
    else if (gameMode == "find-misspelled")
    {
      ptwo.textContent = "4 WORDS TO BE SHOWN, 3 CORRECT AND 1 INCORRECT!";
      pthree.textContent = "CHOOSE THE INCORRECTLY SPELLED WORD AS FAST AS POSSIBLE!"; 
    }

    else if (gameMode == "find-correct")
    {
      ptwo.textContent = "4 WORDS TO BE SHOWN, 3 INCORRECT AND 1 CORRECT!";
      pthree.textContent = "CHOOSE THE CORRECTLY SPELLED WORD AS FAST AS POSSIBLE!"; 
    }

    else if (gameMode == "which-letter")
    {
      ptwo.textContent = "REMEMBER WORD ON SCREEN AND ONCE READY TAP TO START!";
      pthree.textContent = "TYPE THE LETTER THAT IS ON POSITION X IN THE PREVIOUSLY SHOWN WORD!"; 
    }

    else if (gameMode == "decide")
    {
      ptwo.textContent = "1 WORD TO BE SHOWN!";
      pthree.textContent = "DECIDE IF THE WORD IS SPELT CORRECTLY OR NOT AS FAST AS POSSIBLE!"; 
    }
    else if (gameMode == "decide-correct")
    {
      ptwo.textContent = "1 WORD TO BE SHOWN!";
      pthree.textContent = "DECIDE IF THE WORD IS SPELT CORRECTLY OR NOT AS FAST AS POSSIBLE!"; 
      pfour.textContent = "THEN SELECT CORRECT WORD FROM LIST OF WORDS PROVIDED";
    }
    else if (gameMode == "multiple-choices")
    {
      ptwo.textContent = "4 WORDS TO BE SHOWN!";
      pthree.textContent = "SELECT THE WORDS THAT ARE SPELT CORRECTLY OR INCORRECTLY ACCORDING TO THE INSTRUCTIONS!";
    }
    else
    {
      document.getElementById("start").style.display = "none";
      pone.textContent = "ERROR";
      pone.style.color = "red";
      ptwo.textContent = "PLEASE SELECT GAME MODE";
      pthree.innerHTML = '<a href="index.html"><< Back to main menu</a>';
      pfour.textContent = "";
    }
  } catch (error) {
    console.error(error);
  }
}

 getGameMode();