import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './audio.js';
import './wave.js';
function App() {
  return (
    <div className="App">
    <svg preserveAspectRatio="none" id="visualizer" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <mask id="mask">
          <g id="maskGroup" />
        </mask>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: '#db6247', stopOpacity: 1}} />
          <stop offset="40%" style={{stopColor: '#f6e5d1', stopOpacity: 1}} />
          <stop offset="60%" style={{stopColor: '#5c79c7', stopOpacity: 1}} />
          <stop offset="85%" style={{stopColor: '#b758c0', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#222', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width="100%" height="100%" fill="url(#gradient)" mask="url(#mask)" />
    </svg>
    <h1 className="main-text">Please allow the use of your microphone.</h1>
    <h1 className="sub-text" />
    <div className="button-container"><button id="button" className="green-button btn-circle btn-sm btn-xl btn-md" ><span className="fa fa-play" /></button>
    <br></br>
    <p><audio id="audio2" controls></audio></p>
    
    </div>
    
  </div>
  
);

  
}
export default App;

