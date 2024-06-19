import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Lobby from "./components/Lobby/Lobby";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Lobby />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
