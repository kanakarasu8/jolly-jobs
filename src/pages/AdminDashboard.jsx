import React, { useState } from 'react';
import { useWork } from '../context/WorkContext';

const AdminDashboard = () => {
  const { users, jobs, applications, updateUser, updateJob, deleteJob, updateApplication } = useWork();
  const [activeTab, setActiveTab] = useState('overview');

  // Statistics
  const totalUsers = users.length;
  const totalWorkers = users.filter(user => user.userType === 'worker').length;
  const totalEmployers = users.filter(user => user.userType === 'employer').length;
  const totalJobs = jobs.length;
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;

  const handleUserStatus = (userId, status) => {
    updateUser(userId, { status });
  };

  const handleJobStatus = (jobId, status) => {
    updateJob(jobId, { status });
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(jobId);
    }
  };

  const handleApplicationStatus = (applicationId, status) => {
    updateApplication(applicationId, { status });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage users, jobs, and applications across the platform</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalUsers}</div>
            <div className="text-gray-600 font-medium">Total Users</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{totalJobs}</div>
            <div className="text-gray-600 font-medium">Total Jobs</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{totalApplications}</div>
            <div className="text-gray-600 font-medium">Applications</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{pendingApplications}</div>
            <div className="text-gray-600 font-medium">Pending Applications</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {['overview', 'users', 'jobs', 'applications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Workers</span>
                    <span className="font-semibold">{totalWorkers}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Employers</span>
                    <span className="font-semibold">{totalEmployers}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-semibold text-green-600">
                      {users.filter(user => user.status === 'active').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Active Jobs</span>
                    <span className="font-semibold text-green-600">
                      {jobs.filter(job => job.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Inactive Jobs</span>
                    <span className="font-semibold text-red-600">
                      {jobs.filter(job => job.status === 'inactive').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Avg. Applications per Job</span>
                    <span className="font-semibold">
                      {totalJobs > 0 ? (totalApplications / totalJobs).toFixed(1) : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {applications.slice(0, 5).map(application => (
                  <div key={application.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{application.workerName}</p>
                      <p className="text-sm text-gray-600">Applied for job #{application.jobId}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      {/* Users Tab */}
{activeTab === 'users' && (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Users</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.userType === 'admin' ? 'bg-purple-100 text-purple-800' :
                  user.userType === 'employer' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {user.userType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.location || `${user.district || '-'}, ${user.state || '-'}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status || 'inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {user.status === 'active' ? (
                  <button
                    onClick={() => handleUserStatus(user.id, 'inactive')}
                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() => handleUserStatus(user.id, 'active')}
                    className="text-green-600 hover:text-green-900 transition-colors duration-200"
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

{/* Jobs Tab */}
{activeTab === 'jobs' && (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Jobs</h3>

    {jobs.length === 0 ? (
      <p className="text-gray-500 text-center py-4">No jobs available.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map(job => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{job.title}</div>
                  <div className="text-sm text-gray-500">{job.category}</div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {job.user?.name || job.employer || '—'}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {job.location || `${job.district || ''} ${job.state || ''}`}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  ₹{job.salaryMin} - ₹{job.salaryMax} / {job.salaryType}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm space-x-2">
                  {job.status === 'active' ? (
                    <button
                      onClick={() => handleJobStatus(job.id, 'inactive')}
                      className="text-yellow-600 hover:underline"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJobStatus(job.id, 'active')}
                      className="text-green-600 hover:underline"
                    >
                      Activate
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}


        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Applications</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map(application => (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{application.workerName}</div>
                          <div className="text-sm text-gray-500">{application.workerEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{application.jobId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.workerSkills}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {application.status !== 'approved' && (
                          <button
                            onClick={() => handleApplicationStatus(application.id, 'approved')}
                            className="text-green-600 hover:text-green-900 transition-colors duration-200"
                          >
                            Approve
                          </button>
                        )}
                        {application.status !== 'rejected' && (
                          <button
                            onClick={() => handleApplicationStatus(application.id, 'rejected')}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
