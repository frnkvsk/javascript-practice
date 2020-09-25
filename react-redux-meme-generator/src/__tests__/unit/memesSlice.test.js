import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import { 
  selectMemes, 
  createMeme, 
  editMeme, 
  persistDataToLocalStorage, 
  removeMeme, 
  setEditMemeData } from '../../features/memes/memesSlice';

const testData1 = {
  id: 'testId',
  img: 'testImg',
  top: 'testTop',
  bottom: 'testBottom',
  textColor: 'testColor',
}
const testData2 = {
  id: 'testId',
  top: 'testTop2',
  bottom: 'testBottom2',
  textColor: 'testColor2',
}
const testData3 = {
  id: 'editId',
  top: 'editTop',
  bottom: 'editBottom',
  textColor: 'editColor',
}

const CreateMemeTestComponent = () => {
  const memes = useSelector(selectMemes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createMeme(testData1));
    dispatch(persistDataToLocalStorage());
    dispatch(setEditMemeData(testData3));
  }, [])
  
  return (
    <div>
      {memes.data.length ? 
        <div>
          <div>{memes.data[0].id}</div>
          <div>{memes.data[0].img}</div>
          <div>{memes.data[0].top}</div>
          <div>{memes.data[0].bottom}</div>
          <div>{memes.data[0].textColor}</div>
        </div> : ''}
      {memes.editData.hasOwnProperty('id') ? 
        <div>
          <div>{memes.editData.id}</div>
          <div>{memes.editData.top}</div>
          <div>{memes.editData.bottom}</div>
          <div>{memes.editData.textColor}</div>
        </div> : ''}
    </div>
  )
}

describe('createMeme', () => {
  it('should create a new meme', () => {
    render(
      <Provider store={store}>
        <CreateMemeTestComponent />
      </Provider>
    );
    
    expect(screen.getByText('testId')).toBeInTheDocument();
    expect(screen.getByText('testImg')).toBeInTheDocument();
    expect(screen.getByText('testTop')).toBeInTheDocument();
    expect(screen.getByText('testBottom')).toBeInTheDocument();
    expect(screen.getByText('testColor')).toBeInTheDocument();
  })
})


const EditMemeTestComponent = () => {
  const memes = useSelector(selectMemes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createMeme(testData1));
    dispatch(editMeme(testData2))
  }, [])
  
  return (
    <div>
      {memes.data.length ? 
        <div>
          <div>{memes.data[0].id}</div>
          <div>{memes.data[0].img}</div>
          <div>{memes.data[0].top}</div>
          <div>{memes.data[0].bottom}</div>
          <div>{memes.data[0].textColor}</div>
        </div> : '' }
    </div>
  )
}

describe('editMeme', () => {
  it('should create a new meme, then edit meme', () => {
    render(
      <Provider store={store}>
        <EditMemeTestComponent />
      </Provider>
    );
    
    expect(screen.getByText('testTop2')).toBeInTheDocument();
    expect(screen.getByText('testBottom2')).toBeInTheDocument();
    expect(screen.getByText('testColor2')).toBeInTheDocument();
  })
})


const RemoveMemeTestComponent = () => {
  const memes = useSelector(selectMemes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createMeme(testData1));
    dispatch(removeMeme({id: testData1.id}))
  }, [])
  
  return (
    <div>
      <div>{'memes.data.length = '+memes.data.length}</div>      
    </div>
  )
}

describe('removeMeme', () => {
  it('should create a new meme, then remove meme', () => {
    render( 
      <Provider store={store}>
        <RemoveMemeTestComponent />
      </Provider>
    );

    expect(screen.getByText('memes.data.length = 0')).toBeInTheDocument();
  })
})

describe('persistDataToLocalStorage', () => {
  it('should persistDataToLocalStorage', async () => {
    render(
      <Provider store={store}>
        <CreateMemeTestComponent />
      </Provider>
    );
    const ls = JSON.parse(window.localStorage.getItem('userInfo'));
    expect(ls.length).toEqual(1);
    expect(ls[0].id).toEqual('testId')
  })
})

describe('setEditMemeData', () => {
  it('should setEditMemeData', async () => {
    render(
      <Provider store={store}>
        <CreateMemeTestComponent />
      </Provider>
    );
    expect(screen.getByText('editId')).toBeInTheDocument();
    expect(screen.getByText('editTop')).toBeInTheDocument();
    expect(screen.getByText('editBottom')).toBeInTheDocument();
    expect(screen.getByText('editColor')).toBeInTheDocument();
  })
})