import React, { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 1000)

    return () => {
      console.log("CLEANUP FUNCTION!!")
      console.log(intervalId)
      clearInterval(intervalId)
    }
  }, [])


  return <h1>{seconds}</h1>
}

export default Timer;