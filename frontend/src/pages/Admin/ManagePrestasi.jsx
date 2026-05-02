import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge, Card } from 'react-bootstrap';
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
  margin-bottom: 0;
  th {
    background: #f8fafc;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    padding: 1.25rem 1rem;
    border-top: none;
  }
  td {
    padding: 1rem;
    vertical-align: middle;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
  }
`;

const ActionButton = styled(Button)`
  padding: 0.5rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
`;

const ManagePrestasiAdmin = () => {
    const [prestasi, setPrestasi] = useState([]);
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        student_name: '',
        class_name: '',
        achievement_level: '',
        date: '',
        location: '',
        description: '',
        categories_id: '',
        image: null,
        certificate: null
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resPrestasi, resCat] = await Promise.all([
                api.get('/prestasi'),
                api.get('/categories?type=prestasi')
            ]);
            const sortedData = resPrestasi.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPrestasi(sortedData);
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
        setFormData({ id: null, title: '', student_name: '', class_name: '', achievement_level: '', date: '', location: '', description: '', categories_id: '', image: null, certificate: null });
    };

    const handleShow = (item = null) => {
        if (item) {
            setFormData({ ...item, image: null, certificate: null }); 
        }
        setShow(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('student_name', formData.student_name);
            data.append('class_name', formData.class_name);
            data.append('achievement_level', formData.achievement_level);
            data.append('date', formData.date);
            data.append('location', formData.location);
            data.append('description', formData.description);
            data.append('categories_id', formData.categories_id);
            
            if (formData.image) data.append('image', formData.image);
            if (formData.certificate) data.append('certificate', formData.certificate);

            if (formData.id) {
                data.append('_method', 'PUT'); 
                await api.post(`/prestasi/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/prestasi', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchData();
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Error saving prestasi');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus prestasi ini?')) {
            try {
                await api.delete(`/prestasi/${id}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const renderStatus = (status) => {
        if(status === 'approved') return <Badge bg="success" className="rounded-pill px-3 py-2">Disetujui</Badge>;
        if(status === 'rejected') return <Badge bg="danger" className="rounded-pill px-3 py-2">Ditolak</Badge>;
        return <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">Pending</Badge>;
    };

    return (
        <div>
            <PageHeader>
                <div>
                    <h3 className="fw-bold text-dark m-0">Manajemen Prestasi</h3>
                    <p className="text-muted m-0">Kelola data prestasi siswa secara keseluruhan.</p>
                </div>
                <Button 
                    variant="primary" 
                    className="shadow-sm d-flex align-items-center gap-2"
                    style={{ backgroundColor: '#f97316', border: 'none', borderRadius: '10px', padding: '0.6rem 1.25rem' }} 
                    onClick={() => handleShow()}
                >
                    <i className="bi bi-plus-lg"></i>
                    Tambah Prestasi
                </Button>
            </PageHeader>

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <StyledTable responsive hover>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Judul</th>
                            <th>Nama Siswa</th>
                            <th>Status</th>
                            <th className="text-end">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center py-5 text-muted">Memuat data...</td></tr>
                        ) : prestasi.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-5 text-muted">Belum ada data prestasi.</td></tr>
                        ) : prestasi.map(item => (
                            <tr key={item.id}>
                                <td className="fw-medium">{new Date(item.date).toLocaleDateString('id-ID')}</td>
                                <td className="fw-bold">{item.title}</td>
                                <td>{item.student_name}</td>
                                <td>{renderStatus(item.status)}</td>
                                <td className="text-end">
                                    <ActionButton variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(item)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </ActionButton>
                                    <ActionButton variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}>
                                        <i className="bi bi-trash"></i>
                                    </ActionButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </Card>

            <Modal show={show} onHide={handleClose} size="lg" centered className="rounded-4">
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton className="border-0 px-4 pt-4">
                        <Modal.Title className="fw-bold">{formData.id ? 'Edit Data Prestasi' : 'Tambah Prestasi Baru'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-4 pb-4">
                        <Row>
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Judul Prestasi <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Masukkan judul prestasi" />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Nama Siswa <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.student_name} onChange={e => setFormData({...formData, student_name: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Kelas <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.class_name} onChange={e => setFormData({...formData, class_name: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Tingkat Pencapaian <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.achievement_level} onChange={e => setFormData({...formData, achievement_level: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Tanggal <span className="text-danger">*</span></Form.Label>
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
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Lokasi <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Foto Dokumentasi {!formData.id && <span className="text-danger">*</span>}</Form.Label>
                                    <Form.Control type="file" required={!formData.id} accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Foto Bukti {!formData.id && <span className="text-danger">*</span>}</Form.Label>
                                    <Form.Control type="file" required={!formData.id} accept="image/*" onChange={e => setFormData({...formData, certificate: e.target.files[0]})} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Deskripsi <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="border-0 px-4 pb-4">
                        <Button variant="light" className="px-4" onClick={handleClose}>Batal</Button>
                        <Button variant="primary" type="submit" className="px-4" style={{ backgroundColor: '#f97316', border: 'none' }}>
                            {formData.id ? 'Simpan Perubahan' : 'Tambah Data'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default ManagePrestasiAdmin;
