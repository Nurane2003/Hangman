let button = document.querySelectorAll('.letter');
let playBtn = document.querySelector('#play_btn');
let newPlay = document.querySelector('.play');
let newGame = document.querySelector('.game');
let guessesText = document.querySelector('.guesses-text b');
let newLine = document.querySelector('.line');
let hangmanImage=document.querySelector('.hangman-box img')
let gameModal=document.querySelector('.game-modal')
let content=document.querySelector('.content')
let playAgain=document.querySelector('.play-again')

newGame.style.display = 'none';

playBtn.addEventListener('click', function() {
    newPlay.style.display = 'none';
    newGame.style.display = 'block';
});

let maxGuesses=6;
let wrongGussescount=0;
let correctLetters=[]

let arr = ['CAT', 'DOG', 'HORSE', 'ELEPHANT', 'BEAR', 'RABBIT'];
let randomWord = arr[Math.floor(Math.random() * arr.length)];
let randomPattern = randomWord.split("").map(x => "_");
newLine.textContent = randomPattern.join(" ");


let gameOver=(isVictory)=>{
    setTimeout(()=>{
        console.log('func islediiiiiiiiiiii');
        let modalText=isVictory?`You found the word:`:  `The correct word was:`;
        content.querySelector("img").src=`images/${isVictory?'victory':'lost'}.gif`;
        content.querySelector("h4").innerText=`${isVictory? 'congrats!':'Game Over!'}`;
        content.querySelector("p").innerHTML=`${modalText} <b>${randomWord}</b>`
        content.classList.add("show");
        gameModal.style.display = 'flex'
        
       
    },10)
}

console.log(randomWord)
for (let i of button) {
    i.addEventListener('click', function(event) {
        let buttonText = event.target.innerText;
        if (randomWord.includes(buttonText)) {
            for (let j = 0; j < randomWord.length; j++) {
                if (randomWord[j] === buttonText) {
                    randomPattern[j] = buttonText;
                    correctLetters.push(buttonText)
                }
            }
            newLine.textContent = randomPattern.join(" ");
        } else {
            if(wrongGussescount === 6) {
                // alert('you loose')
                gameOver(false)
                return;
            }
            wrongGussescount++
            hangmanImage.src=`images/hangman-${wrongGussescount}.svg`
        }
        guessesText.innerText=`${wrongGussescount}/${maxGuesses}`

        if(correctLetters.length===randomWord.length){
            gameOver(true);
        } 
    });

   
}

playAgain.addEventListener('click',function(){
    wrongGussescount = 0;
    correctLetters = [];
    randomWord = arr[Math.floor(Math.random() * arr.length)];
    randomPattern = randomWord.split("").map(x => "_");
    newLine.textContent = randomPattern.join(" ");
    hangmanImage.src = 'images/hangman-0.svg'; 
    guessesText.innerText = `${wrongGussescount}/${maxGuesses}`;
    gameModal.style.display = 'none'; 
    content.classList.remove("show");
})
