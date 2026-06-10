import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import api from '../../services/api';
import styled from 'styled-components';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const StyledTable = styled(Table)`
  th {
    background: #f8fafc;
    color: #64748b;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 1.25rem 1rem;
  }
  td {
    padding: 1rem;
    vertical-align: middle;
  }
`;

const ManageKegiatan = () => {
    const [kegiatan, setKegiatan] = useState([]);
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        date: '',
        description: '',
        categories_id: '',
        image: null
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resKegiatan, resCat] = await Promise.all([
                api.get('/kegiatan'),
                api.get('/categories?type=kegiatan')
            ]);
            const sortedData = resKegiatan.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setKegiatan(sortedData);
            setCategories(resCat.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClose = () => {
        setShow(false);
        setFormData({ id: null, title: '', date: '', description: '', categories_id: '', image: null });
    };

    const handleShow = (item = null) => {
        if (item) {
            setFormData({ ...item, image: null }); 
        }
        setShow(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('date', formData.date);
            data.append('description', formData.description);
            data.append('categories_id', formData.categories_id);
            if (formData.image) {
                data.append('image', formData.image);
            }

            if (formData.id) {
                data.append('_method', 'PUT'); 
                await api.post(`/kegiatan/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/kegiatan', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchData();
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Error saving kegiatan');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus kegiatan ini?')) {
            try {
                await api.delete(`/kegiatan/${id}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (show) {
        return (
            <div>
                <PageHeader>
                    <div>
                        <h3 className="fw-bold text-dark m-0">{formData.id ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</h3>
                        <p className="text-muted m-0">Silakan isi formulir di bawah ini dengan lengkap.</p>
                    </div>
                </PageHeader>

                <Card className="border-0 shadow-sm rounded-4 p-4">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Judul Kegiatan <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Tanggal Kegiatan <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Kategori <span className="text-danger">*</span></Form.Label>
                                    <Form.Select required value={formData.categories_id} onChange={e => setFormData({...formData, categories_id: e.target.value})}>
                                        <option value="">Pilih Kategori</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Foto Kegiatan {!formData.id && <span className="text-danger">*</span>}</Form.Label>
                                    <Form.Control type="file" required={!formData.id} accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} />
                                    <Form.Text className="text-muted">Maksimal 2MB.</Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Deskripsi / Konten <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" rows={5} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="light" onClick={handleClose}>Batal</Button>
                            <Button variant="primary" type="submit" style={{ backgroundColor: '#1e3a8a', border: 'none', borderRadius: '8px', padding: '0.6rem 1.5rem' }}>
                                {formData.id ? 'Simpan Perubahan' : 'Tambah Data'}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <PageHeader>
                <div>
                    <h3 className="fw-bold text-dark m-0">Manajemen Kegiatan</h3>
                    <p className="text-muted m-0">Publikasikan agenda dan berita terbaru sekolah.</p>
                </div>
                <Button 
                    variant="primary" 
                    className="shadow-sm"
                    style={{ backgroundColor: '#1e3a8a', border: 'none', borderRadius: '10px', padding: '0.6rem 1.25rem' }} 
                    onClick={() => handleShow()}
                >
                    + Tambah Kegiatan
                </Button>
            </PageHeader>

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <StyledTable responsive hover>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Judul Kegiatan</th>
                            <th>Kategori</th>
                            <th className="text-end">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="text-center py-5 text-muted">Memuat data...</td></tr>
                        ) : kegiatan.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-5 text-muted">Belum ada kegiatan.</td></tr>
                        ) : kegiatan.map(item => (
                            <tr key={item.id}>
                                <td>{new Date(item.date).toLocaleDateString('id-ID')}</td>
                                <td className="fw-bold">{item.title}</td>
                                <td><span className="badge bg-light text-dark border">{item.category?.name}</span></td>
                                <td className="text-end">
                                    <Button variant="outline-primary" size="sm" className="me-2" style={{ borderRadius: '8px' }} onClick={() => handleShow(item)}>
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button variant="outline-danger" size="sm" style={{ borderRadius: '8px' }} onClick={() => handleDelete(item.id)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </Card>
        </div>
    );
};

export default ManageKegiatan;
