import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import api from '../../services/api';
import styled from 'styled-components';

import { 
    StyledTable, 
    OrangeBadge, 
    ActionButton, 
    ImagePreview, 
    RemoveButton, 
    AddButton 
} from './GuruPrestasi.styled';

const PrestasiGuru = () => {
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
        image2: null,
        image3: null,
        certificate: null,
        old_image: null,
        old_image2: null,
        old_image3: null,
        old_certificate: null
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
        setFormData({ 
            id: null, title: '', student_name: '', class_name: '', 
            achievement_level: '', date: '', location: '', 
            description: '', categories_id: '', image: null, image2: null, image3: null,
            certificate: null, old_image: null, old_image2: null, old_image3: null, old_certificate: null
        });
    };

    const handleRemoveImage = (key) => {
        setFormData({ ...formData, [key]: null });
    };

    const handleRemoveOldImage = (key) => {
        setFormData({ ...formData, [key]: null });
    };

    const handleShow = (item = null) => {
        if (item) {
            setFormData({ 
                ...item, 
                image: null, 
                image2: null,
                image3: null,
                certificate: null,
                old_image: item.image,
                old_image2: item.image2,
                old_image3: item.image3,
                old_certificate: item.certificate 
            }); 
        }
        setShow(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && !key.startsWith('old_')) {
                    data.append(key, formData[key]);
                }
            });

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
            alert('Gagal menyimpan data');
        }
    };

    const handleUpdateStatus = async (id, status) => {
        if (window.confirm(`Yakin ingin mengubah status menjadi ${status}?`)) {
            try {
                await api.put(`/prestasi/${id}/${status}`);
                fetchData();
            } catch (error) {
                console.error(error);
                alert('Gagal mengubah status');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus data ini?')) {
            try {
                await api.delete(`/prestasi/${id}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const renderStatus = (status) => {
        switch(status) {
            case 'approved': return <Badge bg="success" className="rounded-pill px-3 py-2 fw-semibold">Disetujui</Badge>;
            case 'rejected': return <Badge bg="danger" className="rounded-pill px-3 py-2 fw-semibold">Ditolak</Badge>;
            default: return <OrangeBadge>Pending</OrangeBadge>;
        }
    };

    return (
        <div className="pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold m-0 text-dark">Daftar Prestasi Siswa</h3>
                    <p className="text-muted small m-0">Kelola dan verifikasi seluruh pencapaian siswa.</p>
                </div>
                <AddButton 
                    onClick={() => handleShow()}
                >
                    <i className="bi bi-plus-lg me-2"></i>Tambah Prestasi
                </AddButton>
            </div>

            <div className="bg-white rounded-4 shadow-sm overflow-hidden">
                <StyledTable responsive hover className="mb-0">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Judul Prestasi</th>
                            <th>Nama Siswa</th>
                            <th className="text-center-col">Status</th>
                            <th className="text-center-col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center py-5">Memuat data...</td></tr>
                        ) : prestasi.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-5 text-muted">Belum ada data prestasi.</td></tr>
                        ) : prestasi.map(item => (
                            <tr key={item.id}>
                                <td>{new Date(item.date).toLocaleDateString('id-ID')}</td>
                                <td>{item.title}</td>
                                <td>{item.student_name}</td>
                                <td className="text-center-col">{renderStatus(item.status)}</td>
                                <td className="text-center-col">
                                    <div className="d-flex justify-content-center gap-2">
                                        <ActionButton variant="outline-primary" onClick={() => handleShow(item)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </ActionButton>
                                        
                                        {item.status !== 'pending' && (
                                            <ActionButton variant="outline-warning" onClick={() => handleUpdateStatus(item.id, 'pending')}>
                                                <i className="bi bi-arrow-counterclockwise"></i>
                                            </ActionButton>
                                        )}

                                        <ActionButton variant="outline-danger" onClick={() => handleDelete(item.id)}>
                                            <i className="bi bi-trash"></i>
                                        </ActionButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </div>

            <Modal show={show} onHide={handleClose} size="lg" centered className="rounded-4">
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton className="border-0 px-4 pt-4">
                        <Modal.Title className="fw-bold">{formData.id ? 'Edit Data Prestasi' : 'Tambah Data Prestasi'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-4 pb-4">
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">JUDUL PRESTASI <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required placeholder="Contoh: Juara 1 OSN Matematika" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">NAMA SISWA <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required placeholder="Nama lengkap siswa" value={formData.student_name} onChange={e => setFormData({...formData, student_name: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">KELAS <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required placeholder="Contoh: X-A" value={formData.class_name} onChange={e => setFormData({...formData, class_name: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">TINGKAT PENCAPAIAN <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required placeholder="Contoh: Nasional" value={formData.achievement_level} onChange={e => setFormData({...formData, achievement_level: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">TANGGAL PELAKSANAAN <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">KATEGORI <span className="text-danger">*</span></Form.Label>
                                    <Form.Select required value={formData.categories_id} onChange={e => setFormData({...formData, categories_id: e.target.value})}>
                                        <option value="">Pilih Kategori</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">BUKTI <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="file" size="sm" accept="image/*" required={!formData.id && !formData.old_certificate} onChange={e => setFormData({...formData, certificate: e.target.files[0]})} />
                                    <ImagePreview>
                                        {formData.certificate ? (
                                            <>
                                                <img src={URL.createObjectURL(formData.certificate)} alt="Preview" />
                                                <RemoveButton type="button" onClick={() => handleRemoveImage('certificate')}><i className="bi bi-x"></i></RemoveButton>
                                            </>
                                        ) : (formData.old_certificate ? (
                                            <>
                                                <img src={`http://localhost:8000/storage/${formData.old_certificate}`} alt="Old" />
                                                <RemoveButton type="button" onClick={() => handleRemoveOldImage('old_certificate')}><i className="bi bi-x"></i></RemoveButton>
                                            </>
                                        ) : <i className="bi bi-file-earmark-check"></i>)}
                                    </ImagePreview>
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Label className="fw-bold small text-muted">DOKUMENTASI (MAX 3 FOTO) <span className="text-danger">*</span></Form.Label>
                                <Row className="g-2">
                                    <Col md={4}>
                                        <Form.Control type="file" size="sm" accept="image/*" required={!formData.id && !formData.old_image} onChange={e => setFormData({...formData, image: e.target.files[0]})} />
                                        <ImagePreview>
                                            {formData.image ? (
                                                <>
                                                    <img src={URL.createObjectURL(formData.image)} alt="P1" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveImage('image')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : (formData.old_image ? (
                                                <>
                                                    <img src={`http://localhost:8000/storage/${formData.old_image}`} alt="O1" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveOldImage('old_image')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : <i className="bi bi-image"></i>)}
                                        </ImagePreview>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control type="file" size="sm" accept="image/*" onChange={e => setFormData({...formData, image2: e.target.files[0]})} />
                                        <ImagePreview>
                                            {formData.image2 ? (
                                                <>
                                                    <img src={URL.createObjectURL(formData.image2)} alt="P2" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveImage('image2')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : (formData.old_image2 ? (
                                                <>
                                                    <img src={`http://localhost:8000/storage/${formData.old_image2}`} alt="O2" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveOldImage('old_image2')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : <i className="bi bi-image"></i>)}
                                        </ImagePreview>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control type="file" size="sm" accept="image/*" onChange={e => setFormData({...formData, image3: e.target.files[0]})} />
                                        <ImagePreview>
                                            {formData.image3 ? (
                                                <>
                                                    <img src={URL.createObjectURL(formData.image3)} alt="P3" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveImage('image3')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : (formData.old_image3 ? (
                                                <>
                                                    <img src={`http://localhost:8000/storage/${formData.old_image3}`} alt="O3" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveOldImage('old_image3')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : <i className="bi bi-image"></i>)}
                                        </ImagePreview>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3 mt-2">
                                    <Form.Label className="fw-bold small text-muted">DESKRIPSI SINGKAT <span className="text-danger">*</span></Form.Label>
                                    <Form.Control as="textarea" rows={3} required placeholder="Jelaskan detail prestasi..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="border-0 px-4 pb-4">
                        <Button variant="light" className="px-4 fw-bold" onClick={handleClose}>Batal</Button>
                        <AddButton type="submit">Simpan Data</AddButton>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default PrestasiGuru;
