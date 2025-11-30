// src/api/api.js
import axios from 'axios';
import config from '../config/config';

const API_BASE = config.apiBase;

// Auth
export const registerUserAPI = async (formData) => {
  const res = await axios.post(`${API_BASE}/auth/register`, formData);
  return res.data;
};

export const loginUserAPI = async (formData) => {
  const res = await axios.post(`${API_BASE}/auth/login`, formData);
  return res.data;
};

// Jobs
export const postJobAPI = async (jobData, email) => {
  const res = await axios.post(`${API_BASE}/job/post?email=${email}`, jobData);
  return res.data;
};

// Fetch all jobs (admin only)
export const fetchJobsAPI = async () => {
  const res = await axios.get(`${API_BASE}/job/all`);
  return res.data;
};

// Fetch all users (admin only)
export const fetchUsersAPI = async (adminEmail) => {
  if (!adminEmail) throw new Error("adminEmail is required to fetch users.");
  const res = await axios.get(`${API_BASE}/admin/users`, {
    params: { adminEmail } // <- send as query param
  });
  return res.data;
};
