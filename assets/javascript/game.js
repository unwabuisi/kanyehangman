
// array of words
var words = ["slow jamz", "fade", "power", "paranoid", "stronger", "blood on the leaves", "bound 2", "golddigger", "heartless", "lollipop", "addiction", "big brother", "good life", "homecoming", "new slaves"];
// word chosen from array
var word = "";
// represents individual letters in word
var lettersInWord = [];
// spaces for hidden word
var spaces = 0;
// shows letters guessed and spaces remaining
var lettersAndSpaces = [];
// letters guessed
var lettersGuessed = [];

// audio objects for songs to corresponding word
var fadeAudio = new Audio('assets/audio/fade.mp3');
var powerAudio = new Audio('assets/audio/power.mp3');
var paranoidAudio = new Audio('assets/audio/paranoid.mp3');
var slowJamzAudio = new Audio('assets/audio/slowJamz.mp3');
var strongerAudio = new Audio('assets/audio/stronger.mp3');
var bloodOnTheLeavesAudio = new Audio('assets/audio/bloodOnTheLeaves.mp3');
var bound2Audio = new Audio('assets/audio/bound2.mp3');
var golddiggerAudio = new Audio('assets/audio/golddigger.mp3');
var heartlessAudio = new Audio('assets/audio/heartless.mp3');
var lollipopAudio = new Audio('assets/audio/lollipop.mp3');
var addictionAudio = new Audio('assets/audio/addiction.mp3');
var bigBrotherAudio = new Audio('assets/audio/bigBrother.mp3');
var goodLifeAudio = new Audio('assets/audio/goodLife.mp3');
var homecomingAudio = new Audio('assets/audio/homecoming.mp3');
var newSlavesAudio = new Audio('assets/audio/newSlaves.mp3');

// setting variables for wins, losses
var wins = 0;
var losses = 0;

// chances left
var chances = 5;


function startGame() {
	// stop track playing
	fadeAudio.pause();
	powerAudio.pause();
	paranoidAudio.pause();
	slowJamzAudio.pause();
	strongerAudio.pause();
	bloodOnTheLeavesAudio.pause();
	bound2Audio.pause();
	golddiggerAudio.pause();
	heartlessAudio.pause();
	lollipopAudio.pause();
	addictionAudio.pause();
	bigBrotherAudio.pause();
	goodLifeAudio.pause();
	homecomingAudio.pause();
	newSlavesAudio.pause();

	// resets chance counter
	chances = 5;
	// resets letters guessed 
	lettersGuessed = [];
	// resets letters/spaces remaining
	lettersAndSpaces = [];
	// resets hidden spaces in title
	hiddenSpaces = [];

	// call on a random word from the words array
	randNum = Math.floor(Math.random()*10);

	word = words[Math.floor(Math.random()*words.length)];
		
		console.log(word);
	// if word is matching song, play designated song 
	for(var i = 0; i < word.length; i++){
		if(word === "fade"){
			fadeAudio.play();
		}
		else if(word === "power"){
			powerAudio.play();
		}
		else if(word === "paranoid"){
			paranoidAudio.play();
		}
		else if(word === "slow jamz"){
			slowJamzAudio.play();
		}
		else if(word === "stronger"){
			strongerAudio.play();
		}
		else if (word === "blood on the leaves") {
			bloodOnTheLeavesAudio.play();
		}
		else if (word === "bound 2") {
			bound2Audio.play();
		}
		else if (word === "golddigger") {
			golddiggerAudio.play();
		}
		else if (word === "heartless") {
			heartlessAudio.play();
		}
		else if (word === "lollipop") {
			lollipopAudio.play();
		}
		else if (word === "addiction") {
			addictionAudio.play();	
		}
		else if (word === "big brother") {
			bigBrotherAudio.play();	
		}
		else if (word === "good life") {
			goodLifeAudio.play();
		}
		else if (word === "homecoming") {
			homecomingAudio.play();	
		}
		else if (word === "new slaves") {
			newSlavesAudio.play();	
		}
		

	};

	// gets all letters in random word
	lettersInWord = word.split("");

	// counts letters in word
	spaces = lettersInWord.length;
	for(var i = 0; i < spaces; i++){
		lettersAndSpaces.push("_");
	} if(i === " "){
		hiddenSpaces.push(" ");
	}

	// console.log(lettersAndSpaces);

	// update HTML to show new counts
	document.getElementById("chances").innerHTML = chances;
	document.getElementById("spaces").innerHTML = hiddenSpaces.join(" ");
	document.getElementById("spaces").innerHTML = lettersAndSpaces.join(" ");
	document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(" ");
};

// function to find if user's input matches letters in srandom word
function checkLetters(letter) {
	// boolean; is letter in word?
	var letterFound = false;
	// if letter is in word, change boolean to true
	for(var i = 0; i < spaces; i++){
		if(word[i] === letter){
			letterFound = true;
		}
	}
	// if true...
	if(letterFound){
		for(var i = 0; i < spaces; i++){
			if(word[i] === letter){
				// replace space with letter
				lettersAndSpaces[i] = letter;
			}
		}
	}
	// if false...add guessed letter to lettersGuessed array and subtract from total chances
	else{
		lettersGuessed.push(letter);
		chances--;
	}
};

function roundComplete() {
	// update HTML to show new counts
	document.getElementById("chances").innerHTML = chances;
	document.getElementById("spaces").innerHTML = lettersAndSpaces.join(" ");
	document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(" ");

	// if user matches all letters, add to win score, restart game
	if(lettersInWord.toString() === lettersAndSpaces.toString()){
		wins++;
		// update HTML
		document.getElementById("wins").innerHTML = wins;
		startGame();
	}
	// if user runs out of chances, update loss score and restart game
	else if(chances === 0){
		losses++;
		// update HTML
		document.getElementById("losses").innerHTML = losses;
		startGame();
	}
};

startGame();

document.onkeyup = function(){

	var userguess = String.fromCharCode(event.keyCode).toLowerCase();

	if (userguess == "[") {
		userguess = "";
	}
	checkLetters(userguess);
	roundComplete();
};