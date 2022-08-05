/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Button from "@mui/material/Button";

function App() {
  const [getNotes, setGetNotes] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [titlee, setTitlee] = useState("");
  const [contentt, setContentt] = useState("");
  const [idValue, setIdValue] = useState("");

  function handleTitle(props) {
    const propTitle = props.target.value;
    setTitlee(propTitle);
  }

  function handleContent(props) {
    const propContent = props.target.value;
    setContentt(propContent);
  }

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
    setOnEdit(false);
  }

  function updateNote() {
    Axios.put("http://localhost:4000/updateNote", {
      _id: idValue,
      title: titlee,
      content: contentt,
    })
      .then(() => {
        console.log("updated note!!");
      })
      .catch((err) => {
        console.log(err);
      });

    setOnEdit(false);
  }

  function editbutton(id) {
    setIdValue(id);
    setOnEdit(true);
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
            onEdit={editbutton}
          />
        );
      })}

      {onEdit === true ? (
        <div className="form-div">
          <form className="form-class-div">
            <input
              className="title-input"
              type="text"
              placeholder="title"
              onChange={handleTitle}
              value={titlee}
              required
            />
            <textarea
              className="title-input"
              type="text"
              placeholder="content"
              onChange={handleContent}
              value={contentt}
              required
            />

            <Button
              variant="contained"
              sx={{ color: "white", backgroundColor: "black" }}
              onClick={updateNote}
            >
              Save
            </Button>
          </form>
        </div>
      ) : (
        ""
      )}

      <Footer />
    </div>
  );
}

export default App;
