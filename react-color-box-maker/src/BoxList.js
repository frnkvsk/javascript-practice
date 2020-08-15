/**
 BoxList - Place your state that contains all of the boxes here. 
 This component should render all of the Box components along with the NewBoxForm component
 */
import React, {useState} from 'react';
import ColorBox from './ColorBox';
import { v4 as uuid } from 'uuid';

import NewBoxForm from "./NewBoxForm";

function BoxList() {
  let [boxes, setBoxes] = useState([]);
  const addNewBox = newBox => {
    boxes.push(newBox);
    setBoxes(boxes.slice());
  }
  const hideBox = (id) => {
    boxes = boxes.filter(e => e.id !== id);
    setBoxes(boxes.slice());
  }

  return (
    <div className="BoxList">
      <NewBoxForm addNewBox={addNewBox}/>
      {boxes.map(e => {
        const uid = uuid();
        e.id = uid;
        return <ColorBox 
          key={uid}
          id={uid}
          backgroundColor={e.backgroundColor} 
          width={e.width} 
          height={e.height}
          hideBox={hideBox} />
      }        
      )}
    </div>
  );
}

export default BoxList;