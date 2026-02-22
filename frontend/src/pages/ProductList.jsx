import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import './productList.css';

/* ── Ingredient icon map ── */
const ingredientIcons = {
    'sauce tomate': '🍅',
    'mozzarella': '🧀',
    'pepperoni': '🍖',
    'thon': '🐟',
    'poulet': '🍗',
    'champignon': '🍄',
    'fromage': '🧀',
    'bolognaise': '🥩',
    'jambon': '🥓',
    'olives': '🫒',
    'fruits de mer': '🦞',
    'crevettes': '🦐',
    'poivrons': '🫑',
    'oignons': '🧅',
    'ail': '🧄',
    'basilic': '🌿',
    'boeuf': '🥩',
    'merguez': '🌭',
    'ananas': '🍍',
    'tomate': '🍅',
    'viande': '🥩',
    'crème': '🥛',
    'légumes': '🥦',
    'maïs': '🌽',
    'artichaut': '🌿',
    'chorizo': '🌭',
    'bbq': '🔥',
    'poisson': '🐟',
    'saumon': '🐠',
    'cheddar': '🧀',
    'miel': '🍯',
    'salade': '🥗',
};

function getIngredientIcon(ingredient) {
    const lower = ingredient.trim().toLowerCase();
    for (const [key, icon] of Object.entries(ingredientIcons)) {
        if (lower.includes(key)) return icon;
    }
    return '✨';
}

/* ── Animated card with IntersectionObserver ── */
function AnimatedCard({ children, delay }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`animated-card ${visible ? 'card-visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

/* ════ MAIN COMPONENT ════ */
const ProductList = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products`)
            .then(res => { if (!res.ok) throw new Error(); return res.json(); })
            .then(data => {
                const filtered = data.filter(p => p.category_id === parseInt(categoryId));
                setProducts(filtered);
                if (filtered.length > 0 && filtered[0].Category)
                    setCategoryName(filtered[0].Category.name);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [categoryId]);

    if (loading) return (
        <div className="pl-loader">
            <div className="pl-spinner" />
            <p>Loading menu…</p>
        </div>
    );

    return (
        <div className="pl-page">
            {/* Header */}
            <div className="pl-header">
                <Link to="/menu" className="pl-back">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <p className="pl-eyebrow">Our Menu</p>
                    <h1 className="pl-title">{categoryName || 'Products'}</h1>
                </div>
            </div>

            {products.length === 0 ? (
                <p className="pl-empty">No products found in this category.</p>
            ) : (
                <div className="pl-grid">
                    {products.map((product, i) => (
                        <AnimatedCard key={product.id} delay={i * 80}>
                            <ProductCard product={product} />
                        </AnimatedCard>
                    ))}
                </div>
            )}
        </div>
    );
};

/* ── Product Card ── */
const ProductCard = ({ product }) => {
    const [hovered, setHovered] = useState(false);
    const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;
    const ingredients = product.description
        ? product.description.split(',').map(s => s.trim()).filter(Boolean)
        : [];

    return (
        <Link to={`/product/${product.id}`} className="pc-link">
            <div
                className={`pc-card ${hovered ? 'pc-hovered' : ''}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Image */}
                <div className="pc-img-wrap">
                    {firstImage ? (
                        <img src={firstImage} alt={product.name} className="pc-img"
                            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                    ) : null}
                    <div className="pc-img-fallback" style={{ display: firstImage ? 'none' : 'flex' }}>🍽️</div>

                    {/* Hover shimmer */}
                    <div className="pc-shimmer" />
                </div>

                {/* Info */}
                <div className="pc-info">
                    <div className="pc-top">
                        <h3 className="pc-name">{product.name}</h3>
                        <span className="pc-price">MAD {product.price}</span>
                    </div>

                    {/* Ingredients as pills */}
                    {ingredients.length > 0 && (
                        <div className="pc-ingredients">
                            {ingredients.slice(0, 4).map((ing, i) => (
                                <span key={i} className="pc-ing-pill">
                                    {getIngredientIcon(ing)} {ing}
                                </span>
                            ))}
                            {ingredients.length > 4 && (
                                <span className="pc-ing-more">+{ingredients.length - 4}</span>
                            )}
                        </div>
                    )}

                    {/* Stars */}
                    <div className="pc-stars">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={11} fill="#d4a017" stroke="#d4a017" />)}
                        <span className="pc-rating">5.0</span>
                    </div>
                </div>

                {/* Arrow indicator */}
                <div className="pc-arrow">›</div>
            </div>
        </Link>
    );
};

export default ProductList;
