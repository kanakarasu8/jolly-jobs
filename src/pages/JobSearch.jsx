import React, { useState } from 'react';
import { useWork } from '../context/WorkContext';

const JobSearch = () => {
  const { jobs, user, applyForJob } = useWork();
  const [filters, setFilters] = useState({
  category: '',   // No category filter
  keyword: '',    // No keyword search
  salaryType: '', // No salary filter
  state: '',      // Default: All states
  district: '',   // No district filter
  location: ''    // No location filter
});


const filteredJobs = jobs.filter(job => {
  return (
    (filters.category === '' || job.category === filters.category) &&
    (filters.state === '' || job.state === filters.state) &&
    (filters.district === '' || job.district === filters.district) &&
    (filters.location === '' || job.location === filters.location) &&
    (filters.salaryType === '' || job.salaryType === filters.salaryType) &&
    (filters.keyword === '' || // Use keyword for search
      job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.keyword.toLowerCase()))
  );
});



const states = [...new Set(jobs.map(job => job.state))];

const districts = filters.state
  ? [...new Set(jobs.filter(job => job.state === filters.state).map(job => job.district))]
  : [];

const locations = filters.district
  ? [...new Set(jobs.filter(job => job.district === filters.district).map(job => job.location))]
  : [];

  const handleApply = (jobId) => {
    if (!user || user.userType !== 'worker') {
      alert('Please register as a worker to apply for jobs');
      return;
    }
    
    applyForJob(jobId, {
      name: user.name,
      email: user.email,
      skills: user.skills
    });
    alert('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-gray-600">Discover opportunities that match your skills and interests</p>
        </div>
        
{/* Filters */}
<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Jobs</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
  <input
    type="text"
    placeholder="Job title or description..."
    value={filters.keyword} 
    onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
  />
</div>



    {/* State */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
      <select
  value={filters.state || ""}
  onChange={(e) =>
    setFilters({
      ...filters,
      state: e.target.value,
      district: "",
      location: ""
    })
  }
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>
  <option value="">All States</option>  {/* Default */}
  {states.map((state, i) => (
    <option key={i} value={state}>{state}</option>
  ))}
</select>

    </div>

    {/* District */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
      <select
        value={filters.district || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            district: e.target.value,
            location: ""
          })
        }
        disabled={!filters.state}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"
      >
        <option value="">All Districts</option>
        {districts.map((district, i) => (
          <option key={i} value={district}>{district}</option>
        ))}
      </select>
    </div>

    {/* Location */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
      <select
        value={filters.location || ""}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        disabled={!filters.district}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"
      >
        <option value="">All Locations</option>
        {locations.map((loc, i) => (
          <option key={i} value={loc}>{loc}</option>
        ))}
      </select>
    </div>

  </div>
</div>
<div className="flex gap-4 mt-4">
  <button
    onClick={() => {}}
    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
  >
    Search
  </button>
<button
  onClick={() =>
    setFilters({ 
      category: '', 
      location: '', 
      salaryType: '', 
      keyword: '', // updated from search
      state: '',
      district: ''
    })
  }
  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
>
  Clear Filters
</button>

</div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-600 font-medium mb-1">{job.employer}</p>
                      <p className="text-red-600 mb-2 flex items-center">
                        <span className="mr-2">📍</span>
                        {job.location}
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {job.category}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                      <span className="font-semibold">${job.salaryRange.min} - ${job.salaryRange.max}</span>
                      <span className="text-sm ml-1">{job.salaryType}</span>
                    </div>
                    <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
                      Posted: {job.postedDate}
                    </div>
                  </div>

                  {job.requirements && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-yellow-800 text-sm">
                        <strong className="font-semibold">Requirements:</strong> {job.requirements}
                      </p>
                    </div>
                  )}
                </div>

                <div className="lg:pl-6 lg:border-l lg:border-gray-200 lg:min-w-[200px]">
                  {user && user.userType === 'worker' ? (
                    <button 
                      onClick={() => handleApply(job.id)}
                      className="w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Apply Now
                    </button>
                  ) : (
                    <div className="text-center lg:text-right">
                      <p className="text-sm text-gray-500 mb-2">Register as worker to apply</p>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                        Sign Up to Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gray-400 text-3xl">🔍</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search filters or check back later for new opportunities.</p>
            <button 
              onClick={() => setFilters({ category: '', location: '', salaryType: '', search: '' })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;