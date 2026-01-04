import React, { useContext, useEffect, useState } from 'react';
import RatingCard from './RatingCard';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://homenest-server-ten.vercel.app/my-ratings/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRatings(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to load your ratings', 'error');
        toast.error('Failed to load your ratings');
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        My Ratings <span className="text-blue-600 dark:text-blue-400 text-xl">({ratings.length})</span>
      </h2>

      {ratings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have not submitted any ratings yet.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {ratings.map((rating) => (
            <RatingCard key={rating._id} rating={rating} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRatings;
