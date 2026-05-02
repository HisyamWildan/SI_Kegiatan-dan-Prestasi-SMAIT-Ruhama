import React, { useState, useEffect } from 'react';
import { Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { 
    AuthWrapper, 
    AuthSideImage, 
    AuthSideContent, 
    AuthFormArea, 
    AuthCard, 
    AuthTitle, 
    PrimaryButton,
    FormLabel,
    StyledInput
} from './Auth.styled';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [pageTransition, setPageTransition] = useState(false);
    const navigate = useNavigate();

    const images = [
        '/assets/img/gedung.png',
        '/assets/img/guru.png',
        '/assets/img/murid.png'
    ];

    useEffect(() => {
        setPageTransition(true);
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/login', { email: formData.email, password: formData.password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            if (res.data.user.role === 'siswa') {
                navigate('/');
            } else if (res.data.user.role === 'admin') {
                navigate('/dashboard/admin');
            } else if (res.data.user.role === 'guru') {
                navigate('/dashboardguru/guru');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Email atau password salah');
        } finally {
            setLoading(false);
        }
    };

    const handleToRegister = (e) => {
        e.preventDefault();
        setPageTransition(false);
        setTimeout(() => navigate('/register'), 300);
    };

    return (
        <div style={{ 
            opacity: pageTransition ? 1 : 0, 
            transform: pageTransition ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.4s ease-out'
        }}>
            <AuthWrapper reverse>
                <AuthSideImage image={images[currentImageIndex]}>
                    <AuthSideContent>
                        <h1>Sistem Informasi<span> SMAIT Ruhama</span></h1>
                        <p>Selamat datang kembali! Silakan masuk untuk mengakses panel kendali sekolah Anda.</p>
                    </AuthSideContent>
                </AuthSideImage>

                <AuthFormArea>
                    <AuthCard>
                        <div className="mb-3">
                            <AuthTitle>Masuk</AuthTitle>
                            <p className="text-muted small">Masukkan kredensial Anda di bawah ini.</p>
                        </div>

                        {error && <Alert variant="danger" className="py-2 small border-0 rounded-3">{error}</Alert>}

                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3">
                                <FormLabel>Alamat Email</FormLabel>
                                <StyledInput 
                                    type="email" 
                                    name="email"
                                    placeholder="nama@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <FormLabel>Kata Sandi</FormLabel>
                                <StyledInput 
                                    type="password" 
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>

                            <PrimaryButton type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" animation="border" /> : 'Masuk Ke Sistem'}
                            </PrimaryButton>
                        </Form>

                        <div className="text-center mt-4">
                            <p className="text-muted small mb-2">Belum memiliki akun?</p>
                            <a href="/register" onClick={handleToRegister} className="text-decoration-none fw-bold" style={{ color: '#f97316' }}>
                                Daftar Akun Siswa
                            </a>
                            <div className="mt-3 pt-2 border-top">
                                <Link to="/" className="text-muted small text-decoration-none">
                                    <i className="bi bi-arrow-left me-1"></i> Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </AuthCard>
                </AuthFormArea>
            </AuthWrapper>
        </div>
    );
};

export default Login;
