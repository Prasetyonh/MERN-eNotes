import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setError(res.data.msg);
      setOnLogin(false);
      Swal.fire(
        "Success!",
        "Your account has been successfully created.",
        "success"
      );
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);
  const style = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };

  return (
    <div>
      {/*--------------LOGIN-----------------------*/}
      <section className="login-page vh-100">
        <div className="login container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card shadow">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-sm-none d-md-block">
                    <img
                      src="../assets/images/login.png"
                      alt="login form"
                      className="img-fluid"
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={loginSubmit}>
                        <div className="d-flex align-items-center  ">
                          <span className="h1 fw-bold text-center">eNotes</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="login-email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            value={user.email}
                            required
                            autoComplete="true"
                            onChange={onChangeInput}
                            name="email"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            autoComplete="true"
                            onChange={onChangeInput}
                            value={user.password}
                            name="password"
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-lg btn-block"
                            type="submit"
                            style={{
                              backgroundColor: "#1aebb6",
                              color: "white",
                            }}
                          >
                            Login
                          </button>
                        </div>
                        <p className="mb-3 pb-lg-2">
                          Don't have an account?{" "}
                          <span
                            style={{ color: "#1aebb6", textDecoration: "none" }}
                            onClick={() => setOnLogin(true)}
                          >
                            Register here
                          </span>
                        </p>
                        <p>{error}</p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*--------------REGISTER-----------------------*/}
      <section className="register-page vh-100 " style={style}>
        <div className="register container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card shadow">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-sm-none d-md-block">
                    <img
                      src="../assets/images/signup.png"
                      alt="login form"
                      className="img-fluid "
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body px-4 p-lg-5 text-black">
                      <form onSubmit={registerSubmit}>
                        <div className="d-flex align-items-center">
                          <span className="h1 fw-bold ">eNotes</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Let's create your account
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            name="name"
                            id="register-name"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            value={user.name}
                            onChange={onChangeInput}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            name="email"
                            id="register-email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            value={user.email}
                            onChange={onChangeInput}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            name="password"
                            id="register-password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            value={user.password}
                            onChange={onChangeInput}
                          />
                        </div>
                        <div className="pt-1 mb-3">
                          <button
                            className="btn btn-lg btn-block"
                            type="submit"
                            style={{
                              backgroundColor: "#1aebb6",
                              color: "white",
                            }}
                          >
                            Sign Up
                          </button>
                        </div>

                        <p className="mb-3 pb-lg-2">
                          Do you already have an account?{" "}
                          <span
                            onClick={() => setOnLogin(false)}
                            style={{ color: "#1aebb6", textDecoration: "none" }}
                          >
                            Login here
                          </span>
                        </p>
                        <p>{error}</p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
