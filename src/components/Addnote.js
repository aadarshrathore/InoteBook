import React,{useContext, useState} from 'react'
import AuthContext from "../context/notes/noteContext";

const Addnote = (props) => {
    const context = useContext(AuthContext);
    const {addNotes} = context;

    const [notes,setNotes] = useState({title:" ",description:" ",tag:""})
    const handlClick = (e)=>{
        e.preventDefault();
        addNotes(notes.title,notes.description,notes.tag);
        setNotes({title:"",description:"",tag:""})
        props.showAlert(" Added successfully", "success");
    }
    const OnChange = (e)=>{
        setNotes({...notes,[e.target.name]: e.target.value,})
    }
  return (
    <div>
        <div className="container my-3">
        <h1>Add the Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input value={notes.title}
              type="text"
              className="form-control"
              id="title" name='title'
              aria-describedby="emailHelp"
              onChange={OnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input value={notes.description}
              type="text"
              className="form-control"
              id="description"
              name='description'
              onChange={OnChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input value={notes.tag}
              type="text"
              className="form-control"
              id="tag"
              name='tag'
              onChange={OnChange} 
            />
          </div>

         
          <button disabled={notes.title.length<5 || notes.description.length<5} type="submit" className="btn btn-outline-success" onClick={handlClick}>Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addnote
