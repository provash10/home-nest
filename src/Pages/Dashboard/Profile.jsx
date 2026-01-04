import React, { useEffect, useState, useContext } from 'react';
import { FaUserCircle, FaEnvelope, FaCheckCircle, FaTimesCircle, FaEdit, FaSave, FaUpload, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import useRole from '../../hooks/useRole';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const { role } = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({name:'', photoURL:'', phone:'', address:'', bio:''});
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if(user) setFormData({name:user.displayName||'', photoURL:user.photoURL||'', phone:'', address:'', bio:''});
  },[user]);

  const handleInputChange = e => setFormData(prev=>({...prev,[e.target.name]:e.target.value}));

  const handleUpdateProfile = async e=>{
    e.preventDefault();
    if(!formData.name.trim()){toast.error('Name required'); return;}
    setLoading(true);
    try{
      await updateUser({displayName:formData.name, photoURL:formData.photoURL||user.photoURL});
      await fetch('https://homenest-server-ten.vercel.app/users',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:user.email,name:formData.name,photoURL:formData.photoURL,updatedAt:new Date()})
      });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    }catch(err){console.error(err); toast.error('Failed to update profile');}
    finally{setLoading(false);}
  };

  if(!user) return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* left side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg text-center">
            <div className="card-body items-center">
              <div className="avatar mb-4">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user.photoURL?<img src={user.photoURL} alt="Profile"/>:<FaUserCircle className="w-32 h-32 text-gray-400"/>}
                </div>
              </div>
              <h2 className="text-2xl font-bold">{user.displayName||'User'}</h2>
              <p className="text-gray-500 flex items-center gap-2"><FaEnvelope /> {user.email}</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <div className="badge badge-outline flex items-center gap-1">Joined: {new Date(user.metadata?.creationTime).toLocaleDateString()}</div>
                <div className={`badge ${user.emailVerified?'badge-success':'badge-warning'} flex items-center gap-1`}>
                  {user.emailVerified?<FaCheckCircle/>:<FaTimesCircle/>} {user.emailVerified?'Verified':'Not Verified'}
                </div>
                <div className="badge badge-primary flex items-center gap-1"><HiUserGroup /> {role}</div>
              </div>
              <div className="card-actions mt-6 w-full">
                <button onClick={()=>setIsEditing(!isEditing)} className="btn btn-primary w-full flex items-center gap-2">
                  {isEditing?<><FaTimesCircle/>Cancel</>:<><FaEdit/>Edit Profile</>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* right part*/}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="form-control">
                    <label className="label">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input input-bordered" required/>
                  </div>
                  <div className="form-control">
                    <label className="label">Profile Photo URL</label>
                    <input type="text" name="photoURL" value={formData.photoURL} onChange={handleInputChange} className="input input-bordered" placeholder="Leave empty to keep current"/>
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary" disabled={loading}>{loading?'Saving...':'Save Changes'}</button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-4">Account Information</h3>
                  <p>Email: {user.email}</p>
                  <p>Display Name: {user.displayName || 'Not set'}</p>
                  <p>Role: {role}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
