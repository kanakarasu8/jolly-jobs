import React from 'react';
import { useWork } from '../context/WorkContext';

const EmployerDashboard = () => {
  const { user, jobs, applications } = useWork();

  const employerJobs = jobs.filter(job => job.employer === user?.name);
  const jobApplications = applications.filter(app => 
    employerJobs.some(job => job.id === app.jobId)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
          <p className="text-gray-600">Manage your company profile and job postings</p>
        </div>

        {user && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Company Profile</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <p className="text-gray-900 font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className="text-gray-600">{user.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-600">{user.phone || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{employerJobs.length}</div>
            <div className="text-gray-600 font-medium">Jobs Posted</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{jobApplications.length}</div>
            <div className="text-gray-600 font-medium">Total Applications</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">My Job Posts</h2>
            <a 
              href="/post-job" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
            >
              <span className="mr-2">+</span> Post New Job
            </a>
          </div>
          
          {employerJobs.length > 0 ? (
            <div className="space-y-6">
              {employerJobs.map(job => (
                <div key={job.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h4>
                      <p className="text-gray-600 mb-2">
                        {job.location} • ₹{job.salaryRange.min} - ₹{job.salaryRange.max} {job.salaryType}
                      </p>
                      <p className="text-gray-500 text-sm mb-3">
                        Posted: {job.postedDate} • 
                        Applications: <span className="font-medium text-blue-600">
                          {applications.filter(app => app.jobId === job.id).length}
                        </span>
                      </p>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gray-400 text-2xl">💼</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">No jobs posted yet</h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start posting job opportunities to find qualified workers for your company.
              </p>
              <a 
                href="/post-job" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Post Your First Job
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;