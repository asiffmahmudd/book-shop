import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import './Login.css';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useAuth } from '../../Context/AuthContext';

const Login = () => {
    const {signInWithEmail} = useAuth()
    const { register, handleSubmit } = useForm();

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const onSubmit = async data => {
        try{
            document.getElementById('spinner').style.display = 'block';
            await signInWithEmail(data)
            document.getElementById('spinner').style.display = 'none';
            history.replace(from)
        }
        catch(e){
            alert(e.message)
            document.getElementById('spinner').style.display = 'none';
        }
    };

    return (
        <div className="login pb-5">
            <div className="container">
                <Header></Header>
                <div className="text-center mt-4" id="spinner" style={{'display':'none'}}>
                    <div className="spinner-border text-slateblue" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-md-12">
                        <div className="col-md-5 mx-auto form-container rounded">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h5 className="font-weight-bold">Login</h5>
                                <div className="form-group">
                                    <input type="email" name="email" {...register("email")} className="mt-5 form-control border-top-0 border-right-0 border-left-0 rounded-0" id="email" placeholder="Email" required/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" {...register("password")} className="mt-5 form-control border-top-0 border-right-0 border-left-0 rounded-0" id="password" placeholder="Password" required/>
                                </div>
                                {/* <div className="form-check">
                                    <input type="checkbox" name="check" {...register("check")} className="form-check-input" id="check" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                    <Link to="#" className="forgot float-right"><u className="text-slateblue">Forgot password?</u></Link>
                                </div> */}
                                <input type="submit" className="btn w-100 mt-5" value="Submit"/>
                                <div className="create-text">
                                    <p className="text-center mt-3">Don't have an account? <Link to="/signup"><u className="text-slateblue">Create an account</u></Link></p>
                                </div>
                            </form>
                        </div>
                    </div>

                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;