import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setLoading(false);
            });
    }, [productId]);

    const addToOrder = () => {
        // In a real app, this would add to a context/redux store.
        // For this demo, we can store in localStorage or just navigate to Order with state.
        const currentOrder = JSON.parse(localStorage.getItem('miramar_cart') || '[]');
        const existingItem = currentOrder.find(item => item.product_id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            currentOrder.push({
                product_id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity
            });
        }

        localStorage.setItem('miramar_cart', JSON.stringify(currentOrder));
        navigate('/order');
    };

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
    if (!product) return <div style={{ padding: '20px', textAlign: 'center' }}>Product not found</div>;

    return (
        <div style={{ paddingBottom: '80px' }}>
            <div style={{ height: '300px', width: '100%', backgroundColor: '#eee', position: 'relative' }}>
                <img
                    src={`/images/img${(product.id % 20) + 1}.png`}
                    onError={(e) => { e.target.src = '/images/img.png' }}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    ←
                </button>
            </div>

            <div className="container" style={{ marginTop: '-20px', position: 'relative', zIndex: 10, backgroundColor: 'white', borderRadius: '20px 20px 0 0', padding: '25px 20px', minHeight: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{product.name}</h2>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>MAD {product.price}</span>
                </div>

                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                    {product.description || 'A delicious choice from our menu. Prepared fresh just for you.'}
                </p>

                {product.note && (
                    <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
                        <strong>Note:</strong> {product.note}
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <span style={{ marginRight: '15px', fontWeight: 'bold' }}>Quantity:</span>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ddd', backgroundColor: 'white' }}>-</button>
                    <span style={{ margin: '0 15px', fontWeight: 'bold' }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ddd', backgroundColor: 'white' }}>+</button>
                </div>

                <button
                    className="btn"
                    onClick={addToOrder}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.1rem', padding: '15px' }}
                >
                    <ShoppingCart size={20} />
                    Add to Order - MAD {(product.price * quantity).toFixed(2)}
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
