import React from 'react';
import Timer2 from "./Timer2"
import TimerWrapper from "./TimerWrapper"
import Video from "./Video"
import Focuser from "./Focuser"
import Counter from "./Counter";
import ProfileViewer from "./ProfileViewer";
import ProfileViewerWithSearch from './ProfileViewerWithSearch'
import './App.css';

function App() {
  return (
    <div className="App">
      <Video />
      <Focuser />
      {/* {/* <Counter /> */}
      <ProfileViewer name="Colt" color="teal" />
      <ProfileViewer name="Matt" color="orange" />
      <ProfileViewerWithSearch />
      <TimerWrapper />
      <Timer2 />

    </div>
  );
}

export default App;
