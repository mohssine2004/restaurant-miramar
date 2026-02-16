import { useState } from 'react';

const Reservation = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        reservation_date: '',
        reservation_time: '',
        number_of_people: 2
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', phone: '', reservation_date: '', reservation_time: '', number_of_people: 2 });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '50px 20px' }}>
                <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
                <h2>Reservation Received!</h2>
                <p>We look forward to seeing you.</p>
                <button className="btn" onClick={() => setStatus('idle')} style={{ marginTop: '20px' }}>Make Another Reservation</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="section-title">Book a Table</h2>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>

                <label className="input-label">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" placeholder="Your Name" />

                <label className="input-label">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="input-field" placeholder="06..." />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label className="input-label">Date</label>
                        <input type="date" name="reservation_date" value={formData.reservation_date} onChange={handleChange} required className="input-field" />
                    </div>
                    <div>
                        <label className="input-label">Time</label>
                        <input type="time" name="reservation_time" value={formData.reservation_time} onChange={handleChange} required className="input-field" />
                    </div>
                </div>

                <label className="input-label">Number of People</label>
                <select name="number_of_people" value={formData.number_of_people} onChange={handleChange} className="input-field">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num} People</option>
                    ))}
                </select>

                <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }} disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Booking...' : 'Confirm Reservation'}
                </button>
            </form>
        </div>
    );
};

export default Reservation;
