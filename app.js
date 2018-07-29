/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore,activePlayer,gamePlaying;
init();

// create score list
var scoreList=[];
var endPoint;
document.querySelector('#confirm').addEventListener('click', function(){
    endPoint = document.querySelector('#endPoint').value;
    
});


document.querySelector('.btn-roll').addEventListener('click', function(){
    
if(gamePlaying){
        // 1. random number
        var dice = Math.floor(Math.random() * 6 + 1);
    
        // 2. display the result
        var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice+'.png'; 

        // 3. update round scoure if the roll num !=1
        if(dice!==1){
            //add score
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
            // ---->add dice to scoreList
            scoreList.push(dice);
            console.log(scoreList);
           
            // ---> is it the same result as last one?
           if(scoreList[scoreList.length - 1] == scoreList[scoreList.length - 2] && scoreList[scoreList.length - 2]===6){
              
                document.querySelector('#score-' + activePlayer).textContent=0;
                nextPlayer();
               
           }
        }
        else{
            nextPlayer();
    }
}

});

document.querySelector('.btn-hold').addEventListener('click' , function(){
  if(gamePlaying){  
    //add current score to global score
    scores[activePlayer] += roundScore;
    // Update the user interface(UI)
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    //check if player won the game
        if(scores[activePlayer]>=endPoint){
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').display='none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying=false;
        }
        else{
            nextPlayer();
        }
    }
});
// listener calls function init !
document.querySelector('.btn-new').addEventListener('click', init);


//|----------------------------------------------------------------------------|
//|-------------------------------   FUNCTIONS  -------------------------------|
//|----------------------------------------------------------------------------|
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    scoreList = [];                         // reset scoreList

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
   
}

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying=true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};