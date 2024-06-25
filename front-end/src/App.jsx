import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import Main from "./pages/Main";
import Room from "./pages/Room";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/" element={<Main />} />
        <Route path="/room/:roomName" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
