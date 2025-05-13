import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import './Navbar.css' // Import the CSS file

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            if(token){
                await axios.post("http://localhost:8080/api/employees/logout", {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            localStorage.removeItem("token");
            navigate("/login")
        }
    }
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" className="logo-link">
                        CompanyName
                    </Link>
                </div>
                
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    {!token && <Link to="/register" className="nav-link">Register</Link>}
                    {!token && <Link to="/login" className="nav-link">Login</Link>}
                    {token && <button onClick={handleLogout} className="logout-btn">Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar