import { createSlice } from '@reduxjs/toolkit';
// import { useUserInfo } from '../../hooks/useUserInfo';



export const memesSlice = createSlice({
  name: 'memes',
  initialState: {
    data: Object.values(JSON.parse(localStorage.getItem("userInfo"))) || [],
    editData: {},
  },
  reducers: {
    createMeme: (state, action) => {
      state.data.push({
        id: action.payload.id,
        img: action.payload.img,
        top: action.payload.top,
        bottom: action.payload.bottom,
      });
    },
    editMeme: (state, action) => {
      return state.data.map(e => (
        e.id === action.payload.id ? {
          id: e.id,
          img: e.img,
          top: action.payload.top,
          bottom: action.payload.bottom,
        } : e
      ));
    },
    removeMeme: (state, action) => {
      return state.data.filter(e => e.id !== action.payload.id);     
    },
    persistDataToLocalStorage: (state) => {
      console.log('memesSlice persistDataToLocalStorage state=',state)
      localStorage.setItem("userInfo", JSON.stringify(state.data) || "");
    },
    setEditMemeData: (state, action) => {
      console.log('memeSlice setEditMemeData action=',action)
      if(action.payload.id) {
        console.log('memeSlice setEditMemeData action=',action)
        state.editData.id = action.payload.id;
        state.editData.img = action.payload.img;
        state.editData.top = action.payload.top;
        state.editData.bottom = action.payload.bottom;
      } else {
        state.editData = {};
      }
    },
  },
});

export const { createMeme, editMeme, removeMeme, persistDataToLocalStorage, setEditMemeData } = memesSlice.actions;

export const selectMemes = state => state.memes;

export default memesSlice.reducer;
