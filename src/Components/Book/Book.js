import React from 'react';
import { useCart } from '../../Context/CartContext';
import './Book.css';
import Fade from 'react-reveal/Fade';

const Book = (props) => {
    const {name, author, price, image} = props.book.book;

    let {cartProducts, setCartProducts} = useCart();
    
    const addItem = (book) => {
        
        let alreadyExists = false;
        let l = cartProducts.length;
        let newCartProducts = cartProducts.slice();

        for(let i = 0; i < l; i++){
            if(newCartProducts[i]._id === book._id){
                alreadyExists = true;
                newCartProducts[i].count++;
                break;
            }
        }

        
        if(!alreadyExists){
            book.count = 1;
            newCartProducts = [...cartProducts, book];
        }

        setCartProducts(newCartProducts)
        localStorage.setItem('books', JSON.stringify(newCartProducts));
    }
    
    return (
        <Fade bottom cascade>
            <div className="col-md-4 mt-3 mb-3">
                <div className="card shadow border-0">
                    <img src={image} className={"animation-img"} alt="" />
                    <div className="img-container">
                        <img className="img-fluid card-img-top" src={image} alt="" />
                    </div>
                    
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <small className="card-text mb-2 d-block">{author}</small>
                        <div className="price-buy">
                            <span className="text-slateblue">${price}</span>
                            <button onClick={() => addItem(props.book)} className="btn buy-btn float-right">Add to Cart</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Book;