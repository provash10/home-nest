import React from 'react';
import useRole from '../hooks/useRole';
import { useNavigate } from 'react-router';


const AdminRoute = ({ children }) => {
    const { role, isLoading } = useRole();
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (role !== 'admin') {
        return <navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminRoute;