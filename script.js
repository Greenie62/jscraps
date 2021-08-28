

var classNames={
    1:'dice flex center',
    2:'dice flex evenly',
    3:'dice flex evenly',
    4:'dice  grid-cols-2',
    5:'dice  grid-cols-2',
    6:'dice  grid-cols-2'
};

// DOM els
var diceOne = document.querySelector("[data-dice-one]")
var diceTwo = document.querySelector("[data-dice-two]")
var loader = document.querySelector(".loader-parent")
var gameApp = document.querySelector(".game-app")
var hotNumberEl = document.querySelector(".hot-number")
// var numberEl = document.querySelector(".number")
var balanceEl = document.querySelector(".balance")
var playerNameEl = document.querySelector(".playername");
var rollTab = document.querySelector(".roll-tab");
var buyModal = document.querySelector(".buy-in-modal")
var chipMenu = document.querySelector(".chip-menu")
var buyBtn = document.querySelector(".buy-in-btn");
var tableBetBtn = document.querySelector(".table-bet-btn");
var chipsSelectTotalEl = document.querySelector(".chips-select-total");
var chips = document.querySelectorAll('.chip');
var playerChipMenu = document.querySelector('.player-chip-menu');
var playerChipContainer = document.querySelector('.player-chip-container');
var moneyOnTableEl = document.querySelector('.money-on-table');
var middleTableEl = document.querySelector('.middle');
var captionEl = document.querySelector('.h2-caption');
var scoreEl = document.querySelector('.score');


// game states
var currentNumber = 0;
let errorCount = 0;
let playerTotal = 0;
let moneyOnTable = 0;
let playerScore = 0;
let hotNumber;
let playersChips={
    5:0,
    10:0,
    25:0,
    50:0,
    100:0
}


let numberChip = document.createElement("div")
    numberChip.className="number-chip"





function renderDots(number,dice){
    dice.innerHTML = ""
    if(number === 5){
        let dotDiv = document.createElement("div")
        dotDiv.className="w-100 flex between"

        for(let i=0;i<2;i++){
            // let dotDiv = document.createElement("div")
            let dot = document.createElement("div")
            // dotDiv.className="dot-div flex"
            dot.className="dot"
            dotDiv.append(dot);

        }
        let dotDiv2 = document.createElement("div");
            dotDiv2.className="flex center"
        let dot = document.createElement("div")
            dot.className="dot"
        dotDiv2.append(dot);
        let dotDiv3 = document.createElement("div")
        dotDiv3.className="w-100 flex between"

        for(let i=0;i<2;i++){
            // let dotDiv = document.createElement("div")
            let dot = document.createElement("div")
            // dotDiv.className="dot-div flex"
            dot.className="dot"
            dotDiv3.append(dot);

        }
        dice.append(dotDiv)
        dice.append(dotDiv2)
        dice.append(dotDiv3)
        dice.className="dice flex column evenly"
        console.log("DICE:",dice)
    }


    else{
    for(let i=0;i<number;i++){
       let dotDiv = document.createElement("div")
       let dot = document.createElement("div")
       dotDiv.className="dot-div"
       dot.className="dot"
       dotDiv.appendChild(dot)
       dice.append(dotDiv)

    }
    dice.className = classNames[number]
    console.log(dice)
}
}

function rollDice(){
for(let i=0;i<7;i++){
    setTimeout(()=>{
        let rollOne=((Math.random() * 6 | 0) + 1)
        let rollTwo=((Math.random() * 6 | 0) + 1)
renderDots(rollOne,diceOne)
renderDots(rollTwo,diceTwo)

if(i === 6){
    console.log('fx done')
    if(!hotNumber){
        if(!hotNumber && rollOne + rollTwo === 7){
            flashCaption("Ohh, Look at you. Winning a quick $" + moneyOnTable + ". Nice!" )
            playerScore += moneyOnTable;
            scoreEl.innerHTML = playerScore;
            return;
        }
        hotNumber = rollOne + rollTwo;
        flashCaption(`The hot number is ${hotNumber} 🔥🎲`)
        hotNumberEl.innerHTML = hotNumber
        return;
    }
    currentNumber = rollOne + rollTwo
    flashCaption(`Player rolls a ${currentNumber}`)
    if(currentNumber === 7){
        console.log("You lose")
        flashCaption(`Awww crap!! 🤮🤬`)
        crap()

        setTimeout(()=>{
            hotNumberEl.innerHTML = ""
        },2000)
        hotNumber=undefined
    }
    // numberEl.innerHTML = currentNumber
}
},i*500);
}


}

rollTab.onclick=(e)=>{
    if(playerTotal === 0){
        flashCaption("need to buy into the game before you can play! 😫");
        // document.querySelector(".buyin-h1").style.transition='1s ease'
        // document.querySelector(".buyin-h1").style.color='black'
        buyModal.style.transition='1s ease'
        buyModal.style.background='black'
        setTimeout(()=>{
            // document.querySelector(".buyin-h1").style.color='white'
            buyModal.style.background=''


        },1500)
        return;
    }
    if(moneyOnTable === 0){
        flashCaption("Ante up a chip into the game there bud!");
        return;

    }
    rollDice()
    e.target.classList.add('pull');

    setTimeout(()=>{
        e.target.classList.remove("pull")
    },1500)
}



