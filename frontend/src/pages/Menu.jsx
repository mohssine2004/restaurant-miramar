import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Category emojis as fallback when no image
const categoryEmojis = {
    'Entrées Froides': '🥗',
    'Entrées Chaudes': '🍲',
    'Plats Marocains': '🫕',
    'Plats Miramar': '🍽️',
    'Plats Italiens': '🍝',
    'Pizzas': '🍕',
    'Burgers': '🍔',
    'Sandwiches': '🥪',
    'Panini': '🥖',
    'Tacos': '🌮',
    'Dessert': '🍰',
    'Extras': '➕',
};

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/api/categories`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🍽️</div>
            <p style={{ color: '#999', fontFamily: 'var(--font-body)' }}>Loading Menu...</p>
        </div>
    );

    return (
        <div className="container" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
            <h2 className="section-title">Our Menu</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '20px',
                marginTop: '30px'
            }}>
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

const CategoryCard = ({ category }) => {
    const emoji = categoryEmojis[category.name] || '🍽️';

    return (
        <Link
            to={`/menu/${category.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.07)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.07)';
                }}
            >
                {/* Category Image */}
                <div style={{ position: 'relative', height: '130px', overflow: 'hidden' }}>
                    {category.image ? (
                        <img
                            src={category.image}
                            alt={category.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={e => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    {/* Fallback placeholder */}
                    <div style={{
                        display: category.image ? 'none' : 'flex',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(212, 160, 23, 0.1)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem'
                    }}>
                        {emoji}
                    </div>
                </div>

                {/* Category Name */}
                <div style={{ padding: '14px' }}>
                    <h3 style={{ fontSize: '0.95rem', marginBottom: '6px', lineHeight: '1.3' }}>
                        {category.name}
                    </h3>
                    <div style={{
                        color: 'var(--primary-color)',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: '600'
                    }}>
                        See Items <ChevronRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Menu;
