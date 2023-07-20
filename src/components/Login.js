import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert(" LoggedIn Successfully","success")
      navigate("/");

    } else {
      
      props.showAlert(" Invalid credentials","danger")
    }
  };
  const OnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="container my-3"
      style={{
        width: "383px",
        border: "1px #ddd solid",
        borderRadius: "4px",
        height: "370px",
        padding: "26px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h3>LogIn</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={OnChange}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={OnChange}
            className="form-control"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <div id="emailHelp" className="form-text">
          By continuing, you agree to NoteBook's Conditions of Use and Privacy
          Notice.
        </div>
      </form>
    </div>
  );
};

export default Login;
