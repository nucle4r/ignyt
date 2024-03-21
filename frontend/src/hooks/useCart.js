import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);
  const [cartQuantities, setCartQuantities] = useState(initCart.cartQuantities || {});

  useEffect(() => {
    const totalPrice = sum(cartItems.map(item => item.price));
    const totalCount = sum(cartItems.map(item => item.quantity));
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
        cartQuantities,
      })
    );
  }, [cartItems, cartQuantities]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  const sum = items => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
  };

  const removeFromCart = foodId => {
    const filteredCartItems = cartItems.filter(item => item.food.id !== foodId);
    setCartItems(filteredCartItems);
    setCartQuantities(prevQuantities => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[foodId];
      return updatedQuantities;
    });
  };

  const changeQuantity = (foodId, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.food.id === foodId) {
        return {
          ...item,
          quantity: newQuantity,
          price: item.food.price * newQuantity,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    setCartQuantities(prevQuantities => ({
      ...prevQuantities,
      [foodId]: newQuantity,
    }));
  };

  const addToCart = food => {
    const existingCartItem = cartItems.find(item => item.food.id === food.id);
    if (existingCartItem) {
      const newQuantity = (cartQuantities[food.id] || 0) + 1;
      changeQuantity(food.id, newQuantity);
    } else {
      const updatedCartItems = [
        ...cartItems,
        {
          food,
          quantity: 1,
          price: food.price,
        },
      ];
      setCartItems(updatedCartItems);
      setCartQuantities(prevQuantities => ({
        ...prevQuantities,
        [food.id]: 1,
      }));
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    setCartItems([]);
    setTotalPrice(0);
    setTotalCount(0);
    setCartQuantities({});
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
        clearCart,
        cartQuantities,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
