import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./DeleteModel.css";

function DeleteModel(props) {
  const navigate = useNavigate();
  const { hackathonid } = useParams();

  const handleDelete = () => {
    let item = JSON.parse(localStorage.getItem("hackathonList"));
    console.log(item);
    item = item.filter((item) => item.id !== hackathonid);
    localStorage.setItem("hackathonList", JSON.stringify([...item]));
    navigate("/");
  };

  return (
    <Modal
      {...props}
      //   size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-body">
        <h4>Delete Model</h4>
        <p>
          This action is irreversible. Are you sure you want to delete this
          model?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModel;
