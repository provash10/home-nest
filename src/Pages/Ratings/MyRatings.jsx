import React, { use, useEffect, useState } from 'react';
import RatingCard from './RatingCard';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { Link } from 'react-router';


const MyRatings = () => {
  const [ratings, setRatings] = useState([]);
  const { user } = use(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-ratings/${user.email}`)
        .then(res => res.json())
        .then(data => setRatings(data))
        .catch(err => console.error(err));
    }
  }, [user?.email]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">My Ratings</h2>

      {ratings.length === 0 ? (
        <p className="text-center text-gray-500">You have not submitted any ratings yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {ratings.map(rating => (
            <RatingCard key={rating._id} rating={rating} />
          ))}
        </div>
      )}

     
    </div>
  );
};

export default MyRatings;

