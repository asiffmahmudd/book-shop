import React from 'react';
import { useHistory } from 'react-router';
import Header from '../Header/Header';
import './Checkout.css';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';

const Checkout = () => {

    const {loggedInUser} = useAuth();
    const history = useHistory();
    const {cartProducts, setCartProducts} = useCart();

    const saveOrder = () => {
        const orderData = {
            user: loggedInUser, 
            order: cartProducts,
            date: new Date()
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
    
    let totalPrice = 0;
    cartProducts.map(pr => totalPrice += pr.book.price*pr.count)

    return (
        <>
            <Header></Header>
            <div className="checkout mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <h3>Checkout</h3>
                            <div className="table-container shadow mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Book Name</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartProducts.map(pr => {
                                                return(
                                                    <tr key={pr._id}>
                                                        <td>{pr.book.name}</td>
                                                        <td>{pr.count}</td>
                                                        <td>{pr.book.price} x {pr.count}</td>
                                                    </tr>
                                                )
                                            })
                                            
                                        }
                                        
                                        <tr>
                                            <td>Total</td>
                                            <td></td>
                                            <td>{totalPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4">
                                <button onClick={saveOrder} className="btn float-right rounded">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;