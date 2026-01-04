import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  FaChartBar, FaChartLine, FaChartPie, FaUsers,
  FaBuilding, FaStar, FaMoneyBillWave, FaCalendarAlt,
  FaArrowUp, FaArrowDown, FaPercentage
} from 'react-icons/fa';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    fetchDashboardStats();
  }, [timeRange]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://homenest-server-ten.vercel.app/admin/dashboard-stats?range=${timeRange}`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample data for charts (replace with real data from backend)
  const monthlyData = [
    { month: 'Jan', properties: 12, users: 8, reviews: 15 },
    { month: 'Feb', properties: 19, users: 12, reviews: 22 },
    { month: 'Mar', properties: 15, users: 9, reviews: 18 },
    { month: 'Apr', properties: 25, users: 16, reviews: 30 },
    { month: 'May', properties: 22, users: 14, reviews: 25 },
    { month: 'Jun', properties: 30, users: 20, reviews: 35 },
  ];

  const categoryData = [
    { name: 'Rent', value: 35 },
    { name: 'Sale', value: 25 },
    { name: 'Commercial', value: 20 },
    { name: 'Land', value: 20 },
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaChartBar className="text-primary" />
            Statistics Dashboard
          </h1>
          <p className="text-gray-500">Comprehensive analytics and insights</p>
        </div>
        
        <div className="flex gap-2">
          <select 
            className="select select-bordered"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="btn btn-primary" onClick={fetchDashboardStats}>
            Refresh Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm text-white opacity-90">Total Properties</h3>
                <p className="text-3xl font-bold">{stats?.totalProperties || 0}</p>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <FaArrowUp className="text-green-300" /> 12% from last month
                </div>
              </div>
              <div className="text-4xl opacity-80">
                <FaBuilding />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-secondary to-accent text-secondary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm text-white opacity-90">Total Reviews</h3>
                <p className="text-3xl font-bold">{stats?.totalRatings || 0}</p>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <FaArrowUp className="text-green-300" /> 8% from last month
                </div>
              </div>
              <div className="text-4xl opacity-80">
                <FaStar />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-accent to-neutral text-accent-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm text-white opacity-90">Total Users</h3>
                <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <MdTrendingUp className="text-green-300" /> 5% from last month
                </div>
              </div>
              <div className="text-4xl opacity-80">
                <FaUsers />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-neutral to-base-300 text-neutral-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm text-white opacity-90">Growth Rate</h3>
                <p className="text-3xl font-bold">24%</p>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <FaPercentage /> This month
                </div>
              </div>
              <div className="text-4xl opacity-80">
                <FaChartLine />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* line chart*/}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <FaChartLine /> Growth Analytics
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="properties" 
                    name="Properties" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    name="Users" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reviews" 
                    name="Reviews" 
                    stroke="#ffc658" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie chart*/}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <FaChartPie /> Property Categories
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
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* area chart & bar chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart - Revenue/Engagement */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <FaMoneyBillWave /> Monthly Performance
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="properties" 
                    name="Properties" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="reviews" 
                    name="Reviews" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* bar chart - Comparison */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <FaChartBar /> Monthly Comparison
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="properties" name="Properties" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="users" name="Users" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* recent activities */}
        <div className="card bg-base-100 shadow-lg lg:col-span-2">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <FaCalendarAlt /> Recent Activities
            </h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>User</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="badge badge-primary">Property</span></td>
                    <td>New property listed: "Modern Apartment"</td>
                    <td>john@example.com</td>
                    <td>2 hours ago</td>
                    <td><span className="badge badge-success">Active</span></td>
                  </tr>
                  <tr>
                    <td><span className="badge badge-secondary">Review</span></td>
                    <td>New review added for "Luxury Villa"</td>
                    <td>sarah@example.com</td>
                    <td>4 hours ago</td>
                    <td><span className="badge badge-success">Published</span></td>
                  </tr>
                  <tr>
                    <td><span className="badge badge-accent">User</span></td>
                    <td>New user registered</td>
                    <td>mike@example.com</td>
                    <td>1 day ago</td>
                    <td><span className="badge badge-warning">Pending</span></td>
                  </tr>
                  <tr>
                    <td><span className="badge badge-primary">Property</span></td>
                    <td>Property updated: "City Center Office"</td>
                    <td>admin@example.com</td>
                    <td>2 days ago</td>
                    <td><span className="badge badge-success">Updated</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* performance metrics */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <MdTrendingUp /> Performance Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Platform Uptime</span>
                <div className="radial-progress text-success" style={{"--value": 99.9}}>
                  99.9%
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>User Satisfaction</span>
                <div className="radial-progress text-primary" style={{"--value": 92}}>
                  92%
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Response Time</span>
                <div className="radial-progress text-secondary" style={{"--value": 85}}>
                  85%
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Data Accuracy</span>
                <div className="radial-progress text-accent" style={{"--value": 98}}>
                  98%
                </div>
              </div>
              
              <div className="divider"></div>
              
              <div>
                <h4 className="font-semibold mb-2">Quick Insights</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <FaArrowUp className="text-green-500" /> Peak hours: 6-9 PM
                  </li>
                  <li className="flex items-center gap-2">
                    <FaBuilding /> Most active category: Rent
                  </li>
                  <li className="flex items-center gap-2">
                    <FaStar /> Avg. rating: 4.5/5
                  </li>
                  <li className="flex items-center gap-2">
                    <FaUsers /> New users this week: 24
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* export /actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="card-title">Export Data</h3>
              <p className="text-gray-500">Download detailed reports and analytics</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline">
                <FaChartBar /> Export as CSV
              </button>
              <button className="btn btn-outline">
                <FaChartLine /> Export as PDF
              </button>
              <button className="btn btn-primary">
                Generate Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;