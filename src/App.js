import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "./App.css"; 

import SingleCard from './components/singleCard';
const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]

let backSong = "/mp3/12 Showdown.mp3";

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0)
  const [pickOne, setPickOne] = useState(null)
  const [pickTwo, setPickTwo] = useState(null)
  const [disabled, setDisable] = useState(false)
  const [correctFlip, setCorrectFlip] = useState(0)

  // check is isMatch 
  useEffect(() => {
    isMatch()
  }, [pickTwo])

  useEffect(() =>{
    shuffleCards()
    if (localStorage.getItem("mem-score") === null) {
      localStorage.setItem("mem-score", 0);
    }
  }, [])

  useEffect(()=>{
    isFinish()
  }, [correctFlip])
  
  // Shuffle cards 
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => (Math.random() - 0.5))
      .map((card) => ({ ...card, id: Math.random(), matched: false }))

    setCards(shuffledCards)
    setPickOne(null)
    setPickTwo(null)
    setCorrectFlip(0)
    setTurns(0)
  }

  const handlePick = (pick) => {
    if (pickOne) {
      if (pick !== pickOne) {
        setPickTwo(pick)
      }
    } else {
      setPickOne(pick)
    }
  }

  const isMatch = () => {
    setDisable(true)
    if (pickTwo) {
      let compare = pickTwo.src === pickOne.src;
      if (compare) {
        setCards(cards.map(card => {
          if (card === pickOne) {
            return { ...pickOne, matched: true }
          } else if (card === pickTwo) {
            return { ...pickTwo, matched: true }
          }
          return card
        }))
        setTurns(turns + 1)
        setCorrectFlip(correctFlip + 1)
      }else{
        setTurns(turns + 1)
      }
      setTimeout(() => {
        resetHandlet()
      }, 1000);
    }else{
      setTimeout(() => {
        resetHandlet()
      }, 500);
    }
  }
  
  const resetHandlet = () => {
    setPickOne(null)
    setPickTwo(null)
    setDisable(false)
  }

  const isFinish = () =>{
    if (correctFlip === 6) {
      let prevScore = localStorage.getItem("mem-score");
      let currScoe = (36000 / turns).toFixed()

      if (prevScore === 0) {
        localStorage.setItem("mem-score", currScoe);
        alert(`New Record: ${currScoe}`);
      }else if(currScoe > prevScore){
        localStorage.setItem("mem-score", currScoe);
        alert(`New Highest Score: ${currScoe}`);
      }else{
        alert(`Game end! score: ${currScoe}`);
      }

      shuffleCards()
    }
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <audio controls autoPlay style={{height: "0", width: "0"}}>
        <source src={backSong} type="audio/mp3" />
      </audio>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            setPickOne={setPickOne}
            handlePick={handlePick}
            setPickTwo={setPickTwo}
            disabled={disabled}
            flipped={card === pickOne || card === pickTwo || card.matched}
          />
        ))}
      </div>
      {cards.length > 0 && <div className="scoreboard"><p>Moves: ({turns}) </p> <p>HighestScore: ({localStorage.getItem("mem-score")})</p></div> }
    </div>
  )
}

export default App;