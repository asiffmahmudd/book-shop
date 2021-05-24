import React from 'react';
import './CartSingleItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../../Context/CartContext';
import Fade from 'react-reveal/Fade';

const CartSingleItem = ({item}) => {

    const {cartProducts, setCartProducts} = useCart()
    const removeItem = (id) =>{
        const newCartProducts = cartProducts.filter(pr => pr._id !== id)
        setCartProducts(newCartProducts)
        localStorage.setItem("books", JSON.stringify(newCartProducts))
    }

    return (
        <Fade right cascade>
            <div className="cart-single-item mt-3 pl-3">
                <div className="single-item-img">
                    <img src={item.book.image} alt="" />
                    <FontAwesomeIcon icon={faTimes} className="hoverPointer float-right mr-4" onClick={() => removeItem(item._id)} />
                </div>
                <div className="single-item-details">
                    <h6 className="item-name">{item.book.name}</h6> 
                    <span className="item-price">${item.book.price} x </span>
                    <span className="item-count">{item.count}</span>
                </div>
            </div>
            <hr />
        </Fade>
    );
};

export default CartSingleItem;