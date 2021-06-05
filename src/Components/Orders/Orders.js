import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from '../Header/Header';
import './Orders.css';
import { useAuth } from '../../Context/AuthContext';
import OrderItem from './OrderItem';

const Orders = () => {
    const {loggedInUser} = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        document.getElementById('spinner').style.display = 'block';
        fetch(`https://book--shop.herokuapp.com/orders/${loggedInUser.email}`,{
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            document.getElementById('spinner').style.display = 'none';
            setOrders(data);
        })
        .catch(e => {
            alert(e.message)
            setLoading(false);
            document.getElementById('spinner').style.display = 'none';
        })
    }, [loggedInUser.email])

    return (
        <>
            <Header></Header>
            
            <div className="orders mt-5">
                <div className="container">
                    <div className="text-center mt-5" id="spinner" style={{'display':'none'}}>
                        <div className="spinner-border text-slateblue" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="row">
                        {
                            !loading && orders.length === 0 && 
                            <h1 className="col-md-12 text-center mt-5">No orders found</h1>
                        }
                        {
                            orders.map((order,index) => <OrderItem key={index} order={order} index={index}></OrderItem>)
                        }
                    </div>
                </div>
            </div>  
        </>
    );
};

export default Orders;