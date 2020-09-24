import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMemes,
  setEditMemeData,
} from './memesSlice';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

// import Modal from '@material-ui/core/Modal';
// import { Button, TextField } from '@material-ui/core';
import { useFormInput } from '../../hooks/useFormInput';

const useStyles = makeStyles((theme) => ({
  
  root: {
    position: 'relative',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '400px',
    margin: '0 20px',
    cursor: 'pointer',
    padding: '0',
    zIndex: 0,
    // border: '1px solid red',
  },
  image: {
    width: '100%',
    // height: '100%',
    zIndex: 0,
  },
  labelTop: {
    position: 'relative',
    width: '100%',
    top: '60px',
    fontSize: '26px',
    textAlign: 'center',
    color: 'white',
    // zIndex: 1,
  },
  labelBottom: {
    position: 'relative',
    width: '100%',
    bottom: '60px',
    fontSize: '26px',
    textAlign: 'center',
    color: 'white',
    // zIndex: 1,
  },
  form: {
    position: 'relative',
    width: '100%',
    heigth: '0',
    // top: '0px',
    transform: 'translate(0px, -310px)',
    backgroundColor: '#f3e5f5e8',
    fontSize: '26px',
    textAlign: 'center',
    color: 'white',
    padding: '15px 0',
    zIndex: 1,
    // border: '1px solid red',

  },
  formElements: {
    width: '300px',
    marginBottom: '8px',
    // fontSize: '16px',
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
  },
}));

export default function ImageGrid({id}) {
  let meme = {id:'', top: '', bottom: ''};
  const classes = useStyles();
  const memes = useSelector(selectMemes);
  if(memes.data && memes.data.find(e => e.id === id)) {
    meme = memes.data.find(e => e.id === id);
  }
  const dispatch = useDispatch();

  const top = useFormInput(meme.top);
  const bottom = useFormInput(meme.bottom);
  // const [hideForm, setHideForm] = useState({'display':'none'});
  // const image = useFormInput('');
  // const topLabel = useFormInput('');
  // const bottomLabel = useFormInput(''); 
  const handleOpen = (e) => {
    e.preventDefault();
    console.log('handleOpen')
    dispatch(setEditMemeData({
      id: meme.id,
      img: meme.img,
      top: top.value,
      bottom: bottom.value,
    }))
  };
  

  // const handleRemoveMeme = () => dispatch(removeMeme({
  //   id: meme.id,
  //   img: meme.img,
  //   top: top.value,
  //   bottom: bottom.value,  
  // }));
  
  return (  
    <div>
      <Box key={uuid()} className={classes.root} onClick={handleOpen}>
        <div className={classes.labelTop}>
          <label>{top.value}</label>
        </div>
        <img className={classes.image} src={meme.img} alt={top.value} />
        <div className={classes.labelBottom}>
          <label>{bottom.value}</label>
        </div>      
      </Box>

      {/* <form className={classes.form} style={hideForm}>
        <Input
          id="top-text"
          className={classes.formElements} 
          label="Top Label" 
          variant="outlined" 
          value={top.value} 
          onChange={top.onChange} 
          />
        <TextField 
          key="bottom-text"
          className={classes.formElements} 
          label="Bottom Label" 
          variant="outlined" 
          value={bottom.value} 
          onChange={bottom.onChange} 
          />
        <Button 
          className={classes.formElements} 
          variant="contained" 
          color="primary" 
          onClick={async () => {
            dispatch(await editMeme({
              id: meme.id,
              img: meme.img,
              top: top.value,
              bottom: bottom.value,  
            })); 
            dispatch(persistDataToLocalStorage());
            setHideForm({display: 'none'});
          }}
        >
          Edit Meme
        </Button>
        <Button 
          className={classes.formElements} 
          type="submit" 
          variant="contained" 
          color="primary"
          onClick={handleQuitMeme}
          >
          Quit
        </Button>
        <Button 
          className={classes.formElements} 
          type="submit" 
          variant="contained" 
          color="primary"
          onClick={handleRemoveMeme}>
          Delete Meme
        </Button>
      </form> */}
    </div>  
    
  );
}
