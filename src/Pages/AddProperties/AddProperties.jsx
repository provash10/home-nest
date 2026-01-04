import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import toast from 'react-hot-toast';

const AddProperties = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddProperty = (e) => {
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
            userEmail: e.target.userEmail.value,
            userName: e.target.userName.value,
        };

        fetch('https://homenest-server-ten.vercel.app/properties', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Property added successfully!");
                navigate('/all-properties');
            })
            .catch(() => toast.error("Failed to add property!"));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br via-purple-200 to-pink-200 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Add New Property
                    </h2>
                    <Link
                        to="/"
                        className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-200"
                    >
                        Back Home
                    </Link>
                </div>

                {/* Form */}
                <form onSubmit={handleAddProperty} className="space-y-6">

                    {/* Property Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Property Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter property name"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Short Description
                        </label>
                        <input
                            type="text"
                            name="short_description"
                            placeholder="Enter a short description"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    {/* Full Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter full description"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-28 transition"
                        />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                            <select
                                name="category"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            >
                                <option>Rent</option>
                                <option>Sale</option>
                                <option>Commercial</option>
                                <option>Land</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Price $</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="City, area, or address"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            placeholder="Enter image URL"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    {/* User Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">User Name</label>
                            <input
                                type="text"
                                name="userName"
                                defaultValue={user?.displayName || ""}
                                readOnly
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">User Email</label>
                            <input
                                type="email"
                                name="userEmail"
                                defaultValue={user?.email || ""}
                                readOnly
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-6 text-right">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
                        >
                            Add Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProperties;
