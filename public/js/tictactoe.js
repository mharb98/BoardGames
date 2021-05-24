let newGame = document.getElementById("new");
let table = document.getElementById("table");
let playx = document.getElementById("px");
let current_cell = null;
let previous_cell = null;

function renderBoard(){
    let ret = "";
    for(let i = 0;i < 3;i++){
        let row = "<tr>";
        for(let j = 0;j < 3;j++){
            row += `<td id="${i}-${j}" style="width:130px;height:130px;"></td>`;
        }
        row += "</tr>";
        ret += row;
    }
    return ret;
}

function getCurrentBoard(){
    let ret = [];
    let temp = null;
    let str = null;
    for(let i = 0;i < 3;i++){
        temp = [];
        for(let j = 0;j < 3;j++){
            str = i.toString() + '-' + j.toString();
            temp.push(document.getElementById(str).innerText);
        }
        ret.push(temp);
    }
    return ret;
}

window.addEventListener('load', function(){
    let ret = renderBoard();
    table.innerHTML += ret;
});

px.addEventListener('click', function(){
    if(current_cell != null){
        if(current_cell.innerText == ''){
            current_cell.innerText = px.innerText;
            current_cell.style.color = "green";
        }
    }

    let ret = getCurrentBoard();

    $.ajax({
        type : 'GET',
        url : '/solve',
        data : {'board' : ret},
        async : false,
        success : function(resp){
            let col = resp % 10;
            let row = (resp - col) / 10;
            console.log(col);
            console.log(row);
            let tmp = document.getElementById(row.toString()+'-'+col.toString());
            tmp.innerText = 'O';
            tmp.style.color = "red";
        },
        error : function(){
            console.log('Failed to get the response, please try playing again later');
        },
        timeout : 2000
    });
});

document.addEventListener('click', function(e){
    let element = e.target.nodeName;

    if(element === "TD"){
        previous_cell = current_cell;
        current_cell = e.target;

        if(previous_cell != null)
            previous_cell.style.backgroundColor = "white";
        
        current_cell.style.backgroundColor = "#E8E8E8";
    }
});