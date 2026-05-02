import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Row, Col, Badge, Alert } from 'react-bootstrap';
import api from '../../services/api';
import styled from 'styled-components';

import { 
    StyledTable, 
    OrangeBadge, 
    ImagePreview, 
    RemoveButton, 
    CommentBox 
} from './RiwayatPrestasi.styled';

const RiwayatPrestasi = () => {
    const [prestasi, setPrestasi] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
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

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resPrestasi, resCat] = await Promise.all([
                api.get('/prestasi'),
                api.get('/categories?type=prestasi')
            ]);
            const myPrestasi = resPrestasi.data.data
                .filter(p => p.users_id === user?.id)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setPrestasi(myPrestasi);
            setCategories(resCat.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user?.id]);

    const handleClose = () => {
        setShowDetail(false);
        setShowEdit(false);
        setSelectedItem(null);
    };

    const handleShowDetail = (item) => {
        setSelectedItem(item);
        setShowDetail(true);
    };

    const handleRemoveImage = (key) => {
        setFormData({ ...formData, [key]: null });
    };

    const handleRemoveOldImage = (key) => {
        setFormData({ ...formData, [key]: null });
    };

    const handleShowEdit = (item) => {
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
        setShowEdit(true);
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('_method', 'PUT');
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && !key.startsWith('old_') && key !== 'rejection_message') {
                    data.append(key, formData[key]);
                }
            });

            await api.post(`/prestasi/${formData.id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            fetchData();
            handleClose();
            alert('Berhasil diajukan kembali!');
        } catch (error) {
            console.error(error);
            alert('Gagal mengupdate data');
        }
    };

    const renderStatus = (status) => {
        if(status === 'approved') return <Badge bg="success" className="rounded-pill px-3 py-2">Disetujui</Badge>;
        if(status === 'rejected') return <Badge bg="danger" className="rounded-pill px-3 py-2">Ditolak</Badge>;
        return <OrangeBadge>Pending</OrangeBadge>;
    };

    return (
        <div className="pb-5">
            <h3 className="fw-bold mb-4 text-dark">Riwayat Prestasi Saya</h3>

            <div className="bg-white rounded-4 shadow-sm overflow-hidden">
                <StyledTable responsive hover className="mb-0">
                    <thead>
                        <tr>
                            <th>Tanggal Diajukan</th>
                            <th>Judul Prestasi</th>
                            <th className="text-center-col">Kategori</th>
                            <th className="text-center-col">Status</th>
                            <th className="text-center-col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center py-5">Memuat riwayat...</td></tr>
                        ) : prestasi.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-5 text-muted">Belum ada riwayat prestasi.</td></tr>
                        ) : prestasi.map(item => (
                            <tr key={item.id}>
                                <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                                <td>{item.title}</td>
                                <td className="text-center-col">
                                    <Badge bg="secondary" className="rounded-pill px-3 py-2 text-capitalize">
                                        {item.category?.name}
                                    </Badge>
                                </td>
                                <td className="text-center-col">{renderStatus(item.status)}</td>
                                <td className="text-center-col">
                                    <div className="d-flex justify-content-center gap-2">
                                        <Button variant="outline-primary" size="sm" className="rounded-3" onClick={() => handleShowDetail(item)}>Detail</Button>
                                        {item.status === 'rejected' && (
                                            <Button variant="warning" size="sm" className="rounded-3 text-white fw-bold" onClick={() => handleShowEdit(item)}>Edit & Ajukan Lagi</Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </div>

            {/* Detail Modal */}
            <Modal show={showDetail} onHide={handleClose} size="lg" centered className="rounded-4">
                <Modal.Header closeButton className="border-0 px-4 pt-4">
                    <Modal.Title className="fw-bold">Detail Prestasi</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 pb-4">
                    {selectedItem && (
                        <>
                            <Row className="g-4">
                                <Col md={6}>
                                    <div className="mb-3">
                                        <small className="text-muted fw-bold d-block mb-1">STATUS</small>
                                        {renderStatus(selectedItem.status)}
                                    </div>
                                    <div className="mb-3">
                                        <small className="text-muted fw-bold d-block mb-1">JUDUL</small>
                                        <p className="fw-semibold mb-0">{selectedItem.title}</p>
                                    </div>
                                    <div className="mb-3">
                                        <small className="text-muted fw-bold d-block mb-1">NAMA SISWA</small>
                                        <p className="fw-semibold mb-0">{selectedItem.student_name}</p>
                                    </div>
                                    <div className="mb-3">
                                        <small className="text-muted fw-bold d-block mb-1">TINGKAT</small>
                                        <p className="fw-semibold mb-0">{selectedItem.achievement_level}</p>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="mb-3">
                                        <small className="text-muted fw-bold d-block mb-1">TANGGAL PELAKSANAAN</small>
                                        <p className="fw-semibold mb-0">{selectedItem.date}</p>
                                    </div>
                                    <div className="mb-3">
                                        <small className="text-muted fw-bold d-block mb-1">KATEGORI</small>
                                        <p className="fw-semibold mb-0">{selectedItem.category?.name}</p>
                                    </div>
                                    <div className="mb-3">
                                        <small className="text-muted fw-bold d-block mb-1">LOKASI</small>
                                        <p className="fw-semibold mb-0">{selectedItem.location || '-'}</p>
                                    </div>
                                    {selectedItem.verified_by && (
                                        <div className="mb-3">
                                            <small className="text-muted fw-bold d-block mb-1">DIVERIFIKASI OLEH</small>
                                            <p className="fw-semibold mb-0">{selectedItem.verifier?.name}</p>
                                        </div>
                                    )}
                                </Col>
                                <Col md={12}>
                                    <small className="text-muted fw-bold d-block mb-1">DESKRIPSI</small>
                                    <p className="text-muted mb-0">{selectedItem.description}</p>
                                </Col>
                            </Row>
                            
                            {selectedItem.status === 'rejected' && selectedItem.rejection_message && (
                                <CommentBox>
                                    <i className="bi bi-info-circle-fill"></i>
                                    <div>
                                        <div className="fw-bold mb-1">Catatan dari Guru:</div>
                                        {selectedItem.rejection_message}
                                    </div>
                                </CommentBox>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className="border-0 px-4 pb-4">
                    <Button variant="light" className="fw-bold px-4" onClick={handleClose}>Tutup</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEdit} onHide={handleClose} size="lg" centered className="rounded-4">
                <Form onSubmit={handleSubmitEdit}>
                    <Modal.Header closeButton className="border-0 px-4 pt-4">
                        <Modal.Title className="fw-bold text-danger">Edit & Ajukan Kembali</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-4 pb-4">
                        {formData.rejection_message && (
                            <CommentBox className="mt-0 mb-4">
                                <i className="bi bi-info-circle-fill"></i>
                                <div>
                                    <div className="fw-bold mb-1">Alasan Penolakan Sebelumnya:</div>
                                    {formData.rejection_message}
                                </div>
                            </CommentBox>
                        )}
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">JUDUL PRESTASI <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">NAMA SISWA <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.student_name} onChange={e => setFormData({...formData, student_name: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">KELAS <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.class_name} onChange={e => setFormData({...formData, class_name: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">TINGKAT <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.achievement_level} onChange={e => setFormData({...formData, achievement_level: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">TANGGAL <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">LOKASI <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
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
                            </Col>
                            <Col md={12}>
                                <Form.Label className="fw-bold small text-muted">LAMPIRAN (DOKUMENTASI & BUKTI) <span className="text-danger">*</span></Form.Label>
                                <Row className="g-2">
                                    <Col md={3}>
                                        <Form.Control type="file" size="sm" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} />
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
                                    <Col md={3}>
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
                                    <Col md={3}>
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
                                    <Col md={3}>
                                        <Form.Control type="file" size="sm" accept="image/*" onChange={e => setFormData({...formData, certificate: e.target.files[0]})} />
                                        <ImagePreview>
                                            {formData.certificate ? (
                                                <>
                                                    <img src={URL.createObjectURL(formData.certificate)} alt="Cert" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveImage('certificate')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : (formData.old_certificate ? (
                                                <>
                                                    <img src={`http://localhost:8000/storage/${formData.old_certificate}`} alt="OC" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveOldImage('old_certificate')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : <i className="bi bi-file-earmark-check"></i>)}
                                        </ImagePreview>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mt-3">
                                    <Form.Label className="fw-bold small text-muted">DESKRIPSI PERBAIKAN <span className="text-danger">*</span></Form.Label>
                                    <Form.Control as="textarea" rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="border-0 px-4 pb-4">
                        <Button variant="light" className="fw-bold px-4" onClick={handleClose}>Batal</Button>
                        <Button variant="primary" type="submit" className="fw-bold px-4" style={{ backgroundColor: '#f97316', border: 'none' }}>Ajukan Kembali</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default RiwayatPrestasi;
