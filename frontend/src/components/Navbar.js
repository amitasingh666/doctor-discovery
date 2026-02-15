import { Link } from 'react-router-dom';
import './Components.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="nav-logo">DoctorFind</Link>
    <div className="nav-links">
      <Link to="/doctors">Find Doctors</Link>
      <Link to="/register">Join as Doctor</Link>
    </div>
  </nav>
);
export default Navbar;