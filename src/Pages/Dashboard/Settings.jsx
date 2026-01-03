import React, { useState } from 'react';
import { 
  FaCog, FaBell, FaShieldAlt, FaPalette, 
  FaLanguage, FaSave, FaEye, FaEyeSlash,
  FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';
import { MdNotifications, MdSecurity } from 'react-icons/md';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    language: 'en',
    timezone: 'UTC+6',
    dateFormat: 'MM/DD/YYYY'
  });

  // notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    propertyAlerts: true,
    reviewAlerts: true,
    marketingEmails: false,
    newsletter: true
  });

  // security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    showPassword: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    sidebarColor: 'default',
    density: 'comfortable',
    fontSize: 'medium'
  });

  const handleSaveSettings = async () => {
    setLoading(true);
    
    try {
      // Simulate api call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <FaCog /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaCog className="text-primary" />
          Settings
        </h1>
        <p className="text-gray-500">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body p-4">
              <ul className="menu gap-1">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      className={`flex items-center gap-3 ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="divider my-2"></div>
              
              <button 
                className="btn btn-primary w-full flex items-center gap-2"
                onClick={handleSaveSettings}
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
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              {/* general settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FaCog /> General Settings
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Display Name</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={generalSettings.name}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email Address</span>
                      </label>
                      <input
                        type="email"
                        className="input input-bordered"
                        value={generalSettings.email}
                        readOnly
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FaLanguage /> Language
                        </span>
                      </label>
                      <select
                        className="select select-bordered"
                        value={generalSettings.language}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
                      >
                        <option value="en">English</option>
                        <option value="bn">Bangla</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Timezone</span>
                      </label>
                      <select
                        className="select select-bordered"
                        value={generalSettings.timezone}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      >
                        <option value="UTC+6">UTC+6 (Bangladesh)</option>
                        <option value="UTC+0">UTC+0 (GMT)</option>
                        <option value="UTC-5">UTC-5 (EST)</option>
                        <option value="UTC-8">UTC-8 (PST)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date Format</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="dateFormat"
                          className="radio"
                          checked={generalSettings.dateFormat === 'MM/DD/YYYY'}
                          onChange={() => setGeneralSettings(prev => ({ ...prev, dateFormat: 'MM/DD/YYYY' }))}
                        />
                        <span>MM/DD/YYYY</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="dateFormat"
                          className="radio"
                          checked={generalSettings.dateFormat === 'DD/MM/YYYY'}
                          onChange={() => setGeneralSettings(prev => ({ ...prev, dateFormat: 'DD/MM/YYYY' }))}
                        />
                        <span>DD/MM/YYYY</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="dateFormat"
                          className="radio"
                          checked={generalSettings.dateFormat === 'YYYY-MM-DD'}
                          onChange={() => setGeneralSettings(prev => ({ ...prev, dateFormat: 'YYYY-MM-DD' }))}
                        />
                        <span>YYYY-MM-DD</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* notification settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <MdNotifications /> Notification Settings
                  </h2>
                  
                  <div className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div>
                          <p className="font-semibold">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-gray-500">
                            {key.includes('email') ? 'Receive email notifications' :
                             key.includes('push') ? 'Receive push notifications' :
                             key.includes('property') ? 'Get alerts for new properties' :
                             key.includes('review') ? 'Get notified about new reviews' :
                             key.includes('marketing') ? 'Receive marketing emails' :
                             'Subscribe to newsletter'}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={value}
                          onChange={() => setNotificationSettings(prev => ({
                            ...prev,
                            [key]: !prev[key]
                          }))}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="alert alert-info">
                    <FaBell />
                    <span>You can manage notification preferences for each category separately.</span>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <MdSecurity /> Security Settings
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                      <div>
                        <p className="font-semibold">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={securitySettings.twoFactorAuth}
                        onChange={() => setSecuritySettings(prev => ({
                          ...prev,
                          twoFactorAuth: !prev.twoFactorAuth
                        }))}
                      />
                    </div>
                    
                    {/* Login Alerts */}
                    <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                      <div>
                        <p className="font-semibold">Login Alerts</p>
                        <p className="text-sm text-gray-500">Get notified about new logins to your account</p>
                      </div>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={securitySettings.loginAlerts}
                        onChange={() => setSecuritySettings(prev => ({
                          ...prev,
                          loginAlerts: !prev.loginAlerts
                        }))}
                      />
                    </div>
                    
                    {/* Change Password */}
                    <div className="p-3 bg-base-200 rounded-lg">
                      <h3 className="font-semibold mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Current Password</span>
                          </label>
                          <div className="relative">
                            <input
                              type={securitySettings.showPassword ? "text" : "password"}
                              className="input input-bordered w-full"
                              value={securitySettings.currentPassword}
                              onChange={(e) => setSecuritySettings(prev => ({
                                ...prev,
                                currentPassword: e.target.value
                              }))}
                            />
                            <button 
                              className="absolute right-3 top-3"
                              onClick={() => setSecuritySettings(prev => ({
                                ...prev,
                                showPassword: !prev.showPassword
                              }))}
                            >
                              {securitySettings.showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">New Password</span>
                          </label>
                          <input
                            type="password"
                            className="input input-bordered"
                            value={securitySettings.newPassword}
                            onChange={(e) => setSecuritySettings(prev => ({
                              ...prev,
                              newPassword: e.target.value
                            }))}
                          />
                        </div>
                        
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Confirm New Password</span>
                          </label>
                          <input
                            type="password"
                            className="input input-bordered"
                            value={securitySettings.confirmPassword}
                            onChange={(e) => setSecuritySettings(prev => ({
                              ...prev,
                              confirmPassword: e.target.value
                            }))}
                          />
                        </div>
                        
                        <button className="btn btn-primary">Update Password</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="alert alert-warning">
                    <FaShieldAlt />
                    <span>For security reasons, you'll need to confirm your current password to make changes.</span>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FaPalette /> Appearance Settings
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Theme Selection */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Theme</span>
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <label className={`cursor-pointer ${appearanceSettings.theme === 'light' ? 'ring-2 ring-primary' : ''}`}>
                          <div className="card bg-base-100 border">
                            <div className="card-body items-center text-center p-4">
                              <div className="w-full h-20 bg-base-200 rounded mb-2"></div>
                              <span className="font-medium">Light</span>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="theme"
                            className="hidden"
                            checked={appearanceSettings.theme === 'light'}
                            onChange={() => setAppearanceSettings(prev => ({ ...prev, theme: 'light' }))}
                          />
                        </label>
                        
                        <label className={`cursor-pointer ${appearanceSettings.theme === 'dark' ? 'ring-2 ring-primary' : ''}`}>
                          <div className="card bg-neutral text-neutral-content">
                            <div className="card-body items-center text-center p-4">
                              <div className="w-full h-20 bg-neutral-focus rounded mb-2"></div>
                              <span className="font-medium">Dark</span>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="theme"
                            className="hidden"
                            checked={appearanceSettings.theme === 'dark'}
                            onChange={() => setAppearanceSettings(prev => ({ ...prev, theme: 'dark' }))}
                          />
                        </label>
                        
                        <label className={`cursor-pointer ${appearanceSettings.theme === 'auto' ? 'ring-2 ring-primary' : ''}`}>
                          <div className="card bg-base-100 border">
                            <div className="card-body items-center text-center p-4 relative overflow-hidden">
                              <div className="absolute inset-0">
                                <div className="w-1/2 h-full bg-base-200"></div>
                                <div className="w-1/2 h-full bg-neutral absolute right-0 top-0"></div>
                              </div>
                              <span className="font-medium relative z-10">Auto</span>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="theme"
                            className="hidden"
                            checked={appearanceSettings.theme === 'auto'}
                            onChange={() => setAppearanceSettings(prev => ({ ...prev, theme: 'auto' }))}
                          />
                        </label>
                      </div>
                    </div>
                    
                    {/* Sidebar Color */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Sidebar Color</span>
                      </label>
                      <div className="flex gap-4">
                        {['default', 'primary', 'secondary', 'accent'].map(color => (
                          <label key={color} className="flex items-center gap-2 cursor-pointer">
                            <div className={`w-6 h-6 rounded-full ${color === 'default' ? 'bg-base-200' : `bg-${color}`}`}></div>
                            <input
                              type="radio"
                              name="sidebarColor"
                              className="radio"
                              checked={appearanceSettings.sidebarColor === color}
                              onChange={() => setAppearanceSettings(prev => ({ ...prev, sidebarColor: color }))}
                            />
                            <span className="capitalize">{color}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Density */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Density</span>
                      </label>
                      <select
                        className="select select-bordered"
                        value={appearanceSettings.density}
                        onChange={(e) => setAppearanceSettings(prev => ({ ...prev, density: e.target.value }))}
                      >
                        <option value="comfortable">Comfortable</option>
                        <option value="compact">Compact</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>
                    
                    {/* font size */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Font Size</span>
                      </label>
                      <select
                        className="select select-bordered"
                        value={appearanceSettings.fontSize}
                        onChange={(e) => setAppearanceSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="alert alert-info">
                    <FaPalette />
                    <span>Changes will be applied immediately after saving.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;