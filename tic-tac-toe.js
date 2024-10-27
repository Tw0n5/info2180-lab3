document.addEventListener('DOMContentLoaded',function(){
    const squares= document.querySelectorAll('#board div');
    const status= document.getElementById('status');
    const newgamebutton= document.querySelector('.btn');
    let gameArray= Array(squares.length).fill('');
    let currentPlayer= 'X';
    let winner = undefined;

    squares.forEach((square,index)=>{
        square.classList.add('square');
        square.addEventListener('click', ()=> Squareclick(index), {once: true});
        square.addEventListener('mouseover', addHover);
        square.addEventListener('mouseout', removeHover);
    })

    function Squareclick(index){
        const square = squares[index];
    
        if (gameArray[index] !== ''){
            return;
        }
    
        gameArray[index]= currentPlayer;
    
        square.textContent= currentPlayer;
        square.classList.add(currentPlayer);
    
        currentPlayer= currentPlayer ==='X'? 'O' : 'X';
        checkWin();
    }

    function checkWin() {
        if (winner === undefined) {
            const winCombinations=[
                [0,1,2], [3,4,5], [6,7,8],
                [0,3,6], [1,4,7], [2,5,8],
                [0,4,8], [2,4,6]
            ];
            winCombinations.forEach(combination => {
                const [a,b,c]= combination;
                if (gameArray[a]&& gameArray[a]=== gameArray[b] && gameArray[a]=== gameArray[c]){
                    winner= gameArray[a];
                }
            })
        } 
        if (winner !== undefined) {
            status.innerHTML = `Congratulations! ${winner} is the Winner!`;
            status.classList.add('you-won');
        } else if (gameArray.every(square => square !=='')){ 
            status.innerHTML = "Draw!";
        }
    }

    function reset(){
        gameArray.fill('');
        winner= undefined;
        currentPlayer= 'X';
        status.textContent= 'Move your mouse over a square and click to play an X or an O.'
        status.classList.remove('you-won');
        
        squares.forEach((square,index)=>{
            square.textContent= '';
            square.classList.remove('X','O','hover');

            square.removeEventListener('click',()=> Squareclick(index));
            square.addEventListener('click',()=> Squareclick(index),{once: true});
        })
    }
    newgamebutton.addEventListener('click', reset);
});

function addHover(event){
    event.target.classList.add('hover');
}

function removeHover(event){
    event.target.classList.remove('hover');
}

