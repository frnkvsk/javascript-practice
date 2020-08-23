import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    background: '#ffcdd2',
    color: 'white',
    fontSize: '32px',
  }
}));

function NavBar() {
  const classes = useStyles();
  return (
    <>      
      <NavLink className={classes.root} exact to="/">
        Dog Home
      </NavLink>
    </>
  );
}

export default NavBar;