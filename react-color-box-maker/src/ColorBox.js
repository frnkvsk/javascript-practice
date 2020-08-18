import React from 'react';
import './ColorBox.css';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';




function ColorBox({id, backgroundColor, width, height, hideBox}) {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justify: 'flex-start',
      alignItems: 'flex-start',
      width: width + 100 + "px",
    },
    box: {
      display: 'flex',
      justify: 'flex-start',
      alignItems: 'flex-start',
      textAlign: 'center',
      width: '0',
      height: '35px',
      color: red,
      marginLeft: '5px',
      border: '1px solid red',
    },
  }));
  
  const Box2 = styled(Box)({
    backgroundColor: backgroundColor,
    width: width + "px",
    height: height + "px"
  });

  const removeThisBox = () => {
    hideBox(id)
  }

  const classes = useStyles();

  return (
    <div className="ColorBox" style={{width:(+width+70)+"px"}}>
      <Grid className={classes.container} >
        <Box2 className="ColorBox-Box2"/>
        <Button className={classes.box} onClick={removeThisBox}>X</Button>
      </Grid>
    </div>
    
  );
}

export default ColorBox;