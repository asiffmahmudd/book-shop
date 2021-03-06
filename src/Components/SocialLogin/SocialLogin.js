import React from 'react';
import './SocialLogin.css';
import google from '../../img/google.png';
import facebook from '../../img/facebook.png';
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../../Context/AuthContext';

const SocialLogin = () => {

    const {loginWith} = useAuth();
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    async function handleSignIn(media) {
        try{
            await loginWith(media);
            history.replace(from)
        }
        catch(e){
            alert(e.message)
        }
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
                <div className="col-md-4 mx-auto border facebook" onClick={() => handleSignIn("facebook")}>
                    <img src={facebook} alt=""/>
                    <p className="text-center">Continue with Facebook</p>
                </div>
            </div>

            <div className="col-md-12 mt-2">
                <div className="col-md-4 mx-auto border google" onClick={() => handleSignIn("google")}>
                    <img src={google} alt=""/>
                    <p className="text-center">Continue with Google</p>
                </div>
            </div>
        </>
    );
};

export default SocialLogin;