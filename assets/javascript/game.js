var iKeyPress;	
		var wordArray;
		//the randomly picked word
		var word;
		//the "_" version of the word
		var blockedWord = '';
		var previousGuess = '';
		var wrongGuess = '';
		var won = 0;
		var lost = 0;
		//will be used to create a string of positions for the letter selected
		var names = {
			options: ['Robb', 'Catelyn', 'Eddard', 'Hodor', 'Rhaegar', 'Joffrey', 'Robert', 'Ygritte', 'Renly', 'Drogo', 'Stannis', 'Myrcella', 'Viserys', 'Tywin', 'Oberyn', 'Shaggydog', ],

			//switches the 'Press any Key to begin' string to an empty string
			start: function(){
				 document.querySelector('#begin').innerHTML = "";
			},
			guessedLetter: function(){
				document.querySelector('#guessed').innerHTML = previousGuess + wrongGuess;
			},
			displayword: function(){
				document.querySelector('#theWord').innerHTML = blockedWord;
			},
			//changes the image based on how many guesses are left
			hangEm: function(){
			    var image = document.querySelector("#hang");
			    if (wrongGuess.length === 1) {
			        image.src = "assets/images/man2.png";
			    }else if (wrongGuess.length === 2) {
			    	image.src = "assets/images/man3.png";
			    }else if (wrongGuess.length === 3) {
			    	image.src = "assets/images/man4.png";
			    }else if (wrongGuess.length === 4) {
			    	image.src = "assets/images/man5.png";
			    }else if (wrongGuess.length === 5) {
			    	image.src = "assets/images/man6.png";
			    return image;
				}
			},
			//makes an array of 2 items the first is a randomly picked word from the options array, the second is a string of "_" with the same length as the first 
			blockAnswer: function() {	
				word = this.options[Math.floor(Math.random()*this.options.length)];
				for (var i = 0; i < word.length; i++) {
					blockedWord = blockedWord + '_';
				}
			}
		}
		//picks an element from the array options
		names.blockAnswer();
		//turns blockedWord into an array
		blockedWord = blockedWord.split("");
		//displays the blocked word in empty tag theWord
		names.displayword();

		document.onkeyup = function(event) {
			names.start();
			// Determines which exact key was selected. Make it lowercase
			var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
			//resets the amount of guesses remaining
			document.querySelector('#guessR').innerHTML = 5 - wrongGuess.length;
			
			//searches the word for the letter pressed and puts the index of the letter in the string iKeyPress
			if (word.toLowerCase().indexOf(userGuess) > -1 && previousGuess.toLowerCase().indexOf(userGuess) === -1 && wrongGuess.length < 5) {
				for (var i = 0; i < word.length; i++) {
					if (word[i].toLowerCase() == userGuess) {
						blockedWord.splice(i, 1, word[i]);
					}
				}
				previousGuess = previousGuess + userGuess;
				names.displayword();
				names.guessedLetter();

			}
			// puts all values pressed in a string and displays them under the id guess
			else if (previousGuess.toLowerCase().indexOf(userGuess) > -1 || wrongGuess.toLowerCase().indexOf(userGuess) > -1){
				names.guessedLetter();
			//if the user guess is not in the word
			} else if (wrongGuess.length < 5){
				wrongGuess = wrongGuess + userGuess;
				names.guessedLetter();
				names.hangEm();
				document.querySelector('#guessR').innerHTML = 5 - wrongGuess.length;
			}
			//if the user did not guess the word
			if (wrongGuess.length >= 5) {
				lost++;
				blockedWord = '';
				wrongGuess = '';
				previousGuess= '';
				names.blockAnswer();
				blockedWord = blockedWord.split("");
				document.querySelector('#losses').innerHTML = lost;	
				names.displayword();
				document.querySelector('#guessed').innerHTML = " ";	
			}
			//if the user guessed the word
			if (blockedWord.indexOf('_') === -1) {
				won++;
				blockedWord = '';
				wrongGuess = '';
				previousGuess= '';
				names.blockAnswer();
				blockedWord = blockedWord.split("");
				document.querySelector('#wins').innerHTML = won;	
				names.displayword();
				document.querySelector('#guessed').innerHTML = " ";	
			} 
		}

	// if (word.toLowerCase().indexOf(userGuess) > -1 && previousGuess.toLowerCase().indexOf(userGuess) === -1){

		