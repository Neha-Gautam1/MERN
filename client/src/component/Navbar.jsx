import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () =>{
    return<>
    <header>
       <div className="container1">
            <div className="logobrand">
       <h1>Eureka</h1>
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">Make Notes</NavLink></li>
                    <li><NavLink to="/progress">Progress Dashboard</NavLink></li>
                    <li> <NavLink to="/dashboard">Test Progress</NavLink></li>
                    <li><NavLink to="/recommendation">Recommendation</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    
                </ul>
            </nav>
        </div>
        
    </header>
    </>
}