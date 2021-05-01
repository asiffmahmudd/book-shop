import React from 'react';
import Moment from 'moment';

const OrderItem = ({order, index}) => {
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
    );
};

export default OrderItem;