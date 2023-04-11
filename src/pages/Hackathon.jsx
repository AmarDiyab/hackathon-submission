import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import Button from "react-bootstrap/Button";
import DeleteModal from "../components/Hackathon/DeleteModel/DeleteModel";
import dataURItoBlob from "../helpers/dataURItoBlob";
import "../styles/Hackathon.css";

const defaultState = {
  id: "",
  favourite: false,
  hackathonTitle: "",
  hackathonSummary: "",
  hackathonDescription: "",
  hackathonIcon: "",
  hackathonName: "",
  hackathonStartDate: "",
  hackathonEndDate: "",
  hackathonGithubRepo: "",
  hackathonOtherLinks: "",
};

function Hackathon() {
  const { hackathonid } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState(defaultState);
  const imgRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("hackathonList"));
    if (item === null) {
      console.error("hackathon list not found");
      navigate("/");
    } else {
      item = item.filter((item) => item.id === hackathonid);

      let hackathon;
      hackathon = item[0];
      if (hackathon === undefined) {
        console.error("Hackthon not Found");
        navigate("/");
      }

      setState({ ...hackathon });
    }
    // eslint-disable-next-line
  }, []);

  const URLcreator = window.URL || window.webkitURL;

  const toggleFavourite = () => {
    let item = JSON.parse(localStorage.getItem("hackathonList"));
    item = item.map((item) =>
      item.id === hackathonid ? { ...state, favourite: !state.favourite } : item
    );
    localStorage.setItem("hackathonList", JSON.stringify([...item]));
    setState({ ...state, favourite: !state.favourite });
  };

  return (
    <div className="hackathon">
      <div className="hero">
        <div className="hero-container">
          <div className="title">
            <img
              src={
                state.hackathonIcon === ""
                  ? ""
                  : URLcreator.createObjectURL(
                      dataURItoBlob(state.hackathonIcon)
                    )
              }
              alt=""
              className="hero-img"
              ref={imgRef}
            />
            <h1>{state.hackathonTitle}</h1>
            <div className="title-btns">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  navigate(`/edithackathon/${hackathonid}`);
                }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 15.4601V18.5001C0 18.7801 0.22 19.0001 0.5 19.0001H3.54C3.67 19.0001 3.8 18.9501 3.89 18.8501L14.81 7.94006L11.06 4.19006L0.15 15.1001C0.0500001 15.2001 0 15.3201 0 15.4601ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z"
                    fill="white"
                  />
                </svg>
                Edit
              </Button>
              <Button
                variant="outline-danger"
                className="dlt"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                <svg
                  width="14"
                  height="18"
                  viewBox="0 0 14 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V6C13 4.9 12.1 4 11 4H3C1.9 4 1 4.9 1 6V16ZM13 1H10.5L9.79 0.29C9.61 0.11 9.35 0 9.09 0H4.91C4.65 0 4.39 0.11 4.21 0.29L3.5 1H1C0.45 1 0 1.45 0 2C0 2.55 0.45 3 1 3H13C13.55 3 14 2.55 14 2C14 1.45 13.55 1 13 1Z"
                    fill="white"
                  />
                </svg>
                Delete
              </Button>
            </div>
          </div>
          <div className="sub-title">{state.hackathonSummary}</div>
          <div className="hero-btns">
            {state.favourite ? (
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="favourite-btn"
                onClick={() => {
                  toggleFavourite();
                }}
              >
                <path
                  d="M8.99995 14.0198L13.15 16.5298C13.91 16.9898 14.84 16.3098 14.64 15.4498L13.54 10.7298L17.21 7.54977C17.88 6.96977 17.5199 5.86977 16.6399 5.79977L11.81 5.38977L9.91995 0.929766C9.57995 0.119766 8.41995 0.119766 8.07995 0.929766L6.18995 5.37977L1.35995 5.78977C0.479951 5.85977 0.119951 6.95977 0.789951 7.53977L4.45995 10.7198L3.35995 15.4398C3.15995 16.2998 4.08995 16.9798 4.84995 16.5198L8.99995 14.0198Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="favourite-btn"
                onClick={() => {
                  toggleFavourite();
                }}
              >
                <path
                  d="M16.6501 5.54L11.8101 5.12L9.92007 0.67C9.58007 -0.14 8.42007 -0.14 8.08007 0.67L6.19007 5.13L1.36007 5.54C0.480073 5.61 0.120073 6.71 0.790073 7.29L4.46007 10.47L3.36007 15.19C3.16007 16.05 4.09007 16.73 4.85007 16.27L9.00007 13.77L13.1501 16.28C13.9101 16.74 14.8401 16.06 14.6401 15.2L13.5401 10.47L17.2101 7.29C17.8801 6.71 17.5301 5.61 16.6501 5.54ZM9.00007 11.9L5.24007 14.17L6.24007 9.89L2.92007 7.01L7.30007 6.63L9.00007 2.6L10.7101 6.64L15.0901 7.02L11.7701 9.9L12.7701 14.18L9.00007 11.9Z"
                  fill="white"
                />
              </svg>
            )}

            <svg
              width="1"
              height="29"
              viewBox="0 0 1 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                opacity="0.9"
                x1="0.5"
                y1="2.18557e-08"
                x2="0.499999"
                y2="29"
                stroke="#F5F5F5"
              />
            </svg>
            <Button
              variant="outline-secondary"
              className="date rounded-pill pe-none"
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3333 1.49984H11.6666V0.833171C11.6666 0.466504 11.3666 0.166504 10.9999 0.166504C10.6333 0.166504 10.3333 0.466504 10.3333 0.833171V1.49984H3.66659V0.833171C3.66659 0.466504 3.36659 0.166504 2.99992 0.166504C2.63325 0.166504 2.33325 0.466504 2.33325 0.833171V1.49984H1.66659C0.933252 1.49984 0.333252 2.09984 0.333252 2.83317V13.4998C0.333252 14.2332 0.933252 14.8332 1.66659 14.8332H12.3333C13.0666 14.8332 13.6666 14.2332 13.6666 13.4998V2.83317C13.6666 2.09984 13.0666 1.49984 12.3333 1.49984ZM11.6666 13.4998H2.33325C1.96659 13.4998 1.66659 13.1998 1.66659 12.8332V4.83317H12.3333V12.8332C12.3333 13.1998 12.0333 13.4998 11.6666 13.4998Z"
                  fill="#F5F5F5"
                />
              </svg>
              {moment(state.uploadDate).format("DD MMM")}
            </Button>
          </div>
        </div>
      </div>
      <div className="hackathon-details">
        <div className="hackathon-desc">
          <h4>Description</h4>
          <p>{state.hackathonDescription}</p>
        </div>
        <div className="details">
          <div className="details-txt">
            <h4 className="text-muted">Hackathon</h4>
            <h2>{state.hackathonName}</h2>
            <p className="dates">
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2.25H13.25V1.5C13.25 1.0875 12.9125 0.75 12.5 0.75C12.0875 0.75 11.75 1.0875 11.75 1.5V2.25H4.25V1.5C4.25 1.0875 3.9125 0.75 3.5 0.75C3.0875 0.75 2.75 1.0875 2.75 1.5V2.25H2C1.175 2.25 0.5 2.925 0.5 3.75V15.75C0.5 16.575 1.175 17.25 2 17.25H14C14.825 17.25 15.5 16.575 15.5 15.75V3.75C15.5 2.925 14.825 2.25 14 2.25ZM13.25 15.75H2.75C2.3375 15.75 2 15.4125 2 15V6H14V15C14 15.4125 13.6625 15.75 13.25 15.75Z"
                  fill="#858585"
                />
              </svg>
              {moment(state.hackathonStartDate).format("DD-MMM-YYYY")} -
              {moment(state.hackathonEndDate).format("DD-MMM-YYYY")}
            </p>
          </div>

          <div className="buttons">
            <Button
              variant="outline-secondary"
              href={`${state.hackathonGithubRepo}`}
              target="_blank"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19C7.5 18.77 7.5 18.14 7.5 17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26C12.5 17.6 12.5 18.68 12.5 19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
                  fill="#666666"
                />
              </svg>
              GitHub Repository
            </Button>
            <Button
              variant="outline-secondary"
              href={`${state.hackathonOtherLinks}`}
              target="_blank"
            >
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 16H3.5C2.95 16 2.5 15.55 2.5 15V3C2.5 2.45 2.95 2 3.5 2H8.5C9.05 2 9.5 1.55 9.5 1C9.5 0.45 9.05 0 8.5 0H2.5C1.39 0 0.5 0.9 0.5 2V16C0.5 17.1 1.4 18 2.5 18H16.5C17.6 18 18.5 17.1 18.5 16V10C18.5 9.45 18.05 9 17.5 9C16.95 9 16.5 9.45 16.5 10V15C16.5 15.55 16.05 16 15.5 16ZM11.5 1C11.5 1.55 11.95 2 12.5 2H15.09L5.96 11.13C5.57 11.52 5.57 12.15 5.96 12.54C6.35 12.93 6.98 12.93 7.37 12.54L16.5 3.41V6C16.5 6.55 16.95 7 17.5 7C18.05 7 18.5 6.55 18.5 6V1C18.5 0.45 18.05 0 17.5 0H12.5C11.95 0 11.5 0.45 11.5 1Z"
                  fill="#666666"
                />
              </svg>
              Other Link
            </Button>
          </div>
        </div>
      </div>
      <DeleteModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Hackathon;
