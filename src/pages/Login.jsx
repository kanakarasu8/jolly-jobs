import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWork } from '../context/WorkContext';
import { loginUserAPI, fetchUsersAPI } from '../api/api';
import LeftPanel3D from '../pages/LeftPanel3D' // <-- Import here

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const { setUser } = useWork();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { token, user } = await loginUserAPI(formData);
      localStorage.setItem('jwt', token);
      setUser(user);

      if (user.userType === 'admin') {
        await fetchUsersAPI(user.email);
      }

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-8 md:p-12 relative overflow-hidden">
  {/* Nature floating shapes in background */}
  <LeftPanel3D />

  {/* Main content in front */}
  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center z-10 relative">
    Welcome Back!
  </h1>
  <p className="text-base md:text-lg text-gray-100 mb-6 text-center max-w-md z-10 relative">
    Access your account to explore jobs, manage applications, and grow your career.
  </p>
  <img
    src="https://image2url.com/images/1766051960103-e203b4cd-776d-48c2-b332-27ece22cab01.jpg"
    alt="Business illustration"
    className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md z-10 relative"
  />
</div>


      {/* RIGHT LOGIN FORM */}
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8 m-4">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-semibold block mb-2">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2">Password</label>
              <input
                type="password"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