// flashLoader(2000)



function flashLoader(time){
    gameApp.style.display='none'
    loader.style.display='flex'

    setTimeout(()=>{
        gameApp.style.display='block'

        loader.style.display='none'
    },time)
}




buyBtn.onclick=buyIn

function buyIn(){
    console.log('player wants chips')

     playerTotal = document.querySelector("input[name='total']").value
    if(isNaN(playerTotal)){
        alert("Error: Invalid buy-in amount (Must be a valid number! Smart Ass)")
        document.querySelector("input[name='total']").value = ""
        errorCount++;
        if(errorCount > 2){
            window.location.href="https://en.wikipedia.org/wiki/Gambling"
        }
        return;
    }
while(playerTotal % 5 !== 0){
    playerTotal++;
    console.log("finished rounding up")
}

if(playerTotal > 5000){
    flashCaption("Gonna cap ya at $5000 there big boy");
    playerTotal = 5000
}
    balanceEl.innerHTML = playerTotal
    chooseChips(playerTotal,'block')
    toggleBuyModal('none')
}



function toggleBuyModal(value){
    buyModal.style.display=value
}



function chooseChips(total,status){
    chipMenu.style.display=status
    chipsSelectTotalEl.innerHTML = total;
}




chips.forEach(c=>{
    c.onclick=(e)=>{
        let value = new Number(e.target.getAttribute('data-chip'));
        console.log("value: " + value)
        let refTotal = playerTotal;
        refTotal -= value;
        if(refTotal === 0){
            console.log("thatta honest boy")
            chipsSelectTotalEl.innerHTML = playerTotal;
            playersChips[value]++
            flashCaption("Looks good, lets get started! 🎲🤑")
            renderChips(playersChips)
        
            return;
        }
        if(playerTotal - value < 0){
            console.log("your buying over your budget");
            flashCaption("Can't afford that chip there chief.")
            return;
        }
    
        playerTotal -= value;
        chipsSelectTotalEl.innerHTML = playerTotal;
        playersChips[value]++
        console.log(playersChips)
    }
})



function renderChips(chips){
    chipMenu.style.display='none';
    playerChipContainer.style.display='block'

    Object.entries(chips).forEach(([key,value])=>{
        // console.log(key)
        // console.log(value)
        for(let i=0;i<value;i++){
        
        let chip = document.createElement("div")
            chip.className=`chip chip-${key} flex center absolute`
            chip.setAttribute('data-value',key)
            chip.innerHTML = `<h2 style="pointer-events:none">$${key}</h2>`
            chip.onclick=(e)=>playBettingChip(e)
            console.log("created a chip")
            document.querySelector(`.chip-${key}-column`).append(chip)
        }
    })

}


function playBettingChip(e){
    if(moneyOnTable === 0){
        e.target.classList.add('shrink')
        let chipVal = e.target.getAttribute('data-value')
        // e.target.style.width='20px'
        console.log('fx fired')
     
    
    moneyOnTable += parseInt(chipVal);
    moneyOnTableEl.innerHTML ="$"+moneyOnTable
        
       middleTableEl.appendChild(e.target)
       flashCaption(`Player enters game with $${chipVal}.`)
        return;
    }
    var spot = prompt("What space?");
    if(!spot){
        console.log("user error");
        return;
    }
    console.log(e.target)
    console.log(e.target.parentElement.parentElement)
    e.target.classList.add('shrink')
    let chipVal = e.target.getAttribute('data-value')
    // e.target.style.width='20px'
    console.log('fx fired')
 

moneyOnTable += parseInt(chipVal);
moneyOnTableEl.innerHTML ="$"+moneyOnTable
    
   document.querySelector(`[data-${spot}]`).appendChild(e.target)
   flashCaption(`Player puts money on ${spot}`)


}


// tableBetBtn.onclick=(e)=>{

//     let initBet = document.querySelector("input[name='entry-bet']:checked").value;
//     console.log(initBet);

//     let initChip = document.querySelectorAll(`.chip-${initBet}`) ? document.querySelectorAll(`.chip-${initBet}`)[0] : document.querySelector(`.chip-${initBet}`)

//     console.log(initChip)
//     initChip.classList.add('shrink')
//     initTableEl.append(initChip)


//     moneyOnTable += parseInt(initBet);
//     moneyOnTableEl.innerHTML = "$"+moneyOnTable

//     flashCaption(`Player enters game with $${initBet}`)
// }



function flashCaption(caption){
    captionEl.innerHTML = caption;

    setTimeout(()=>{
        captionEl.innerHTML = ""
    },2000)
}





function crap(){
    moneyOnTableEl.innerHTML = ""
    playerScore -= moneyOnTable;
    scoreEl.innerHTML = playerScore
    moneyOnTable = 0;

    document.querySelectorAll("[data-tile]").forEach(el=>{
        console.log(el)
        if(el.children){
        el.removeChild(document.querySelector(".chip"))
        }
    })
    moneyOnTableEl.removeChild(docuement.querySelector(".chip"))

}





fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCoZy3fw9Tt4d1GkLNXC2CBhyfkiPAij8Q&cx=017576662512468239146:omuauf_lfve&q=cardi+b`)
.then(res=>res.json())
.then(res=>{
    console.log(res)
    middleTableEl.innerHTML = ""
})






