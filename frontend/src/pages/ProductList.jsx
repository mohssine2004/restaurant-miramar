import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductList = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all products and filter locally (or create a backend endpoint for filtering)
        // For efficiency, we should add a backend endpoint /api/categories/:id/products, but for now we'll fetch all.
        fetch(`${import.meta.env.VITE_API_URL}/api/products`)
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(p => p.category_id === parseInt(categoryId));
                setProducts(filtered);
                if (filtered.length > 0 && filtered[0].Category) {
                    setCategoryName(filtered[0].Category.name);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, [categoryId]);

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading products...</div>;

    return (
        <div className="container">
            <h2 className="section-title">{categoryName || 'Products'}</h2>
            <div className="product-list" style={{ display: 'grid', gap: '20px' }}>
                {products.length === 0 ? <p>No products found in this category.</p> : products.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        textDecoration: 'none',
                        color: 'inherit',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ width: '100px', height: '100px', backgroundColor: '#eee', flexShrink: 0 }}>
                            {/* Placeholder image logic - cycle through available images */}
                            <img
                                src={`/images/img${(product.id % 20) + 1}.png`}
                                onError={(e) => { e.target.src = '/images/img.png' }}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{product.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description || 'Delicious meal prepared with fresh ingredients.'}</p>
                            <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>MAD {product.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
