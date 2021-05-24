import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext();
export function useCart(){
    return useContext(CartContext);
}

export function CartProvider({children}) {

    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("books")) || []);
    const value = {
        cartProducts, setCartProducts
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
