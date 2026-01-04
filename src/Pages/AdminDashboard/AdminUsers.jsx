import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserShield, FaUserCheck, FaUserTimes, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://homenest-server-ten.vercel.app/admin/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
        setFilteredUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(term) ||
        user.name.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      const response = await fetch(`https://homenest-server-ten.vercel.app/users/${email}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(`User role updated to ${newRole}`);
        // update local state
        setUsers(prev => prev.map(user => 
          user.email === email ? { ...user, role: newRole } : user
        ));
        setFilteredUsers(prev => prev.map(user => 
          user.email === email ? { ...user, role: newRole } : user
        ));
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleDeleteUser = async (email) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      // endpoint needs to be created in backend
      const response = await fetch(`https://homenest-server-ten.vercel.app/admin/users/${email}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('User deleted successfully');
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaUsers className="text-primary" />
            Manage Users
          </h1>
          <p className="text-gray-500">Manage all registered users and their roles</p>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{users.length}</div>
            <div className="stat-desc">↗︎ {users.filter(u => u.role === 'admin').length} Admins</div>
          </div>
        </div>
      </div>

      {/* stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">Total Users</h3>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <HiUserGroup className="text-4xl text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">Admins</h3>
                <p className="text-3xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
              </div>
              <FaUserShield className="text-4xl text-secondary" />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">Regular Users</h3>
                <p className="text-3xl font-bold">{users.filter(u => u.role === 'user').length}</p>
              </div>
              <FaUserCheck className="text-4xl text-accent" />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">Active Today</h3>
                <p className="text-3xl font-bold">
                  {users.filter(u => {
                    const lastLogin = new Date(u.lastLoggedIn || u.createdAt);
                    const today = new Date();
                    return lastLogin.toDateString() === today.toDateString();
                  }).length}
                </p>
              </div>
              <FaUserCheck className="text-4xl text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* search filter */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="form-control flex-1">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search users by email, name, or role..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select className="select select-bordered">
                <option value="">All Roles</option>
                <option value="admin">Admins</option>
                <option value="user">Users</option>
              </select>
              <button className="btn btn-primary">Export Data</button>
            </div>
          </div>
        </div>
      </div>

      {/* users table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id || user.email}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            {user.photoURL ? (
                              <img src={user.photoURL} alt={user.name} />
                            ) : (
                              <div className="bg-neutral text-neutral-content rounded-full w-12 h-12 flex items-center justify-center">
                                <FaUsers />
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <select 
                        className="select select-bordered select-sm"
                        value={user.role || 'user'}
                        onChange={(e) => handleRoleChange(user.email, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      {user.lastLoggedIn ? new Date(user.lastLoggedIn).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-ghost btn-xs"
                          onClick={() => {/* View details */}}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button 
                          className="btn btn-ghost btn-xs text-error"
                          onClick={() => handleDeleteUser(user.email)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <HiUserGroup className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;