import { MapPin, Clock, Phone, Star, ChevronRight, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            {/* Full Screen Hero Section */}
            <section className="hero" style={{
                height: '100vh',
                width: '100%',
                backgroundImage: 'url(/images/img18.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end', // Align text to bottom like modern apps
                justifyContent: 'flex-start',
                paddingBottom: '100px'
            }}>
                {/* Dark Overlay Gradient */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)',
                    zIndex: 1
                }}></div>

                {/* Hero Content */}
                <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                    <div style={{ color: 'white', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} fill="#d4a017" stroke="#d4a017" size={18} />
                            ))}
                            <span style={{ marginLeft: '10px', fontSize: '0.9rem', opacity: 0.9 }}>3.9 (19 reviews)</span>
                        </div>

                        <h1 style={{
                            fontSize: '3.5rem',
                            lineHeight: '1.1',
                            marginBottom: '15px',
                            color: 'white',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                            Restaurant Miramar
                        </h1>

                        <p style={{
                            fontSize: '1.1rem',
                            marginBottom: '30px',
                            opacity: 0.9,
                            fontFamily: 'var(--font-body)',
                            maxWidth: '400px'
                        }}>
                            Experience the finest flavors of Tangier in an elegant setting.
                        </p>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Link to="/menu" className="btn" style={{
                                backgroundColor: 'var(--primary-color)',
                                color: 'white',
                                border: 'none',
                                padding: '15px 35px'
                            }}>
                                View Menu
                            </Link>
                            <Link to="/reservation" className="btn" style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                borderColor: 'white'
                            }}>
                                Book Table
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Cards - Floating up slightly */}
            <div className="container" style={{ marginTop: '-60px', position: 'relative', zIndex: 3, marginBottom: '60px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {/* Location Card */}
                    <div className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                        <div style={{ backgroundColor: 'rgba(212, 160, 23, 0.1)', padding: '12px', borderRadius: '50%' }}>
                            <MapPin size={24} color="var(--primary-color)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Visit Us</h3>
                            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '10px' }}>168 Ave Mohammed VI, Tangier 90000</p>
                            <a href="#" style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                                Get Directions <ChevronRight size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Hours Card */}
                    <div className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                        <div style={{ backgroundColor: 'rgba(212, 160, 23, 0.1)', padding: '12px', borderRadius: '50%' }}>
                            <Clock size={24} color="var(--primary-color)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Opening Hours</h3>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>Sunday - Saturday</p>
                            <p style={{ fontWeight: '600', color: 'var(--secondary-color)' }}>7:00 AM – 12:00 AM</p>
                        </div>
                    </div>

                    {/* Contact Card */}
                    <div className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                        <div style={{ backgroundColor: 'rgba(212, 160, 23, 0.1)', padding: '12px', borderRadius: '50%' }}>
                            <Phone size={24} color="var(--primary-color)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Reservations</h3>
                            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '10px' }}>06 61 34 97 12</p>
                            <Link to="/reservation" style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                                Call Now <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Items Section */}
            <div className="container" style={{ paddingBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '30px' }}>
                    <h2 className="section-title" style={{ width: 'auto', margin: 0, textAlign: 'left' }}>Popular Dishes</h2>
                    <Link to="/menu" style={{ color: 'var(--primary-color)', fontWeight: '600', display: 'flex', alignItems: 'center' }}>See All <ChevronRight size={18} /></Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '25px'
                }}>
                    <PopularItem img="/images/img1.png" name="Gourmet Burger" price="85" />
                    <PopularItem img="/images/img2.png" name="Seafood Pasta" price="120" />
                    <PopularItem img="/images/img5.png" name="Grilled Salmon" price="140" />
                    <PopularItem img="/images/img8.png" name="Moroccan Tagine" price="95" />
                </div>
            </div>
        </div>
    );
};

const PopularItem = ({ img, name, price }) => (
    <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        backgroundColor: 'white',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
    }}>
        <div style={{ position: 'relative', height: '200px' }}>
            <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: 'white',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <Heart size={18} color="#d4a017" />
            </button>
        </div>
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{name}</h3>
                <span style={{ fontWeight: '700', color: 'var(--primary-color)' }}>MAD {price}</span>
            </div>
            <p style={{ color: '#888', fileSize: '0.9rem', marginBottom: '15px' }}>Freshly prepared with local ingredients.</p>
        </div>
    </div>
);

export default Home;
