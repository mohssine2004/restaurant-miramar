import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log('API URL:', apiUrl); // Debug log

        fetch(`${apiUrl}/api/categories`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
                console.error('API URL was:', apiUrl);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading Menu...</div>;

    return (
        <div className="container">
            <h2 className="section-title">Our Menu</h2>
            <div className="category-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
                {categories.map(category => (
                    <Link to={`/menu/${category.id}`} key={category.id} style={{
                        display: 'block',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '50%',
                            margin: '0 auto 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>🍽️</div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '5px' }}>{category.name}</h3>
                        <div style={{ color: 'var(--primary-color)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            See Items <ChevronRight size={14} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Menu;
