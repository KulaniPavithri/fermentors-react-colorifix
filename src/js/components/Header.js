import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {

    return(
        <nav className="navbar navbar-expand navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto ms-3 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="navbar-brand">Home</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;