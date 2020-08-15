import React from 'react';
import './ColorBox.css';
// import NewBoxForm from './NewBoxForm';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';



function ColorBox({id, backgroundColor, width, height, hideBox}) {
  // const [display, setDisplay] = useState(true);
  // const hideBox = () => {
  //   console.log('hidebox') 
  //   setDisplay(false);    
  // }
  const Box1 = styled(Box)({
    width: width + 20 + "px"
  });
  const Box2 = styled(Box)({
    backgroundColor: backgroundColor,
    width: width + "px",
    height: height + "px"
  });
  const removeThisBox = () => {
    hideBox(id)
  }

  return (
    <div className="ColorBox" style={{width:(+width+70)+"px"}}>
      <Box1 component="div">
        <Box2 component="div">
        <Button className="btn" variant="contained" color="secondary" onClick={removeThisBox}>X</Button>
        </Box2>
      </Box1>
    </div>
    
  );
}

export default ColorBox;