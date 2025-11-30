import React from 'react';
import { Link } from 'react-router-dom';
import { useWork } from '../context/WorkContext';

const Home = () => {
  const { user, jobs } = useWork();
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Job
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Connect with local employers and discover amazing opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/jobs" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
            >
              Browse Jobs
            </Link>
            {!user && (
              <Link 
                to="/register" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">👷</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Workers</h3>
              <p className="text-gray-600 mb-6">Find local job opportunities that match your skills</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Browse hourly, daily, and monthly jobs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Apply directly to employers
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Build your professional profile
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl font-bold">💼</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Employers</h3>
              <p className="text-gray-600 mb-6">Post jobs and find qualified local workers</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Reach local talent
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Manage applications
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Flexible hiring options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Jobs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredJobs.map(job => (
                <div key={job.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-600 font-medium mb-2">{job.employer}</p>
                  <p className="text-red-600 mb-3 flex items-center">
                    <span className="mr-1">📍</span>
                    {job.location}
                  </p>
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-blue-700 font-bold text-lg">
                      ₹{job.salaryRange.min} - ₹{job.salaryRange.max} {job.salaryType}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
                 <Link 
  to={`/jobs/${job.id}`} 
  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors duration-200"
>
  View Details
</Link>

                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                to="/jobs" 
                className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                View All Jobs
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;