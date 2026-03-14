import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes=()=>{
    axios.get("http://localhost:3000/api/notes").then((res) => {
      console.log(res.data);
      setNotes(res.data.note);
    });
  }

  useEffect(() => {
   fetchNotes()
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault()

    const {title, description} = e.target.elements
    console.log(title.value,description.value)

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  const handleDeleteNote=(noteid)=>{
    axios.delete("http://localhost:3000/api/notes/"+noteid)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  return (
    <>
    <form className="note-create-form" onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Enter Title" />
      <input name="description" type="text" placeholder="Enter Decription" />
      <button>Create note</button>
    </form>

      <div className="notes">
        {notes.map((e, index) => {
          return (
            <div key={index} className="note">
              <h1>{e.title}</h1>
              <p>{e.description}</p>
              <button onClick={()=>{
                handleDeleteNote(e._id)
              }}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
