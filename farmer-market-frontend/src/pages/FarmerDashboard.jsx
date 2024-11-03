import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './styles/FarmerDashboard.css'

function FarmerDashboard() {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [earnings, setEarnings] = useState(0);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '' });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/farmer/dashboard', {
                headers: { Authorization: token }
            });
            setProducts(response.data.products);
            setEarnings(response.data.totalEarnings);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/farmer/add-product', newProduct, {
                headers: { Authorization: token }
            });
            alert('Product added');
            setNewProduct({ name: '', description: '', price: '', image: '' });
            fetchDashboard();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="farmer-dashboard">
            <div className="heads">
                <h1>Farmer's Dashboard</h1>
                <p >Total Earnings: ${earnings}</p>
            </div>
            <div className="mid">
                <h2>Add New Product</h2>
                <form onSubmit={handleAddProduct}>
                    <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                    <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} required></textarea>
                    <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                    <input type="text" placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} required />
                    <button type="submit">Add Product</button>
                </form>
                <div className="image-a"></div>
            </div>
            <div className="bot">
                <h2>Your Products</h2>
                <div className="product-list">
                    {products.map(product => (
                        <div key={product._id} className="dashboard-product-card">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Status: {product.available ? 'Available' : 'Sold'}</p>
                            {/* Add options to edit or delete products if you wish */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FarmerDashboard;
