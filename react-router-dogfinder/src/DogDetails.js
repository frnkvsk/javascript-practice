import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '25px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    margin: '25px',
  }
}));

function DogDetails({props}) {
  const history = useHistory();
  const redirect = () => {
    history.push("/");
  }
  const dog = props;
  const classes = useStyles(); 
  
  return (
    <div className={classes.root} >
    <Card className={classes.card} >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={dog.name}
          height="500px"
          image={dog.src}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Name: {dog.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Age: {dog.age}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
          {dog.facts.map(e => <p key={uuid()}>{e}</p>)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={redirect}>
          Back
        </Button>
      </CardActions>
    </Card>
    </div>    
  );  
}

export default DogDetails;
