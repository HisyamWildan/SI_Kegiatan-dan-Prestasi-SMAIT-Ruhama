import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { 
    UploadContainer, 
    StyledCard, 
    FormSectionTitle, 
    PreviewBox, 
    RemoveButton, 
    SubmitButton 
} from './UploadPrestasi.styled';

const UploadPrestasi = () => {
    const [categories, setCategories] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        student_name: user?.name || '',
        class_name: '',
        achievement_level: '',
        date: '',
        location: '',
        description: '',
        categories_id: '',
        image: null,
        image2: null,
        image3: null,
        certificate: null
    });

    const [previews, setPreviews] = useState({
        image: null,
        image2: null,
        image3: null,
        certificate: null
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories?type=prestasi');
                setCategories(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, [field]: file });
            setPreviews({ ...previews, [field]: URL.createObjectURL(file) });
        }
    };

    const handleRemoveFile = (field) => {
        setFormData({ ...formData, [field]: null });
        setPreviews({ ...previews, [field]: null });
        // Clear the file input
        const input = document.getElementById(`file-input-${field}`);
        if (input) input.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        if (!formData.image || !formData.certificate) {
            setError('Foto Dokumentasi Utama & Bukti wajib diunggah.');
            setIsSubmitting(false);
            return;
        }

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key]) data.append(key, formData[key]);
            });

            await api.post('/prestasi', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSuccess('Berhasil! Prestasi Anda telah dikirim dan menunggu verifikasi.');
            setTimeout(() => {
                navigate('/dashboardsiswa/riwayat');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Gagal mengupload prestasi. Pastikan ukuran file tidak melebihi 2MB.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <UploadContainer>
            <div className="mb-4">
                <h3 className="fw-bold text-dark mb-1">Upload Prestasi Baru</h3>
                <p className="text-muted">Lengkapi formulir di bawah ini untuk mengajukan verifikasi prestasi.</p>
            </div>
            
            <StyledCard>
                <Card.Body className="p-4 p-md-5">
                    {success && <Alert variant="success" className="border-0 rounded-4 shadow-sm mb-4">{success}</Alert>}
                    {error && <Alert variant="danger" className="border-0 rounded-4 shadow-sm mb-4">{error}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <FormSectionTitle>Informasi Dasar</FormSectionTitle>
                        <Row className="mb-4">
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Judul Prestasi <span className="text-danger">*</span></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required 
                                        className="py-2 rounded-3 border-2"
                                        value={formData.title} 
                                        onChange={e => setFormData({...formData, title: e.target.value})} 
                                        placeholder="Misal: Juara 1 Olimpiade Matematika Nasional" 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Nama Lengkap <span className="text-danger">*</span></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required 
                                        className="py-2 rounded-3"
                                        value={formData.student_name} 
                                        onChange={e => setFormData({...formData, student_name: e.target.value})} 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Kelas <span className="text-danger">*</span></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required
                                        className="py-2 rounded-3"
                                        value={formData.class_name} 
                                        onChange={e => setFormData({...formData, class_name: e.target.value})} 
                                        placeholder="Misal: XI MIPA 2" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <FormSectionTitle>Detail Pencapaian</FormSectionTitle>
                        <Row className="mb-4">
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Kategori <span className="text-danger">*</span></Form.Label>
                                    <Form.Select 
                                        required 
                                        className="py-2 rounded-3"
                                        value={formData.categories_id} 
                                        onChange={e => setFormData({...formData, categories_id: e.target.value})}
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Tingkat Pencapaian <span className="text-danger">*</span></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required
                                        className="py-2 rounded-3"
                                        value={formData.achievement_level} 
                                        onChange={e => setFormData({...formData, achievement_level: e.target.value})} 
                                        placeholder="Misal: Nasional, Provinsi, atau Internasional" 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Tanggal Perolehan <span className="text-danger">*</span></Form.Label>
                                    <Form.Control 
                                        type="date" 
                                        required 
                                        className="py-2 rounded-3"
                                        value={formData.date} 
                                        onChange={e => setFormData({...formData, date: e.target.value})} 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Lokasi Acara <span className="text-danger">*</span></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required
                                        className="py-2 rounded-3"
                                        value={formData.location} 
                                        onChange={e => setFormData({...formData, location: e.target.value})} 
                                        placeholder="Nama tempat atau kota" 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Deskripsi Singkat <span className="text-danger">*</span></Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3} 
                                        required 
                                        className="rounded-3"
                                        value={formData.description} 
                                        onChange={e => setFormData({...formData, description: e.target.value})} 
                                        placeholder="Tuliskan deskripsi singkat mengenai prestasi yang diraih..." 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <FormSectionTitle>Lampiran (Max 3 Dokumentasi + 1 Bukti)</FormSectionTitle>
                        <Row className="mb-5">
                            <Col md={9} className="mb-3">
                                <Form.Label className="fw-semibold">Foto Dokumentasi/Lomba <span className="text-danger">*</span></Form.Label>
                                <div className="p-3 bg-white rounded-4 border shadow-sm">
                                    <Row className="g-2">
                                        <Col md={4}>
                                            <PreviewBox>
                                                {previews.image ? (
                                                    <>
                                                        <img src={previews.image} alt="P1" />
                                                        <RemoveButton type="button" onClick={() => handleRemoveFile('image')}><i className="bi bi-x"></i></RemoveButton>
                                                    </>
                                                ) : <i className="bi bi-image"></i>}
                                            </PreviewBox>
                                            <Form.Control id="file-input-image" type="file" required accept="image/*" onChange={e => handleFileChange(e, 'image')} className="form-control-sm" />
                                        </Col>
                                        <Col md={4}>
                                            <PreviewBox>
                                                {previews.image2 ? (
                                                    <>
                                                        <img src={previews.image2} alt="P2" />
                                                        <RemoveButton type="button" onClick={() => handleRemoveFile('image2')}><i className="bi bi-x"></i></RemoveButton>
                                                    </>
                                                ) : <i className="bi bi-image"></i>}
                                            </PreviewBox>
                                            <Form.Control id="file-input-image2" type="file" accept="image/*" onChange={e => handleFileChange(e, 'image2')} className="form-control-sm" />
                                        </Col>
                                        <Col md={4}>
                                            <PreviewBox>
                                                {previews.image3 ? (
                                                    <>
                                                        <img src={previews.image3} alt="P3" />
                                                        <RemoveButton type="button" onClick={() => handleRemoveFile('image3')}><i className="bi bi-x"></i></RemoveButton>
                                                    </>
                                                ) : <i className="bi bi-image"></i>}
                                            </PreviewBox>
                                            <Form.Control id="file-input-image3" type="file" accept="image/*" onChange={e => handleFileChange(e, 'image3')} className="form-control-sm" />
                                        </Col>
                                    </Row>
                                    <small className="text-muted mt-2 d-block text-center">Foto utama wajib diisi. Maksimal 2MB/file.</small>
                                </div>
                            </Col>
                            <Col md={3} className="mb-3">
                                <Form.Label className="fw-semibold">Foto Bukti <span className="text-danger">*</span></Form.Label>
                                <div className="p-3 bg-white rounded-4 border shadow-sm h-100">
                                    <PreviewBox style={{ height: '120px' }}>
                                        {previews.certificate ? (
                                            <>
                                                <img src={previews.certificate} alt="Cert" />
                                                <RemoveButton type="button" onClick={() => handleRemoveFile('certificate')}><i className="bi bi-x"></i></RemoveButton>
                                            </>
                                        ) : <i className="bi bi-file-earmark-check"></i>}
                                    </PreviewBox>
                                    <Form.Control id="file-input-certificate" type="file" required accept="image/*" onChange={e => handleFileChange(e, 'certificate')} className="form-control-sm" />
                                    <small className="text-muted mt-2 d-block text-center">Wajib. Max 2MB.</small>
                                </div>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-center">
                            <SubmitButton 
                                type="submit" 
                                size="lg" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Mengirim Data...' : 'Kirim Pengajuan Prestasi'}
                            </SubmitButton>
                        </div>
                    </Form>
                </Card.Body>
            </StyledCard>
        </UploadContainer>
    );
};

export default UploadPrestasi;
