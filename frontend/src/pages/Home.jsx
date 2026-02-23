import { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Phone, Star, ChevronRight, Heart, Utensils, Eye, ShoppingBag, Quote, User } from 'lucide-react';
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
    { src: '/images/vibe/unnamed (3).jpg', span: 'normal', caption: 'The Terrace' },
    { src: '/images/vibe/unnamed (4).jpg', span: 'normal', caption: 'Relaxing Vibes' },
];

const Home = () => {
    const [slide, setSlide] = useState(0);
    const [likedDishes, setLikedDishes] = useState({});
    const [popularDishes, setPopularDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    /* Auto-advance hero slider */
    useEffect(() => {
        const id = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000);
        return () => clearInterval(id);
    }, []);

    /* Fetch popular dishes from API */
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products/popular`)
            .then(res => res.json())
            .then(data => {
                setPopularDishes(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching popular dishes:', err);
                setLoading(false);
            });
    }, []);

    const toggleLike = (id) => setLikedDishes(prev => ({ ...prev, [id]: !prev[id] }));

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
                        {loading ? (
                            <div className="pl-loader" style={{ gridColumn: '1/-1', minHeight: '200px' }}>
                                <div className="pl-spinner" />
                            </div>
                        ) : (
                            popularDishes.map((p, i) => (
                                <DishCard
                                    key={p.id}
                                    dish={p}
                                    index={i}
                                    liked={!!likedDishes[p.id]}
                                    onLike={() => toggleLike(p.id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS / REVIEWS ── */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header-centered">
                        <span className="section-eyebrow centered">Google Reviews</span>
                        <h2 className="section-title centered">What Our Clients Say</h2>
                        <div className="overall-rating">
                            <div className="stars">
                                {[1, 2, 3, 4].map(i => <Star key={i} fill="#d4a017" stroke="#d4a017" size={20} />)}
                                <Star fill="none" stroke="#d4a017" size={20} />
                            </div>
                            <span className="rating-num">4.0</span>
                            <span className="review-count">(Based on Google Maps Reviews)</span>
                        </div>
                    </div>

                    <div className="testimonials-grid">
                        <TestimonialCard
                            name="Local Guide"
                            date="Dinner"
                            text="Good burgers, a beautiful view, and a comfortable, family-friendly atmosphere."
                            rating={4}
                        />
                        <TestimonialCard
                            name="Pizza Lover"
                            date="Excellent Service"
                            text="Good pizza, excellent service! Great value for money (MAD 1–50)."
                            rating={5}
                        />
                        <TestimonialCard
                            name="Traditional Guest"
                            date="Lunch"
                            text="Moroccan couscous on Friday in a family atmosphere. Thank you to the restaurant staff for the warm welcome. Perfect for Moroccan and foreign guests."
                            rating={5}
                        />
                    </div>

                    <div className="testimonials-cta">
                        <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="btn-review">
                            Write a Review on Google
                        </a>
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

const DishCard = ({ dish, liked, onLike }) => {
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const firstImg = dish.images && dish.images.length > 0 ? dish.images[0] : null;

    return (
        <div
            ref={ref}
            className={`dish-card ${visible ? 'dish-visible' : ''} ${hovered ? 'dish-hovered' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>

            {/* Image container */}
            <div className="dish-img-wrap">
                {firstImg ? (
                    <img src={firstImg} alt={dish.name} className="dish-img" />
                ) : (
                    <div className="pc-img-fallback" style={{ height: '100%', display: 'flex' }}>🍽️</div>
                )}

                {/* Tag */}
                <span className="dish-tag">{dish.Category?.name || 'Popular'}</span>

                {/* Like button */}
                <button className={`dish-like ${liked ? 'liked' : ''}`} onClick={(e) => { e.preventDefault(); onLike(); }}>
                    <Heart size={16} fill={liked ? '#d4a017' : 'none'} stroke={liked ? '#d4a017' : '#fff'} />
                </button>

                {/* Hover overlay with quick-action icons */}
                <div className="dish-hover-overlay">
                    <Link to={`/product/${dish.id}`} className="dish-action-btn" title="View Details">
                        <Eye size={18} />
                    </Link>
                </div>
            </div>

            {/* Info */}
            <div className="dish-info">
                <div className="dish-top-row">
                    <h3 className="dish-name">{dish.name}</h3>
                    <span className="dish-price">MAD {dish.price}</span>
                </div>
                <p className="dish-desc">{dish.description?.substring(0, 80)}...</p>

                {/* Stars */}
                <div className="dish-stars">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} size={12} fill="#d4a017" stroke="#d4a017" />
                    ))}
                    <span className="dish-rating-text">5.0</span>
                </div>

                <Link to={`/product/${dish.id}`} className="dish-order-btn">
                    <Utensils size={15} /> Order Now
                </Link>
            </div>
        </div>
    );
};

const TestimonialCard = ({ name, date, text, rating }) => (
    <div className="testimonial-card glass-card">
        <div className="testimonial-header">
            <div className="testimonial-user">
                <div className="user-avatar">
                    <User size={20} color="#fff" />
                </div>
                <div>
                    <h4>{name}</h4>
                    <span>{date}</span>
                </div>
            </div>
            <div className="testimonial-quote">
                <Quote size={24} fill="var(--primary-color)" stroke="none" opacity={0.3} />
            </div>
        </div>
        <div className="testimonial-stars">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < rating ? "#d4a017" : "none"} stroke="#d4a017" />
            ))}
        </div>
        <p className="testimonial-text">"{text}"</p>
    </div>
);

export default Home;
