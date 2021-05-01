import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useContext, useState } from "react";
import Header from '../Header/Header';
import './Checkout.css';
import { useAuth } from '../../Context/AuthContext';

const Checkout = () => {

    const [book, setBook] = useState({});
    const {id} = useParams();
    const {loggedInUser} = useAuth();
    const history = useHistory();

    const saveOrder = () => {
        const orderData = {
            user: loggedInUser, 
            order: book,
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
                alert("Order Placed successfully");
                history.push('/');
            }
        })
        
    }
    
    useEffect(() => {
        fetch(`https://book--shop.herokuapp.com/checkout/${id}`)
        .then(res => res.json())
        .then(data => {
            setBook(data[0].book);
        })
    }, [])

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
                                        <tr>
                                            <td>{book.name}</td>
                                            <td>1</td>
                                            <td>{book.price}</td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td></td>
                                            <td>{book.price}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4">
                                <button onClick={saveOrder} className="btn float-right rounded">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;