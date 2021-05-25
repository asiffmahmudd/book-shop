import React from 'react';
import Moment from 'moment';
import Fade from 'react-reveal/Fade';

const OrderItem = ({order, index}) => {
    let totalPrice = 0;
    order.order.order.map(item => totalPrice += item.book.price * item.count)
    return (
        <Fade top cascade opposite>
            <div className="col-md-8 mb-3 mx-auto single-order">
                <span className="float-left">Order Date: {Moment(order.order.date).format('DD-MM-YYYY')}</span>
                <span className="float-right details font-weight-bold" data-toggle="collapse" data-target={"#collapse"+index}>View Details</span>
            </div>
            <div className="collapse mb-3 col-md-8 mx-auto" id={"collapse"+index}>
                <div className="card card-body row">
                    {
                        order.order.order.map(item => {
                            return (
                                <>
                                    <div className="col-md-6">
                                        <p>Book Name</p>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <p>{item.book.name}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Price</p>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <p>${item.book.price}x{item.count}</p>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div className="col-md-6 text-left">
                        <p>Total Price</p>
                    </div>
                    <div className="col-md-6 text-right">
                        <p>{totalPrice}</p>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default OrderItem;