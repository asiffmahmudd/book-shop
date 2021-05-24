import React, { useEffect, useState } from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../Context/CartContext';
import CartSingleItem from './CartSingleItem/CartSingleItem';
import Fade from 'react-reveal/Fade';

const Cart = () => {
    
    let {cartProducts} = useCart();

    const [cartExpanded, setCartExpanded] = useState();
    
    const handleClick = () => {
        if(!cartExpanded){
            setCartExpanded(true)
        }
        else{
            setCartExpanded(!cartExpanded)
        }
    }
    
    let totalPrice = 0;
    cartProducts.map(item => totalPrice+=(item.book.price * item.count))

    return (
        <>
            <div className="cart border shadow p-4 text-center hoverPointer" onClick={handleClick}>
                <div className="cart-container">
                    {
                        cartProducts.length > 0 &&
                        <span className="cart-number">{cartProducts.length}</span>
                    }
                    <FontAwesomeIcon icon={faCartPlus} color="slateblue"/>
                </div>
            </div>

            {
                cartExpanded &&
                <Fade right>
                    <div className="cart-expand shadow-lg">
                        <div className="cart-expand-content">
                            <div className="expand-close">
                                <span className="cart-close" onClick={handleClick}><FontAwesomeIcon className="hoverPointer" icon={faWindowClose} size="2x" /></span>
                            </div>
                            <div className="cart-items">
                                {
                                    cartProducts.map(item => <CartSingleItem item={item} key={item._id}></CartSingleItem>)
                                }
                            </div>
                            {
                                cartProducts.length > 0 &&
                                <div className="pl-3 total-price mt-4">
                                    <strong>Total Price: </strong>
                                    <span className="float-right mr-3">{totalPrice}</span>
                                </div>
                            }
                            {
                                cartProducts.length === 0 &&
                                <strong className="p-4">No items added in the cart</strong>
                            }
                        </div>
                    </div>
                </Fade>
            }
        </>
    );
};

export default Cart;