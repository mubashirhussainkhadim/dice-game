'use strict';
// selecting elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



// starting conditions 

let scores, currentScore, activeplayer, playing;


const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activeplayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active')
}
init();
const switchplayer = function() {
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    currentScore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        // 1 . gesnerating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. display dice 
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. check for rolled 1
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activeplayer}`).textContent = currentScore;
        } else {
            switchplayer();

        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. add current score to active players score
        scores[activeplayer] += currentScore;
        // score[1]=score[1] + currentScore;
        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];
        // 2. check if players score is >= 100
        // finish the game 
        if (scores[activeplayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
        } else {
            // switch next player
            switchplayer();
        }
    }

});

btnNew.addEventListener('click', init);