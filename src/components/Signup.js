import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const Signup = (props) => {


    const [credentials, setCredentials] = useState({UserName:"", email: "", password: "",Confirmpassword:"" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {UserName,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({UserName,email,password}),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
        // save the auth and redirect
        localStorage.setItem("token", json.authToken);
        navigate("/");
        props.showAlert(" Accout Successfully created","success")

        
      } else {
        // alert msg
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
      height: "520px",
      padding: "26px",
    }}
  >
    <form onSubmit={handleSubmit}>
      <h3>SignUp</h3>
      <div className="mb-3">
        <label htmlFor="UserName" className="form-label">
          User Name
        </label>
        <input
          type="UserName"
          name="UserName"
          onChange={OnChange}
          className="form-control"
          id="UserName"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
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
          onChange={OnChange}
          className="form-control"
          id="password" minLength={5} required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Confirmpassword" className="form-label">
         Confirm Password
        </label>
        <input
          type="Confirmpassword"
          name="Confirmpassword"
          onChange={OnChange}
          className="form-control"
          id="Confirmpassword" minLength={5} required
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
  )
}

export default Signup
