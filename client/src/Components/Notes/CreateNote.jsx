import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    date: "",
  });

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, description, date } = note;
        const newNote = {
          title,
          description,
          date,
        };
        await axios.post(`/api/notes`, newNote, {
          headers: { Authorization: token },
        });
        return navigate("/");
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create-note">
      <h2>Create Note</h2>
      <form onSubmit={createNote} autoComplete="off">
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={note.title}
            id="title"
            name="title"
            required
            onChange={onChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="desciption">Description</label>
          <textarea
            type="text"
            value={note.description}
            id="description"
            name="description"
            required
            onChange={onChangeInput}
          />
        </div>
        <label htmlFor="date">Date : {note.date}</label>
        <div className="row">
          <input
            type="date"
            id="date"
            name="date"
            required
            onChange={onChangeInput}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
