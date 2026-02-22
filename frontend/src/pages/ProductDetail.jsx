import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, ChevronRight, Star, Check } from 'lucide-react';
import './productDetail.css';

/* ─── ingredient icon map (same as ProductList) ─── */
const ingredientIcons = {
    'sauce tomate': '🍅', 'mozzarella': '🧀', 'pepperoni': '🍖',
    'thon': '🐟', 'poulet': '🍗', 'champignon': '🍄', 'fromage': '🧀',
    'bolognaise': '🥩', 'jambon': '🥓', 'olives': '🫒',
    'fruits de mer': '🦞', 'crevettes': '🦐', 'poivrons': '🫑',
    'oignons': '🧅', 'ail': '🧄', 'basilic': '🌿', 'boeuf': '🥩',
    'merguez': '🌭', 'ananas': '🍍', 'tomate': '🍅', 'viande': '🥩',
    'crème': '🥛', 'légumes': '🥦', 'maïs': '🌽', 'artichaut': '🌿',
    'chorizo': '🌭', 'bbq': '🔥', 'poisson': '🐟', 'saumon': '🐠',
    'cheddar': '🧀', 'miel': '🍯', 'salade': '🥗',
};
function getIcon(ing) {
    const lower = ing.toLowerCase();
    for (const [key, icon] of Object.entries(ingredientIcons)) {
        if (lower.includes(key)) return icon;
    }
    return '✨';
}

/* ─── Image carousel ─── */
const ImageCarousel = ({ images, productName }) => {
    const [idx, setIdx] = useState(0);
    const goNext = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);
    const goPrev = () => setIdx(i => (i - 1 + images.length) % images.length);

    useEffect(() => {
        if (images.length <= 1) return;
        const t = setInterval(goNext, 4000);
        return () => clearInterval(t);
    }, [images.length, goNext]);

    if (!images || images.length === 0) {
        return <div className="pd-no-img">🍽️</div>;
    }

    return (
        <div className="pd-carousel">
            {images.map((img, i) => (
                <img key={i} src={img} alt={`${productName} ${i + 1}`}
                    className={`pd-carousel-img ${i === idx ? 'active' : ''}`}
                    onError={e => { e.target.src = '/images/img.png'; }} />
            ))}
            {images.length > 1 && (
                <>
                    <button className="pd-arr pd-arr-l" onClick={goPrev}><ChevronLeft size={18} /></button>
                    <button className="pd-arr pd-arr-r" onClick={goNext}><ChevronRight size={18} /></button>
                    <div className="pd-dots-row">
                        {images.map((_, i) => (
                            <button key={i} className={`pd-dot ${i === idx ? 'active' : ''}`}
                                onClick={() => setIdx(i)} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

/* ─── Ingredient card ─── */
const IngCard = ({ name, selected, onToggle }) => (
    <div className={`ing-card ${selected ? 'ing-selected' : ''}`} onClick={onToggle}>
        <span className="ing-icon">{getIcon(name)}</span>
        <span className="ing-name">{name}</span>
        <span className="ing-check"><Check size={12} /></span>
    </div>
);

/* ═══════ MAIN ═══════ */
const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState({});

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`)
            .then(res => { if (!res.ok) throw new Error(); return res.json(); })
            .then(data => { setProduct(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [productId]);

    /* Pre-select all ingredients on load */
    useEffect(() => {
        if (!product?.description) return;
        const ings = product.description.split(',').map(s => s.trim()).filter(Boolean);
        const initial = {};
        ings.forEach(ing => { initial[ing] = true; });
        setSelectedIngredients(initial);
    }, [product]);

    const toggleIng = (ing) => setSelectedIngredients(prev => ({ ...prev, [ing]: !prev[ing] }));

    const addToOrder = () => {
        const currentOrder = JSON.parse(localStorage.getItem('miramar_cart') || '[]');
        const existingItem = currentOrder.find(item => item.product_id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            currentOrder.push({ product_id: product.id, name: product.name, price: product.price, quantity });
        }
        localStorage.setItem('miramar_cart', JSON.stringify(currentOrder));
        setAdded(true);
        setTimeout(() => navigate('/order'), 900);
    };

    if (loading) return (
        <div className="pd-loader"><div className="pd-spinner" /><p>Loading…</p></div>
    );
    if (!product) return (
        <div className="pd-loader"><p style={{ color: '#999' }}>Product not found.</p></div>
    );

    const images = product.images?.length > 0 ? product.images : [];
    const ingredients = product.description
        ? product.description.split(',').map(s => s.trim()).filter(Boolean)
        : [];

    return (
        <div className="pd-page">
            {/* Back button */}
            <button className="pd-back-btn" onClick={() => navigate(-1)}>
                <ChevronLeft size={20} />
            </button>

            <div className="pd-layout">
                {/* ── LEFT: Image ── */}
                <div className="pd-left">
                    <ImageCarousel images={images} productName={product.name} />
                </div>

                {/* ── RIGHT: Info ── */}
                <div className="pd-right">
                    {/* Category badge */}
                    {product.Category && (
                        <span className="pd-category-badge">{product.Category.name}</span>
                    )}

                    {/* Name + Price */}
                    <div className="pd-name-row">
                        <h1 className="pd-name">{product.name}</h1>
                        <span className="pd-price">MAD {product.price}</span>
                    </div>

                    {/* Stars */}
                    <div className="pd-stars">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#d4a017" stroke="#d4a017" />)}
                        <span>5.0 · Très bien noté</span>
                    </div>

                    {/* Description (if not just ingredients) */}
                    {product.description && (
                        <p className="pd-desc">
                            {/* Show description only if it looks like a sentence, not a plain list */}
                            {product.description.length > 80 ? product.description : ''}
                        </p>
                    )}

                    {/* ── Ingredients section ── */}
                    {ingredients.length > 0 && (
                        <div className="pd-ing-section">
                            <h3 className="pd-ing-title">
                                🧾 Ingrédients
                                <span className="pd-ing-hint">Appuyez pour retirer</span>
                            </h3>
                            <div className="pd-ing-grid">
                                {ingredients.map((ing, i) => (
                                    <IngCard
                                        key={i}
                                        name={ing}
                                        selected={selectedIngredients[ing] !== false}
                                        onToggle={() => toggleIng(ing)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Note */}
                    {product.note && (
                        <div className="pd-note">
                            <strong>📌</strong> {product.note}
                        </div>
                    )}

                    {/* Quantity + CTA */}
                    <div className="pd-bottom">
                        <div className="pd-qty">
                            <button className="pd-qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                            <span className="pd-qty-val">{quantity}</span>
                            <button className="pd-qty-btn pd-qty-plus" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>

                        <button className={`pd-cta ${added ? 'pd-cta-added' : ''}`} onClick={addToOrder} disabled={added}>
                            <ShoppingCart size={20} />
                            {added ? '✓ Ajouté !' : `Commander — MAD ${(product.price * quantity).toFixed(2)}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
