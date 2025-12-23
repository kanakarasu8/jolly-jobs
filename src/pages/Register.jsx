import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWork } from '../context/WorkContext';
import { registerUserAPI } from '../api/api';

const Register = () => {
  const statesAndDistricts = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli"],
    "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Erode","Tirunelveli","Vellore","Thoothukudi",
    "Dindigul","Thanjavur","Kanchipuram","Krishnagiri","Nagapattinam","Cuddalore","Tiruppur","Namakkal","Karur","Sivaganga",
    "Perambalur","Villupuram","Ramanathapuram","Virudhunagar","Pudukkottai","Theni","Kanyakumari","Dharmapuri","Ranipet",
    "Tenkasi","Chengalpattu"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Haryana": ["Chandigarh", "Gurgaon", "Faridabad", "Panipat"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
    "Meghalaya": ["Shillong", "Tura", "Nongpoh", "Jowai"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Janakpuri"]
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'state' ? value : value,
      ...(name === 'state' ? { district: '' } : {})
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUserAPI(formData);
      localStorage.setItem('token', data.token);
      registerUser(data.user);
      navigate('/');
    } catch (error) {
      console.error('Register Error:', error);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">

{/* LEFT SIDE ABSTRACT ANIMATION */}
<div className="lg:w-1/2 relative overflow-hidden flex justify-center items-center p-10 bg-gradient-to-br from-blue-800 via-purple-800 to-indigo-900">

  {/* Moving Squares */}
  {[...Array(4)].map((_, i) => (
    <div
      key={`square-${i}`}
      className="absolute bg-pink-500 opacity-60 rounded-sm"
      style={{
        width: `${50 + i * 20}px`,
        height: `${50 + i * 20}px`,
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 70}%`,
        animation: `bounce-${i} ${3 + i}s ease-in-out infinite alternate`
      }}
    />
  ))}

  {/* Moving Circles */}
  {[...Array(4)].map((_, i) => (
    <div
      key={`circle-${i}`}
      className="absolute bg-yellow-400 opacity-40 rounded-full"
      style={{
        width: `${30 + i * 15}px`,
        height: `${30 + i * 15}px`,
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 70}%`,
        animation: `float-${i} ${4 + i}s ease-in-out infinite alternate`
      }}
    />
  ))}

  {/* Text overlay */}
  <h2 className="text-4xl font-bold text-white z-10 relative text-center mb-4">
    Welcome to Fulcrum Jobs!
  </h2>
  <p className="text-gray-200 text-center z-10 relative">
    Explore opportunities in a dynamic, interactive space.
  </p>

  {/* CSS Animations */}
  <style>
    {`
      ${[...Array(4)].map((_, i) => `
        @keyframes bounce-${i} {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(${20 + i * 10}px, ${10 + i * 5}px) rotate(${15 + i * 10}deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes float-${i} {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-${15 + i * 10}px, ${20 + i * 5}px) rotate(${10 + i * 15}deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `).join('')}
    `}
  </style>
</div>


        {/* RIGHT SIDE - FORM */}
        <div className="lg:w-1/2 p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join JollyJob and find your perfect job match</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
              <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required type="email" />
            </div>

            <InputField label="Password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required type="password" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField label="I am a" name="userType" value={formData.userType} onChange={handleChange} options={["worker", "employer", "admin"]} />
              <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
            </div>

            {formData.userType === 'worker' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., React, Driving" />
                <InputField label="Experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 2 years" />
              </div>
            )}

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

            <InputField label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Enter your area / street" required />

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg">
              Create Account
            </button>
          </form>

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

      {/* CSS Animations */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes bounce-slower {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          @keyframes bounce-fast {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-25px); }
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-bounce-slow { animation: bounce-slow 7s ease-in-out infinite; } /* faster */
.animate-bounce-slower { animation: bounce-slower 2.4s ease-in-out infinite; } /* slower */
.animate-bounce-fast { animation: bounce-fast 1.5s ease-in-out infinite; } /* much faster */
.animate-spin-slow { animation: spin-slow 8s linear infinite; } /* faster spin */

        `}
      </style>
    </div>
  );
};

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
