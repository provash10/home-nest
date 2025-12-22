import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const MyProperties = () => {
  const { user } = use(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  //for logged user
  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://homenest-server-ten.vercel.app/my-properties/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  }, [user]);


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This property will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://homenest-server-ten.vercel.app/properties/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your property has been removed.", "success");
            setProperties((prev) => prev.filter((item) => item._id !== id));
          });
      }
    });
  };

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );

  return (
    <div className="my-10">


      <h2 className="text-2xl font-bold text-center mb-3">
        My Properties{" "}
        <span className="text-blue-600 text-xl">({properties.length})</span>
      </h2>
      <p className="text-center text-gray-600 mb-6">Manage your listings</p>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              className="w-full h-44 sm:h-48 object-cover"
              src={property.image}
              alt={property.name}
            />

            <div className="p-3 m-2 text-center">
              <h2 className="text-lg font-bold text-black">{property.name}</h2>
              <p className="text-xl font-semibold p-2 text-black mb-1">
                {property.category}
              </p>

              <p className="text-black mb-2 p-2 text-sm">
                {property.short_description}
              </p>

              <div className="flex justify-between items-center mb-2 px-4">
                <span className="text-black font-bold text-sm">
                  {property.price}
                </span>
                <span className="text-black font-bold text-xs">
                  {property.location}
                </span>
              </div>

              <div className="flex justify-between items-center gap-3 mt-3">

                <Link
                  to={`/property-details/${property._id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  See Details
                </Link>


                <Link
                  to={`/update-property/${property._id}`}
                  className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Update
                </Link>


                <button
                  onClick={() => handleDelete(property._id)}
                  className="flex-1 bg-red-600 text-white text-center py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>

              <p className="text-xs text-black mt-2">
                Posted: {property.createdAt?.slice(0, 10)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
