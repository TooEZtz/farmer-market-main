import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
        <button onClick={() => removeFromCart(item._id)}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
