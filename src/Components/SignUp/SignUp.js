import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import SocialLogin from '../SocialLogin/SocialLogin';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAuth } from '../../Context/AuthContext';
require('yup-password')(yup);

const schema = yup.object().shape({
    password: yup.string().password().min(6),
    confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
});
const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const {signUpWithEmail} = useAuth();
    const onSubmit = async data => {
        try{
            document.getElementById('spinner').style.display = 'block';
            await signUpWithEmail(data);
            document.getElementById('spinner').style.display = 'none';
            history.replace(from)
        }
        catch(e){
            alert(e.message)
        }
        
    };

    return (
        <div className="signup">
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
                                <h5 className="font-weight-bold">Sign Up</h5>
                                <div className="form-group">
                                    <input type="text" name="name" {...register("name")} className="mt-4 form-control border-top-0 border-right-0 border-left-0 rounded-0" id="name" placeholder="Name" required/>
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" {...register("email")} className="mt-4 form-control border-top-0 border-right-0 border-left-0 rounded-0" id="email" placeholder="Email" required/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" {...register("password")} className="mt-4 form-control border-top-0 border-right-0 border-left-0 rounded-0" id="password" placeholder="Password" required/>
                                    {errors.password && <span className="error">{errors.password.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input type="password" name="confirmPassword" {...register("confirmPassword")} className="mt-4 form-control border-top-0 border-right-0 border-left-0 rounded-0" id="confirmPassword" placeholder="Confirm Password" required/>
                                    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                                </div>
                                <input type="submit" className="btn w-100 mt-4" value="Submit"/>
                                <div className="create-text">
                                    <p className="text-center mt-3">Already have an account? <Link to="/login"><u className="text-slateblue">Login</u></Link></p>
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

export default SignUp;