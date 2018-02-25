

// These are all the options
var guessChoices = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

//Number of incorrect guesses
var guessesLeft = 7;
var gamesWon = 0;
var gamesLost = 0;
var lettersGuessed = "";

//List of possible words: US presidents , no repeats i.e. Bush comes up once
var classicAlbums = ["illmatic", "ready to die", "it was written", "makaveli", "miseducation", "aquemini", "blackstar","reasonable doubt","life after death","low end theory",]



        // This will randomly choose the word for each game

        var theWord;
        var splitWord;
        var splitLength;

        function chooseWord (){
            theWord = classicAlbums[Math.floor(Math.random() * classicAlbums.length)];
            splitWord = theWord.split("");
        splitLength = splitWord.length;}
        chooseWord();

// This should split word into array with each letter being an index


    var correct = [];

    var answerField = document.getElementById("answer-field");

    // array into divs

    function makeField(){
        for (var w = 0; w < splitLength; w++) {
            var lastDivTiles = document.createElement("div");
            lastDivTiles.id = w;
            lastDivTiles.className = "tiles";
            lastDivTiles.innerHTML = '-';
            answerField.appendChild(lastDivTiles);
        }
    }

    makeField();

function removeField(){
    for(var i =0; i < splitLength; i++){
 var fieldDiv = document.getElementById("answer-field");
    var findClasses = document.getElementById(i);
    fieldDiv.removeChild(findClasses);
    }
}

var img = new Image();
var div = document.getElementById("photo-div");

function getImage(){
        img.onload = function() {
        div.innerHTML += '<img src="'+img.src+'" />';
      };
    img.src = "assets/images/" + theWord + ".jpg";
}

getImage();
//need this after it picks a new word.
function replaceImage(){
    var nextImage = document.createElement("img");
    nextImage.src = "assets/images/" + theWord + ".jpg";
    var imageDiv = document.getElementById("photo-div");
    imageDiv.replaceChild(nextImage, imageDiv.childNodes[0]);
}

function gameOver(){
    lettersGuessed = "";
    guessesLeft = 7;
}

    function winCheck() {
        // Win condition
        var different = false;
        for(var i = 0; i < splitLength; i++) {
            if(correct[i] !== splitWord[i]) {
                different = true;
            }
        }
        if(!different) {
           gamesWon = gamesWon + 1;
            console.log("Games Won: " + gamesWon);
            document.getElementById("games-won").innerHTML = gamesWon;
            console.log("WIN!!!!!!");
            removeField();
            gameOver();
            chooseWord();
            console.log(theWord);
            replaceImage();
            makeField();
        }
    }
    //Starts on key up
document.onkeyup = function (event) {

        // Determines which key was pressed.
        //var userGuess = event.key;

        //convert capds into lowercase
        var userGuess = String.fromCharCode(event.keyCode).toLowerCase();


        //to find letter position, and put each  in array
        var letterPosition = [];
            for(var a = 0; a < splitLength; a++){
                if(splitWord[a]===userGuess) {
                    letterPosition.push(a);
                    console.log("Pushing into indices");
                }
                else{
                letterPosition.push("");
                }
            }

//If user's guess is in the word
    if(splitWord.includes(userGuess)){

       //replaces letter
       for(c = 0 ; c < splitLength ; c++){
            if(letterPosition[c]===0 || letterPosition[0] || letterPosition[c] ){
                var idFind = document.getElementById(letterPosition[c]).innerHTML = userGuess ;
                correct[c] = userGuess;
                console.log("CORRECT: " + correct);
                console.log("fingers crossed");
                winCheck();
            }
        }
    }
            //You lose a guess when you guess incorrectly.
            else{

                //check if user has guessed letter previously, if not, do these
                var doubleGuess = lettersGuessed.search(userGuess);
                if(doubleGuess === -1){

                    //subtract a guess
                    guessesLeft = guessesLeft - 1;
                    document.getElementById("guesses-left").innerHTML = guessesLeft;
                    console.log(guessesLeft);

                    //shows letters you have guessed
                    lettersGuessed = lettersGuessed + userGuess + ", ";
                    document.getElementById("guesses").innerHTML = lettersGuessed;
                }
            }

            // game over if you run out of guesses
            if (guessesLeft === 0){
                gamesLost = gamesLost + 1;
                document.getElementById("games-lost").innerHTML=gamesLost;
                console.log("you lost");
                removeField();
                gameOver();
                chooseWord();
                console.log(theWord);
                replaceImage();
                makeField();
            }



console.log("Made it to end of function");

};
