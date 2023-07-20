import React,{ useEffect }from 'react'
import { Link ,useLocation, useNavigate } from 'react-router-dom'


function Navbar() {
  const navigate = useNavigate();
  const handlLogout = ()=>{
   localStorage.removeItem('token')
   navigate('/login')
  }
  let location = useLocation();
  useEffect(()=>{
  },[location])
  return (
  <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active text-success":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active text-success":""}`} to="/about">About</Link>
        </li>
      
      </ul>
      
    </div>
   {!localStorage.getItem('token')? <form className='d-flex'>
    <Link className="btn btn-outline-success mx-1" to="/Login" role="button">Login</Link>
    <Link className="btn btn-outline-success mx-1" to="Signup"  role="button">SignUp</Link>
    </form>:<button onClick={handlLogout} className='btn btn-outline-success'>Logout</button>}
    
  </div>
</nav>
  </>
  )
}

export default Navbar
