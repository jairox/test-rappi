import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Cart from '../Cart/Cart';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        El Baratón
                    </Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <Cart/>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;