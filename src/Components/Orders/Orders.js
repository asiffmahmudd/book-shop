import React, { useEffect } from 'react';
import { useContext, useState } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './Orders.css';
import Moment from 'moment';

const Orders = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        document.getElementById('spinner').style.display = 'block';
        fetch(`https://book--shop.herokuapp.com/orders/${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('spinner').style.display = 'none';
            setOrders(data);
        })
    }, [])

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
                            orders.length == 0 && 
                            <h1 className="col-md-12 text-center mt-5">No orders found</h1>
                        }
                        {
                            orders.map((order,index) => {
                                return (
                                    <>
                                        <div className="col-md-8 mb-3 mx-auto single-order">
                                            <span className="float-left">Order Date: {Moment(order.order.date).format('DD-MM-YYYY')}</span>
                                            <span className="float-right details font-weight-bold" data-toggle="collapse" data-target={"#collapse"+index}>View Details</span>
                                        </div>
                                        <div className="collapse mb-3 col-md-8 mx-auto" id={"collapse"+index}>
                                            <div className="card card-body row">
                                                <div className="col-md-6">
                                                    <p>Book Name</p>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                    <p>{order.order.order.name}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Price</p>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                    <p>${order.order.order.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                        
                        
                    </div>
                </div>
            </div>  
        </>
    );
};

export default Orders;