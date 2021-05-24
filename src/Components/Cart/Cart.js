import React, { useState } from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../Context/CartContext';

const Cart = () => {
    
    let {cartProducts} = useCart();
    const [itemNumber, setItemNumber] = useState(0)

    let x = 0, y = 0;
    if(cartProducts){
        for(let i = 0; i < cartProducts.length; i++){
            x += cartProducts[i].count;
        }
        y = x
        if(x > 0)
            setItemNumber(y)
    }

    return (
        <div className="cart border shadow p-4 text-center">
            <div className="cart-container">
                {
                    itemNumber > 0 &&
                    <span className="cart-number">{itemNumber}</span>
                }
                <FontAwesomeIcon icon={faCartPlus} color="slateblue"/>
            </div>
        </div>
    );
};

export default Cart;