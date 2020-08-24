import {useState, useEffect} from "react";

const useLocalStorage = (key, props) => {
  let ls = JSON.parse(localStorage.getItem(key)) || [];
  for(let e of props.colors) {
    if(!ls.some(f => f.name === e.name))
      ls.push(e);
  }
  const [state, setState] = useState(ls.slice());
  useEffect(() => {    
    localStorage.setItem(key, JSON.stringify(state) || "");
  }, [state, key]);
  return [state, setState];
}
export default useLocalStorage;
