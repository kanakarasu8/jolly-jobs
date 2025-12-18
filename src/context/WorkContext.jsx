import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchUsersAPI, fetchJobsAPI } from '../api/api'; // Import API function

const WorkContext = createContext();

const initialState = {
  user: null,
  jobs: [],
  applications: [],
  loadingUsers: false,
  workers: [],
  employers: [],
  users: [],
};

// Reducer
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
        ),
      };

    case 'DELETE_JOB':
      return { ...state, jobs: state.jobs.filter(job => job.id !== action.payload) };

    case 'ADD_APPLICATION':
      return { ...state, applications: [...state.applications, action.payload] };

    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map(app =>
          app.id === action.payload.id ? { ...app, ...action.payload } : app
        ),
      };

    case 'ADD_WORKER':
      return {
        ...state,
        workers: [...state.workers, action.payload],
        users: [...state.users, action.payload],
      };

    case 'ADD_EMPLOYER':
      return {
        ...state,
        employers: [...state.employers, action.payload],
        users: [...state.users, action.payload],
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
        ),
      };

    case 'LOAD_JOBS':
      return { ...state, jobs: action.payload };

    case 'LOAD_USERS':
      return { ...state, users: action.payload };

    case 'SET_LOADING_USERS':
      return { ...state, loadingUsers: action.payload };

    default:
      return state;
  }
};

// Sample data
const sampleJobs = [
  {
    id: 1,
    title: "Web Developer",
    description: "Need experienced React developer",
    salaryType: "monthly",
    salaryRange: { min: 20000, max: 50000 },
    state: "Tamil Nadu",
    district: "Coimbatore",
    location: "Saibaba Colony",
    employer: "Tech Corp",
    category: "IT",
    requirements: "3+ years React experience",
    postedDate: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    title: "Java Spring Boot Developer",
    description: "Backend developer for enterprise applications",
    salaryType: "monthly",
    salaryRange: { min: 35000, max: 70000 },
    state: "Tamil Nadu",
    district: "Chennai",
    location: "T Nagar",
    employer: "Infotech Solutions",
    category: "IT",
    requirements: "2+ years Spring Boot, REST APIs, MySQL",
    postedDate: "2024-02-10",
    status: "active",
  },
  {
    id: 3,
    title: "Accountant",
    description: "Handle GST filing and company accounts",
    salaryType: "monthly",
    salaryRange: { min: 18000, max: 30000 },
    state: "Tamil Nadu",
    district: "Madurai",
    location: "Anna Nagar",
    employer: "Sri Finance",
    category: "Finance",
    requirements: "Tally, GST knowledge, 1+ year experience",
    postedDate: "2024-02-05",
    status: "active",
  },
  {
    id: 4,
    title: "Delivery Executive",
    description: "Responsible for parcel delivery",
    salaryType: "daily",
    salaryRange: { min: 600, max: 900 },
    state: "Tamil Nadu",
    district: "Salem",
    location: "Fairlands",
    employer: "FastShip Logistics",
    category: "Logistics",
    requirements: "Two-wheeler & valid driving license",
    postedDate: "2024-01-28",
    status: "active",
  },
  {
    id: 5,
    title: "HR Executive",
    description: "Manage recruitment and employee relations",
    salaryType: "monthly",
    salaryRange: { min: 25000, max: 45000 },
    state: "Tamil Nadu",
    district: "Trichy",
    location: "Cantonment",
    employer: "People First Pvt Ltd",
    category: "HR",
    requirements: "MBA HR, good communication skills",
    postedDate: "2024-02-01",
    status: "active",
  },
  {
    id: 6,
    title: "Electrician",
    description: "Maintenance and wiring works",
    salaryType: "daily",
    salaryRange: { min: 800, max: 1200 },
    state: "Tamil Nadu",
    district: "Erode",
    location: "Perundurai",
    employer: "Bright Power Services",
    category: "Skilled Labor",
    requirements: "ITI Electrician, 2+ years experience",
    postedDate: "2024-01-20",
    status: "active",
  },
  {
    id: 7,
    title: "Data Entry Operator",
    description: "Office data entry and documentation",
    salaryType: "monthly",
    salaryRange: { min: 15000, max: 22000 },
    state: "Tamil Nadu",
    district: "Tirunelveli",
    location: "Palayamkottai",
    employer: "Smart Office Solutions",
    category: "Administration",
    requirements: "Basic computer knowledge, typing speed",
    postedDate: "2024-02-12",
    status: "active",
  },
  {
    id: 8,
    title: "Sales Executive",
    description: "Field sales and customer acquisition",
    salaryType: "monthly",
    salaryRange: { min: 20000, max: 40000 },
    state: "Tamil Nadu",
    district: "Vellore",
    location: "Katpadi",
    employer: "Growth Marketing",
    category: "Sales",
    requirements: "Good communication, field sales experience",
    postedDate: "2024-02-08",
    status: "active",
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
    status: "active",
  },
];

