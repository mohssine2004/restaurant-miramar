import { MapPin, Clock, Phone, Star } from 'lucide-react';

const Home = () => {
    return (
        <div className="home-page container">
            <div className="hero" style={{
                textAlign: 'center',
                marginBottom: '30px',
                padding: '40px 20px',
                backgroundColor: 'var(--secondary-color)',
                color: 'white',
                borderRadius: '12px',
                backgroundImage: 'url(/images/img8.png)', // Using one of the provided images as background
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}>
                <div className="overlay" style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: '12px'
                }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Welcome to Miramar</h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Experience the best flavors in Tangier</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '10px' }}>
                        <Star fill="#FFD700" stroke="#FFD700" size={20} />
                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>3.9</span>
                        <span style={{ fontSize: '0.9rem' }}>(19 Reviews)</span>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <InfoItem icon={<Clock />} title="Open Now" subtitle="7 AM - 12 AM (Everyday)" />
                <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <MapPin color="var(--primary-color)" />
                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Location</h3>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>168 Ave Mohammed VI, Tangier 90000</p>
                            <a href="https://maps.google.com/?q=Miramar+Restaurant+Tangier" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontSize: '0.9rem', marginTop: '5px', display: 'inline-block' }}>Get Directions</a>
                        </div>
                    </div>
                </div>
                <InfoItem icon={<Phone />} title="Call Us" subtitle="06 61 34 97 12" />
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <h3 className="section-title">Popular Items</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                    <img src="/images/img1.png" alt="Popular 1" style={{ borderRadius: '8px', width: '100%', height: '120px', objectFit: 'cover' }} />
                    <img src="/images/img2.png" alt="Popular 2" style={{ borderRadius: '8px', width: '100%', height: '120px', objectFit: 'cover' }} />
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, title, subtitle }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '12px', marginBottom: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ color: 'var(--primary-color)' }}>{icon}</div>
        <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '2px' }}>{title}</h3>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>{subtitle}</p>
        </div>
    </div>
);

export default Home;
