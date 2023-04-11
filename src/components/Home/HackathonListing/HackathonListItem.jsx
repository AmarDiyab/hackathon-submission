import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment/moment";
import dataURItoBlob from "../../../helpers/dataURItoBlob";
import "./HackathonListItem.css";

function HackathonListItem({ title, description, icon, uploadDate, id }) {
  const navigate = useNavigate();
  const URLcreator = window.URL || window.webkitURL;
  return (
    <Card
      className="hackathon-item"
      onClick={() => {
        navigate(`/hackathons/${id}`);
      }}
    >
      <Card.Body className="p-0 d-flex flex-column justify-content-between">
        <Row className="m-0 align-items-center">
          <Card.Img
            variant="top"
            src={
              icon === "" ? "" : URLcreator.createObjectURL(dataURItoBlob(icon))
            }
            className="p-0"
          />
          <Col className="p-0">
            <Card.Title>{title}</Card.Title>
          </Col>
        </Row>
        <Row className="m-0">
          <Col className="p-0">
            <Card.Text>{description}</Card.Text>
          </Col>
        </Row>
        <Row className="m-0">
          <Col
            className="p-0 text-muted justify-content-end text-end"
            style={{}}
          >
            uploaded {moment().diff(moment(uploadDate), "days")} days ago
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default HackathonListItem;
