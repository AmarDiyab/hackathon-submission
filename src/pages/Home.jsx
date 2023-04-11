import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import handholdingbulb from "../assets/Handholdingbulb3D.png";
import Searchbar from "../components/Home/Searchbar/Searchbar";
import DropdownComponent from "../components/Home/DropdownComponent/DropdownComponent";
import HackathonList from "../components/Home/HackathonListing/HackathonList";
import sortItems from "../helpers/sortitem";
import "../styles/Home.css";

function Home() {
  const [tabState, setTabState] = useState("all");
  const [sortState, setSortState] = useState("Newest");
  const [hackathons, setHackathons] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const getHackathons = () => {
    let items = JSON.parse(localStorage.getItem("hackathonList"));
    if (items === null) {
      console.error("hackathon list not found");
      navigate("/");
    } else {
      if (tabState === "fav") {
        items = items.filter((item) => item.favourite);
      }
      if (searchText !== "") {
        items = items.filter((item) =>
          item.hackathonTitle.toLowerCase().includes(searchText) ? true : false
        );
      }
      const sortedHackathons = sortItems(items, "Newest");
      setHackathons([...sortedHackathons]);
    }
  };

  useEffect(() => {
    getHackathons();
    // eslint-disable-next-line
  }, [searchText, tabState]);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-container">
          <div className="hero-txt">
            <div>
              <h1>Hackathon Submissions</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur. Urna cursus amet
                pellentesque in parturient purus feugiat faucibus. Congue
                laoreet duis porta turpis eget suspendisse ac pharetra amet. Vel
                nisl tempus nec vitae.
              </p>
            </div>
            <Button
              variant="success"
              onClick={() => {
                navigate("/uploadhackathon");
              }}
            >
              Upload Submission
            </Button>
          </div>
          <img src={handholdingbulb} alt="" className="hero-img" />
        </div>
      </div>

      <div className="tabs-section m-auto d-flex justify-content-between">
        <div className="tabs d-flex align-items-center">
          <div
            className={`tab-item d-inline ${
              tabState === "all" ? "active" : ""
            }`}
            onClick={() => {
              getHackathons();
              setTabState("all");
            }}
          >
            All Submissions
          </div>
          <div
            className={`tab-item d-inline ${
              tabState === "fav" ? "active" : ""
            }`}
            onClick={() => {
              setTabState("fav");
            }}
          >
            Favourite Submissions
          </div>
        </div>
        <div
          className="d-flex align-items-center justify-content-between gap-4"
          style={{ maxWidth: "464px", height: "40px" }}
        >
          <Searchbar searchText={searchText} setSearchText={setSearchText} />
          <DropdownComponent
            sortState={sortState}
            setSortState={setSortState}
            setHackathons={setHackathons}
            hackathons={hackathons}
            sortItems={sortItems}
          />
        </div>
      </div>

      <div className="hackathonlist-section m-auto flex-col">
        <HackathonList hackathons={hackathons} />
      </div>
    </div>
  );
}

export default Home;
