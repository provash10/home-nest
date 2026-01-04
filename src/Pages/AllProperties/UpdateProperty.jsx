import React from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLoaderData, useNavigate } from 'react-router';

const UpdateProperty = () => {
  const { result: property } = useLoaderData();
  const navigate = useNavigate();

  const handleUpdateProperty = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      short_description: e.target.short_description.value,
      description: e.target.description.value,
      location: e.target.location.value,
      price: Number(e.target.price.value),
      image: e.target.image.value,
      postedBy: e.target.userName.value,
      createdAt: new Date().toISOString(),
    };

    fetch(`https://homenest-server-ten.vercel.app/properties/${property._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success('Property updated successfully');
        navigate(`/property-details/${property._id}`);
      })
      .catch(() => toast.error('Update failed'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br via-purple-200 to-pink-200 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
  <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10">
    
    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Update Property</h2>
      <Link
        to="/all-properties"
        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium"
      >
        <FaArrowLeft /> Back
      </Link>
    </div>

    <form onSubmit={handleUpdateProperty} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Property Name</label>
        <input
          type="text"
          name="name"
          defaultValue={property.name}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition"
          required
        />
      </div>

      {/* short description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
        <input
          type="text"
          name="short_description"
          defaultValue={property.short_description}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition"
          required
        />
      </div>

      {/* full description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Description</label>
        <textarea
          name="description"
          defaultValue={property.description}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 resize-none h-32 transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            name="category"
            defaultValue={property.category}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition"
          >
            <option>Rent</option>
            <option>Sale</option>
            <option>Commercial</option>
            <option>Land</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={property.price}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Location</label>
        <input
          type="text"
          name="location"
          defaultValue={property.location}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
        <input
          type="text"
          name="image"
          defaultValue={property.image}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">User Name</label>
          <input
            type="text"
            value={property.userName}
            readOnly
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">User Email</label>
          <input
            type="email"
            value={property.userEmail}
            readOnly
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="pt-6 text-right">
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
        >
          Update Property
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default UpdateProperty;
