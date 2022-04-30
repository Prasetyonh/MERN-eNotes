import React from "react";
import Nav from "./Notes/Navbar";
import Home from "./Notes/Home";
import Create from "./Notes/CreateNote";
import Edit from "./Notes/EditNote";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Notes = ({ setIsLogin }) => {
  return (
    <BrowserRouter>
      <div className="notes-page">
        <Nav setIsLogin={setIsLogin} />
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
};

export default Notes;
