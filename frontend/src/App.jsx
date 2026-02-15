import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Reservation from './pages/Reservation';
import Order from './pages/Order';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="menu" element={<Menu />} />
                    <Route path="menu/:categoryId" element={<ProductList />} />
                    <Route path="product/:productId" element={<ProductDetail />} />
                    <Route path="reservation" element={<Reservation />} />
                    <Route path="order" element={<Order />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
