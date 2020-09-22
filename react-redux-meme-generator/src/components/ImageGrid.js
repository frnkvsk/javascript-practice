import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

// import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';
import { useFormInput } from '../hooks/useFormInput';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   position: 'relative',
  //   width: '400px',
  //   margin: '30px',
  //   cursor: 'pointer',
  //   border: '1px solid red',
  // },
  // image: {
  //   width: '100%',
  //   // height: '100%',
  //   zIndex: 0,
  // },
  // labelTop: {
  //   position: 'relative',
  //   width: '100%',
  //   top: '60px',
  //   fontSize: '26px',
  //   textAlign: 'center',
  //   color: 'white',
  //   zIndex: 1,
  // },
  // labelBottom: {
  //   position: 'relative',
  //   width: '100%',
  //   bottom: '60px',
  //   fontSize: '26px',
  //   textAlign: 'center',
  //   color: 'white',
  //   zIndex: 1,
  // },
  // form: {
  //   position: 'relative',
  //   width: '100%',
  //   // top: '-340px',
  //   transform: 'translate(0%, -150%)',
  //   backgroundColor: '#f3e5f594',
  //   fontSize: '26px',
  //   textAlign: 'center',
  //   color: 'white',
  //   padding: '15px 0',
  //   zIndex: 1,
  //   // border: '1px solid red',

  // },
  // formElements: {
  //   width: '300px',
  //   marginBottom: '8px',
  //   fontSize: '16px',
  //   textAlign: 'center',
  //   color: 'white',
  //   zIndex: 1,
  // },
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
    zIndex: 1,
  },
  labelBottom: {
    position: 'relative',
    width: '100%',
    bottom: '60px',
    fontSize: '26px',
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
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
    zIndex: 2,
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

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

/**
 TODO:
  delete functionality
  update functionality
  
 */
export default function ImageGrid({img}) {
  const classes = useStyles();
  const [top, setTop] = useState(img.top);
  const [bottom, setBottom] = useState(img.bottom);
  const [hideForm, setHideForm] = useState({'display':'none'});
  // const image = useFormInput('');
  const topLabel = useFormInput('');
  const bottomLabel = useFormInput('');  
  // const MemeImage = () => {
  //   return (
  //     <div>
  //       <img className={classes.image} src={img.img} alt={top} />
  //     </div>
      
  //   )
  // }
  // let mi = MemeImage()
  // console.log('memeimage',mi)
  // const [modalStyle] = React.useState(getModalStyle);
  // const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    // console.log('handleOpen',e.pageX, e.pageY, e.screenX, e.screenY)
    setTop('bottom')
    setBottom('top')
    if(hideForm.display === 'none') {
      setHideForm({display: 'box'});
    } else {
      setHideForm({display: 'none'});
    }
    
  };
  const handleSubmit = () => {

  }

  return (    
    <Box key={uuid()} className={classes.root} onClick={handleOpen}>
      <div className={classes.labelTop}>
        <label>{top}</label>
      </div>
      <img className={classes.image} src={img.img} alt={top} />
      <div className={classes.labelBottom}>
        <label>{bottom}</label>
      </div> 
      <form className={classes.form} onSubmit={handleSubmit} style={hideForm}>
        <TextField 
          className={classes.formElements} 
          label="Top Label" 
          variant="outlined" 
          value={topLabel.value} 
          onChange={topLabel.onChange} />
        <TextField 
          className={classes.formElements} 
          label="Bottom Label" 
          variant="outlined" 
          value={bottomLabel.value} 
          onChange={bottomLabel.onChange} />
        <Button className={classes.formElements} type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button className={classes.formElements} type="submit" variant="contained" color="primary">
          Quit
        </Button>
        <Button className={classes.formElements} type="submit" variant="contained" color="primary">
          Delete Meme
        </Button>
      </form>
      
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField 
            className={classes.formElements} 
            label="URL" 
            variant="outlined" 
            value={image.value} 
            onChange={image.onChange} />
          <TextField 
            className={classes.formElements} 
            label="Top Label" 
            variant="outlined" 
            value={topLabel.value} 
            onChange={topLabel.onChange} />
          <TextField 
            className={classes.formElements} 
            label="Bottom Label" 
            variant="outlined" 
            value={bottomLabel.value} 
            onChange={bottomLabel.onChange} />
          
          <Button className={classes.formElements} type="submit" variant="contained" color="primary">
            Create Meme
          </Button>
        </form>
      </Modal>    */}
    </Box>
  );
}
