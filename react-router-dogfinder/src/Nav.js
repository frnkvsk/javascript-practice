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
  },
  link: {
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

function NavBar({props}) {
  console.log(props)
  const classes = useStyles();
  return (
    <div className={classes.root}>  
      <NavLink className={classes.link} exact to="/">
        Dog Home
      </NavLink>
      {props.dogs.map(e => (
        <NavLink className={classes.link} exact to={`/dogs/${e.name}`}>
          {e.name}
        </NavLink>
      ))}    
      
    </div>
  );
}

export default NavBar;