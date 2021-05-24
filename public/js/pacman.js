let table = document.getElementById("table");
let start = document.getElementById("start");
let pause = document.getElementById("pause");
let newGame = document.getElementById("new");
let pacman_pos = "10-15";
let ghost1_pos = "14-11";
let ghost2_pos = "14-19";
let game_over = false;
let board = null;
let coin = null;
let ghost1 = null;
let ghost2 = null;
let back = null;
let brick = null;
let pacman = null;
let temp = null;
let num1 = null;
let num2 = null;
let str = null; 
let interval1 = null;
let interval2 = null;

function renderBoard(resp){
    let ret = ""
    for(let i = 0; i < 28 ;i++){
        let row = `<tr>`;
        for(let j = 0;j < 31;j++){
           if(resp[i][j] == '0'){
                row += `<td id="${i}-${j}" style="background-color: #181818;"><img src=${coin} style="height:18px;width:39px;"></td>`;
           }
           else{
                row += `<td id="${i}-${j}" style="background-color: #181818;"><img src=${brick} style="height:18px;width:39px;"></td>`;
           }
        }
        row += `</tr>`;
        ret += row;
    }
    return ret;
}

function checkCell(row,col){
    if(board[row][col] == 3)
        return -1;
    else if(board[row][col] == 2)
        return -2;
    else if(board[row][col] == 1)
        return -3;
    else if(board[row][col] == 0)
        return -4;
}

function checkRight(row,col){
    let temp = col + 1;
    status = checkCell(row,temp);
    return status;
}

function checkUpper(row,col){
    let temp = row - 1;
    status = checkCell(temp,col);
    return status;
}

function checkLower(row,col){
    let temp = row + 1;
    status = checkCell(temp,col);
    return status;
}

function checkLeft(row,col){
    let temp = col - 1;
    status = checkCell(row,temp);
    return status;
}

function changeDirection(num,direction){
    let ret = null;
    
    if(direction == 'left' || direction == 'up'){
        ret = num -1;
    }
    else if(direction == 'right' || direction == 'down'){
        ret = num + 1;
    }

    return ret;
}

function changePacmanPosition(row,col,direction,rotation){
    board[row][col] = 0;
    if(direction == 'left' || direction == 'right'){
        col = changeDirection(col,direction);
    }
    else if(direction == 'up' || direction == 'down'){
        row = changeDirection(row,direction);
    }

    board[row][col] = 2;

    str = row.toString() + '-' + col.toString();
    temp = document.getElementById(str);
    temp.innerHTML = '';
    temp.innerHTML+= `<td id="${str}" style="background-color: #181818;"><img src=${pacman} style="height:18px;width:39px;transform:rotate(${rotation}deg);"></td>`;
    temp = document.getElementById(pacman_pos);
    temp.innerHTML = '';
    temp.innerHTML+= `<td id="${pacman_pos}" style="background-color: #181818;"><img src=${back} style="height:18px;width:39px;"></td>`;
    pacman_pos = str;
}

function checkPacman(ghost){
    let ret = '';
    let row = null;
    let col = null;
    let pacman_row = null;
    let pacman_col = null;
    let tmp = null;
    if(ghost == 'ghost1'){
        tmp = ghost1_pos.split('-');
    }
    else{
        tmp = ghost2_pos.split('-');
    }
    row = parseInt(tmp[0]);
    col = parseInt(tmp[1]);

    tmp = pacman_pos.split('-');
    pacman_row = parseInt(tmp[0]);
    pacman_col = parseInt(tmp[1]);

    if(pacman_row < row)
        ret = ret + 'up';
    else if(pacman_row > row)
        ret = ret + 'down';
    else if(pacman_row == row)
        ret = ret + 'same_row';

    ret = ret + '-';

    if(pacman_col < col)
        ret = ret + 'left';
    else if(pacman_col > col)
        ret = ret + 'right';
    else if(pacman_col == col)
        ret = ret + 'same_col';
    
    return ret;
}

function setPriority(ghost){
    let ret = [];
    let pacmanPosition = checkPacman(ghost);
    let tmp = pacmanPosition.split('-');
    if(tmp.includes('same_row')){
        ret.push(tmp[1]);
    }
    else{
        ret.push(tmp[0]);
        ret.push(tmp[1]);
    }
    if(tmp.includes('same_col')){
        ret.push(tmp[0]);
    }
    else{
        ret.push(tmp[0]);
        ret.push(tmp[1]);
    }

    if(!ret.includes('left'))
        ret.push('left');
    if(!ret.includes('right'))
        ret.push('right');
    if(!ret.includes('up'))
        ret.push('up');
    if(!ret.includes('down'))
        ret.push('down');
    
    return ret;
}

