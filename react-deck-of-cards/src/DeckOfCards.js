import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from './Card';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'green',
    width: '700px',
    height: '700px'
  }
}));

const DeckOfCards = () => {
  const classes = useStyles();
  const [cardDisplay, setCardDisplay] = useState([]);
  let [remaining, setRemaining] = useState(52);
  let [rotation, setRotation] = useState(0); 
  let deckId = useRef();
  const timerId = useRef();
  const BASE_URL = "https://deckofcardsapi.com/api/deck/";  

  useEffect(() => {
    const getNextCard = async () => {
      let src;
      if(remaining) {
        if(!deckId.current) src = `${BASE_URL}new/draw`
        else src = `${BASE_URL}${deckId.current}/draw/?count=1`
        setRemaining(remaining - 1);
        let res = await axios({method: "get", url: src});
        if(!deckId.current) {
          deckId.current = res.data.deck_id;
        }
        if(rotation < 180) setRotation(rotation + 30);
        else setRotation(30); 
        cardDisplay.push([rotation, res.data.cards[0].image])
        setCardDisplay(cardDisplay.slice()); 
      }
      
      return 0;
    }
    timerId.current = setInterval(() => {
      try {
        getNextCard();
      } catch (error) {
        clearInterval(timerId.current);
      }
    }, 1000)
    return () => {
      clearInterval(timerId.current);
    }
  }, [remaining, rotation, cardDisplay])

 
  return (
    <div className={classes.root}>
      { cardDisplay.map(e => <Card rotation={e[0]} src={e[1]} /> ) }
    </div>   
  )
}

export default DeckOfCards;