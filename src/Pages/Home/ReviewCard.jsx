import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const {
    reviewerName,
    reviewText,
    propertyName,
    rating,
    reviewerPhoto,
  } = review;

  return (
    <div
      className="
        h-full max-w-sm mx-auto
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-2xl p-6
        transition hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* reviewer info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={reviewerPhoto}
          alt={reviewerName}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-white">
            {reviewerName}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {propertyName}
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
        “{reviewText}”
      </p>

      <div className="flex items-center gap-1 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? 'opacity-100' : 'opacity-30'}
          />
        ))}
        <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
          {rating}/5
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;

