let tickets = localStorage.getItem('ticketsBag') != undefined ? localStorage.getItem('ticketsBag').split(',') : [];
let matrixHole = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let screen = document.getElementById('screen');
let keys = document.getElementById('keys');
let list = document.getElementById('list');

let refreshCount = 10;

let mode = 'keys';

window.onload = function () {
    list.classList.add('hidden');
    document.getElementById('searchButton').addEventListener("click", searchTicket);
    document.getElementById('addButton').addEventListener("click", addTicket);
    document.getElementById('dellButton').addEventListener("click", dellTicket);
    document.getElementById('listButton').addEventListener("click", listTickets);
    document.getElementById('dellAllButton').addEventListener("click", refreshList);
    
    keys.addEventListener('click', function (event) {
        let target = event.target;
        if(target.classList.contains("key") ){
            if (target.classList.contains("selected-key")){
                target.classList.remove("selected-key");
                matrixHole[target.id] = 0;
            }
            else{
                target.classList.add("selected-key");
                matrixHole[target.id] = 1;
            }
        }

    });
}

function addTicket() {
	refreshCount = 10;
    tickets.push(matrixHole.join(''));
    localStorage.setItem('ticketsBag', tickets);
    screen.innerText = 'Билет добавлен. № ' + tickets.length;
}

function searchTicket(){
	refreshCount = 10;
    let thisTicket = matrixHole.join('');
    let tiketsNumbers = [];
    for(let i = tickets.length-1; i>=0 ; i--) {
       if(tickets[i] == thisTicket){
           tiketsNumbers.push(i+1);
       }
    }
    if(tiketsNumbers.length > 0){
        screen.innerText = `тебе нужен талон № ${tiketsNumbers}`;
    }
    else {
        screen.innerText = 'Такого билета еще нет';
    }
}

function dellTicket() {
	refreshCount = 10;
    let thisTicket = matrixHole.join('');
    for(let i = tickets.length-1; i>=0 ; i--) {
        if(tickets[i] == thisTicket){
            tickets.splice(i,1);
            localStorage.setItem('ticketsBag', tickets);
            screen.innerText = `талон № ${i+1} удален`;
            return;
        }
    }
    screen.innerText = `не удалено`;
}

function listTickets (){
	refreshCount = 10;
    if(mode == 'keys'){
        mode = 'list';
        keys.classList.add('hidden');
        list.classList.remove('hidden');
    }
    else{
        mode = 'keys';
        let listText = '';
        for(let i = 0; i < tickets.length; i++){
            listText += `№${i} = ${tickets[i]} <br>`;
        }
        list.innerHTML = listText;
        list.classList.add('hidden');
        keys.classList.remove('hidden');

    }
}

function refreshList(){
	refreshCount--;
	switch(refreshCount){
	case 3:
		screen.innerText = `ты уверен? Осталось ${refreshCount}`;
		break;
	case 2:
		screen.innerText = `А может не надо? Осталось ${refreshCount}`;
		break;
	case 1:
		screen.innerText = `Безумец!!! Последнее предупреждение`;
		break;
	case 0:
		tickets = [];
        localStorage.setItem('ticketsBag', tickets);
		screen.innerText = `Надеюсь ты знаешь, что делаешь`;
		refreshCount = 10;
		break;
	default:
		screen.innerText = `случайное косание. Осталось ${refreshCount}`;
}
}
