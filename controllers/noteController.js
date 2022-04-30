const Notes = require("../models/noteModel");

const noteController = {
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, description, date } = req.body;
      const newNote = new Notes({
        title,
        description,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      await newNote.save();
      res.json(newNote);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Note deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, description, date } = req.body;
      await Notes.findByIdAndUpdate(
        { _id: req.params.id },
        { title, description, date }
      );
      res.json({ msg: "Note updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = noteController;
