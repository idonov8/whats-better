// Initialize game state
let round = 0;
const maxRounds = 8;
let choices = [];
let options = [];
let usedIds = new Set();

// Get DOM elements
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const resultsSection = document.querySelector('.results');
const resultsList = document.getElementById('results-list');

// Load options from JSON
fetch('data.json')
 .then(response => response.json())
 .then(data => {
 options = data;
 startGame();
 });

function startGame() {
 round = 0;
 choices = [];
 usedIds.clear();
 resultsSection.style.display = 'none';
 // Update the options with new random choices
 updateOption(option1, getRandomOption());
 updateOption(option2, getRandomOption());
 showNextOptions();
}

function showNextOptions(chosen) {
console.log("round:", round);
 if (round >= maxRounds) {
	if (chosen) {
		choices.push(options.find(option => option.id === parseInt(chosen.dataset.id)));
	}
 showResults();
 return;
 }

 option1.onclick = () => handleChoice(option1, option2);
 option2.onclick = () => handleChoice(option2, option1);
}

function updateOption(element, option) {
 element.style.opacity = 0;
 setTimeout(() => {
 element.querySelector('img').src = option.image_url;
 element.querySelector('h3').textContent = option.name;
 element.dataset.id = option.id;
 element.style.opacity = 1;
 }, 200);
}

function handleChoice(chosen, notChosen) {
 choices.push(options.find(option => option.id === parseInt(notChosen.dataset.id)));
 round++;

 // Update only the unchosen option with a new random choice
 updateOption(notChosen, getRandomOption());

 // Proceed to the next round
 showNextOptions(chosen);
}

function getRandomOption() {
 const availableOptions = options.filter(option => !usedIds.has(option.id));
 const indexA = Math.floor(Math.random() * availableOptions.length);

 usedIds.add(availableOptions[indexA].id);
 return availableOptions[indexA];
}


function showResults() {
document.getElementById('options-container').style.display = 'none';

 resultsSection.style.display = 'block';
 resultsList.innerHTML = '';
	console.log("choices:", choices)
 choices.forEach(choice => {
 const li = document.createElement('li');
 li.textContent = choice.name;
 resultsList.appendChild(li);
 });
}