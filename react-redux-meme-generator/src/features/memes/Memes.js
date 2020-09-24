import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectMemes,
} from './memesSlice';
import NewMemeForm from './NewMemeForm';
import EditMemeForm from './EditMemeForm';
import MemeItem from './MemeItem';
import { makeStyles } from '@material-ui/core/styles';
// import styles from './Counter.module.css';
// import { useUserInfo } from '../../hooks/useUserInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    
  },

  display: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '30px',
    [theme.breakpoints.down('xs')]: {
      width: '70%'
    },
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
}));

export function Memes() {
  const classes = useStyles();
  let memes = useSelector(selectMemes);
  // const { userInfo } = useUserInfo();
  // useEffect(() => {
  //   console.log('memes',memes)
  //   console.log('userInfo',userInfo)
  //   memes = [...memes, ...Object.values(userInfo)];
  //   console.log('memes',memes)
  // })
  
  // const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');
  console.log('Memes memes',memes.data)
  return (
    <div className={classes.root}>
      <NewMemeForm />
      <div className={classes.display}> 
        {memes.editData.id ? <EditMemeForm /> :       
        memes.data.length && memes.data.map(meme => (
          <MemeItem key={meme.id} id={meme.id} />
        ))}
      </div>      
    </div>
  );
}
