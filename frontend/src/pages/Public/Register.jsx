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

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(2); // Start with murid
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

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await api.post('/register', formData);
            setSuccess('Registrasi berhasil! Mengalihkan ke login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registrasi gagal. Coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleToLogin = (e) => {
        e.preventDefault();
        setPageTransition(false);
        setTimeout(() => navigate('/login'), 300);
    };

    return (
        <div style={{ 
            opacity: pageTransition ? 1 : 0, 
            transform: pageTransition ? 'translateX(0)' : 'translateX(20px)',
            transition: 'all 0.4s ease-out'
        }}>
            <AuthWrapper>
                <AuthSideImage image={images[currentImageIndex]}>
                    <AuthSideContent>
                        <h1>Bergabung dengan<span> SMAIT Ruhama</span></h1>
                        <p>Daftarkan akun siswa Anda untuk mulai melaporkan prestasi dan memantau kegiatan sekolah.</p>
                    </AuthSideContent>
                </AuthSideImage>

                <AuthFormArea>
                    <AuthCard>
                        <div className="mb-3">
                            <AuthTitle>Daftar</AuthTitle>
                            <p className="text-muted small">Lengkapi data di bawah untuk mendaftar.</p>
                        </div>

                        {error && <Alert variant="danger" className="py-2 small border-0 rounded-3">{error}</Alert>}
                        {success && <Alert variant="success" className="py-2 small border-0 rounded-3">{success}</Alert>}

                        <Form onSubmit={handleRegister}>
                            <Form.Group className="mb-3">
                                <FormLabel>Nama Lengkap</FormLabel>
                                <StyledInput 
                                    type="text" 
                                    name="name"
                                    placeholder="Nama lengkap"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>

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
                                    placeholder="Minimal 6 karakter"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                    minLength={6}
                                />
                            </Form.Group>

                            <PrimaryButton type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" animation="border" /> : 'Buat Akun Sekarang'}
                            </PrimaryButton>
                        </Form>

                        <div className="text-center mt-3">
                            <p className="text-muted small mb-2">Sudah memiliki akun?</p>
                            <a href="/login" onClick={handleToLogin} className="text-decoration-none fw-bold" style={{ color: '#f97316' }}>
                                Login Sekarang
                            </a>
                            <div className="mt-3 pt-2 border-top">
                                <Link to="/" className="text-muted small text-decoration-none">
                                    <i className="bi bi-arrow-left me-1"></i> Beranda
                                </Link>
                            </div>
                        </div>
                    </AuthCard>
                </AuthFormArea>
            </AuthWrapper>
        </div>
    );
};

export default Register;
