import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWork } from '../context/WorkContext';
import DynamicShapes from '../pages/DynamicShapes ';
import WaterfallDrops from '../pages/WaterfallDrops ';

const Home = () => {
  const { user, jobs } = useWork();
  const featuredJobs = jobs.slice(0, 5);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (featuredJobs.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % featuredJobs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredJobs.length]);

  const job = featuredJobs[index];
  const min = job?.salaryRange?.min ?? job?.salaryMin ?? 0;
  const max = job?.salaryRange?.max ?? job?.salaryMax ?? 0;

  return (
    <div className="min-h-screen">
     {/* HERO SECTION */}
<section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-600 text-white"
>
  {/* Background blur shapes */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />

  {/* Dynamic random shapes */}
   <WaterfallDrops />
  <DynamicShapes />

  <div className="relative max-w-7xl mx-auto px-6 py-24 text-center z-10">
    <span className="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-medium mb-4">
      🚀 Trusted by 10,000+ Job Seekers
    </span>

    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
      Find Your <span className="text-yellow-300">Perfect Job</span><br />
      Near Your Location
    </h1>

    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
      Discover verified local jobs, connect directly with employers, and
      get hired faster.
    </p>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
      <Link
        to="/jobs"
        className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition"
      >
        🔍 Browse Jobs
      </Link>

      {!user && (
        <Link
          to="/register"
          className="border border-white/60 backdrop-blur py-3 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition"
        >
          ✨ Create Free Account
        </Link>
      )}
    </div>

    {/* Stats */}
   {/* Stats – Icon Style */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex items-center gap-4">
    <span className="text-3xl">📄</span>
    <div>
      <p className="text-2xl font-bold">5K+</p>
      <p className="opacity-80">Jobs Posted</p>
    </div>
  </div>

  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex items-center gap-4">
    <span className="text-3xl">🏢</span>
    <div>
      <p className="text-2xl font-bold">3K+</p>
      <p className="opacity-80">Employers</p>
    </div>
  </div>

  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex items-center gap-4">
    <span className="text-3xl">👷</span>
    <div>
      <p className="text-2xl font-bold">10K+</p>
      <p className="opacity-80">Workers</p>
    </div>
  </div>
</div>

  </div>
</section>


{/* FEATURED JOBS */}
<section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
      🌟 Featured Jobs
    </h2>

    <div className="relative">
      {/* Carousel container */}
      <div className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-6">
        {featuredJobs.map((job) => {
          const min = job.salaryRange?.min ?? job.salaryMin ?? 0;
          const max = job.salaryRange?.max ?? job.salaryMax ?? 0;
          const isRemote = job.isRemote;
          const isNew = job.isNew;

          return (
            <div
              key={job.id}
              className="min-w-[280px] bg-white/20 backdrop-blur-lg border border-white/25 rounded-3xl p-6 shadow-2xl hover:shadow-3xl hover:scale-105 transition-transform duration-300 flex flex-col justify-between relative"
            >
              {/* Tags */}
              <div className="flex justify-between mb-4">
                {isNew && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                {isRemote && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Remote
                  </span>
                )}
              </div>

              {/* Job info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-sm text-gray-700 mb-1">👤 {job.user?.name || 'Employer'}</p>
                <p className="text-sm text-red-600 mb-2 flex items-center">📍 {job.location}</p>
                <p className="text-indigo-600 font-semibold mb-2">
                  ₹{min} – ₹{max} {job.salaryType || ''}
                </p>
                <p className="text-gray-800 text-sm line-clamp-3">{job.description}</p>
              </div>

              {/* Apply button */}
              <Link
                to={`/jobs/${job.id}`}
                className="mt-6 inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 text-center"
              >
                Details
              </Link>

              {/* Neon glow effect */}
              <div className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none border-2 border-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 opacity-20 animate-pulse"></div>
            </div>
          );
        })}
      </div>

      {/* Carousel arrows */}
      <button
        onClick={() => {
          document.querySelector('.scroll-smooth')?.scrollBy({ left: -300, behavior: 'smooth' });
        }}
        className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-gray-800 rounded-full p-2 shadow"
      >
        ◀
      </button>
      <button
        onClick={() => {
          document.querySelector('.scroll-smooth')?.scrollBy({ left: 300, behavior: 'smooth' });
        }}
        className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-gray-800 rounded-full p-2 shadow"
      >
        ▶
      </button>
    </div>

    {/* Dots */}
    <div className="flex justify-center gap-2 mt-4">
      {featuredJobs.map((_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-gray-300"
        ></span>
      ))}
    </div>
  </div>
</section>
      {/* WHY CHOOSE US */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-2">⚡</div>
            <h4 className="font-bold text-lg mb-2">Quick Hiring</h4>
            <p className="text-gray-600 text-sm">
              Employers connect directly with job seekers
            </p>
          </div>
          <div className="bg-blue p-6 rounded-xl shadow">
            <div className="text-4xl mb-2">📍</div>
            <h4 className="font-bold text-lg mb-2">Local Jobs</h4>
            <p className="text-gray-600 text-sm">
              Find work near your location easily
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-2">🔒</div>
            <h4 className="font-bold text-lg mb-2">Trusted Platform</h4>
            <p className="text-gray-600 text-sm">
              Verified employers and real jobs only
            </p>
          </div>
        </div>
      </section>
      {/* FOOTER */}
<footer className="bg-gray-900 text-gray-300 py-8 mt-12">
  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    <p className="text-sm mb-4 md:mb-0">
      © {new Date().getFullYear()} Jolly Jobs. All rights reserved.
    </p>
    <div className="flex gap-4">
      <a href="/privacy" className="hover:text-white text-sm transition">Privacy Policy</a>
      <a href="/terms" className="hover:text-white text-sm transition">Terms of Service</a>
      <a href="/contactus" className="hover:text-white text-sm transition">Contact Us</a>
    </div>
  </div>
</footer>
    </div>
  );
};



export default Home;

