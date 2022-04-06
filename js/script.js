//Visualizzare in pagina 5 numeri casuali (in un range tra 1 e 100). Da lì parte un timer di 30 secondi.
//Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
//Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

//variabili
const play = document.getElementById('play');
const primoBlocco = document.getElementById('primoBlocco');
const secondoBlocco = document.getElementById('secondoBlocco');
const terzoBlocco = document.getElementById('terzoBlocco');
const soluzioni = document.getElementById('soluzioni');
const inviaNumeri = document.getElementById('inviaNumeri');
let attempts = 5
//array
let numeriRandomArray = [];
let numeriArray = [];
let numeriIndovinati = [];
// funzioni
//funzione numero random
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
//funzione gioco
function inizioGioco(){
    //cambio pagina
    primoBlocco.classList.add('d-none');
    secondoBlocco.classList.remove('d-none');
    //creazione numeri random
    numeriRandomArray.length = 0;
    while(numeriRandomArray.length < 5){
        let numero = getRandomInt(1, 100);
        if (!numeriRandomArray.includes(numero)){
            numeriRandomArray.push(numero);
        }
    }
    console.log(numeriRandomArray)
    //inner html secondo blocco
    secondoBlocco.innerHTML = `
    <div class="numeriRandom">${numeriRandomArray.join(' - ')}</div>
    <div id="clock">
    <i class="fa-solid fa-clock"></i>
    <span id="time">30</span>
    </div>
    `
    //rimozione numeri
    setTimeout(()=>{
        secondoBlocco.classList.add('d-none');
        terzoBlocco.classList.remove('d-none');
    },30000)
    //orologio
    const clock = document.getElementById('clock');
    console.log(clock);
    let timer = setInterval(myFunction, 1000);
    let maxTime = 29;
    function myFunction(){
    if(maxTime === 0){
        clearInterval(timer);
    }
    document.getElementById('time').innerHTML = `${maxTime}`
    console.log(maxTime);
    maxTime--;
    }
}
//funzione controllo numeri
function controlloNumeri(){
    //creazione lista numeri utente e numeri indovinati
    let numUtente = parseInt(document.getElementById('number').value);
    numeriArray.push(numUtente);
    attempts--;
    if(numeriRandomArray.includes(numUtente)){
        numeriIndovinati.push(numUtente);
    }
    if(numeriArray.length === 5){
        fineInserimento(numeriRandomArray, numeriArray, numeriIndovinati);
    }
    // definizione numeri rimasti
    let tentativi = document.getElementById('tentativi');
    tentativi.innerHTML = `${attempts}`;

    console.log(numeriArray);
    console.log(numeriIndovinati);
    console.log(numUtente);
}
//funzione quando vengono inseriti 5 numeri
function fineInserimento(numeriRandomArray, numeriArray, numeriIndovinati){
    //cambio pagina
    terzoBlocco.classList.add('d-none');
    soluzioni.classList.remove('d-none');
    //innerHTML della soluzione
    soluzioni.innerHTML = `
    <h1 class="text-uppercase">Soluzione</h1>
    <p>I numeri originali: ${numeriRandomArray.join(' - ')}</p>
    <p>I tuoi numeri: ${numeriArray.join(' - ')}</p>
    <p>Numeri indovinati: ${numeriIndovinati.join(' - ')}</p>
    <p>Hai indovinato ${numeriIndovinati.length} numeri su ${numeriRandomArray.length}</p>
    <button id="playAgain" class="btn btn-primary">Gioca di nuovo</button>
    `
    document.getElementById('playAgain').addEventListener('click', function(){
        soluzioni.classList.add('d-none');
        attempts = 5;
        tentativi.innerHTML = '5';
        console.log(attempts);
        numeriArray.length = 0;
        console.log(numeriArray.length);
        numeriIndovinati.length = 0;
        console.log(numeriIndovinati.length);
        inizioGioco();
    })
}

inviaNumeri.addEventListener('click', controlloNumeri);
play.addEventListener('click', inizioGioco);
