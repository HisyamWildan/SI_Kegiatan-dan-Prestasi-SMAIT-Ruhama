import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import api from '../../services/api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', email: '', password: '', role: 'siswa' });

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleClose = () => {
        setShow(false);
        setShowPassword(false);
        setFormData({ id: null, name: '', email: '', password: '', role: 'siswa' });
    };

    const handleShow = (user = null) => {
        if (user) {
            setFormData({ ...user, password: '' });
        }
        setShow(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await api.put(`/users/${formData.id}`, formData);
            } else {
                await api.post('/users', formData);
            }
            fetchUsers();
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Error saving user');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus user ini?')) {
            try {
                await api.delete(`/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (show) {
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold m-0" style={{ color: '#1e293b' }}>{formData.id ? 'Edit User' : 'Tambah User'}</h3>
                    <p className="text-muted m-0">Silakan isi detail pengguna di bawah ini.</p>
                </div>

                <div className="bg-white rounded-3 shadow-sm p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Nama</Form.Label>
                            <Form.Control type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Email</Form.Label>
                            <Form.Control type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Password {formData.id && '(Kosongkan jika tidak ingin mengubah)'}</Form.Label>
                            <div className="position-relative">
                                <Form.Control 
                                    type={showPassword ? "text" : "password"} 
                                    required={!formData.id} 
                                    minLength={6} 
                                    value={formData.password} 
                                    onChange={e => setFormData({...formData, password: e.target.value})} 
                                    style={{ paddingRight: '40px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                                    style={{ background: 'none', color: '#64748b' }}
                                >
                                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </button>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Role</Form.Label>
                            <Form.Select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                                <option value="siswa">Siswa</option>
                                <option value="guru">Guru</option>
                                <option value="admin">Admin</option>
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
                <h3 className="fw-bold m-0" style={{ color: '#1e293b' }}>Manajemen User</h3>
                <Button variant="primary" style={{ backgroundColor: '#f97316', border: 'none' }} onClick={() => handleShow()}>
                    + Tambah User
                </Button>
            </div>

            <div className="bg-white rounded-3 shadow-sm p-4">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><span className="badge bg-secondary text-capitalize">{user.role}</span></td>
                                <td>
                                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(user)}>Edit</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.id)}>Hapus</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageUsers;
