import React from 'react';
import Person from './Person';

function App() {
  return (
    <>
    <Person 
      name="Alice"
      age={17}
      hobbies={["golf", "foozball", "painting"]}
    />    
    <Person 
      name="George"
      age={26}
      hobbies={["walking", "running", "jogging"]}
    />    
    <Person 
      name="Anderson"
      age={44}
      hobbies={["Cheeseburgers", "chess", "poker"]}
    />
    </>    
  );
}

export default App;
