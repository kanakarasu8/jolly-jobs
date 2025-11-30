import React from 'react';
import { useWork } from '../context/WorkContext';

const WorkerDashboard = () => {
  const { user, applications, jobs } = useWork();

  const userApplications = applications.filter(app => app.workerId === user?.id);
  const appliedJobs = userApplications.map(app => {
    const job = jobs.find(j => j.id === app.jobId);
    return { ...app, job };
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Worker Dashboard</h1>
          <p className="text-gray-600">Manage your profile and job applications</p>
        </div>
        
        {user && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Profile</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-900 font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className="text-gray-600">{user.location}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <p className="text-gray-600">{user.skills || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <p className="text-gray-600">{user.experience || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-600">{user.phone || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              My Applications ({userApplications.length})
            </h2>
            <a 
              href="/jobs" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Browse Jobs
            </a>
          </div>
          
          {appliedJobs.length > 0 ? (
            <div className="space-y-4">
              {appliedJobs.map(application => (
                <div key={application.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{application.job?.title}</h4>
                      <p className="text-gray-600 mb-1">{application.job?.employer} • {application.job?.location}</p>
                      <p className="text-gray-500 text-sm">
                        Applied: {new Date(application.appliedDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gray-400 text-2xl">📝</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">No applications yet</h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start exploring job opportunities and apply to positions that match your skills and interests.
              </p>
              <a 
                href="/jobs" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Browse Available Jobs
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;