function changeGhostPosition(row,col,direction,ghost){
    board[row][col] = 0;
    if(direction == 'left' || direction == 'right'){
        col = changeDirection(col,direction);
    }
    else if(direction == 'up' || direction == 'down'){
        row = changeDirection(row,direction);
    }

    board[row][col] = 3;

    str = row.toString() + '-' + col.toString();
    temp = document.getElementById(str);
    temp.innerHTML = '';
    temp.innerHTML+= `<td id="${str}" style="background-color: #181818;"><img src=${ghost1} style="height:18px;width:39px;"></td>`;
    if(ghost === 'ghost1'){
        temp = document.getElementById(ghost1_pos);
        temp.innerHTML = '';
        temp.innerHTML+= `<td id="${ghost1_pos}" style="background-color: #181818;"><img src=${back} style="height:18px;width:39px;"></td>`;
    }
    else{
        temp = document.getElementById(ghost2_pos);
        temp.innerHTML = '';
        temp.innerHTML+= `<td id="${ghost2_pos}" style="background-color: #181818;"><img src=${back} style="height:18px;width:39px;"></td>`;
    }
    if(ghost === 'ghost1'){
        ghost1_pos = str;
    }
    else if(ghost === 'ghost2'){
        ghost2_pos = str;
    }
}

function moveGhost(ghost){
    let priorities = setPriority(ghost);
    let row = 0;
    let col = 0;
    let tmp = null;
    if(ghost == 'ghost1'){
        tmp = ghost1_pos.split('-');
    }
    else{
        tmp = ghost2_pos.split('-');
    }
    row = parseInt(tmp[0]);
    col = parseInt(tmp[1]);
    let status = null;
    for(let i=0;i<priorities.length;i++){
        if(priorities[i] === 'left')
            status = checkLeft(row,col);
        else if(priorities[i] === 'right')
            status = checkRight(row,col);
        else if(priorities[i] === 'up')
            status = checkUpper(row,col);
        else if(priorities[i] === 'down')
            status = checkLower(row,col);

        if(status == -4){
            changeGhostPosition(row,col,priorities[i],ghost);
            break;
        }
        else if(status == -2){
            alert('Game over');
            game_over = true;
            break;
        }
        else{
            continue;
        }
    }
}

function startPlaying(){
    document.onkeydown = function(e){
        temp = pacman_pos.split('-');
        num1 = parseInt(temp[0]);
        num2 = parseInt(temp[1]);
        if(e.keyCode == 37){
            status = checkLeft(num1,num2);
            if(status == -4)
                changePacmanPosition(num1,num2,'left',180);
        }
        else if(e.keyCode == 38){
            status = checkUpper(num1,num2);
            if(status == -4)
                changePacmanPosition(num1,num2,'up',270);
        }
        else if(e.keyCode == 39){
            status = checkRight(num1,num2);
            if(status == -4)
                changePacmanPosition(num1,num2,'right',0);
        }
        else if(e.keyCode == 40){
            status = checkLower(num1,num2);
            if(status == -4)
                changePacmanPosition(num1,num2,'down',90);
        }
    
        if(status == -1){
            alert("Game over!");
            game_over = true;
        }
    }    
    interval1 = window.setInterval(moveGhost,200,'ghost1');
    interval2 = window.setInterval(moveGhost,200,'ghost2');
}

function stopPlaying(){
    document.onkeydown = null;
    clearInterval(interval2);
    clearInterval(interval1);
}

window.addEventListener('load',function(){
    $.ajax({
        type: 'GET',
        url: '/image/pacman',
        data: {},
        async: false,
        success: function(resp){
            coin = resp["coin"];
            back = resp["back"];
            brick = resp["brick"];
            ghost1 = resp["ghost"];
            ghost2 = resp["ghost"];
            pacman = resp["pacman"];
        }
    });
    
    $.ajax({
        type : 'GET',
        url : '/pacman/create',
        data : {},
        async : false,
        success : function(resp){
            board = resp;
            board[10][15] = 2;
            board[14][11] = 3;
            board[14][19] = 3;
        },
        error : function(){
            alert("Error while getting pacman board");
        },
        timeout : 2000
    });

    let ret = renderBoard(board);
    table.innerHTML += ret;
    let temp = document.getElementById("10-15");
    temp.innerHTML = '';
    temp.innerHTML+= `<td id="${10}-${15}" style="background-color: #181818;"><img src=${pacman} style="height:18px;width:39px;"></td>`;
    temp = document.getElementById("14-11");
    temp.innerHTML = '';
    temp.innerHTML+= `<td id="${14}-${11}" style="background-color: #181818;"><img src=${ghost1} style="height:18px;width:39px;"></td>`;
    temp = document.getElementById("14-19");
    temp.innerHTML = '';
    temp.innerHTML+= `<td id="${14}-${19}" style="background-color: #181818;"><img src=${ghost2} style="height:18px;width:39px;"></td>`;
});

newGame.addEventListener('click',function(){
    stopPlaying();
    ret = renderBoard(board);
    table.innerHTML = '';
    table.innerHTML += ret;
});

start.addEventListener('click',function(){
    startPlaying();
});

pause.addEventListener('click',function(){
    stopPlaying();
});

window.setInterval(function(){
    if(game_over){
        stopPlaying();
    }
},200);