import React, { useState, useEffect } from "react";
import axios from "axios";
import date from "date-and-time";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    date: "",
    id: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (id) {
        const res = await axios.get(`/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          description: res.data.description,
          date: res.data.date,
          id: res.data._id,
        });
      }
    };
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, description, date, id } = note;
        const newNote = {
          title,
          description,
          date,
        };
        await axios.put(`/api/notes/${id}`, newNote, {
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
      <h2>Edit Note</h2>
      <form onSubmit={editNote} autoComplete="off">
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
        <label htmlFor="date">
          Date : {date.format(new Date(note.date), "dddd, DD/MM/YYYY")}
        </label>
        <div className="row">
          <input type="date" id="date" name="date" onChange={onChangeInput} />
        </div>
        <button className="btn btn-warning text-white" type="submit">
          UPDATE
        </button>{" "}
        <Link to={"/"}>
          <span className="btn btn-primary text-white">CANCEL</span>{" "}
        </Link>
      </form>
    </div>
  );
};

export default EditNote;
