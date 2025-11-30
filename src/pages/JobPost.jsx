import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWork } from '../context/WorkContext';
import axios from 'axios'; // Make sure axios is installed
import { postJobAPI } from '../api/api';

const JobPost = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    category: '',
    salaryType: 'hourly',
    salaryRange: { min: '', max: '' },
    location: '',
    requirements: ''
  });
  const { user } = useWork();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setJobData({
        ...jobData,
        [parent]: {
          ...jobData[parent],
          [child]: value
        }
      });
    } else {
      setJobData({
        ...jobData,
        [name]: value
      });
    }
  };

  const handlePostJob = async (e) => {
  e.preventDefault();

  if (!user) {
    alert('Please login to post a job');
    navigate('/login');
    return;
  }

  if (user.userType !== 'employer') {
    alert('Only employers can post jobs');
    return;
  }

  try {
    const payload = {
      title: jobData.title,
      description: jobData.description,
      category: jobData.category,
      salaryType: jobData.salaryType,
      salaryMin: parseFloat(jobData.salaryRange.min),
      salaryMax: parseFloat(jobData.salaryRange.max),
      location: jobData.location,
      requirements: jobData.requirements
    };

    await postJobAPI(payload, user.email);

    alert('Job posted successfully!');
    setJobData({
      title: '',
      description: '',
      category: '',
      salaryType: 'hourly',
      salaryRange: { min: '', max: '' },
      location: '',
      requirements: ''
    });
  } catch (error) {
    console.error(error);
    alert(error.response?.data || 'Error posting job');
  }
};
  if (!user || user.userType !== 'employer') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-600 text-2xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h3>
            <p className="text-gray-600 mb-6">
              You need to be registered as an employer to post jobs.
            </p>
            <button 
              onClick={() => navigate('/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Register as Employer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h2>
              <p className="text-gray-600">Reach qualified candidates for your open position</p>
            </div>
            
            <form onSubmit={handlePostJob} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                  placeholder="e.g., Senior Web Developer"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                  rows="4"
                  placeholder="Describe the job responsibilities and requirements..."
                />
              </div>

              {/* Category & Salary Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    name="category" 
                    value={jobData.category} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="IT">IT & Software</option>
                    <option value="Construction">Construction</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Retail">Retail</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Type</label>
                  <select 
                    name="salaryType" 
                    value={jobData.salaryType} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    name="salaryRange.min"
                    value={jobData.salaryRange.min}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Min"
                    required
                  />
                  <span className="flex items-center justify-center text-gray-500 font-medium">to</span>
                  <input
                    type="number"
                    name="salaryRange.max"
                    value={jobData.salaryRange.max}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Max"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                  placeholder="e.g., New York, NY"
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                <textarea
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  rows="3"
                  placeholder="List any specific requirements, qualifications, or skills needed..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Post Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
