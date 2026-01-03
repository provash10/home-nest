import React, { useEffect, useState } from 'react';
import { FaBuilding, FaSearch, FaFilter, FaEdit, FaTrash, FaEye, FaChartLine } from 'react-icons/fa';
import { MdApartment, MdRealEstateAgent } from 'react-icons/md';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://homenest-server-ten.vercel.app/admin/properties');
      const data = await response.json();
      
      if (data.success) {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, categoryFilter);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    applyFilters(searchTerm, category);
  };

  const applyFilters = (search, category) => {
    let filtered = properties;
    
    if (search) {
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(search) ||
        property.location.toLowerCase().includes(search) ||
        property.userEmail.toLowerCase().includes(search)
      );
    }
    
    if (category !== 'all') {
      filtered = filtered.filter(property => property.category === category);
    }
    
    setFilteredProperties(filtered);
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const response = await fetch(`https://homenest-server-ten.vercel.app/properties/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Property deleted successfully');
        fetchProperties(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  const categories = ['Rent', 'Sale', 'Commercial', 'Land'];

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
            <FaBuilding className="text-primary" />
            Manage Properties
          </h1>
          <p className="text-gray-500">Manage all properties listed on the platform</p>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Properties</div>
            <div className="stat-value">{properties.length}</div>
            <div className="stat-desc">↗︎ {properties.filter(p => p.category === 'Rent').length} for Rent</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">Total Properties</h3>
                <p className="text-3xl font-bold">{properties.length}</p>
              </div>
              <MdApartment className="text-4xl text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">For Rent</h3>
                <p className="text-3xl font-bold">
                  {properties.filter(p => p.category === 'Rent').length}
                </p>
              </div>
              <FaBuilding className="text-4xl text-secondary" />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">For Sale</h3>
                <p className="text-3xl font-bold">
                  {properties.filter(p => p.category === 'Sale').length}
                </p>
              </div>
              <MdRealEstateAgent className="text-4xl text-accent" />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">Avg Price</h3>
                <p className="text-3xl font-bold">
                  ${properties.length > 0 
                    ? Math.round(properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length)
                    : 0}
                </p>
              </div>
              <FaChartLine className="text-4xl text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* search and filter */}
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
                  placeholder="Search properties by name, location, or owner..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                  <FaFilter /> Filter by Category
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><button onClick={() => handleCategoryFilter('all')}>All Categories</button></li>
                  {categories.map(cat => (
                    <li key={cat}>
                      <button onClick={() => handleCategoryFilter(cat)}>{cat}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <select className="select select-bordered">
                <option>Sort by Date</option>
                <option>Sort by Price: Low to High</option>
                <option>Sort by Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* category filter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button 
              className={`btn btn-sm ${categoryFilter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => handleCategoryFilter('all')}
            >
              All ({properties.length})
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`btn btn-sm ${categoryFilter === cat ? 'btn-secondary' : 'btn-ghost'}`}
                onClick={() => handleCategoryFilter(cat)}
              >
                {cat} ({properties.filter(p => p.category === cat).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* properties table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th>Owner</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map(property => (
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
                          <div className="text-sm opacity-50 line-clamp-1">
                            {property.short_description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        property.category === 'Rent' ? 'badge-primary' :
                        property.category === 'Sale' ? 'badge-secondary' :
                        property.category === 'Commercial' ? 'badge-accent' :
                        'badge-neutral'
                      }`}>
                        {property.category}
                      </span>
                    </td>
                    <td className="font-bold">${property.price}</td>
                    <td>{property.location}</td>
                    <td>
                      <div className="text-sm">
                        <div className="font-medium">{property.userName}</div>
                        <div className="text-gray-500">{property.userEmail}</div>
                      </div>
                    </td>
                    <td>
                      {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link 
                          to={`/property-details/${property._id}`}
                          className="btn btn-ghost btn-xs"
                        >
                          <FaEye /> View
                        </Link>
                        <Link 
                          to={`/update-property/${property._id}`}
                          className="btn btn-ghost btn-xs"
                        >
                          <FaEdit /> Edit
                        </Link>
                        <button 
                          className="btn btn-ghost btn-xs text-error"
                          onClick={() => handleDeleteProperty(property._id)}
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
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-8">
              <FaBuilding className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No properties found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProperties;