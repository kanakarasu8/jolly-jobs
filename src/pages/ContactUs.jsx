import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting Jolly Jobs! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side - Image / Info */}
        <div className="lg:w-1/2 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-700 text-white p-10 flex flex-col justify-center items-center">
          <img 
            src="https://provincial-aqua-f4habsbsj1-2u1wodjn3x.edgeone.dev/young-happy-businesswoman-working-desktop-pc-communicating-mobile-phone-office.jpg" 
            alt="Contact Us" 
            className="rounded-2xl shadow-lg mb-6 w-full max-w-sm"
          />
          <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="text-gray-100 text-center">
            Have questions or feedback? Our team at Fulcrum Digital Jobs is here to help.
            Reach out to us anytime!
          </p>
          <div className="mt-6 text-gray-100 text-center space-y-1">
            <p>Email: support@fulcrumdigitaljobs.com</p>
            <p>Phone: +91 123 456 7890</p>
            <p>Address:</p>
            <p>Sanhasa Square,</p>
            <p>Bharathi Park 3rd Cross,</p>
            <p>Coimbatore, Tamil Nadu 641043</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h2>
            <p className="text-gray-600">
              Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Subject of your message"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
