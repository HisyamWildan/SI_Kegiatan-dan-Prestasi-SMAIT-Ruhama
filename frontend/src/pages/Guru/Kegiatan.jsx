import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import api, { API_BASE_URL } from '../../services/api';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  thead {
    background: #f8fafc;
    th {
      border: none;
      padding: 1rem;
      color: #64748b;
      font-weight: 800;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: center;
    }
  }

  tbody td {
    padding: 1rem;
    vertical-align: middle;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
    text-align: left;
    font-weight: 400;
  }

  .col-aksi {
    width: 120px;
    text-align: center;
  }
`;

const ActionButton = styled(Button)`
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
  
  i { font-size: 1rem; }
`;

const OrangeBadge = styled(Badge)`
  background-color: #f97316 !important;
  color: white !important;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: none;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px dashed #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  margin-top: 5px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  i { font-size: 1.5rem; color: #cbd5e1; }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: #dc2626;
    transform: scale(1.1);
  }
`;

const KegiatanGuru = () => {
    const [kegiatan, setKegiatan] = useState([]);
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        date: '',
        location: '',
        description: '',
        categories_id: '',
        image: null,
        image2: null,
        image3: null,
        old_image: null,
        old_image2: null,
        old_image3: null
    });

    const user = JSON.parse(localStorage.getItem('user'));

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
        setFormData({
            id: null,
            title: '',
            date: '',
            location: '',
            description: '',
            categories_id: '',
            image: null,
            image2: null,
            image3: null,
            old_image: null,
            old_image2: null,
            old_image3: null
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
                id: item.id,
                title: item.title,
                date: item.date,
                location: item.location,
                description: item.description,
                categories_id: item.categories_id,
                image: null,
                image2: null,
                image3: null,
                old_image: item.image,
                old_image2: item.image2,
                old_image3: item.image3
            });
        }
        setShow(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            if (formData.id) data.append('_method', 'PUT');
            
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && !key.startsWith('old_')) {
                    data.append(key, formData[key]);
                }
            });

            const url = formData.id ? `/kegiatan/${formData.id}` : '/kegiatan';
            await api.post(url, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            fetchData();
            handleClose();
            alert(`Berhasil ${formData.id ? 'mengupdate' : 'menambah'} kegiatan!`);
        } catch (error) {
            console.error(error);
            alert('Gagal menyimpan data');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus kegiatan ini?')) {
            try {
                await api.delete(`/kegiatan/${id}`);
                fetchData();
            } catch (error) {
                console.error(error);
                alert('Gagal menghapus data');
            }
        }
    };

    if (show) {
        return (
            <div className="pb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="fw-bold text-dark m-0">{formData.id ? 'Edit Data Kegiatan' : 'Tambah Data Kegiatan'}</h3>
                        <p className="text-muted small m-0">Silakan isi formulir di bawah ini dengan lengkap.</p>
                    </div>
                </div>

                <div className="bg-white rounded-4 shadow-sm p-4">
                    <Form onSubmit={handleSubmit}>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">JUDUL KEGIATAN <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required placeholder="Contoh: Rapat Kerja Guru" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">TANGGAL <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">LOKASI <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" required placeholder="Gedung Utama SMAIT Ruhama" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
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
                            <Col md={6}>
                                <Form.Label className="fw-bold small text-muted">DOKUMENTASI (MAX 3 FOTO) <span className="text-danger">*</span></Form.Label>
                                <Row className="g-2">
                                    <Col xs={4}>
                                        <Form.Control type="file" size="sm" accept="image/*" required={!formData.id && !formData.old_image} onChange={e => setFormData({...formData, image: e.target.files[0]})} />
                                        <ImagePreview>
                                            {formData.image ? (
                                                <>
                                                    <img src={URL.createObjectURL(formData.image)} alt="P1" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveImage('image')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : (formData.old_image ? (
                                                <>
                                                    <img src={`${API_BASE_URL}/storage/${formData.old_image}`} alt="O1" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveOldImage('old_image')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : <i className="bi bi-image"></i>)}
                                        </ImagePreview>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control type="file" size="sm" accept="image/*" onChange={e => setFormData({...formData, image2: e.target.files[0]})} />
                                        <ImagePreview>
                                            {formData.image2 ? (
                                                <>
                                                    <img src={URL.createObjectURL(formData.image2)} alt="P2" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveImage('image2')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : (formData.old_image2 ? (
                                                <>
                                                    <img src={`${API_BASE_URL}/storage/${formData.old_image2}`} alt="O2" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveOldImage('old_image2')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : <i className="bi bi-image"></i>)}
                                        </ImagePreview>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Control type="file" size="sm" accept="image/*" onChange={e => setFormData({...formData, image3: e.target.files[0]})} />
                                        <ImagePreview>
                                            {formData.image3 ? (
                                                <>
                                                    <img src={URL.createObjectURL(formData.image3)} alt="P3" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveImage('image3')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : (formData.old_image3 ? (
                                                <>
                                                    <img src={`${API_BASE_URL}/storage/${formData.old_image3}`} alt="O3" />
                                                    <RemoveButton type="button" onClick={() => handleRemoveOldImage('old_image3')}><i className="bi bi-x"></i></RemoveButton>
                                                </>
                                            ) : <i className="bi bi-image"></i>)}
                                        </ImagePreview>
                                    </Col>
                                </Row>
                                <small className="text-muted d-block mt-2">Foto pertama wajib diisi.</small>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">DESKRIPSI KEGIATAN <span className="text-danger">*</span></Form.Label>
                                    <Form.Control as="textarea" rows={4} required placeholder="Jelaskan detail kegiatan..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <Button variant="light" className="px-4 fw-bold" onClick={handleClose}>Batal</Button>
                            <Button variant="primary" type="submit" className="px-4 fw-bold" style={{ backgroundColor: '#f97316', border: 'none', borderRadius: '8px' }}>Simpan Kegiatan</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold text-dark m-0">Daftar Kegiatan</h3>
                    <p className="text-muted small m-0">Kelola konten kegiatan yang telah Anda publikasikan.</p>
                </div>
                <Button 
                    className="rounded-3 px-4 fw-bold shadow-sm" 
                    onClick={() => handleShow()}
                    style={{ backgroundColor: '#f97316', border: 'none' }}
                >
                    <i className="bi bi-plus-lg me-2"></i> Tambah Kegiatan
                </Button>
            </div>

            <div className="bg-white rounded-4 shadow-sm overflow-hidden">
                <StyledTable responsive hover className="mb-0">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Judul Kegiatan</th>
                            <th className="text-center">Kategori</th>
                            <th>Lokasi</th>
                            <th className="col-aksi">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center py-5">Memuat data...</td></tr>
                        ) : kegiatan.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-5 text-muted">Belum ada data kegiatan.</td></tr>
                        ) : kegiatan.map(item => (
                            <tr key={item.id}>
                                <td>{new Date(item.date).toLocaleDateString('id-ID')}</td>
                                <td>{item.title}</td>
                                <td className="text-center">
                                    <OrangeBadge className="text-capitalize">
                                        {item.category?.name}
                                    </OrangeBadge>
                                </td>
                                <td>{item.location}</td>
                                <td className="col-aksi">
                                    <div className="d-flex justify-content-center gap-2">
                                        <ActionButton variant="outline-primary" onClick={() => handleShow(item)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </ActionButton>
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
        </div>
    );
};

export default KegiatanGuru;
