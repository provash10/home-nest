import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import useRole from '../../hooks/useRole';
import { 
  FaHome, FaUsers, FaStar, FaChartLine, 
  FaArrowUp, FaArrowDown, FaEye, FaEdit,
  FaTrash, FaCheckCircle, FaTimesCircle,
  FaBuilding, FaUserCircle, FaEnvelope,
  FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave,
  FaPlusCircle, FaListAlt, FaCog, FaShieldAlt,
  FaGoogle, FaLock, FaPhone, FaGlobe
} from 'react-icons/fa';
import { MdDashboard, MdApartment, MdRealEstateAgent } from 'react-icons/md';
import { HiUserGroup, HiChartBar } from 'react-icons/hi';
import { IoStatsChart } from 'react-icons/io5';

const Dashboard = () => {
  const { role } = useRole();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://homenest-server-ten.vercel.app/admin/dashboard-stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
        }
        setLoading(false);
      })
      .catch(() => {
        console.log('Failed to fetch dashboard stats');
        setLoading(false);
      });
  }, []);

  // chart data
  const categoryData = [
    { name: 'Rent', value: stats?.totalProperties ? Math.floor(stats.totalProperties * 0.4) : 10 },
    { name: 'Sale', value: stats?.totalProperties ? Math.floor(stats.totalProperties * 0.3) : 8 },
    { name: 'Commercial', value: stats?.totalProperties ? Math.floor(stats.totalProperties * 0.2) : 5 },
    { name: 'Land', value: stats?.totalProperties ? Math.floor(stats.totalProperties * 0.1) : 3 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MdDashboard className="text-primary" />
            Dashboard Overview
          </h1>
          <p className="text-gray-500">Welcome to your dashboard</p>
        </div>
        <div className="badge badge-primary badge-lg flex items-center gap-2">
          {role === 'admin' ? (
            <>
              <FaShieldAlt /> Administrator
            </>
          ) : (
            <>
              <FaUserCircle /> User
            </>
          )}
        </div>
      </div>

      {/* stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* property card */}
        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-white flex items-center gap-2">
                  <MdApartment /> Total Properties
                </h3>
                <p className="text-4xl font-bold mt-2">{stats?.totalProperties || 0}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <FaArrowUp className="text-green-300" /> 12% from last month
                </div>
              </div>
              <div className="text-5xl opacity-80">
                <FaBuilding />
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link 
                to={role === 'admin' ? "/dashboard/all-properties" : "/dashboard/my-properties"} 
                className="btn btn-accent btn-sm text-white"
              >
                <FaEye /> View All
              </Link>
            </div>
          </div>
        </div>
        
        {/* review card */}
        <div className="card bg-gradient-to-r from-secondary to-accent text-secondary-content shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-white flex items-center gap-2">
                  <FaStar /> Total Reviews
                </h3>
                <p className="text-4xl font-bold mt-2">{stats?.totalRatings || 0}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <FaArrowUp className="text-green-300" /> 8% from last month
                </div>
              </div>
              <div className="text-5xl opacity-80">
                <FaStar />
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link 
                to={role === 'admin' ? "/dashboard/all-ratings" : "/dashboard/my-ratings"} 
                className="btn btn-primary btn-sm text-white"
              >
                <FaEye /> View All
              </Link>
            </div>
          </div>
        </div>
        
        {/* user card*/}
        <div className="card bg-gradient-to-r from-accent to-neutral text-accent-content shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-white flex items-center gap-2">
                  <HiUserGroup /> Total Users
                </h3>
                <p className="text-4xl font-bold mt-2">{stats?.totalUsers || 0}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <FaArrowUp className="text-green-300" /> 5% from last month
                </div>
              </div>
              <div className="text-5xl opacity-80">
                <FaUsers />
              </div>
            </div>
            {role === 'admin' && (
              <div className="card-actions justify-end mt-4">
                <Link to="/dashboard/users" className="btn btn-primary btn-sm text-white">
                  <FaUsers /> Manage Users
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* activity card */}
        <div className="card bg-gradient-to-r from-neutral to-base-300 text-neutral-content shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-white flex items-center gap-2">
                  <IoStatsChart /> Recent Activity
                </h3>
                <p className="text-4xl font-bold mt-2">
                  {stats?.recentProperties?.length || 0}
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <FaCalendarAlt /> Last 5 Properties
                </div>
              </div>
              <div className="text-5xl opacity-80">
                <FaChartLine />
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <span className="text-sm">Updated Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* charts section - Admin Only */}
      {role === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <HiChartBar /> Properties by Category
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      name="Properties" 
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <FaChartLine /> Property Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title flex items-center gap-2">
            <FaCog /> Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            {role === 'user' ? (
              <>
                <Link to="/dashboard/add-properties" className="btn btn-primary">
                  <FaPlusCircle /> Add New Property
                </Link>
                <Link to="/dashboard/my-properties" className="btn btn-secondary">
                  <FaListAlt /> View My Properties
                </Link>
                <Link to="/dashboard/my-ratings" className="btn btn-accent">
                  <FaStar /> My Ratings
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard/users" className="btn btn-primary">
                  <FaUsers /> Manage Users
                </Link>
                <Link to="/dashboard/all-properties" className="btn btn-secondary">
                  <FaBuilding /> All Properties
                </Link>
                <Link to="/dashboard/all-ratings" className="btn btn-accent">
                  <FaStar /> All Ratings
                </Link>
                <Link to="/dashboard/statistics" className="btn btn-neutral">
                  <IoStatsChart /> Statistics
                </Link>
              </>
            )}
            <Link to="/dashboard/profile" className="btn btn-outline">
              <FaUserCircle /> Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* recent activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        {stats?.recentProperties && stats.recentProperties.length > 0 && (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <MdRealEstateAgent /> Recent Properties
              </h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentProperties.map(property => (
                      <tr key={property._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={property.image} alt={property.name} />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{property.name}</div>
                              <div className="text-sm opacity-50 flex items-center gap-1">
                                <FaMapMarkerAlt /> {property.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-ghost badge-sm">
                            {property.category}
                          </span>
                        </td>
                        <td className="font-bold flex items-center gap-1">
                          <FaMoneyBillWave /> ${property.price}
                        </td>
                        <td className="flex items-center gap-1">
                          <FaCalendarAlt /> 
                          {new Date(property.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-actions justify-end mt-4">
                <Link 
                  to={role === 'admin' ? "/dashboard/all-properties" : "/dashboard/my-properties"} 
                  className="btn btn-sm btn-ghost"
                >
                  <FaEye /> View All
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recent Reviews */}
        {stats?.recentRatings && stats.recentRatings.length > 0 && (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <FaStar /> Recent Reviews
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stats.recentRatings.map(review => (
                  <div key={review._id} className="flex items-start gap-3 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-10 flex items-center justify-center">
                        <FaUser />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold flex items-center gap-2">
                          <FaUserCircle /> {review.reviewerName || 'Anonymous'}
                        </h4>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <FaStar /> <span className="font-bold">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-sm mt-1 line-clamp-2">{review.reviewText}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MdApartment /> {review.propertyName}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt /> {new Date(review.reviewDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <Link 
                  to={role === 'admin' ? "/dashboard/all-ratings" : "/dashboard/my-ratings"} 
                  className="btn btn-sm btn-ghost"
                >
                  <FaEye /> View All
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title flex items-center gap-2">
            <FaShieldAlt /> System Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <div className={`radial-progress ${stats ? 'text-success' : 'text-error'}`} 
                   style={{"--value": stats ? 100 : 0, "--size": "3rem"}}>
                {stats ? <FaCheckCircle /> : <FaTimesCircle />}
              </div>
              <div>
                <p className="font-semibold">Backend API</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  {stats ? (
                    <>
                      <FaCheckCircle className="text-success" /> Connected
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-error" /> Disconnected
                    </>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <div className="radial-progress text-info" style={{"--value": 85, "--size": "3rem"}}>
                85%
              </div>
              <div>
                <p className="font-semibold">Database</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaCheckCircle className="text-success" /> Healthy
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <div className="radial-progress text-warning" style={{"--value": 95, "--size": "3rem"}}>
                95%
              </div>
              <div>
                <p className="font-semibold">Uptime</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaCalendarAlt /> This month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;