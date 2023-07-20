import { useState } from "react";
import AuthContext from "./noteContext";
const NoteBook = (props)=>{
  const host = "http://localhost:5000"
     const stateInitial = []
      const [notes,setNotes] = useState(stateInitial);
         // getNotes
         const getNotes = async ()=>{
          // Add API
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          const json = await response.json();
          console.log(json)
          setNotes(json)
         }
      // add note
       const addNotes = async (title,description,tag)=>{
        console.log('adding a note')
        // add API
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
         
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    

      

       }
      // delete note
      const deleteNote = async (id)=>{
             console.log("deleting" + id)
             //add Api
             const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
              method: "DELETE", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
             
            });
            const json =  await response.json();
            console.log(json)

             const newNote = notes.filter((notes)=>{ return notes._id!==id})
             setNotes(newNote);
      }
      // update note
     const editNote = async (id,title,description,tag)=>{

      // API CALL
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const json =  await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes))
      //logic to edit the data
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title =   title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          
        }

     }
     setNotes(newNotes);
    }
    return(
        <AuthContext.Provider value={{notes,addNotes,deleteNote,editNote,getNotes}}>
         {props.children}
        </AuthContext.Provider>
    )
}


export default NoteBook;