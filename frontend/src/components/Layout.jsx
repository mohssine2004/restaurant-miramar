import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, CalendarDays, ShoppingBag, Menu as MenuIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const Layout = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Check if we are on the home page to apply special header styles
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout">
            {/* Header: Transparent on Home (unless scrolled), Solid elsewhere */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="menu-trigger">
                        <MenuIcon size={28} />
                    </div>

                    {/* Only show logo text on scroll or non-home pages to keep hero clean, or keep it always if preferred */}
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
                </div>

                {/* Desktop Nav (could be hidden on mobile) */}
                <div className="desktop-nav" style={{ display: 'none' }}>
                    {/* Add desktop links if needed later */}
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                minHeight: '100vh',
                paddingTop: isHome ? '0' : 'var(--header-height)'
            }}>
                <Outlet />
            </main>

            {/* Bottom Navigation for Mobile */}
            <nav className="bottom-nav" style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-around',
                padding: '12px 0',
                zIndex: 1000,
                boxShadow: '0 -5px 20px rgba(0,0,0,0.03)'
            }}>
                <NavItem to="/" icon={<Home size={22} />} label="Home" active={isActive('/')} />
                <NavItem to="/menu" icon={<UtensilsCrossed size={22} />} label="Menu" active={isActive('/menu') || isActive('/product')} />
                <NavItem to="/reservation" icon={<CalendarDays size={22} />} label="Book" active={isActive('/reservation')} />
                <NavItem to="/order" icon={<ShoppingBag size={22} />} label="Order" active={isActive('/order')} />
            </nav>
        </div>
    );
};

const NavItem = ({ to, icon, label, active }) => (
    <Link to={to} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: active ? 'var(--primary-color)' : '#999',
        fontSize: '0.7rem',
        gap: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontWeight: active ? '600' : '400',
        transition: 'color 0.2s'
    }}>
        {icon}
        <span>{label}</span>
    </Link>
);

export default Layout;
