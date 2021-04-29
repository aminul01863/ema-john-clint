import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop" className="link">Shop</Link>
                <Link to="/review" className="link">Order Review</Link>
                <Link to="/inventory" className="link">Manage Inventory</Link>
                <button className="btn btn-danger" onClick={() =>setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;