import React from 'react';
import "./singleCard.css";

const SingleCard = ({card, handlePick, flipped, disabled}) => {
    const handleClick = () =>{ 
        if(!disabled){
            handlePick(card)
        } 
    }

    return (
        <div className="card">
            <div className={`img ${flipped ? "flipped" : ""}`}>
                <img src={card.src} className="front" alt='card-front' />
                <img src='/img/cover.png' onClick={handleClick} className={`back ${flipped ? "flipped" : ""}`} alt='card-back ' />
            </div>
        </div>
    )
}

export default SingleCard;