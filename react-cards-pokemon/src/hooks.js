import {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

const useFlip = (initialState=true) => {
  const [state, setState] = useState(initialState);
  const toggle = () => {
    setState(e => !e);
  }
  return [state, toggle];
}

const useAxios = (key,url,func) => {
  const [defaultState, setDefaultState] = useLocalStorage(key);
  const [state, setState] = useState(defaultState);
  const getData = async (name="") => {
    try {
      const src = name.length ? `${url}${name}` : url;
      const res = await axios({method:"get", url: src});
      const newData = func(res.data)
      newData.id = uuid();
      setState(state => [...state, newData ]);
      setDefaultState(state => [...state, newData ]);
    } catch (error) {
      console.error(error);
    }
  }
  const removeData = () => {
    setState([]);
    setDefaultState([]);
  }
  return [state, getData, removeData];
}

const useLocalStorage = (key) => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(key)) || []
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state) || "");
  }, [state, key]);

  return [state, setState];
}
export {useFlip, useAxios, useLocalStorage};
