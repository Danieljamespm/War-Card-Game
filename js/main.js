// Get the deck_id on page load and store it into a variable called deckId

let deckId = ''
document.querySelector('#war').classList.add('hidden')

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
        
        })
      .catch(err => {
          console.log(`error ${err}`)
      });

// Made an event listener to run function drawTwo to draw 2 cards using the url with deckId plugged in

document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  
  /* -Fetch 2 cards from the drawTwo url and have them appear in the DOM
    - create 2 variables for each player that takes the value of the cards and runs it as a parameter for the faceCardVal function
    - make conditional to determine if player 1 or player 2 won or if it is WAR and have it appear in the DOM(h3)*/
  

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let cardsLeft = data.remaining
      let playerPoint = 0
      document.querySelector('#remaining').innerText = `Cards in Deck: ${cardsLeft}`
      document.querySelector('#player1').src = data.cards[0].image
      document.querySelector('#player2').src = data.cards[1].image
      let player1Val = faceCardVal(data.cards[0].value)
      let player2Val = faceCardVal(data.cards[1].value)
      if(player1Val > player2Val){
        document.querySelector('h3').innerText = 'Player 1 Wins'
        document.querySelector('.playerOneWins').innerText = `Wins: ${++playerPoint}`
        }else if(player1Val < player2Val){
        document.querySelector('h3').innerText = 'Player 2 Wins'
        document.querySelector('.playerTwoWins').innerText = `Wins: ${++playerPoint}`
      }else{
        document.querySelector('h3').innerText = 'Time For War'
        document.querySelector('#war').classList.remove('hidden')
        document.querySelector('button').classList.add('hidden') /*In the case of WAR the deal 2 cards button will disappear so it can't
        be clicked on accident*/
       
      }
      
    })
    
   
  }
  

  
// War button to click and runs timeForWar function that deals 8 cards (4 to each player) and results the 4th from each player
  document.querySelector('#war').addEventListener('click', timeForWar)
    function timeForWar(){
      document.querySelector('button').classList.remove('hidden')
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      document.querySelector('#player1').src = data.cards[0,1,2,3].image 
      document.querySelector('#player2').src = data.cards[4,5,6,7].image 
      player1Val = faceCardVal(data.cards[3].value)
      player2Val = faceCardVal(data.cards[7].value)
      if(player1Val > player2Val){
        document.querySelector('h3').innerText = 'Player 1 Wins the WAR'
        
      }else if(player1Val < player2Val){
        document.querySelector('h3').innerText = 'Player 2 Wins the WAR'
        
      }
    })
    }

// function that takes the face card strings and converts them to numbers and an else that makes sure otherwise to always be returning a number


function faceCardVal(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}

