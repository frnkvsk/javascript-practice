import React, {useState} from 'react';
import './ColorBox.css';

const ColorBox = () => {
  const colors = ["red", "green", "blue", "orange", "cyan", "purple", "yellow", "chartreuse", "aqua", "blueviolet", "cornflowerblue", "greenyellow", "gold", "violet", "skyblue", "salmon"];
  let [boxes, setBoxes] = useState(colors.map((e,i) => <li key={e+i} className={e}></li>) );
  const random = () => Math.floor(Math.random() * colors.length);
  const colorNextBox = () => {    
    let rand = random();
    boxes[rand] = <li key={boxes[rand].key} className={colors[random()]}></li>;
    setBoxes(boxes.map(e => e));
  }
  return (
    <div className="ColorBox">
      <ul className="ColorBox-ul">
        {boxes}
      </ul>
      <button className="ColorBox-button" onClick={colorNextBox}>Change</button>
    </div>
  )
}

export default ColorBox
