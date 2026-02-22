import { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Star, ChevronRight, Heart, Utensils, Eye, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import './home.css';

/* ─────────────── Hero Slides ─────────────── */
const heroSlides = [
    {
        img: '/images/vibe/nightveiw.jpg',
        title: 'Where the \nSea Meets \nFlavour',
        sub: 'Experience the finest Mediterranean & Moroccan cuisine with a breathtaking view of the Tangier Bay.',
    },
    {
        img: '/images/vibe/view.jpg',
        title: 'Dine Above\nthe Horizon',
        sub: 'Savour every bite while the shimmering Tangier coastline unfolds before you.',
    },
    {
        img: '/images/vibe/veiw.jpg',
        title: 'A Table\nWith a Story',
        sub: 'Panoramic marina views, handcrafted dishes and memories that last a lifetime.',
    },
];

/* ─────────────── Gallery images ─────────────── */
const galleryImages = [
    { src: '/images/vibe/unnamed.jpg', span: 'tall', caption: 'Our Dining Room' },
    { src: '/images/vibe/unnamed (1).jpg', span: 'normal', caption: 'Cozy Booths' },
    { src: '/images/vibe/unnamed (2).jpg', span: 'normal', caption: 'Evening Ambience' },
    { src: '/images/vibe/unnamed (3).jpg', span: 'wide', caption: 'The Terrace' },
];

/* ─────────────── Popular dishes ─────────────── */
const dishes = [
    { img: '/images/img1.png', name: 'Gourmet Burger', price: '85', tag: 'Best Seller', desc: 'Juicy premium beef patty with house sauce & caramelised onions.' },
    { img: '/images/img2.png', name: 'Seafood Pasta', price: '120', tag: 'Chef\'s Pick', desc: 'Al-dente pasta tossed with fresh seafood in a white wine cream sauce.' },
    { img: '/images/img5.png', name: 'Grilled Salmon', price: '140', tag: 'Healthy', desc: 'Atlantic salmon fillet grilled to perfection with lemon herb butter.' },
    { img: '/images/img8.png', name: 'Moroccan Tagine', price: '95', tag: 'Traditional', desc: 'Slow-cooked lamb with preserved lemon, olives and aromatic spices.' },
];

/* ════════════════ HOME PAGE ════════════════ */
const Home = () => {
    const [slide, setSlide] = useState(0);
    const [likedDishes, setLikedDishes] = useState({});
    const [visibleDishes, setVisibleDishes] = useState([]);

    /* Auto-advance hero slider */
    useEffect(() => {
        const id = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000);
        return () => clearInterval(id);
    }, []);

    /* Staggered entrance for dish cards */
    useEffect(() => {
        dishes.forEach((_, i) => {
            setTimeout(() => setVisibleDishes(prev => [...prev, i]), i * 150 + 300);
        });
    }, []);

    const toggleLike = (i) => setLikedDishes(prev => ({ ...prev, [i]: !prev[i] }));

    return (
        <div className="home-page">

            {/* ── HERO SLIDER ── */}
            <section className="hero-slider">
                {heroSlides.map((s, i) => (
                    <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${s.img})` }}>
                        <div className="hero-overlay" />
                    </div>
                ))}

                <div className="hero-content container">
                    <h1 className="hero-title">
                        {heroSlides[slide].title.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                        ))}
                    </h1>
                    <p className="hero-sub">{heroSlides[slide].sub}</p>
                    <div className="hero-actions">
                        <Link to="/menu" className="btn btn-gold">Explore Menu</Link>
                        <Link to="/reservation" className="btn btn-outline-white">Book a Table</Link>
                    </div>
                </div>

                {/* Dots */}
                <div className="hero-dots">
                    {heroSlides.map((_, i) => (
                        <button key={i} className={`dot ${i === slide ? 'active' : ''}`}
                            onClick={() => setSlide(i)} />
                    ))}
                </div>

                {/* Rating badge */}
                <div className="hero-rating-badge">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="#d4a017" stroke="#d4a017" size={14} />)}
                    <span>3.9 · 19 reviews</span>
                </div>
            </section>

            {/* Info Cards */}
            <div className="info-strip container">
                <InfoCard icon={<MapPin size={22} color="var(--primary-color)" />}
                    title="Visit Us"
                    line1="168 Ave Mohammed VI, Tangier 90000"
                    link="Get Directions" href="#" />
                <InfoCard icon={<Clock size={22} color="var(--primary-color)" />}
                    title="Opening Hours"
                    line1="Sunday – Saturday"
                    line2="7:00 AM – 12:00 AM" />
                <InfoCard icon={<Phone size={22} color="var(--primary-color)" />}
                    title="Reservations"
                    line1="06 61 34 97 12"
                    link="Book Now" to="/reservation" />
            </div>

            {/* ── POPULAR DISHES ── */}
            <section className="dishes-section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <span className="section-eyebrow">Handpicked for You</span>
                            <h2 className="section-title-left">Popular Dishes</h2>
                        </div>
                        <Link to="/menu" className="see-all-link">See All <ChevronRight size={18} /></Link>
                    </div>

                    <div className="dishes-grid">
                        {dishes.map((d, i) => (
                            <DishCard key={i} dish={d} index={i}
                                liked={!!likedDishes[i]}
                                onLike={() => toggleLike(i)}
                                visible={visibleDishes.includes(i)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALLERY / AMBIENCE ── */}
            <section className="gallery-section">
                <div className="container">
                    <span className="section-eyebrow centered">Step Inside</span>
                    <h2 className="section-title">Our Ambience</h2>

                    <div className="gallery-grid">
                        {galleryImages.map((g, i) => (
                            <div key={i} className={`gallery-item gallery-${g.span}`}>
                                <img src={g.src} alt={g.caption} />
                                <div className="gallery-caption">{g.caption}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── EXPERIENCE BANNER ── */}
            <section className="experience-banner"
                style={{ backgroundImage: 'url(/images/vibe/nightveiw.jpg)' }}>
                <div className="experience-overlay" />
                <div className="experience-content container">
                    <span className="section-eyebrow">Tangier's Finest</span>
                    <h2>An Unforgettable Culinary Experience</h2>
                    <p>Fresh ingredients, passionate chefs, and a panoramic ocean view — this is Miramar.</p>
                    <Link to="/reservation" className="btn btn-gold">Reserve Your Table</Link>
                </div>
            </section>

        </div>
    );
};

/* ─────────────── Sub-components ─────────────── */

const InfoCard = ({ icon, title, line1, line2, link, href, to }) => (
    <div className="info-card glass-card">
        <div className="info-icon">{icon}</div>
        <div>
            <h3>{title}</h3>
            <p>{line1}</p>
            {line2 && <p className="info-highlight">{line2}</p>}
            {link && to && <Link to={to} className="info-link">{link} <ChevronRight size={14} /></Link>}
            {link && href && <a href={href} className="info-link">{link} <ChevronRight size={14} /></a>}
        </div>
    </div>
);

const DishCard = ({ dish, liked, onLike, visible }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className={`dish-card ${visible ? 'dish-visible' : ''} ${hovered ? 'dish-hovered' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>

            {/* Image container */}
            <div className="dish-img-wrap">
                <img src={dish.img} alt={dish.name} className="dish-img" />

                {/* Tag */}
                <span className="dish-tag">{dish.tag}</span>

                {/* Like button */}
                <button className={`dish-like ${liked ? 'liked' : ''}`} onClick={onLike}>
                    <Heart size={16} fill={liked ? '#d4a017' : 'none'} stroke={liked ? '#d4a017' : '#fff'} />
                </button>

                {/* Hover overlay with quick-action icons */}
                <div className="dish-hover-overlay">
                    <Link to="/menu" className="dish-action-btn" title="View Details">
                        <Eye size={18} />
                    </Link>
                    <Link to="/menu" className="dish-action-btn" title="Order Now">
                        <ShoppingBag size={18} />
                    </Link>
                </div>
            </div>

            {/* Info */}
            <div className="dish-info">
                <div className="dish-top-row">
                    <h3 className="dish-name">{dish.name}</h3>
                    <span className="dish-price">MAD {dish.price}</span>
                </div>
                <p className="dish-desc">{dish.desc}</p>

                {/* Stars */}
                <div className="dish-stars">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} size={12} fill="#d4a017" stroke="#d4a017" />
                    ))}
                    <span className="dish-rating-text">5.0</span>
                </div>

                <Link to="/menu" className="dish-order-btn">
                    <Utensils size={15} /> Order Now
                </Link>
            </div>
        </div>
    );
};

export default Home;
