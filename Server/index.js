const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const notesModel = require("./models/Notes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://abenicm20:KeeperDB1234@notecluster.hpx2d.mongodb.net/noteDataBase?retryWrites=true&w=majority"
);

app.get("/getNotes", (req, res) => {
  notesModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/addNote", async (req, res) => {
  const note = req.body;
  const newNote = new notesModel(note);
  await newNote.save();

  res.json(note);
});

app.delete("/deleteNote", (req, res) => {
  const id = req.body._id;

  notesModel.findByIdAndDelete(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Note!");
    }
  });
});

app.put("/updateNote", (req, res) => {
  const id = req.body._id;
  const newTitle = req.body.title;
  const newContent = req.body.content;

  console.log("_id: " + id);
  console.log("updatedTitle: " + newTitle);
  console.log("updatedContent: " + newContent);

  notesModel.findByIdAndUpdate(
    id,
    { title: newTitle, content: newContent },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Note Updated.");
      }
    }
  );
});

app.listen(4000, () => {
  console.log("Server Started on port 4000");
});
