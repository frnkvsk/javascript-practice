/**
 Todo- this component should display a div with the task of the todo.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // width: '100%',
    border: '1px solid #afc2cb'
  },
}));

function Todo({id, todoText, editTodo, hideTodo}) {
  const classes = useStyles();
  const editText = () => {
    editTodo(id)
  }
  const removeTodo = () => {
    hideTodo(id)
  }
  return (
    <ListItem id={id} className={classes.root}>
      <ListItemAvatar>
        <Avatar>
          <EventIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={todoText}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={editText}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={removeTodo}>
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
  // const useStyles = makeStyles((theme) => ({
  //   container: {
  //     display: 'grid',
  //     gridTemplateColumns: '6fr 1fr 1fr',
  //     gridTemplateRows: 'auto',
  //     gridTemplateAreas:
  //       'TextField Button Button',
  //     width: '90%'
  //   },
  //   box: {
  //     display: 'flex',
  //     justify: 'flex-start',
  //     alignItems: 'flex-start',
  //     textAlign: 'center',
  //     width: '0',
  //     height: '35px',
  //     color: red,
  //     marginLeft: '5px',
  //     border: '1px solid red',
  //   },
  //   text: {
  //     textAlign: 'left',
  //     wrap: 'wrap'
  //   },
  //   buttonEdit: {

  //   },
  //   buttonRemove: {

  //   }
  // }));
  
  // // const Box = styled(Box)({
  // //   backgroundColor: backgroundColor,
  // //   width: width + "px",
  // //   height: height + "px"
  // // });

  // const removeThisBox = () => {
  //   hideBox(id)
  // }

  // const classes = useStyles();

  // return (
  //   <div >
  //     <Grid className={classes.container} >
  //       <Box className="ColorBox-Box2"/>
  //       <Button className={classes.box} onClick={removeThisBox}>X</Button>
  //     </Grid>
  //   </div>
    
  // );
}

export default Todo;