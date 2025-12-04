import React, { use, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const AddProperties = () => {
    // const { user } = use(AuthContext)
    const {user} = useContext(AuthContext)
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
            // postedBy: e.target.userEmail.value,
            createdAt: new Date().toISOString(),
            userEmail: e.target.userEmail.value,
            userName: e.target.userName.value,
        }

        console.log(formData); //checked ok

        fetch('http://localhost:3000/properties', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            // body: formData  -->400 showing
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                navigate('/all-properties');
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br via-purple-300 to-pink-400">
            <form onSubmit={handleAddProperty} className="bg-white shadow-2xl rounded-2xl p-10 m-5 space-y-8 border border-gray-200 max-w-3xl w-full">

                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Add New Property</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* property name */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Property Name</label>
                        <input
                            type="text" name="name"
                            placeholder="Enter property name"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>

                    {/* Short Description */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Short Description</label>
                        <input
                            type="text"
                            name="short_description"
                            placeholder="Enter a short description"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            placeholder="Enter description"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none h-28 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category</label>
                        <select name="category" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
                            <option>Rent</option>
                            <option>Sale</option>
                            <option>Commercial</option>
                            <option>Land</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price $</label>
                        <input
                            type="number" name="price"
                            placeholder="Enter price"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Location</label>
                        <input
                            type="text" name="location"
                            placeholder="City, area, or address"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Image Link</label>
                        <input
                            type="text" name="image"
                            placeholder="Enter image URL"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">User Name</label>
                        <input
                            type="text" name="userName" defaultValue={user?.displayName || ""}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">User Email</label>
                        <input
                            type="email" name="userEmail" defaultValue={user?.email || ""}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100"
                        />
                    </div>

                </div>

                <div className='flex justify-between'>
                    <Link to='/' className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-3 rounded-2xl text-lg font-semibold hover:scale-105 transform transition-all shadow-lg">
                        Back Home
                    </Link>

                    <button type="submit" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-3 rounded-2xl text-lg font-semibold hover:scale-105 transform transition-all shadow-lg">
                        Add Property
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddProperties;