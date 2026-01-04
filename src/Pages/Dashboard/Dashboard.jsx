import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { MdDashboard, MdApartment } from 'react-icons/md';
import { FaStar, FaUsers, FaBuilding, FaChartLine, FaArrowUp } from 'react-icons/fa';
import { HiChartBar } from 'react-icons/hi';
import { IoStatsChart } from 'react-icons/io5';
import useRole from '../../hooks/useRole';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { role } = useRole();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://homenest-server-ten.vercel.app/admin/dashboard-stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.stats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categoryData = [
    { name: 'Rent', value: stats?.totalProperties ? Math.floor(stats.totalProperties * 0.4) : 10 },
    { name: 'Sale', value: stats?.totalProperties ? Math.floor(stats.totalProperties * 0.3) : 8 },
    { name: 'Commercial', value: stats?.totalProperties ? Math.floor(stats.totalProperties * 0.2) : 5 },
    { name: 'Land', value: stats?.totalProperties ? Math.floor(stats.totalProperties * 0.1) : 3 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="space-y-6">
      {/* stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-white flex items-center gap-2"><MdApartment /> Total Properties</h3>
                <p className="text-4xl font-bold mt-2">{stats?.totalProperties || 0}</p>
              </div>
              <div className="text-5xl opacity-80"><FaBuilding /></div>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link to={role==='admin'?"/dashboard/all-properties":"/dashboard/my-properties"} className="btn btn-accent btn-sm text-white">View All</Link>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-secondary to-accent text-secondary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-white flex items-center gap-2"><FaStar /> Total Reviews</h3>
                <p className="text-4xl font-bold mt-2">{stats?.totalRatings || 0}</p>
              </div>
              <div className="text-5xl opacity-80"><FaStar /></div>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link to={role==='admin'?"/dashboard/all-ratings":"/dashboard/my-ratings"} className="btn btn-primary btn-sm text-white">View All</Link>
            </div>
          </div>
        </div>
      </div>

      {/* only admin */}
      {role==='admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2"><HiChartBar /> Properties by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Properties" fill="#8884d8" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">Property Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({name, percent})=>`${name}: ${(percent*100).toFixed(0)}%`} dataKey="value">
                      {categoryData.map((entry,index)=><Cell key={`cell-${index}`} fill={COLORS[index%COLORS.length]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
