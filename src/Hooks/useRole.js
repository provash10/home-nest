import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';


const useRole = () => {
    const { user, loading } = use(AuthContext);
    const [role, setRole] = useState('user');
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!loading && user?.email) {
                try {
                    setRoleLoading(true);
                    const response = await fetch(
                        `https://homenest-server-ten.vercel.app/users/${user.email}/role`
                    );
                    const data = await response.json();
                    setRole(data.role || 'user');
                } catch (error) {
                    console.error('Error fetching user role:', error);
                    setRole('user');
                } finally {
                    setRoleLoading(false);
                }
            } else {
                setRole('user');
                setRoleLoading(false);
            }
        };

        fetchUserRole();
    }, [user, loading]);

    return { role, isLoading: roleLoading || loading };
};

export default useRole;