let easy = document.getElementById('easy');
let intermediate = document.getElementById('intermediate');
let hard = document.getElementById('hard');
let expert = document.getElementById('expert');
let restartButton = document.getElementById("restartButton");
let hintButton = document.getElementById("hintButton");
let noteButton = document.getElementById("noteButton");
let viewSolution = document.getElementById("viewSolution");
let table = document.getElementById('table');
var numbers = document.getElementsByClassName("Number");

let levels = [easy,intermediate,hard,expert];

let hints = 3;

let current_level = 30;

let current_table = null;

let removed_table = null;

let current_cell = null;

let previous_cell = null;

function createBoard(){
    let ret = null;
    $.ajax({
        type: 'GET',
        url: '/sudoku/create',
        data: {},
        async: false,
        success: function(resp){
            ret = resp;
        },
        error: function(){
            ret = "error";
        },
        timeout: 2000
    });

    return ret;
}

function renderBoard(resp){
    let ret = ""
    for(let i = 0; i < 9 ;i++){
        let row = `<tr>`;
        if(i==0){
            row = `<tr style="border-top:4px solid black;">`
        }
        else if(i==2 || i==5 || i==8){
            row = `<tr style="border-bottom:4px solid black;">`
        }
        for(let j = 0;j < 9;j++){
            if(j==0){
                row += `<td id="${i}-${j}" style="border-left:4px solid black">${resp[i][j]}</td>`;
            }
            else if(j==2 || j==5 || j==8){
                row += `<td id="${i}-${j}" style="border-right:4px solid black">${resp[i][j]}</td>`;
            }
            else{
                row += `<td id="${i}-${j}">${resp[i][j]}</td>`;
            }
        }
        row += `</tr>`;
        ret += row;
    }
    return ret;
}

function changeLevel(element){
    if(element === "easy")
        current_level = 20;
    else if(element === "intermediate")
        current_level = 30;
    else if(element === "hard")
        current_level = 40;
    else if(element === "expert")
        current_level = 50;
}

function getCopy(list){
    let list2 = [];
    for(let i=0;i<9;i++){
        list2.push([]);
    }
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            list2[i].push(list[i][j]);
        }
    }
    return list2;
}

function removeRandom(table){
    let copy = getCopy(table);
    for(let i = 0;i < current_level;i++){
        let rand = Math.floor(Math.random() * (81 - 1) + 1);

        let row = rand / 9;

        row = Math.floor(row);

        let col = rand % 9;

        if(col == 0)
            col = 8;
        else
            col = col - 1;

        copy[row][col] = '';
    }
    return copy;
}

window.addEventListener('load',function(){
    current_table = createBoard();

    removed_table = removeRandom(current_table);

    let inner = renderBoard(removed_table);

    table.innerHTML += inner;
});

for(let i=0;i<levels.length;i++){
    levels[i].addEventListener('click',function(e){
        let element = e.target.id;
        changeLevel(element);

        table.innerHTML = "";

        current_table = createBoard();

        removed_table = removeRandom(current_table);

        let inner = renderBoard(removed_table);

        table.innerHTML += inner;
    });
}

restartButton.addEventListener('click', function(){
    let ret = renderBoard(removed_table);
    
    table.innerHTML = '';
    
    table.innerHTML += ret;
});

hintButton.addEventListener('click', function(){
    if(current_cell == null)
        alert('Please select a cell to fill');
    else if(hints <=0 ){
        alert('You are out of hints');
    }
    else{    
        let id = current_cell.id;
        let temp = id.split('-');
        let row = parseInt(temp[0]);
        let col = parseInt(temp[1]);
        
        if(removed_table[row][col] == ''){
            let num = current_table[row][col];
            current_cell.innerHTML = num;
            current_cell.style.color = "violet";
            hints = hints - 1;
            hintButton.innerText = "Hints:" + hints;
        }
    }
});

viewSolution.addEventListener('click', function(){
    let ret = renderBoard(current_table);
    table.innerHTML = '';
    table.innerHTML += ret;
});

noteButton.addEventListener('click', function(){
    alert('Developer was too lazy to finish this feature');
});

for(let i = 0;i<numbers.length;i++){
    numbers[i].addEventListener('click',function(e){
        let num = e.target.innerText;
        
        num = parseInt(num);

        let id = current_cell.id;
        let temp = id.split('-');
        let row = parseInt(temp[0]);
        let col = parseInt(temp[1]);
        
        if(removed_table[row][col] == ''){
            if(num === 'clear')
                current_cell.innerText = '';
            else{
                current_cell.innerText = num;
                if(current_table[row][col] == num)
                    current_cell.style.color = "green";
                else
                    current_cell.style.color = "red";
            }
        }
    });
}

document.addEventListener('click',function(e){
    let element = e.target.nodeName;

    if(element === "TD"){
        previous_cell = current_cell;
        current_cell = e.target;

        if(previous_cell != null)
            previous_cell.style.backgroundColor = "white";
        
        current_cell.style.backgroundColor = "#E8E8E8";
    }
});