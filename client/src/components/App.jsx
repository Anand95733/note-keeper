import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import EditInput from "./editInput";
import CreateArea from "./CreateArea";

function App() {
  const [getNotes, setGetNotes] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/getNotes").then((res) => {
      setGetNotes(res.data);
    });
  }, [deleteNote, updateNote]);

  function addNote(newNote) {
    console.log("titile: " + newNote.title);
    console.log("content: " + newNote.content);

    Axios.post("http://localhost:4000/addNote", {
      title: newNote.title,
      content: newNote.content,
    })
      .then((response) => {
        console.log("User Created");
        setGetNotes([
          ...getNotes,
          {
            title: newNote.title,
            content: newNote.content,
          },
        ]);
      })
      .catch(() => {
        console.log("error Saving!!");
      });
  }

  function deleteNote(id) {
    console.log("deletefunction id: " + id);
    Axios.delete("http://localhost:4000/deleteNote", {
      headers: {
        Authorization: "authorizationToken",
      },
      data: {
        _id: id,
      },
    })
      .then((res) => {
        console.log("Note Deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateNote(id) {
    console.log("update id: " + id);
    Axios.put("http://localhost:4000/updateNote", {
      _id: id,
      title: "lorem ipsum",
      content: "lorem ipsum",
    })
      .then(() => {
        console.log("updated note!!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Header />

      <CreateArea onAdd={addNote} />
      {getNotes.map((notes) => {
        return (
          <Note
            key={notes._id}
            id={notes._id}
            title={notes.title}
            content={notes.content}
            onDelete={deleteNote}
            onEdit={updateNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
