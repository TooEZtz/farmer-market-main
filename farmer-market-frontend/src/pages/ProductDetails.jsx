import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './styles/ProductDetails.css'
function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="bodys">
            <div className="product-details">
                <div className="first">
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                </div>
                <div className="second">
                    <p className='farmerName'>By: {product.farmer.name}</p>
                    <p className='description'>{product.description}</p>
                    <p>Price:<span>${product.price}</span></p>
                    <button onClick={() => { addToCart(product); alert('Product added to cart'); }}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
