import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Badge, Row, Col, Form, Carousel, Card } from 'react-bootstrap';
import api from '../../services/api';
import { 
    StyledTable, 
    OrangeBadge, 
    DetailLabel, 
    DetailValue,
    GlobalVerifikasiStyles
} from './Verifikasi.styled';

const VerifikasiPrestasi = () => {
    const [prestasi, setPrestasi] = useState([]);
    const [show, setShow] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rejectionMessage, setRejectionMessage] = useState('');
    const [feedbackType, setFeedbackType] = useState('reject'); // 'reject' or 'revise'

    const fetchPendingPrestasi = async () => {
        setLoading(true);
        try {
            const res = await api.get('/prestasi');
            const pendingData = res.data.data
                .filter(item => item.status === 'pending')
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            setPrestasi(pendingData);
        } catch (error) {
            console.error('Error fetching pending data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingPrestasi();
    }, []);

    const handleClose = () => {
        setShow(false);
        setShowRejectModal(false);
        setSelectedItem(null);
        setRejectionMessage('');
    };

    const handleShow = (item) => {
        setSelectedItem(item);
        setShow(true);
    };

    const handleApprove = async (id) => {
        if (window.confirm('Yakin ingin menyetujui prestasi ini?')) {
            try {
                await api.put(`/prestasi/${id}/approve`);
                fetchPendingPrestasi();
                handleClose();
            } catch (error) {
                console.error(error);
                alert('Gagal menyetujui prestasi');
            }
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = feedbackType === 'reject' ? 'reject' : 'revise';
            const actionText = feedbackType === 'reject' ? 'ditolak' : 'diminta revisi';
            
            await api.put(`/prestasi/${selectedItem.id}/${endpoint}`, {
                rejection_message: rejectionMessage
            });
            fetchPendingPrestasi();
            handleClose();
            alert(`Prestasi telah ${actionText} dengan alasan.`);
        } catch (error) {
            console.error(error);
            alert(`Gagal memproses ${feedbackType === 'reject' ? 'penolakan' : 'revisi'} prestasi`);
        }
    };

    if (show && selectedItem) {
        return (
            <GlobalVerifikasiStyles>
                <div className="pb-5">
                    <div className="mb-4">
                        <h3 className="fw-bold text-dark m-0">Detail Verifikasi Prestasi</h3>
                        <p className="text-muted small">Periksa detail dokumen prestasi siswa di bawah ini.</p>
                    </div>

                    <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
                        <Row className="g-4">
                            <Col lg={7}>
                                <div className="bg-light p-4 rounded-4 h-100 border">
                                    <Row>
                                        <Col md={6}>
                                            <DetailLabel>Judul Prestasi</DetailLabel>
                                            <DetailValue>{selectedItem.title}</DetailValue>
                                        </Col>
                                        <Col md={6}>
                                            <DetailLabel>Nama Siswa</DetailLabel>
                                            <DetailValue>{selectedItem.student_name}</DetailValue>
                                        </Col>
                                        <Col md={6}>
                                            <DetailLabel>Kelas</DetailLabel>
                                            <DetailValue>{selectedItem.class_name || '-'}</DetailValue>
                                        </Col>
                                        <Col md={6}>
                                            <DetailLabel>Tingkat</DetailLabel>
                                            <DetailValue>{selectedItem.achievement_level || '-'}</DetailValue>
                                        </Col>
                                        <Col md={6}>
                                            <DetailLabel>Tanggal</DetailLabel>
                                            <DetailValue>{new Date(selectedItem.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</DetailValue>
                                        </Col>
                                        <Col md={6}>
                                            <DetailLabel>Kategori</DetailLabel>
                                            <DetailValue>{selectedItem.category?.name || 'Lainnya'}</DetailValue>
                                        </Col>
                                        <Col md={12}>
                                            <DetailLabel>Lokasi</DetailLabel>
                                            <DetailValue>{selectedItem.location || '-'}</DetailValue>
                                        </Col>
                                        <Col md={12}>
                                            <DetailLabel>Deskripsi Singkat</DetailLabel>
                                            <DetailValue className="mb-0">{selectedItem.description}</DetailValue>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col lg={5}>
                                <div className="d-flex flex-column gap-3">
                                    <div>
                                        <DetailLabel>Foto Hasil Lomba / Dokumentasi (Max 3)</DetailLabel>
                                        <div className="rounded-4 overflow-hidden shadow-sm border bg-white p-2">
                                            {[selectedItem.image, selectedItem.image2, selectedItem.image3].filter(img => img).length > 0 ? (
                                                <Carousel interval={null} className="carousel-container">
                                                    {[selectedItem.image, selectedItem.image2, selectedItem.image3].filter(img => img).map((img, idx) => (
                                                        <Carousel.Item key={idx}>
                                                            <img 
                                                                src={`http://localhost:8000/storage/${img}`} 
                                                                alt={`Dokumentasi ${idx + 1}`} 
                                                                className="w-100 rounded-3 img-fit" 
                                                            />
                                                        </Carousel.Item>
                                                    ))}
                                                </Carousel>
                                            ) : (
                                                <div className="bg-light text-center py-4 text-muted small">Tidak ada foto dokumentasi</div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <DetailLabel>Bukti Prestasi / Lomba</DetailLabel>
                                        <div className="rounded-4 overflow-hidden shadow-sm border bg-white p-2 text-center">
                                            {selectedItem.certificate ? (
                                                <img src={`http://localhost:8000/storage/${selectedItem.certificate}`} alt="Bukti" className="w-100 rounded-3 img-fit" />
                                            ) : (
                                                <div className="bg-light text-center py-4 text-muted small">Tidak ada foto bukti</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {showRejectModal ? (
                            <div className="mt-4 pt-4 border-top">
                                <Form onSubmit={handleFeedbackSubmit}>
                                    <h5 className={`fw-bold mb-3 ${feedbackType === 'reject' ? 'text-danger' : 'text-warning'}`}>
                                        {feedbackType === 'reject' ? 'Alasan Penolakan' : 'Masukan Revisi'}
                                    </h5>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-muted fw-bold">PESAN UNTUK SISWA</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={4} 
                                            required 
                                            placeholder={feedbackType === 'reject' ? "Jelaskan alasan penolakan..." : "Jelaskan apa yang perlu diperbaiki (Misal: Foto bukti kurang jelas)"}
                                            value={rejectionMessage}
                                            onChange={(e) => setRejectionMessage(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className="d-flex gap-2 justify-content-end">
                                        <Button variant="light" className="fw-bold px-4" onClick={() => setShowRejectModal(false)}>Batal</Button>
                                        <Button variant={feedbackType === 'reject' ? 'danger' : 'warning'} type="submit" className={`fw-bold px-4 ${feedbackType === 'revise' ? 'text-white' : ''}`}>
                                            {feedbackType === 'reject' ? 'Kirim Penolakan' : 'Kirim Masukan Revisi'}
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        ) : (
                            <div className="d-flex gap-2 mt-4 pt-4 border-top">
                                <Button variant="light" className="px-4 py-2 rounded-3 fw-bold" onClick={handleClose}>Tutup</Button>
                                <div className="ms-auto d-flex gap-2">
                                    <Button variant="outline-warning" className="px-4 py-2 rounded-3 fw-bold" onClick={() => { setFeedbackType('revise'); setShowRejectModal(true); }}>Revisi</Button>
                                    <Button variant="outline-danger" className="px-4 py-2 rounded-3 fw-bold" onClick={() => { setFeedbackType('reject'); setShowRejectModal(true); }}>Tolak</Button>
                                    <Button variant="success" className="px-4 py-2 rounded-3 fw-bold shadow-sm btn-green" onClick={() => handleApprove(selectedItem.id)}>Setujui Prestasi</Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </GlobalVerifikasiStyles>
        );
    }

    return (
        <GlobalVerifikasiStyles>
            <div className="pb-5">
                <div className="mb-4">
                    <h3 className="fw-bold text-dark m-0">Verifikasi Prestasi Siswa</h3>
                    <p className="text-muted small">Periksa dan setujui pengajuan prestasi yang masuk dari siswa.</p>
                </div>

                <div className="bg-white rounded-4 shadow-sm overflow-hidden">
                    <StyledTable responsive hover className="mb-0">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Judul Prestasi</th>
                                <th>Nama Siswa</th>
                                <th className="text-center-col">Kategori</th>
                                <th className="text-center-col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-5 text-muted">Memuat data verifikasi...</td></tr>
                            ) : prestasi.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-5 text-muted">Tidak ada prestasi yang menunggu verifikasi.</td></tr>
                            ) : prestasi.map(item => (
                                <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => handleShow(item)}>
                                    <td>{new Date(item.date).toLocaleDateString('id-ID')}</td>
                                    <td>{item.title}</td>
                                    <td>{item.student_name}</td>
                                    <td className="text-center-col">
                                        <OrangeBadge>
                                            {item.category?.name || 'Lainnya'}
                                        </OrangeBadge>
                                    </td>
                                    <td className="text-center-col" onClick={e => e.stopPropagation()}>
                                        <Button variant="primary" size="sm" className="rounded-3 shadow-sm px-3 btn-orange" onClick={() => handleShow(item)}>
                                            Review
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </div>
            </div>
        </GlobalVerifikasiStyles>
    );
};

export default VerifikasiPrestasi;
