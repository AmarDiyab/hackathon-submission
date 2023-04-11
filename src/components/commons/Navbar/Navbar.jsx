import { useNavigate } from "react-router-dom";
import logo from "../../../assets/AIPlanetLogo.png";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <div>
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
