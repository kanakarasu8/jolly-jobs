import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWork } from "../context/WorkContext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useWork();

  // FIX: handle string ID
  const job = jobs.find(j => j.id == id);

  // Get index of current job
  const currentIndex = jobs.findIndex(j => j.id == id);

  // Compute next job ID (loop back)
  const nextJobId = jobs[(currentIndex + 1) % jobs.length]?.id;

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600">Job not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
        <p className="text-xl text-gray-700 font-semibold mb-2">{job.employer}</p>

        <p className="text-red-600 mb-4 flex items-center">
          <span className="mr-2">📍</span> {job.location}
        </p>

        {/* SALARY */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-700 font-bold text-lg">
            ₹{job.salaryRange.min} - ₹{job.salaryRange.max} {job.salaryType}
          </p>
        </div>

        {/* DESCRIPTION */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">Job Description</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

        {job.requirements && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Requirements</h3>
            <p className="text-yellow-800">{job.requirements}</p>
          </div>
        )}

        <p className="text-sm text-gray-500">Posted: {job.postedDate}</p>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between mt-10">

          {/* HOME BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 rounded-lg transition"
          >
            Home
          </button>

          {/* NEXT JOB BUTTON */}
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
