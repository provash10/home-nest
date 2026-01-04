import React from 'react';
import useRole from '../hooks/useRole';
import { Navigate } from 'react-router';
import LoadingSpinner from '../Loader/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { role, isLoading } = useRole();

    if (isLoading) return <LoadingSpinner />;

    if (role !== 'admin') return <Navigate to="/dashboard" replace />;

    return children;
};

export default AdminRoute;