export const WorkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workReducer, initialState);

  
  useEffect(() => {
  // Load sample data first
  dispatch({ type: 'LOAD_JOBS', payload: sampleJobs });
  dispatch({ type: 'LOAD_USERS', payload: sampleUsers });

  // Load saved user
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
  }
}, []);


    // Load jobs dynamically
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobsFromAPI = await fetchJobsAPI();
        if (jobsFromAPI && jobsFromAPI.length > 0) {
          dispatch({ type: 'LOAD_JOBS', payload: jobsFromAPI });
          console.log('Jobs loaded from backend:', jobsFromAPI);
        } else {
          dispatch({ type: 'LOAD_JOBS', payload: sampleJobs });
          console.log('Backend returned no jobs, loaded sample jobs');
        }
      } catch (error) {
        dispatch({ type: 'LOAD_JOBS', payload: sampleJobs });
        console.error('Failed to fetch jobs, loaded sample jobs:', error);
      }
    };

    loadJobs();
  }, []);
  

  const fetchUsersForAdmin = async (adminEmail) => {
  dispatch({ type: 'SET_LOADING_USERS', payload: true });
  try {
    console.log("Fetching users for admin:", adminEmail);
    const usersFromAPI = await fetchUsersAPI(adminEmail);
    console.log("Users fetched:", usersFromAPI);
    dispatch({ type: 'LOAD_USERS', payload: usersFromAPI });
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    dispatch({ type: 'SET_LOADING_USERS', payload: false });
  }
};
useEffect(() => {
  console.log("Current logged-in user:", state.user);
  if (state.user?.userType === 'admin') {
    fetchUsersForAdmin(state.user.email);
  }
}, [state.user]);



  // User functions
  const registerUser = (userData) => {
    const userWithId = {
      ...userData,
      id: Date.now(),
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    if (userData.userType === 'worker') dispatch({ type: 'ADD_WORKER', payload: userWithId });
    else if (userData.userType === 'employer') dispatch({ type: 'ADD_EMPLOYER', payload: userWithId });
    else dispatch({ type: 'LOAD_USERS', payload: [...state.users, userWithId] });

    dispatch({ type: 'SET_USER', payload: userWithId });
    localStorage.setItem('user', JSON.stringify(userWithId));
  };

  const updateUser = (userId, updates) => dispatch({ type: 'UPDATE_USER', payload: { id: userId, ...updates } });
  const setUser = (userData) => dispatch({ type: 'SET_USER', payload: userData });

  // Job functions
  const postJob = (jobData) => {
    const job = {
      ...jobData,
      id: Date.now(),
      employer: state.user?.name || 'Anonymous',
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    dispatch({ type: 'ADD_JOB', payload: job });
  };

  const updateJob = (jobId, updates) => dispatch({ type: 'UPDATE_JOB', payload: { id: jobId, ...updates } });
  const deleteJob = (jobId) => dispatch({ type: 'DELETE_JOB', payload: jobId });

  // Application functions
  const applyForJob = (jobId, workerData) => {
    const application = {
      id: Date.now(),
      jobId,
      workerId: state.user?.id,
      workerName: workerData.name,
      workerEmail: workerData.email,
      workerSkills: workerData.skills,
      appliedDate: new Date().toISOString(),
      status: 'pending',
    };
    dispatch({ type: 'ADD_APPLICATION', payload: application });
  };

  const updateApplication = (applicationId, updates) => dispatch({ type: 'UPDATE_APPLICATION', payload: { id: applicationId, ...updates } });

  return (
    <WorkContext.Provider
      value={{
        ...state,
        registerUser,
        updateUser,
        setUser,
        fetchUsersForAdmin,
        postJob,
        updateJob,
        deleteJob,
        applyForJob,
        updateApplication,
      }}
    >
      {children}
    </WorkContext.Provider>
  );
};

export const useWork = () => {
  const context = useContext(WorkContext);
  if (!context) throw new Error('useWork must be used within a WorkProvider');
  return context;
};


