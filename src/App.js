import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/commons/Navbar/Navbar";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Hackathon from "./pages/Hackathon";
import UploadHackathon from "./pages/UploadHackathon";
import EditHackathon from "./pages/EditHackathon";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hackathons/:hackathonid" element={<Hackathon />} />
          <Route path="/uploadhackathon" element={<UploadHackathon />} />
          <Route
            path="/edithackathon/:hackathonid"
            element={<EditHackathon />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
