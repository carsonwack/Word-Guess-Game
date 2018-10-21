<script type="text/javascript">

function doAdelay() {
    setTimeout(function () { return true; }, 3000);
};

let definitions = ['speaking quickly, but insincerely', 'trying to be kind but instead revealing a sense of superiority', 'showing unassertive/timid behavior rather than confidently addressing something', 'a dilemma with no escape due to two bad and dependent options', 'appease; placate; pacify; conciliate; calm down', 'banal, hackneyed, clichéd, platitudinous, vapid'];
let terms = ['glib', 'patronizing', 'passive aggressive', 'catch 22', 'mollify', 'trite'];
let winsTag = document.getElementById("wins");
let definitionTag = document.getElementById("definition")
let wordTag = document.getElementById("current-word");
let guessesRemainingTag = document.getElementById("guesses-remaining");
let lettersGuessedTag = document.getElementById("letters-guessed");
let wins = 0;
let guessesRemaining = 13;
let lettersGuessed = "";
let randomTermNum = Math.floor(Math.random() * terms.length);
let randomDef = definitions[randomTermNum];
let randomTerm = terms[randomTermNum];
let blanks = ""
for (let i = 0; i < randomTerm.length; i += 1) {
    blanks = blanks + "_ ";
}


function newGame() {
    lettersGuessed = "";
    guessesRemaining = 13;
    randomTermNum = Math.floor(Math.random() * terms.length);
    randomDef = definitions[randomTermNum];
    randomTerm = terms[randomTermNum];
    blanks = ""
    for (let i = 0; i < randomTerm.length; i += 1) {
        blanks = blanks + "_ ";
    }
    wordTag.textContent = blanks;
    definitionTag.textContent = randomDef;
    winsTag.textContent = wins;
    guessesRemainingTag.textContent = guessesRemaining;
    lettersGuessedTag.textContent = lettersGuessed;
    $("#winOrLoss").text("");
}


wordTag.textContent = blanks;
definitionTag.textContent = randomDef;
winsTag.textContent = wins;
guessesRemainingTag.textContent = guessesRemaining;
lettersGuessedTag.textContent = lettersGuessed;

function replaceAt(string, index, char) {
    return string.substring(0, index) + char + string.substring(index + 1);
}


document.onkeyup = function () {
    let letterGuess = event.key;
    let accumulator = 0
    for (let j = 0; j < randomTerm.length; j += 1) {
        if (letterGuess === randomTerm[j]) {
            blanks = replaceAt(blanks, (j * 2), letterGuess);
            wordTag.textContent = blanks;
        }
        else {
            accumulator += 1;
            if (accumulator == randomTerm.length) {
                guessesRemaining -= 1;
                lettersGuessed = lettersGuessed + letterGuess + ' ';
            }
        }
        if (blanks.indexOf('_') < 0) {
            // var newImg = document.createElement("img");
            wins += 1;
            winsTag.textContent = wins;
            let audio = new Audio('smack-that.mp3');
            audio.play();
            doAdelay()
            $("#winOrLoss").text("YOU WON");
            // $("#winOrLoss").append(<a href="https://giphy.com/gifs/akon-rick-ross-YISOEFtfxWvuw">via GIPHY</a>);
            setTimeout(function() {
                newGame();
                audio.pause();
                audio.currentTime = 0;
            }, 42000);
        }
        if (guessesRemaining === 0) {
            guessesRemainingTag.textContent = guessesRemaining;
            $("#winOrLoss").text("YOU LOST");
            setTimeout(function(){ newGame(); }, 3000);
        }
    }

    guessesRemainingTag.textContent = guessesRemaining;
    lettersGuessedTag.textContent = lettersGuessed;
}

</script>