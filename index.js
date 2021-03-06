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
            if (target.classList.contains("selected")){
                target.classList.remove("selected");
                matrixHole[target.id] = 0;
            }
            else{
                target.classList.add("selected");
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
    let matrixRevers = [];
    for(let i = 0; i<4; i++){
        for(let j=3;j>-1;j--){
            matrixRevers.push(matrixHole[i*4+j]);
        }
    }
    let ticketRevers = matrixRevers.join('');
    let tiketsNumbers = [];
    for(let i = tickets.length-1; i>=0 ; i--) {
       if(tickets[i] == thisTicket || tickets[i] == ticketRevers ){
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
        
        let listText = '';
        for(let i = 0; i < tickets.length; i++){
        	let t = tickets[i].split('');
        	let ticketDom = `<div class="ticketDomMain">`;
        	console.log('t= ' + t);
        	for(let j = 0; j<t.length; j++){
        		if(t[j] == 1){
        			ticketDom += `<div class="ticketDom" name="selected" ></div>`;
        		}
        		else{
        			ticketDom += `<div class="ticketDom"></div>`;
        		}
        	}
        	ticketDom +=`</div>`
        	console.log('ticketDom= ' + ticketDom);
            listText += `<div id="ticketNumber-${i}" class="oneTicket">№${i+1} ${ticketDom}</div>`;
        }
        list.innerHTML = listText;
        
        
        
    }
    else{
        mode = 'keys';
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
