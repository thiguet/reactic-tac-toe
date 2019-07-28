import React from 'react';
import Game from './tutorial/game';
import "./bootstrap/bootstrap.min.css"

let App = () => {
  return (
    <>
      <div className="App container">
        <Game />
      </div>
      <footer style={{marginBottom: "60px"}}>
      </footer>
    </>
  );
}

export default App;
