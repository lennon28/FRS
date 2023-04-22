import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const nav = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = details;
    if (username && password) {
      if (username === "AD001" && password === "AD001") {
        nav("/addflight");
      }
      if (username === "AD002" && password === "AD002") {
        nav("/getflights");
      }
      if (username === "AD003" && password === "AD003") {
        nav("/addschedule");
      }
      if (username === "AD004" && password === "AD004") {
        nav("/viewschedule");
      }
      if (username === "AD005" && password === "AD005") {
        nav("/addRoute");
      }
      if (username === "AD006" && password === "AD006") {
        nav("/getRoute");
      }
    } else {
      alert("error");
    }
  };

  return (
    <div className="img-1">
      <div className="login-container">
        <h1>Login</h1>
        <form className="form-group" onSubmit={handleSubmit}>
          <div>
            <label>User name:</label>
            <input
              type="text"
              name="username"
              value={details.username}
              placeholder="username"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="text"
              name="password"
              value={details.password}
              placeholder="password"
              onChange={handleChange}
            ></input>
          </div>
          <input className="btn" type="submit"></input>
        </form>
      </div>
    </div>
  );
}

export default Login;