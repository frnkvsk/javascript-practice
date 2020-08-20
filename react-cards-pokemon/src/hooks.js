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

const useAxios = (url,func) => {
  const [state, setState] = useState([]);
  const getData = async (name="") => {
    try {
      const src = name.length ? `${url}${name}` : url;
      const res = await axios({method:"get", url: src});
      const newData = func(res.data)
      newData.id = uuid();
      setState(state => [...state, newData ] );
    } catch (error) {
      console.error(error);
    }
  }
  const removeData = () => {
    setState([]);
  }
  return [state, getData, removeData];
}

const useLocalStorage = (key) => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(key)) || {}
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state) || "");
  }, [state]);

  return [state, setState];
}
export {useFlip, useAxios, useLocalStorage};
