import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { apiUrl } from '../../../config/api'
import './ApplyJob.scss'

const ApplyJob = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredLocation: '',
    resume: null,
    resumeFileName: '',
    coverLetter: '',
    experience: '',
    linkedin: ''
  })
  
  const [jobDetails, setJobDetails] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const job = location.state?.job
    if (job) {
      setJobDetails(job)
    } else {
      navigate('/careers')
    }
  }, [location, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleResumeChange = (e) => {
    const file = e.target.files[0]

  
    if (!file) {
      setFormData(prev => ({ ...prev, resume: null, resumeFileName: '' }))
      return
    }

    setError('') 

 
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only.')
      setFormData(prev => ({ ...prev, resume: null, resumeFileName: '' }))
      e.target.value = '' 
      return
    }

    
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB.')
      setFormData(prev => ({ ...prev, resume: null, resumeFileName: '' }))
      e.target.value = ''
      return
    }

   
    setFormData(prev => ({
      ...prev,
      resume: file,
      resumeFileName: file.name
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

  
    if (!formData.fullName.trim()) return setError('Full Name is required.')
    if (!formData.email.trim()) return setError('Email Address is required.')
    if (!formData.phone.trim()) return setError('Phone Number is required.')
    if (!formData.preferredLocation.trim()) return setError('Preferred Location is required.')
    if (!formData.experience.trim()) return setError('Years of Experience is required.')
    if (!formData.resume) return setError('Please upload your resume (PDF only).')

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return setError('Please enter a valid email address.')
    }

    setLoading(true)

    const submitData = new FormData()
    submitData.append('fullName', formData.fullName)
    submitData.append('email', formData.email)
    submitData.append('phone', formData.phone)
    submitData.append('preferredLocation', formData.preferredLocation)
    submitData.append('resume', formData.resume)
    submitData.append('coverLetter', formData.coverLetter)
    submitData.append('experience', formData.experience)
    submitData.append('linkedin', formData.linkedin)
    submitData.append('jobTitle', jobDetails?.title || 'Unknown Position')
    submitData.append('jobDepartment', jobDetails?.department || '')
    submitData.append('jobLocation', jobDetails?.location || '')

    try {
      const response = await fetch(apiUrl('/api/jobs/apply'), {
        method: 'POST',
        body: submitData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application.')
      }

      setSuccess('Application submitted successfully! Redirecting...')

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        preferredLocation: '',
        resume: null,
        resumeFileName: '',
        coverLetter: '',
        experience: '',
        linkedin: ''
      })

      setTimeout(() => navigate('/careers'), 3000)

    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!jobDetails) {
    return (
      <div className="apply-job">
        <div className="apply-job-container">
          <p>Loading job details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="apply-job">
      <div className="apply-job-bg-overlay" />
      <div className="apply-job-container">
        <div className="apply-job-card">
          <div className="card-header">
            <button className="back-btn" onClick={() => navigate('/careers')}>
              Back to Careers
            </button>
            <h1>Apply for Position</h1>
            <div className="job-info-card">
              <h2>{jobDetails.title}</h2>
              <div className="job-meta">
                <span className="department-tag">{jobDetails.department}</span>
                <span className="type-tag">{jobDetails.type}</span>
              </div>
              <div className="job-details">
                <span>Location: {jobDetails.location}</span>
                <span>Experience: {jobDetails.experience}</span>
              </div>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form className="apply-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredLocation">Preferred Location *</label>
                <input
                  type="text"
                  id="preferredLocation"
                  name="preferredLocation"
                  placeholder="e.g., Karachi, Lahore, Remote"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn Profile (Optional)</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Years of Experience *</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  placeholder="e.g., 3+ years"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
            </div>

           
            <div className="form-group">
              <label htmlFor="resume">Resume/CV (PDF Only) *</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  key={formData.resumeFileName || 'no-file'}  
                  onChange={handleResumeChange}
                />
                <div className="file-upload-area">
                  <p className="upload-text">
                    {formData.resumeFileName ? (
                      <><strong>Selected:</strong> {formData.resumeFileName}</>
                    ) : (
                      <>Click to upload or drag & drop your PDF resume</>
                    )}
                  </p>
                  <p className="upload-hint">PDF only • Max 10MB</p>
                </div>
              </div>
              {error && error.toLowerCase().includes('resume') && (
                <small style={{ color: '#e74c3c', marginTop: '8px', display: 'block' }}>
                  {error}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">Cover Letter (Optional)</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Tell us why you're interested in this position..."
                value={formData.coverLetter}
                onChange={handleChange}
                rows="6"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate('/careers')}>
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApplyJob
