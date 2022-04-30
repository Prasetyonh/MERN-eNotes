import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import date from "date-and-time";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33 ",
      cancelButtonColor: "#1aebb6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          if (token) {
            axios.delete(`api/notes/${id}`, {
              headers: { Authorization: token },
            });
            getNotes(token);
          }
          getNotes(token);
        } catch (error) {
          window.location.href = "/";
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  return (
    <div className="note-wrapper">
      {notes.map((note) => (
        <div className="card card-note" key={note._id}>
          <h3 title={note.title}>{note.title}</h3>

          <div className="text-wrapper">
            <p>{note.description}</p>
          </div>
          <p className="date text-secondary">
            {date.format(new Date(note.date), "dddd, DD/MM/YYYY")}
          </p>
          <div className="footer">
            {note.name}
            <Link
              className="btn-sm btn-warning text-white"
              to={`/edit/${note._id}`}
            >
              Edit
            </Link>
          </div>
          <span className="text-danger close">
            <FontAwesomeIcon
              onClick={() => deleteNote(note._id)}
              icon={faWindowClose}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Home;
