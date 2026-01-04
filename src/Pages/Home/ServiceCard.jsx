import React from 'react';

const ServiceCard = ({ service }) => {
  const { title, description } = service;

  return (
    <div
      className="
        h-full bg-slate-50 dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-2xl p-7
        transition-all duration-300
        hover:-translate-y-1 hover:border-blue-500
      "
    >
      <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
        {title}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
