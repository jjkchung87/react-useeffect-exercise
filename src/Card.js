import React, {useState, useEffect, useRef} from 'react'
import './Card.css'


const Card = ({value, suit, id, image}) => {

    const randomRotation = Math.floor(Math.random() * 31) - 15; // Random value between -15 and 15 degrees
    const cardStyle = {
        transform: `rotate(${randomRotation}deg)`,
    }

    return (
        <div className="Card">
            <img src={image} style={cardStyle}></img>
        </div>
    )

}

export default Card