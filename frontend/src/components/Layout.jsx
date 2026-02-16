import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, CalendarDays, ShoppingBag, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Layout = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Check if we are on the home page to apply special header styles
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout">
            {/* Header */}
            <header className="header" style={{
                backgroundColor: isHome && !scrolled ? 'transparent' : 'white',
                color: isHome && !scrolled ? 'white' : 'var(--secondary-color)',
                padding: '0 25px',
                height: 'var(--header-height)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                transition: 'all 0.3s ease',
                boxShadow: isHome && !scrolled ? 'none' : '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                {/* Logo - Left Side */}
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none'
                }}>
                    <img
                        src="/images/logo.jpg"
                        alt="Miramar Logo"
                        style={{
                            height: '40px',
                            width: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid var(--primary-color)'
                        }}
                    />
                    <h1 style={{
                        fontSize: '1.4rem',
                        margin: 0,
                        color: 'inherit',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '1px'
                    }}>MIRAMAR</h1>
                </Link>

                {/* Hamburger Menu - Right Side */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        zIndex: 1001
                    }}
                    aria-label="Toggle menu"
                >
                    <span style={{
                        width: '28px',
                        height: '3px',
                        backgroundColor: 'currentColor',
                        transition: 'all 0.3s',
                        transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
                    }}></span>
                    <span style={{
                        width: '28px',
                        height: '3px',
                        backgroundColor: 'currentColor',
                        transition: 'all 0.3s',
                        opacity: menuOpen ? 0 : 1
                    }}></span>
                    <span style={{
                        width: '28px',
                        height: '3px',
                        backgroundColor: 'currentColor',
                        transition: 'all 0.3s',
                        transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
                    }}></span>
                </button>
            </header>

            {/* Slide-out Menu */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: menuOpen ? 0 : '-100%',
                width: '280px',
                height: '100vh',
                backgroundColor: 'white',
                boxShadow: '-5px 0 25px rgba(0,0,0,0.1)',
                zIndex: 999,
                transition: 'right 0.3s ease',
                paddingTop: 'var(--header-height)',
                overflow: 'auto'
            }}>
                <nav style={{ padding: '30px 0' }}>
                    <MenuItem
                        to="/"
                        icon={<Home size={24} />}
                        label="Home"
                        active={isActive('/')}
                    />
                    <MenuItem
                        to="/menu"
                        icon={<UtensilsCrossed size={24} />}
                        label="Menu"
                        active={isActive('/menu')}
                    />
                    <MenuItem
                        to="/reservation"
                        icon={<CalendarDays size={24} />}
                        label="Book Table"
                        active={isActive('/reservation')}
                    />
                    <MenuItem
                        to="/order"
                        icon={<ShoppingBag size={24} />}
                        label="Order"
                        active={isActive('/order')}
                    />
                </nav>
            </div>

            {/* Overlay when menu is open */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 998,
                        transition: 'opacity 0.3s ease'
                    }}
                />
            )}

            {/* Main Content */}
            <main style={{
                minHeight: '100vh',
                paddingTop: isHome ? '0' : 'var(--header-height)',
                paddingBottom: '20px' // No bottom nav anymore
            }}>
                <Outlet />
            </main>
        </div>
    );
};

const MenuItem = ({ to, icon, label, active }) => (
    <Link to={to} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '18px 30px',
        textDecoration: 'none',
        color: active ? 'var(--primary-color)' : 'var(--secondary-color)',
        backgroundColor: active ? 'rgba(212, 160, 23, 0.1)' : 'transparent',
        borderLeft: active ? '4px solid var(--primary-color)' : '4px solid transparent',
        transition: 'all 0.3s',
        fontWeight: active ? '600' : '400',
        fontSize: '1.1rem'
    }}>
        {icon}
        <span>{label}</span>
    </Link>
);

export default Layout;
