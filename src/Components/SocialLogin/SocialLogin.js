import React from 'react';
import './SocialLogin.css';
import google from '../../img/google.png';
import facebook from '../../img/facebook.png';
import { signin } from '../../firebaseManager';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const SocialLogin = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleSignIn = () => {
        signin()
        .then(res => {
            setLoggedInUser(res);
            history.replace(from);
        })
    }

    return (
        <>
            <div className="col-md-12 mt-3 mb-3">
                <div className="col-md-4 mx-auto cstm-seperator">
                    <hr/>
                    <span className="text-center or-text">Or</span>
                </div>
            </div>

            <div className="col-md-12">
                <div className="col-md-4 mx-auto border facebook">
                    <img src={facebook} alt=""/>
                    <p className="text-center">Continue with Facebook</p>
                </div>
            </div>

            <div className="col-md-12 mt-2">
                <div className="col-md-4 mx-auto border google" onClick={handleSignIn}>
                    <img src={google} alt=""/>
                    <p className="text-center">Continue with Google</p>
                </div>
            </div>
        </>
    );
};

export default SocialLogin;