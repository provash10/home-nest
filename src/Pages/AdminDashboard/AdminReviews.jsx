import React, { useEffect, useState } from 'react';
import { FaStar, FaSearch, FaFilter, FaTrash, FaEye, FaUser, FaBuilding } from 'react-icons/fa';
import { MdRateReview, MdApartment } from 'react-icons/md';
import toast from 'react-hot-toast';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://homenest-server-ten.vercel.app/admin/ratings');
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.ratings);
        setFilteredReviews(data.ratings);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, ratingFilter);
  };

  const handleRatingFilter = (rating) => {
    setRatingFilter(rating);
    applyFilters(searchTerm, rating);
  };

  const applyFilters = (search, rating) => {
    let filtered = reviews;
    
    if (search) {
      filtered = filtered.filter(review =>
        review.reviewerName?.toLowerCase().includes(search) ||
        review.propertyName?.toLowerCase().includes(search) ||
        review.reviewText?.toLowerCase().includes(search)
      );
    }
    
    if (rating !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(rating));
    }
    
    setFilteredReviews(filtered);
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const response = await fetch(`https://homenest-server-ten.vercel.app/admin/ratings/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Review deleted successfully');
        fetchReviews(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const getRatingStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'text-yellow-500' : 'text-gray-300'}
      />
    ));
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaStar className="text-primary" />
            Manage Reviews
          </h1>
          <p className="text-gray-500">Manage all property reviews and ratings</p>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Reviews</div>
            <div className="stat-value">{reviews.length}</div>
            <div className="stat-desc">↗︎ Avg Rating: {
              reviews.length > 0 
                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                : '0.0'
            }</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">Total Reviews</h3>
                <p className="text-3xl font-bold">{reviews.length}</p>
              </div>
              <MdRateReview className="text-4xl text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">Avg Rating</h3>
                <p className="text-3xl font-bold">
                  {reviews.length > 0 
                    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
              <FaStar className="text-4xl text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">5 Star Reviews</h3>
                <p className="text-3xl font-bold">
                  {reviews.filter(r => r.rating === 5).length}
                </p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm">Today's Reviews</h3>
                <p className="text-3xl font-bold">
                  {reviews.filter(r => {
                    const reviewDate = new Date(r.reviewDate);
                    const today = new Date();
                    return reviewDate.toDateString() === today.toDateString();
                  }).length}
                </p>
              </div>
              <FaStar className="text-4xl text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
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
                  placeholder="Search reviews by user, property, or text..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                  <FaFilter /> Filter by Rating
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><button onClick={() => handleRatingFilter('all')}>All Ratings</button></li>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <li key={rating}>
                      <button onClick={() => handleRatingFilter(rating.toString())}>
                        {rating} Stars ({reviews.filter(r => r.rating === rating).length})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <select className="select select-bordered">
                <option>Sort by Date</option>
                <option>Sort by Rating: High to Low</option>
                <option>Sort by Rating: Low to High</option>
              </select>
            </div>
          </div>
          
          {/* rating filter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button 
              className={`btn btn-sm ${ratingFilter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => handleRatingFilter('all')}
            >
              All ({reviews.length})
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button 
                key={rating}
                className={`btn btn-sm ${ratingFilter === rating.toString() ? 'btn-secondary' : 'btn-ghost'}`}
                onClick={() => handleRatingFilter(rating.toString())}
              >
                {rating} Stars ({reviews.filter(r => r.rating === rating).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* reviews table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Review</th>
                  <th>Property</th>
                  <th>Rating</th>
                  <th>Reviewer</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map(review => (
                  <tr key={review._id}>
                    <td>
                      <div className="max-w-xs">
                        <p className="font-medium line-clamp-2">{review.reviewText}</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="avatar">
                          <div className="mask mask-squircle w-8 h-8">
                            <img src={review.thumbnail} alt={review.propertyName} />
                          </div>
                        </div>
                        <span className="font-medium">{review.propertyName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {getRatingStars(review.rating)}
                        <span className="font-bold ml-2">{review.rating}/5</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-500" />
                        <span>{review.reviewerName || 'Anonymous'}</span>
                      </div>
                      <div className="text-sm text-gray-500">{review.reviewerEmail}</div>
                    </td>
                    <td>
                      {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-ghost btn-xs"
                          onClick={() => {/* View details */}}
                        >
                          <FaEye /> View
                        </button>
                        <button 
                          className="btn btn-ghost btn-xs text-error"
                          onClick={() => handleDeleteReview(review._id)}
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
          
          {filteredReviews.length === 0 && (
            <div className="text-center py-8">
              <MdRateReview className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No reviews found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;