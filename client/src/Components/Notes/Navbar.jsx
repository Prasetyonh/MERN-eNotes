import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = ({ setIsLogin }) => {
  const logoutSubmit = () => {
    Swal.fire({
      title: "Logout!",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33 ",
      cancelButtonColor: "#1aebb6",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        setIsLogin(false);
        Swal.fire({
          title: "Logout!",
          text: "You have been logged out!",
          icon: "success",
          confirmButtonColor: "#1aebb6",
        });
      }
    });
  };

  return (
    <div>
      <header>
        <div className="logo">
          <h1>
            <Link to={"/"}>
              {" "}
              <strong>eNotes</strong>{" "}
            </Link>
          </h1>
        </div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li className="px-2">||</li>
          <li>
            <Link to={"/create"}>Create Note</Link>
          </li>
          <li className="px-2">||</li>
          <li>
            <Link onClick={logoutSubmit} to={"/"}>
              Logout
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
