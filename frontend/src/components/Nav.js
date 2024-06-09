import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();  //useNavigate() automatically re-render Nav component when there is any change in Naviagteion...
    const logout = () => {
        localStorage.clear();
        // navigate('/signup');
    }
    return (
        <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9mLUIUo3fkKIBXK2LtiRrDpe09HzwtI157w&s" alt="logo" className='logo' />

        {/* Coditional Rendering: Inline If-Else with Conditional Operator */}

        {auth ? <ul className="nav-ul">

            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Product</Link></li>
            <li><Link to="/update">Update Product</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logout} to="/login">Logout ({JSON.parse(auth).name})</Link></li>

        </ul>
            :
            <ul className="nav-ul nav-right">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        }
    </div>


    )
}

export default Nav;