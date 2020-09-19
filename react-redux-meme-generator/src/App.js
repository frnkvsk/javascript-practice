import React, { useEffect } from 'react';
import MemeGridList from './components/MemeGridList';
import NewMemeForm from './components/NewMemeForm';
import { useDispatch } from 'react-redux';
import { useUserInfo } from './hooks/useUserInfo';

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useUserInfo();
  console.log('userInfo',userInfo)
  useEffect(() =>{
    for(let key of Object.keys(userInfo)) {
      dispatch({
        type: 'GET_MEMES',
        payload: {
          id: key,
          img: userInfo[key]['img'],
          top: userInfo[key]['top'],
          bottom: userInfo[key]['bottom'],
        },
      });
    }
  });

  return (
    <>
      <NewMemeForm />
      <MemeGridList />
    </>
  );
}

export default App;
