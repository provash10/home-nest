import React from 'react';
import toast from 'react-hot-toast';
import { FaBackward } from 'react-icons/fa';
import { Link, useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const UpdateProperty = () => {
    const data = useLoaderData();
    //   console.log(data) //checked
    const property = data.result;
    console.log(property)
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
            // postedBy: e.target.userEmail.value,
            createdAt: new Date().toISOString(),
            // userEmail: e.target.userEmail.value,
            // userName: e.target.userName.value,
        }

        console.log(formData); //checked ok

        fetch(`https://homenest-server-ten.vercel.app/properties/${property._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },

            // body: formData  -->400 showing
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Successfully Update.')
                navigate(`/property-details/${property._id}`);
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br via-purple-300 to-pink-400">
            <form onSubmit={handleUpdateProperty} className="bg-white shadow-2xl rounded-2xl p-10 m-5 space-y-8 border border-gray-200 max-w-3xl w-full">

                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Update Property</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Property name */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Property Name</label>
                        <input
                            type="text"
                            defaultValue={property.name}
                            name="name"
                            placeholder="Enter property name"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" required
                        />
                    </div>

                    {/* short description */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Short Description</label>
                        <input
                            type="text"
                            defaultValue={property.short_description}
                            name="short_description"
                            placeholder="Enter a short description"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" required
                        />
                    </div>

                    {/* description */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Full Description</label>
                        <textarea
                            defaultValue={property.description}
                            name="description"
                            placeholder="Enter full description"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none h-28 transition"
                        />
                    </div>

                    {/* category */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category</label>
                        <select defaultValue={property.category} name="category" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" required>
                            <option>Rent</option>
                            <option>Sale</option>
                            <option>Commercial</option>
                            <option>Land</option>
                        </select>
                    </div>

                    {/* price */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price $</label>
                        <input
                            type="number"
                            defaultValue={property.price}
                            name="price"
                            placeholder="Enter price"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" required
                        />
                    </div>

                    {/* location */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Location</label>
                        <input
                            type="text"
                            defaultValue={property.location}
                            name="location"
                            placeholder="City, area, or address"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" required
                        />
                    </div>

                    {/* image URL */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Image Link</label>
                        <input
                            type="text"
                            defaultValue={property.image}
                            name="image"
                            placeholder="Enter image URL"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" required
                        />
                    </div>

                    {/* user name*/}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">User Name</label>
                        <input
                            type="text"
                            defaultValue={property.userName}
                            name="userName"
                            readOnly
                            placeholder="User Name"
                            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100"
                        />
                    </div>

                    {/* user email  */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">User Email</label>
                        <input
                            type="email"
                            defaultValue={property.userEmail}
                            name="userEmail"
                            readOnly
                            placeholder="User Email"
                            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100"
                        />
                    </div>

                </div>


                <div className='flex justify-between'>
                    <Link to='/all-properties' className="px-4 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-2 rounded-2xl text-lg font-semibold hover:scale-105 transform transition-all shadow-lg flex items-center gap-2">
                        <FaBackward /> Back
                    </Link>

                    <button type="submit" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-3 rounded-2xl text-lg font-semibold hover:scale-105 transform transition-all shadow-lg">
                        Update Property
                    </button>
                </div>

            </form>
        </div>
    );
};

export default UpdateProperty;