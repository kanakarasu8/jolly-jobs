import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWork } from '../context/WorkContext';
import { registerUserAPI } from '../api/api';

const Register = () => {
  // 🔥 States and districts data
  const statesAndDistricts = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Karnataka: ["Bangalore", "Mysore", "Hubli"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"]
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'worker',
    skills: '',
    experience: '',
    state: '',
    district: '',
    location: '',
    phone: ''
  });

  const { registerUser } = useWork();
  const navigate = useNavigate();

  // 🔥 Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'state' ? value : value,
      ...(name === 'state' ? { district: '' } : {}) // reset district if state changes
    }));
  };

  // 🔥 Submit form
 const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const data = await registerUserAPI(formData);
    localStorage.setItem('token', data.token);
    registerUser(data.user);  // context function
    navigate('/');
  } catch (error) {
    console.error('Register Error:', error);
    alert(error.response?.data?.message || 'Registration failed');
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">

            {/* TITLE */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Join JollyJob and find your perfect job match</p>
            </div>

            {/* FORM */}
            <form onSubmit={handleRegister} className="space-y-6">

              {/* NAME & EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
                <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required type="email" />
              </div>

              {/* PASSWORD */}
              <InputField label="Password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required type="password" />

              {/* USER TYPE + PHONE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField label="I am a" name="userType" value={formData.userType} onChange={handleChange} options={["worker", "employer", "admin"]} />
                <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
              </div>

              {/* WORKER FIELDS */}
              {formData.userType === 'worker' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., React, Driving" />
                  <InputField label="Experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 2 years" />
                </div>
              )}

              {/* STATE & DISTRICT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  options={Object.keys(statesAndDistricts)}
                  placeholder="Select State"
                  required
                />
                <SelectField
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  options={formData.state ? statesAndDistricts[formData.state] : []}
                  placeholder="Select District"
                  disabled={!formData.state}
                  required
                />
              </div>

              {/* LOCATION */}
              <InputField label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Enter your area / street" required />

              {/* SUBMIT BUTTON */}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg">
                Create Account
              </button>
            </form>

            {/* LOGIN LINK */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable InputField component
const InputField = ({ label, name, value, onChange, placeholder, type = "text", required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    />
  </div>
);

// ✅ Reusable SelectField component
const SelectField = ({ label, name, value, onChange, options, placeholder, disabled = false, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    >
      <option value="">{placeholder || "Select"}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default Register;
