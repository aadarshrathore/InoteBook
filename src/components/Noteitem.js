import React, { useContext } from "react";
import AuthContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const context = useContext(AuthContext);
  const { deleteNote } = context;
  const { notes, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text"> {notes.description}</p>
          <p className="card-text"> {notes.tag}</p>

          <div className="d-flex justify-content-between">
            <i
              className="fa-solid fa-pen-to-square fa-lg"
              onClick={() => {
                updateNote(notes);
             
              }}
            ></i>
            <i
              className="fa-solid fa-trash fa-lg"
              style={{ color: "#c81c09" }}
              onClick={() => {
                deleteNote(notes._id);
                props.showAlert(" Deleted successfully", "success");
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
