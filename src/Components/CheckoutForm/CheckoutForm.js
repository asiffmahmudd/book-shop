import React from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { useHistory } from 'react-router';

const CheckoutForm = () => {

    const { register, handleSubmit } = useForm();

    const {loggedInUser} = useAuth();
    const history = useHistory();
    const {cartProducts, setCartProducts} = useCart();

    const onSubmit = data => {
        const orderData = {
            user: loggedInUser, 
            order: cartProducts,
            date: new Date(),
            orderData: data
        }
        fetch('https://book--shop.herokuapp.com/placeOrder/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                setCartProducts([]);
                localStorage.clear()
                alert("Order Placed successfully");
                history.push('/');
            }
        })
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input type="text" className="form-control" defaultValue={loggedInUser.name} id="name" placeholder="Name" {...register("name")} required />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="address" placeholder="Address" {...register("address")} required />
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" id="contact" placeholder="Contact Number" {...register("contact")} required />
                </div>
                <button type="submit" className="btn float-right rounded">Place Order</button>
            </form>
        </div>
    );
};

export default CheckoutForm;