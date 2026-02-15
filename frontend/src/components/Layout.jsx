import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, CalendarDays, ShoppingBag } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout">
            {/* Header */}
            <header className="header" style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--white)',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/images/logo.jpg" alt="Miramar Logo" style={{ height: '40px', borderRadius: '50%' }} />
                    <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>Miramar Restaurant</h1>
                </Link>
            </header>

            {/* Main Content */}
            <main style={{ padding: '20px 0', minHeight: '80vh' }}>
                <Outlet />
            </main>

            {/* Bottom Navigation for Mobile */}
            <nav className="bottom-nav" style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                backgroundColor: 'var(--white)',
                borderTop: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-around',
                padding: '10px 0',
                zIndex: 100
            }}>
                <NavItem to="/" icon={<Home size={24} />} label="Home" active={isActive('/')} />
                <NavItem to="/menu" icon={<UtensilsCrossed size={24} />} label="Menu" active={isActive('/menu') || isActive('/product')} />
                <NavItem to="/reservation" icon={<CalendarDays size={24} />} label="Reservation" active={isActive('/reservation')} />
                <NavItem to="/order" icon={<ShoppingBag size={24} />} label="Order" active={isActive('/order')} />
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
        fontSize: '0.8rem',
        gap: '4px'
    }}>
        {icon}
        <span>{label}</span>
    </Link>
);

export default Layout;
