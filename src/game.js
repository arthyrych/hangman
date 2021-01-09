// get a random word from and array in container.js
let word = getRdmWord();


// converting answer to an array with underscores
let answerArray = wordToUnderscores(word);


// setting the remaining letters
let remainingLetters = word.length;


// setting remaining attempts
let remainingAttempts = 5;


// just for debugging
console.log(word);
console.log(answerArray);


// the main function after setting all preconditions
theMain(remainingLetters, remainingAttempts);


// converting answer to underscores
function wordToUnderscores(word) {
    let answerArray = [];
    for (let y = 0; y < word.length; y++) {
        answerArray[y] = '_';
    }
    return answerArray;
}


// the main function once all preconditions are set
function theMain (remainingLetters, remainingAttempts) {

    // setting a cycle to continue till the word is guessed
    while (remainingLetters > 0) {

        // ending the game if no attempts left
        if (remainingAttempts === 0) {
            break;

        } else {

            // showing the status of the game
            $('#remainingAttempts').text('Remaining attempts: ' + remainingAttempts);
            $('#word').text('The word: ' + answerArray.join(' '));

            // asking for a letter
            let guess = prompt('Guess a letter or press \'Cancel\' to leave');

            // leaving the game if clicked to cancel
            if (guess === null) {
                break;

                // if user enters non a char
            } else if (guess.length !== 1) {
                alert('Please enter the only one letter.');

                // running if user filled in a char
            } else {

                // converting input to uppercase
                guess = guess.toUpperCase();

                //checking already guessed letters
                let canContinue = answerArray.includes(guess);
                if (canContinue) {
                    alert('You\'ve already entered this letter.');
                    continue;
                }

                // var to consider if we need to subtract remaining attempts
                let remainingAttemptsSkip = 0;

                // checking if there is a char in the word-array and refreshing the status of the game
                for (let j = 0; j < word.length; j++) {
                    if (word[j] === guess) {
                        answerArray[j] = guess;
                        remainingLetters--;

                        // preventing to subtract remaining attempts
                        remainingAttemptsSkip++;
                    }
                }

                // checking if the entered char is not in the word and subtracting remaining attempts
                if (remainingAttemptsSkip < 1) {
                    remainingAttempts--;
                }
            }}

    }

    // showing the answer and congrats
    if (remainingLetters === 0) {
        $('#preStatus').text(answerArray.join(" "));
        $('#status').text('Excellent!\nYou won!\nThe word is ' + word + '!');

        // running if a non-guessed letter left in the array
    } else {
        $('#status').text('Unfortunately you have failed.\nThe word was: ' + word.toUpperCase() +
            '. You\'re welcome to press F5 to start a new game.');
    }
}