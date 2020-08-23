import React from 'react';
// import ImgMediaCard from './ImgMediaCard';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '25px'
  },
  imageGallery: {
    display: 'flex',
    justifyContent: 'center',
    width: '90%x',
    margin: '2px',
    border: '1px solid #ffcdd2',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '90%x',
    margin: '10px',
    border: '1px solid lightgray',
    borderRadius: '15px'
  },
  image: {
    width: '300px',
    margin: '2px',
    borderRadius: '15px'
  },
  button: {
    width: '150px',
    margin: '2px'
  }
}));

function DogList({props, clickHandler}) {
  const history = useHistory();
  const redirect = (name) => {
    history.push(`/dogs/${name}`);
    clickHandler(name);
  }
  const classes = useStyles(); 
  const dogs = JSON.parse(props).dogs
  return (
    <div className={classes.root}>
      <div className={classes.imageGallery}>
      {dogs.map(e => (        
        <div key={uuid()} className={classes.card} onClick={() => redirect(e.name) }>
          <h3>Name: {e.name}</h3>
          <img src={e.src} alt={e.name} className={classes.image}></img>
        </div>
      ))}
      </div>
    </div>
  );
}

export default DogList;

