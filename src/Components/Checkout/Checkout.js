import React from 'react';
import Header from '../Header/Header';
import './Checkout.css';
import { useCart } from '../../Context/CartContext';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Checkout = () => {

    const {cartProducts} = useCart();
    
    let totalPrice = 0;
    cartProducts.map(pr => totalPrice += pr.book.price*pr.count)

    return (
        <>
            <Header></Header>
            <div className="checkout mt-5 pb-5">
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
                            <div className="mt-5">
                                <CheckoutForm></CheckoutForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;