import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Card from './Card'
import './CardArea.css'

const CardArea = () => {

    const [deckId, setDeckId] = useState(null)
    const [cards, setCards] = useState([])
    const [cardDrawButton, setCardDrawButton] = useState(true)

    const timerId = useRef()

    useEffect(() => {
        async function getDeckId() {
            const deckIdRes = await axios.get('https://deckofcardsapi.com/api/deck/new/')
            setDeckId(deckIdRes.data.deck_id)
            console.log(`Deck ID: ${deckId}`)
    }
    getDeckId()},
    []
    )

    async function drawCard() {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        const {value, suit, image} = res.data.cards[0]
        setCards(cards => [...cards, {id: `${value}-${suit}`, value, suit, image}])
        console.log(value, suit)
    }

    async function startStopCardDraw() {
        if(cardDrawButton) {
            timerId.current = setInterval(drawCard, 1000)
        } else {
            clearInterval(timerId.current)
        }
        setCardDrawButton( b => !b)
    }

    async function shuffleDeck() {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        //how to make button not clickable 
        setCards([])
    }

    const cardComponents = cards.map(c => (
        <Card value={c.value} suit={c.suit} id={c.id} image={c.image} />
    ))

    return (
        <div>
            <button id="btn-draw-card" onClick={startStopCardDraw}>{cardDrawButton ? 'Start Drawing' : 'Stop Drawing'}</button>
            <button id="btn-shuffle-deck" onClick={shuffleDeck} >Shuffle cards</button>
            <div>
                {cardComponents}
            </div>
            
        </div>
    )



}

export default CardArea