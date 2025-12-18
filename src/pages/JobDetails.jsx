import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWork } from "../context/WorkContext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useWork();

  // Convert id to number to match backend job IDs
  const jobId = parseInt(id);
  const job = jobs.find(j => j.id === jobId);

  // If no job found
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600">Job not found</h2>
      </div>
    );
  }

  // Get current job index
  const currentIndex = jobs.findIndex(j => j.id === jobId);
  // Compute next job ID (loop to first if last)
  const nextJobId = jobs[(currentIndex + 1) % jobs.length]?.id;

  // Salary fallback
  const minSalary = job.salaryRange?.min ?? job.salaryMin ?? 0;
  const maxSalary = job.salaryRange?.max ?? job.salaryMax ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* Job Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>

        {/* Employer Name */}
        <p className="text-xl text-gray-700 font-semibold mb-2">
          {job.user?.name || "Anonymous"}
        </p>

        {/* Location */}
        <p className="text-red-600 mb-4 flex items-center">
          <span className="mr-2">📍</span> {job.location || "N/A"}
        </p>

        {/* Salary */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-700 font-bold text-lg">
            ₹{minSalary} - ₹{maxSalary} {job.salaryType || ""}
          </p>
        </div>

        {/* Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">Job Description</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

        {/* Requirements */}
        {job.requirements && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Requirements</h3>
            <p className="text-yellow-800">{job.requirements}</p>
          </div>
        )}

        {/* Posted Date */}
        <p className="text-sm text-gray-500">
          Posted: {new Date(job.createdAt).toLocaleDateString()}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between mt-10">

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 rounded-lg transition"
          >
            Home
          </button>

          {/* Next Job Button */}
          <button
            onClick={() => navigate(`/jobs/${nextJobId}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition"
          >
            Next Job →
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
