
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WorkContext = createContext();
import { fetchJobsAPI } from '../api/api'; // your backend API function

const initialState = {
  user: null,
  jobs: [],
  applications: [],
  workers: [],
  employers: [],
  users: []
};

const getAllJobsAdmin = () => {
  if (!state.user || state.user.userType !== 'admin') {
    return []; // or throw error
  }
  return state.jobs;
};

// Sample Jobs with state, district, location
const sampleJobs = [
  {
    id: 1,
    title: "Web Developer",
    description: "Need experienced React developer for frontend projects. Must have 3+ years experience with modern JavaScript frameworks.",
    salaryType: "monthly",
    salaryRange: { min: 20000, max: 50000 },
    state: "Tamil Nadu",
    district: "Coimbatore",
    location: "Saibaba Colony",
    employer: "Tech Corp",
    category: "IT",
    requirements: "3+ years React experience, JavaScript, HTML/CSS",
    postedDate: "2024-01-15",
    status: "active"
  },
  {
    id: 2,
    title: "Delivery Driver",
    description: "Part-time delivery driver needed for local deliveries. Flexible hours and competitive pay.",
    salaryType: "hourly",
    salaryRange: { min: 100, max: 150 },
    state: "Illinois",
    district: "Cook County",
    location: "Chicago",
    employer: "Quick Delivery",
    category: "Logistics",
    requirements: "Valid driver's license, clean record",
    postedDate: "2024-01-16",
    status: "active"
  },
  {
    id: 3,
    title: "Construction Worker",
    description: "General labor for construction sites. Great opportunity for hardworking individuals.",
    salaryType: "daily",
    salaryRange: { min: 500, max: 1000 },
    state: "California",
    district: "Los Angeles County",
    location: "Los Angeles",
    employer: "BuildRight Inc",
    category: "Construction",
    requirements: "Physical fitness, safety awareness",
    postedDate: "2024-01-17",
    status: "active"
  }
];

const sampleUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@jollyjob.com",
    userType: "admin",
    location: "New York",
    joinDate: "2024-01-01",
    status: "active"
  }
];

const workReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_JOB':
      return { ...state, jobs: [...state.jobs, action.payload] };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job =>
          job.id === action.payload.id ? { ...job, ...action.payload } : job
        )
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload)
      };
    case 'ADD_APPLICATION':
      return { ...state, applications: [...state.applications, action.payload] };
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map(app =>
          app.id === action.payload.id ? { ...app, ...action.payload } : app
        )
      };
    case 'ADD_WORKER':
      return {
        ...state,
        workers: [...state.workers, action.payload],
        users: [...state.users, action.payload]
      };
    case 'ADD_EMPLOYER':
      return {
        ...state,
        employers: [...state.employers, action.payload],
        users: [...state.users, action.payload]
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
        workers: state.workers.map(worker =>
          worker.id === action.payload.id ? { ...worker, ...action.payload } : worker
        ),
        employers: state.employers.map(employer =>
          employer.id === action.payload.id ? { ...employer, ...action.payload } : employer
        )
      };
    case 'LOAD_JOBS':
      return { ...state, jobs: action.payload };
    case 'LOAD_USERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export const WorkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOAD_JOBS', payload: sampleJobs });
    dispatch({ type: 'LOAD_USERS', payload: sampleUsers });
  }, []);


  const registerUser = (userData) => {
    const userWithId = {
      ...userData,
      id: Date.now(),
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    if (userData.userType === 'worker') {
      dispatch({ type: 'ADD_WORKER', payload: userWithId });
    } else if (userData.userType === 'employer') {
      dispatch({ type: 'ADD_EMPLOYER', payload: userWithId });
    } else if (userData.userType === 'admin') {
      dispatch({ type: 'LOAD_USERS', payload: [...state.users, userWithId] });
    }

    dispatch({ type: 'SET_USER', payload: userWithId });
    localStorage.setItem('user', JSON.stringify(userWithId));
  };

  const postJob = (jobData) => {
    const job = {
      ...jobData,
      id: Date.now(),
      employer: state.user?.name || 'Anonymous',
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      state: jobData.state || '',
      district: jobData.district || '',
      location: jobData.location || ''
    };
    dispatch({ type: 'ADD_JOB', payload: job });
  };

  const updateJob = (jobId, updates) => {
    dispatch({ type: 'UPDATE_JOB', payload: { id: jobId, ...updates } });
  };

  const deleteJob = (jobId) => {
    dispatch({ type: 'DELETE_JOB', payload: jobId });
  };

  const applyForJob = (jobId, workerData) => {
    const application = {
      id: Date.now(),
      jobId,
      workerId: state.user?.id,
      workerName: workerData.name,
      workerEmail: workerData.email,
      workerSkills: workerData.skills,
      appliedDate: new Date().toISOString(),
      status: 'pending'
    };
    dispatch({ type: 'ADD_APPLICATION', payload: application });
  };

  const updateApplication = (applicationId, updates) => {
    dispatch({ type: 'UPDATE_APPLICATION', payload: { id: applicationId, ...updates } });
  };

  const updateUser = (userId, updates) => {
    dispatch({ type: 'UPDATE_USER', payload: { id: userId, ...updates } });
  };

  const setUser = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
  }, []);

  return (
    <WorkContext.Provider value={{
      ...state,
      registerUser,
      postJob,
      updateJob,
      deleteJob,
      applyForJob,
      updateApplication,
      updateUser,
      setUser
    }}>
      {children}
    </WorkContext.Provider>
  );
};

export const useWork = () => {
  const context = useContext(WorkContext);
  if (!context) {
    throw new Error('useWork must be used within a WorkProvider');
  }
  return context;
};
