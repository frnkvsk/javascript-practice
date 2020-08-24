import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(to right, orange , yellow, green, cyan, blue, violet)',

  },
  link: {
    color: 'white'
  }, 
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '60%',
    height: '25%',
    background: 'white',      
    borderRadius: '25px'
  },
  item: {
    padding: '10px 0 10px 55px',
  }
}));
const stringToColor = str => {
  let d = document.createElement("div");
  d.style.color = str;
  document.body.appendChild(d);
  // Color in RGB 
  let c = window.getComputedStyle(d).color;
  // RGB to HEX
  let t = '#'+c.slice(c.indexOf('(')+1, c.length-1)
    .split(',')
    .map(Number)
    .map(e => e.toString(16).padStart(2, '0'))
    .join``;
  return t
}
function ColorForm({clickHandlerForm}) {  
  const history = useHistory();
  let [name, setColor] = useState('black');
  let [value, setValue] = useState('#00000');
  const changeHandlerStringToHex = e => {
    if(e.target.name === 'colorName') {
      setColor(name = e.target.value);
      setValue(value = stringToColor(e.target.value));
    }      
    else
      setValue(value = stringToColor(e.target.value));
  }
  const clickHandler = () => {
    clickHandlerForm(name, value);
    history.push('/');  
  }
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <div className={classes.form}>
        <div className={classes.item}>
          <label htmlFor="colorName">Color name </label>
          <input name="colorName" type="text" onChange={changeHandlerStringToHex} ></input>
        </div>
        <div className={classes.item}>
          <label htmlFor="colorValue">Color value </label>
          <input name="colorValue" type="color" value={value} onChange={changeHandlerStringToHex} />
        </div>
        <div className={classes.item}>
          <button className={classes.button} onClick={clickHandler} >Add this color</button>
        </div>        
      </div>
    </div>
  );
}

export default ColorForm;
