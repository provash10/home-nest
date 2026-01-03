import React, { useState, useEffect, use } from 'react';
import toast from 'react-hot-toast';
import useRole from '../../hooks/useRole';
import { 
  FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaShieldAlt, FaGoogle, FaLock, FaTrash, FaEdit,
  FaCheckCircle, FaTimesCircle, FaCalendarAlt,
  FaArrowUp, FaArrowDown, FaEye, FaEyeSlash,
  FaSave, FaTimes, FaUpload, FaKey, FaBell,
  FaGlobe, FaLanguage, FaPalette, FaCog
} from 'react-icons/fa';
import { MdDashboard, MdSecurity, MdNotifications } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const Profile = () => {
  const { user, updateUser } = use(AuthContext);
  const { role } = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    photoURL: '',
    phone: '',
    address: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || '',
        photoURL: user.photoURL || '',
        phone: '',
        address: '',
        bio: ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setLoading(true);
    
    try {
      await updateUser({
        displayName: formData.name,
        photoURL: formData.photoURL || user.photoURL
      });
      
      await fetch('https://homenest-server-ten.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name: formData.name,
          photoURL: formData.photoURL,
          updatedAt: new Date()
        })
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaUserCircle className="text-primary" />
            My Profile
          </h1>
          <p className="text-gray-500">Manage your account information</p>
        </div>
        <div className="badge badge-primary badge-lg flex items-center gap-2">
          {role === 'admin' ? (
            <>
              <FaShieldAlt /> Administrator
            </>
          ) : (
            <>
              <FaUserCircle /> User
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left - profile */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" />
                  ) : (
                    <FaUserCircle className="w-32 h-32 text-gray-400" />
                  )}
                </div>
              </div>
              
              <h2 className="card-title text-2xl">{user.displayName || 'User'}</h2>
              <p className="text-gray-500 flex items-center gap-2">
                <FaEnvelope /> {user.email}
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <div className="badge badge-outline flex items-center gap-1">
                  <FaCalendarAlt /> Joined: {new Date(user.metadata?.creationTime).toLocaleDateString()}
                </div>
                <div className={`badge ${user.emailVerified ? 'badge-success' : 'badge-warning'} flex items-center gap-1`}>
                  {user.emailVerified ? <FaCheckCircle /> : <FaTimesCircle />}
                  {user.emailVerified ? 'Verified' : 'Not Verified'}
                </div>
                <div className="badge badge-primary flex items-center gap-1">
                  <HiUserGroup /> {role}
                </div>
              </div>
              
              <div className="card-actions mt-6 w-full">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn btn-primary w-full flex items-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <FaTimes /> Cancel Editing
                    </>
                  ) : (
                    <>
                      <FaEdit /> Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* stats card */}
          <div className="card bg-base-100 shadow-lg mt-6">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <MdDashboard /> Account Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-2 hover:bg-base-200 rounded">
                  <span className="flex items-center gap-2">
                    <FaBuilding /> Properties Listed
                  </span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-base-200 rounded">
                  <span className="flex items-center gap-2">
                    <FaStar /> Reviews Given
                  </span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-base-200 rounded">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt /> Account Age
                  </span>
                  <span className="font-bold">
                    {user.metadata?.creationTime 
                      ? Math.floor((new Date() - new Date(user.metadata.creationTime)) / (1000 * 60 * 60 * 24)) 
                      : 0} days
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-base-200 rounded">
                  <span className="flex items-center gap-2">
                    <FaCheckCircle /> Last Active
                  </span>
                  <span className="font-bold">Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right - edit form*/}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaEdit /> Edit Profile Information
                  </h3>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FaUserCircle /> Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FaUpload /> Profile Photo URL
                      </span>
                    </label>
                    <input
                      type="text"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="https://example.com/photo.jpg"
                    />
                    <label className="label">
                      <span className="label-text-alt">Leave empty to keep current photo</span>
                    </label>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FaPhone /> Phone Number
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="+8801XXXXXXXXX"
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FaMapMarkerAlt /> Address
                      </span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered"
                      placeholder="Enter your address"
                      rows="3"
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FaGlobe /> Bio
                      </span>
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered"
                      placeholder="Tell us about yourself..."
                      rows="3"
                    />
                  </div>
                  
                  <div className="form-control mt-6">
                    <button 
                      type="submit" 
                      className="btn btn-primary flex items-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaUserCircle /> Account Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-base-200 rounded-lg">
                        <h4 className="font-semibold text-gray-500 flex items-center gap-2 mb-2">
                          <FaEnvelope /> Email Address
                        </h4>
                        <p className="text-lg">{user.email}</p>
                      </div>
                      <div className="p-3 bg-base-200 rounded-lg">
                        <h4 className="font-semibold text-gray-500 flex items-center gap-2 mb-2">
                          <MdSecurity /> User ID
                        </h4>
                        <p className="text-sm font-mono truncate">{user.uid}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-base-200 rounded-lg">
                        <h4 className="font-semibold text-gray-500 flex items-center gap-2 mb-2">
                          <FaUserCircle /> Display Name
                        </h4>
                        <p className="text-lg">{user.displayName || 'Not set'}</p>
                      </div>
                      <div className="p-3 bg-base-200 rounded-lg">
                        <h4 className="font-semibold text-gray-500 flex items-center gap-2 mb-2">
                          <HiUserGroup /> Account Type
                        </h4>
                        <p className="text-lg capitalize">{role}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-base-200 rounded-lg">
                      <h4 className="font-semibold text-gray-500 flex items-center gap-2 mb-4">
                        <FaCalendarAlt /> Account Activity
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold">Created</p>
                          <p className="text-sm">
                            {user.metadata?.creationTime 
                              ? new Date(user.metadata.creationTime).toLocaleDateString()
                              : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">Last Sign In</p>
                          <p className="text-sm">
                            {user.metadata?.lastSignInTime 
                              ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="divider"></div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-500 mb-4 flex items-center gap-2">
                        <MdSecurity /> Account Security
                      </h4>
                      <div className="space-y-3">
                        <button className="btn btn-outline w-full flex items-center gap-2 justify-start">
                          <FaKey /> Change Password
                        </button>
                        <button className="btn btn-outline w-full flex items-center gap-2 justify-start">
                          <MdNotifications /> Enable Two-Factor Authentication
                        </button>
                        <button className="btn btn-outline btn-error w-full flex items-center gap-2 justify-start">
                          <FaTrash /> Request Account Deletion
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* connected accounts */}
          <div className="card bg-base-100 shadow-lg mt-6">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <FaGlobe /> Connected Accounts
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaGoogle className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Google</p>
                      <p className="text-sm text-gray-500">Connected via Google Auth</p>
                    </div>
                  </div>
                  <div className="badge badge-success gap-1">
                    <FaCheckCircle /> Connected
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <FaLock className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Email/Password</p>
                      <p className="text-sm text-gray-500">Standard authentication</p>
                    </div>
                  </div>
                  <div className="badge badge-success gap-1">
                    <FaCheckCircle /> Active
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* preferences */}
          <div className="card bg-base-100 shadow-lg mt-6">
            <div className="card-body">
              <h3 className="card-title flex items-center gap-2">
                <FaCog /> Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      <FaPalette /> Theme
                    </p>
                    <p className="text-sm text-gray-500">Light/Dark mode preference</p>
                  </div>
                  <select className="select select-bordered select-sm">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      <FaLanguage /> Language
                    </p>
                    <p className="text-sm text-gray-500">Interface language</p>
                  </div>
                  <select className="select select-bordered select-sm">
                    <option>English</option>
                    <option>Bangla</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      <FaBell /> Notifications
                    </p>
                    <p className="text-sm text-gray-500">Email notifications</p>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;