import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io('http://localhost:5000');

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }, []);
  
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
