import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWork } from '../context/WorkContext';

const Header = () => {
  const { user, setUser } = useWork();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JJ</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Jolly Jobs</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Browse Jobs
            </Link>
            <Link to="/post-job" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Post Job
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                {user.userType === 'worker' && (
                  <Link to="/worker-dashboard" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                    Dashboard
                  </Link>
                )}
                {user.userType === 'employer' && (
                  <Link to="/employer-dashboard" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                    Dashboard
                  </Link>
                )}
                {user.userType === 'admin' && (
                  <Link to="/admin-dashboard" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
