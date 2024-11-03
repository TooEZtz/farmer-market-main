import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Cart.css';
import '../index.css'


function Cart() {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    const handleCheckout = async () => {
        try {
            const products = cart.map(item => ({ productId: item._id, quantity: 1 }));
            await axios.post('http://localhost:5000/api/orders', { products }, {
                headers: { Authorization: token }
            });
            alert('Order placed successfully');
            clearCart();
            navigate('/orders');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="cart">
            <div className="bg">
                <h1>Your Cart</h1>
                <div className="box">
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <>
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Remove From Cart</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item._id}>
                                            <td><img className='image' src={item.image} alt={item.name} /></td>
                                            <td className='name'>{item.name}</td>
                                            <td className='price'>${item.price}</td>
                                            <td>
                                                <button className='remove' onClick={() => removeFromCart(item._id)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h2>Total: ${totalPrice}</h2>
                            <button onClick={handleCheckout}>Checkout</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;
