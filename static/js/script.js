function ageInDays(){
    var birthYear = prompt('What year were you born .... Good friend?');
    var ageInDayss = [2021 - birthYear] * 365;
    var h1 = document.createElement('hi');
    var textAnswer = document.createTextNode('You are ' + ageInDayss + ' old days.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    console.log(ageInDayss);
}
function reset(){
    document.getElementById('ageInDays').remove();
}

//Challenge 2: Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    //generate image from local folder js???
    image.src = 'static/img/tenor.jiff';
    // image.src = "https://tenor.com/view/cat-driving-serious-cat-driving-focus-driving-gif-15519638";
    div.appendChild(image);
}

//challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice:', botChoice);
    results = decideWinner(humanChoice, botChoice);//(0,1) human lost | bot won
    console.log(results);
    message = finalMessage(results); //{'message': 'You won!', 'color': 'green'}
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}
function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}
function numberToChoice(number){
    return['rock', 'paper', 'scissors'] [number];
}
function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors':0},
        'scissors': {'paper': 1, 'scisssors': 0.5, 'rock': 0}
    }
    var yourScore = rpsDatabase[yourChoice][computerChoice ];
    var computerScore = rpsDatabase[computerChoice][yourChoice ];

    return[yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return{'message': 'You Lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You tied', 'color': 'yellow'};
    }else {
        return{'message': 'You won', 'color': 'green'};
    }
}
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    //remove all images 
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src = '" + imagesDatabase[humanImageChoice] + "'height=150px width=150px style='box-shadow: 0px 10px 50 rgba(37, 50, 233, 1);'>" 
    messageDiv.innerHTML = "<h1 style = 'color: " + finalMessage['color'] + "; font-size:60px; padding:30px;'>" + finalMessage['message'] + "<h1>"
    botDiv.innerHTML = "<img src = '" + imagesDatabase[botImageChoice] + "'height=150px width=150px style='box-shadow: 0px 10px 50 rgba(238, 50, 233, 1);'>" 
    

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//challenge4: change color of all buttons
var allButtons = document.getElementsByTagName('button');


var copyAllButtons = [];
for(let i=0; i< allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    if(buttonThingy.value === 'red'){
        buttonsRed();
    } else if (buttonThingy.value === 'green'){
        buttonsGreen();
    } else if (buttonThingy.value === 'reset'){
        buttonsColorReset();
    } else if (buttonThingy.value === 'random'){
        randomColors();
    }
}

function buttonsRed(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonsColorReset(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons [i]);
    }
}

function randomColors() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning' ]
    for (i=0; i<allButtons.length; i++){
        var randomNumber = Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
    }
}

//Challenge 5: BlackJack
let blackJackGame = {
    'you': {'scoreSpan':'#your-blackjack-result', 'div': '#your-box', 'score':0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div': '#dealer-box', 'score':0},
    'cards':['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A' ],
    'cardsMap':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A': [1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false
}

const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']

const hitsound = new Audio('static/sounds/swish.m4a');
const winsound = new Audio('static/sounds/cash.mp3');
const lowsound = new Audio('static/sounds/aww.mp3');
 
document.querySelector('#blackjack-hit-btn').addEventListener('click', blackJackHit);

document.querySelector('#blackjack-stand-btn').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-btn').addEventListener('click', blackJackDeal);

function blackJackHit(){
    if(blackJackGame['isStand'] === false){
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
}
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackJackGame ['cards'] [randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitsound.play();
}
}

function blackJackDeal(){
    if(blackJackGame['turnsOver'] === true){
        blackJackGame['isStand'] = false;

        let yourImages= document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages= document.querySelector('#dealer-box').querySelectorAll('img');

        for(i=0; i<yourImages.length; i++){
            yourImages[i].remove();
        }
        // console.log(yourImages);
        // yourImages[i].remove();

        for(i=0; i<dealerImages.length; i++){
            dealerImages[i].remove(); 
        }
        // console.log(dealerImages);
        // dealerImages[i].remove();
        YOU['score'] = 0;
        DEALER ['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
        
        document.querySelector('#black-jack-result').textContent = "Lets Play!";
        document.querySelector('#black-jack-result').style.color = 'black';

        blackJackGame['turnsOver'] = true;
        }
}

function updateScore(card, activePlayer){
    if(card === 'A'){
    //if adding 11 keeps me below 21, add 11. Otherwise add 1
    if(activePlayer['score'] += blackJackGame['cardsMap'][card][1] <= 21){
        activePlayer['score'] += blackJackGame['cardsMap'][card][1];
    } else{
        activePlayer['score'] += blackJackGame['cardsMap'][card][0];
    }
}
else{
    activePlayer['score'] += blackJackGame['cardsMap'][card];
}
    
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackJackGame['isStand'] = true;

    while(DEALER['score' < 16 && blackJackGame['isStand'] === true]){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }  

        blackJackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);

}

//compute winner and return who just won
//update the wins, losses and draws
function computeWinner(){
    let winner;

    if(YOU['score'] <= 21){

    //condition: higher score than dealer or when dealer busts but you're 21 or under
    if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
        blackJackGame['wins']++;
        winner = YOU;

    }else if(YOU ['score']< DEALER['score']){
        blackJackGame['losses']++;
        winner = DEALER;

    }else if (YOU['score'] === DEALER['score']){
        blackJackGame['draws']++;

        //condition when user bust but the daeler doesnt bust
    }else if(YOU['SCORE'] > 21 && DEALER['SCORE'] <= 21){
        blackJackGame['losses']++;
        winner = DEALER;
    }
        //CONDITION:WHEN YOU AND THE DEALER BUST
    }else if(YOU['score'] > 21 && DEALER['score']  > 21){
        blackJackGame['draws']++;;
    }
    console.log(blackJackGame);
    return winner;
    
}

function showResult(winner){
    let message, messageColor;

    if(blackJackGame['turnsOver'] === true){

        if(winner === YOU){
            document.querySelector('#wins').textContent = blackJackGame['wins'];
            message= 'You won!';
            messageColor = 'green';
            winsound.play();

        }else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackJackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lowsound.play();

        }else{
            document.querySelector('#draws').textContent = blackJackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
        document.querySelector('#black-jack-result').textContent = message;
        document.querySelector('#black-jack-result').style.color = messageColor;
    }
}


