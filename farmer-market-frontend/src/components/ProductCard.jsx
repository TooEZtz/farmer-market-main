import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductCard.css'
function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(product);
        alert('Product added to cart');
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="text">
                <h3 className='productName'>{product.name}</h3>
                <div className="p">
                    <p className='farmerName'>Producer: {product.farmer.name}</p>
                    <p className='price'>Price per lb: <span>${product.price}</span></p>
                </div>
            </div>
            <Link to={`/product/${product._id}`} className='details'>View Details</Link>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>

    );
}

export default ProductCard;
