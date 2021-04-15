import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import { signout } from '../../firebaseManager';
import logo from '../../img/Logo.png';
import './Header.css';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleLogout = () =>{
        signout()
        .then(res => {
            if(res){
                setLoggedInUser({});
            }
        })
    }

    return (
        <header>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to="/"><img src={logo} alt=""/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Deals</Link>
                            </li>
                            {
                                loggedInUser?.email &&
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link">{loggedInUser.name}</span>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="btn login-btn">Logout</button>
                                    </li>
                                </>
                            }
                            {
                                !loggedInUser?.email &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login"><button className="btn login-btn">Login</button></Link>
                                </li>
                            }
                            
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;