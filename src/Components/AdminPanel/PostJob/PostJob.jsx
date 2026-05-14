import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config/api';
import './PostJob.scss';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    aboutRole: '',
    responsibilities: '',
    requirements: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const departments = ['Engineering', 'Design', 'Security', 'Product', 'Sales', 'Marketing', 'HR'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.department || !formData.location || !formData.experience || !formData.aboutRole || !formData.responsibilities || !formData.requirements) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      setLoading(true);
      await axios.post(apiUrl('/api/jobsAdd'), formData);
      setSuccess('Job posted successfully!');

      setFormData({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        experience: '',
        aboutRole: '',
        responsibilities: '',
        requirements: ''
      });

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job">
      <div className="post-job-header">
        <h1>Post a New Job</h1>
        <p>Fill in the details below to create a new job posting</p>
      </div>

      <div className="post-job-card">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="job-form">

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Job Title *</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Senior Software Engineer" />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select id="department" name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Karachi, Pakistan" />
            </div>
            <div className="form-group">
              <label htmlFor="type">Job Type *</label>
              <select id="type" name="type" value={formData.type} onChange={handleChange} required>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience Required *</label>
            <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} required placeholder="e.g. 3+ years in React.js" />
          </div>

          <div className="form-divider">Detailed Content</div>

          <div className="form-group">
            <label htmlFor="aboutRole">About This Role *</label>
            <textarea id="aboutRole" name="aboutRole" value={formData.aboutRole} onChange={handleChange} rows="4" required placeholder="Describe the role in detail..." />
          </div>

          <div className="form-group">
            <label htmlFor="responsibilities">Key Responsibilities (One per line) *</label>
            <textarea id="responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleChange} rows="6" required placeholder="Collaborate with team...&#10;Develop new features...&#10;Write clean code..." />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">What We're Looking For (Requirements) *</label>
            <textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} rows="6" required placeholder="Bachelor's degree in CS...&#10;Strong problem solving skills...&#10;Passion for innovation..." />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
