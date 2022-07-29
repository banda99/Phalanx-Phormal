import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
    return (
      <div>
        <nav className="Navbar">
            <div className="logo">
              <img src="../logos/no background/logo and text no bg.png" alt="" width="125px"/>
            </div>
            <Link to="/">Homepage</Link> |{" "}
            <Link to="/page1">Page 1</Link> |{" "}
            <Link to="/page2">Page 2</Link> |{" "}
            <Link to="/login">Log In</Link> |{" "}
            <Link to="/cart">Cart</Link>
        </nav>
        <Outlet />
      </div>
    );
  }
  