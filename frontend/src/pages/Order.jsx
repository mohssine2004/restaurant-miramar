import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Order = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        order_type: 'dine-in'
    });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('miramar_cart') || '[]');
        setCart(storedCart);
    }, []);

    const updateQuantity = (productId, delta) => {
        const updatedCart = cart.map(item => {
            if (item.product_id === productId) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('miramar_cart', JSON.stringify(updatedCart));
    };

    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.product_id !== productId);
        setCart(updatedCart);
        localStorage.setItem('miramar_cart', JSON.stringify(updatedCart));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setStatus('submitting');

        try {
            const orderData = {
                ...formData,
                items: cart
            };

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                setStatus('success');
                setCart([]);
                localStorage.removeItem('miramar_cart');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '50px 20px' }}>
                <div style={{ fontSize: '50px', marginBottom: '20px' }}>🎉</div>
                <h2>Order Placed Successfully!</h2>
                <p>Your food will be ready shortly.</p>
                <button className="btn" onClick={() => navigate('/menu')} style={{ marginTop: '20px' }}>Order More</button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '50px 20px' }}>
                <h2 className="section-title">Your Order</h2>
                <p>Your cart is empty.</p>
                <button className="btn" onClick={() => navigate('/menu')} style={{ marginTop: '20px' }}>Browse Menu</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="section-title">Your Order</h2>

            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                {cart.map(item => (
                    <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: 0 }}>{item.name}</h4>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>MAD {item.price}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '20px', padding: '2px 5px' }}>
                                <button onClick={() => updateQuantity(item.product_id, -1)} style={{ padding: '0 5px', background: 'none' }}>-</button>
                                <span style={{ fontSize: '0.9rem', margin: '0 5px' }}>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.product_id, 1)} style={{ padding: '0 5px', background: 'none' }}>+</button>
                            </div>
                            <button onClick={() => removeItem(item.product_id)} style={{ padding: '5px', color: '#ff4d4d', background: 'none' }}><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '2px dashed #eee' }}>
                    <h3>Total</h3>
                    <h3 style={{ color: 'var(--primary-color)' }}>MAD {calculateTotal().toFixed(2)}</h3>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '15px' }}>Complete your Order</h3>

                <label className="input-label">Name</label>
                <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} required className="input-field" placeholder="Your Name" />

                <label className="input-label">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="input-field" placeholder="06..." />

                <label className="input-label">Order Type</label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, order_type: 'dine-in' })}
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: formData.order_type === 'dine-in' ? '2px solid var(--primary-color)' : '1px solid #ddd', backgroundColor: formData.order_type === 'dine-in' ? '#fff9e6' : 'white', fontWeight: 'bold' }}
                    >Dine-in</button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, order_type: 'takeaway' })}
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: formData.order_type === 'takeaway' ? '2px solid var(--primary-color)' : '1px solid #ddd', backgroundColor: formData.order_type === 'takeaway' ? '#fff9e6' : 'white', fontWeight: 'bold' }}
                    >Takeaway</button>
                </div>

                <button type="submit" className="btn" style={{ width: '100%' }} disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Placing Order...' : `Place Order (MAD ${calculateTotal().toFixed(2)})`}
                </button>
            </form>
        </div>
    );
};

export default Order;
