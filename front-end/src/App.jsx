import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";
import Room from "./components/Room/Room";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/room/:roomName" element={<Room />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
