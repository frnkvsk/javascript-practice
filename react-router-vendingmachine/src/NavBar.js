import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({  
  link: {
    color: 'white',
    fontSize: '32px',
    margin: '0 50px 0 50px',
  }
}));

function NavBar() {
  const classes = useStyles();
  return (
    <>      
      <NavLink className={classes.link} exact to="/">
        Home
      </NavLink>
      <NavLink className={classes.link} exact to="/sevenup">
        SevenUp
      </NavLink>
      <NavLink className={classes.link} exact to="/sprite">
        Sprite
      </NavLink>
      <NavLink className={classes.link} exact to="/fanta">
        Fanta
      </NavLink>
    </>
  );
}

export default NavBar;