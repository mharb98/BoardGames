let sudoku = document.getElementById('sudoku');
let pacman = document.getElementById('pacman');
let tictactoe = document.getElementById('tictactoe');
let sudokuGame = document.getElementById('sudoku-game');
let pacmanGame = document.getElementById('pacman-game');
let tictactoeGame = document.getElementById('tictactoe-game');

let lst1 = [sudoku,sudokuGame];
let lst2 = [pacman,pacmanGame];
let lst3 = [tictactoe,tictactoeGame];

for(let i = 0;i < lst1.length;i++){
    lst1[i].addEventListener('click',function(){
        window.location = '/sudoku';
    });
    lst2[i].addEventListener('click',function(){
        window.location = '/pacman';
    });
    lst3[i].addEventListener('click',function(){
        window.location = '/tictactoe';
    });
}
/*sudoku.addEventListener('click', function(){
    window.location = '/sudoku';
});

pacman.addEventListener('click', function(){
    window.location = '/pacman';
});

tictactoe.addEventListener('click', function(){
    window.location = '/tictactoe';
});*/

window.addEventListener('load',function(){
    $.ajax({
        type : 'GET',
        url : '/image',
        data: {'thumbnail':'tictactoe-thumbnail'},
        async : false,
        success : function(resp){
            tictactoeGame.innerHTML += `<img src=${resp} alt="thumbnail" class="img">`;
        },
        error : function(){
            console.log("Failed to get the tictactoe thumbnail");
        },
        timeout : 2000
    });

    $.ajax({
        type : 'GET',
        url : '/image',
        data : {'thumbnail':'pacman-thumbnail'},
        async : false,
        success : function(resp){
            pacmanGame.innerHTML += `<img src=${resp} alt="thumbnail" class="img">`;
        },
        error : function(){
            console.log("Failed to get the pacman thumbnail");
        },
        timeout : 2000  
    });

    $.ajax({
        type : 'GET',
        url : '/image',
        data : {'thumbnail':'sudoku-thumbnail'},
        async : false,
        success : function(resp){
            sudokuGame.innerHTML += `<img src=${resp} alt="thumbnail" class="img">`;
        },
        error : function(){
            console.log("Failed to get the sudoku thumbnail");
        },
        timeout : 2000
    });
});