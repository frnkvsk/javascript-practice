import { createSlice } from '@reduxjs/toolkit';

const getData = () => {
  let data = JSON.parse(localStorage.getItem("userInfo"));
  return data ? Object.values(data) : [];
}

export const memesSlice = createSlice({
  name: 'memes',
  initialState: {
    data: getData(),
    editData: {},
  },
  reducers: {
    createMeme: (state, action) => {
      state.data.push({
        id: action.payload.id,
        img: action.payload.img,
        top: action.payload.top,
        bottom: action.payload.bottom,
        textColor: action.payload.textColor,
      });
    },
    editMeme: (state, action) => {
      state.data = state.data.map(e => (
        e.id === action.payload.id ? {
          ...e,
          top: action.payload.top,
          bottom: action.payload.bottom,
          textColor: action.payload.textColor,
        } : e
      ));
      state.editData = {};
    },
    removeMeme: (state, action) => {
      state.data = state.data.filter(e => e.id !== action.payload.id); 
      state.editData = {};
    },
    persistDataToLocalStorage: (state) => {
      localStorage.setItem("userInfo", JSON.stringify(state.data) || "");
    },
    setEditMemeData: (state, action) => {
      if(action.payload.id) {
        state.editData.id = action.payload.id;
        state.editData.img = action.payload.img;
        state.editData.top = action.payload.top;
        state.editData.bottom = action.payload.bottom;
        state.editData.textColor = action.payload.textColor;
      } else {
        state.editData = {};
      }
    },
  },
});

export const { 
  createMeme, 
  editMeme, 
  removeMeme, 
  persistDataToLocalStorage, 
  setEditMemeData } = memesSlice.actions;

export const selectMemes = state => state.memes;

export default memesSlice.reducer;
