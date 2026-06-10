import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import api from '../../services/api';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', type: 'kegiatan' });

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleClose = () => {
        setShow(false);
        setFormData({ id: null, name: '', type: 'kegiatan' });
    };

    const handleShow = (cat = null) => {
        if (cat) {
            setFormData(cat);
        }
        setShow(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await api.put(`/categories/${formData.id}`, formData);
            } else {
                await api.post('/categories', formData);
            }
            fetchCategories();
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Error saving category');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus kategori ini?')) {
            try {
                await api.delete(`/categories/${id}`);
                fetchCategories();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (show) {
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold m-0" style={{ color: '#1e293b' }}>{formData.id ? 'Edit Kategori' : 'Tambah Kategori'}</h3>
                    <p className="text-muted m-0">Silakan isi detail kategori di bawah ini.</p>
                </div>

                <div className="bg-white rounded-3 shadow-sm p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Nama Kategori</Form.Label>
                            <Form.Control type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Tipe</Form.Label>
                            <Form.Select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                <option value="kegiatan">Kegiatan</option>
                                <option value="prestasi">Prestasi</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>Batal</Button>
                            <Button variant="primary" type="submit" style={{ backgroundColor: '#f97316', border: 'none', borderRadius: '8px' }}>Simpan</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold m-0" style={{ color: '#1e293b' }}>Kategori</h3>
                <Button variant="primary" style={{ backgroundColor: '#f97316', border: 'none' }} onClick={() => handleShow()}>
                    + Tambah Kategori
                </Button>
            </div>

            <div className="bg-white rounded-3 shadow-sm p-4">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Nama Kategori</th>
                            <th>Tipe</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id}>
                                <td>{cat.name}</td>
                                <td><span className={`badge ${cat.type === 'kegiatan' ? 'bg-info' : 'bg-success'} text-capitalize`}>{cat.type}</span></td>
                                <td>
                                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(cat)}>Edit</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(cat.id)}>Hapus</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageCategories;
