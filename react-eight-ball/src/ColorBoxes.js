import React, {useState} from 'react';
import './ColorBox.css';

const ColorBox = (props) => <li style={{ background: props.color }} />;

const ColorBoxes = () => {
  const colors = ["red", "green", "blue", "orange", "cyan", "purple", "yellow", "chartreuse", "aqua", "blueviolet", "cornflowerblue", "greenyellow", "gold", "violet", "skyblue", "salmon"];

  let [boxes, setBoxes] = useState(colors.slice());

  const random = () => Math.floor(Math.random() * colors.length);

  const colorNextBox = () => {   
    boxes[random()] = colors[random()];
    setBoxes(boxes.slice());
  }
  
  return (
    <div className="ColorBox">
      <ul className="ColorBox-ul">
        {boxes.map(c => <ColorBox color={c} />)}
      </ul>
      <button className="ColorBox-button" onClick={colorNextBox}>Change</button>
    </div>
  )
}

export default ColorBoxes
