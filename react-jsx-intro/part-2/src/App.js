import React from 'react';
import Tweet from './Tweet'

function App() {
  return (
    <div>
      <Tweet
        name="Harry Henderson"
        username="harryH"
        date={new Date().toDateString()}
        message="I am hairy"
      />
      <Tweet
        name="Mary Mary"
        username="marymary"
        date={new Date().toDateString()}
        message="very merry"
      />
      <Tweet
        name="Anderson Cooper"
        username="andyC"
        date={new Date().toDateString()}
        message="Stay tuned"
      />
    </div>
  );
}

export default App;
