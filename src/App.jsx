import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WorkProvider } from './context/WorkContext';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import JobPost from './pages/JobPost';
import JobSearch from './pages/JobSearch';
import WorkerDashboard from './pages/WorkerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import JobDetails from './pages/JobDetails';
import ContactUs from './pages/ContactUs';
import DynamicShapes from './pages/DynamicShapes ';
import WaterfallDrops from './pages/WaterfallDrops ';
import LeftPanel3D from './pages/LeftPanel3D';


function App() {
  return (
    <WorkProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/post-job" element={<JobPost />} />
              <Route path="/jobs" element={<JobSearch />} />
              <Route path="/worker-dashboard" element={<WorkerDashboard />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/dynamicshapes" element={<DynamicShapes/>} />
              <Route path="/waterdrop" element={<WaterfallDrops/>} />
              <Route path="/leftpanel3d" element={<LeftPanel3D/>} />
             

            </Routes>
          </main>
        </div>
      </Router>
    </WorkProvider>
  );
}

export default App;
