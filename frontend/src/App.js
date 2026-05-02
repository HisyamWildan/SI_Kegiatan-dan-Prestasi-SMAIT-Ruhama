import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import LandingPage from './pages/Public/LandingPage';
import Login from './pages/Public/Login';
import Register from './pages/Public/Register';
import PublicKegiatan from './pages/Public/PublicKegiatan';
import PublicPrestasi from './pages/Public/PublicPrestasi';
import DetailKegiatan from './pages/Public/DetailKegiatan';
import DetailPrestasi from './pages/Public/DetailPrestasi';
import TentangKami from './pages/Public/TentangKami';

// Layouts
import DashboardLayout from './layout/DashboardLayout';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageCategories from './pages/Admin/ManageCategories';
import ManageKegiatan from './pages/Admin/ManageKegiatan';
import ManagePrestasiAdmin from './pages/Admin/ManagePrestasi';

// Guru Pages
import GuruDashboard from './pages/Guru/Dashboard';
import KegiatanGuru from './pages/Guru/Kegiatan';
import PrestasiGuru from './pages/Guru/Prestasi';
import VerifikasiPrestasi from './pages/Guru/VerifikasiPrestasi';

// Siswa Pages
import SiswaDashboard from './pages/Siswa/Dashboard';
import UploadPrestasi from './pages/Siswa/UploadPrestasi';
import RiwayatPrestasi from './pages/Siswa/RiwayatPrestasi';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard
        if (user.role === 'admin') return <Navigate to="/dashboard/admin" />;
        if (user.role === 'guru') return <Navigate to="/dashboardguru/guru" />;
        if (user.role === 'siswa') return <Navigate to="/dashboardsiswa/siswa" />;
    }

    return children;
};

const App = () => {
    return (
        <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/kegiatan-sekolah" element={<PublicKegiatan />} />
                <Route path="/prestasi-siswa" element={<PublicPrestasi />} />
                <Route path="/kegiatan/:id" element={<DetailKegiatan />} />
                <Route path="/prestasi/:id" element={<DetailPrestasi />} />
                <Route path="/tentang-kami" element={<TentangKami />} />

                {/* Admin Routes */}
                <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="user" element={<ManageUsers />} />
                    <Route path="categories" element={<ManageCategories />} />
                    <Route path="kegiatan" element={<ManageKegiatan />} />
                    <Route path="prestasi" element={<ManagePrestasiAdmin />} />
                </Route>

                {/* Guru Routes */}
                <Route path="/dashboardguru" element={<ProtectedRoute allowedRoles={['guru']}><DashboardLayout /></ProtectedRoute>}>
                    <Route path="guru" element={<GuruDashboard />} />
                    <Route path="kegiatan" element={<KegiatanGuru />} />
                    <Route path="prestasi" element={<PrestasiGuru />} />
                    <Route path="verification" element={<VerifikasiPrestasi />} />
                </Route>

                {/* Siswa Routes */}
                <Route path="/dashboardsiswa" element={<ProtectedRoute allowedRoles={['siswa']}><DashboardLayout /></ProtectedRoute>}>
                    <Route path="siswa" element={<SiswaDashboard />} />
                    <Route path="prestasi" element={<UploadPrestasi />} />
                    <Route path="riwayat" element={<RiwayatPrestasi />} />
                </Route>
        </Routes>
    );
};

export default App;
