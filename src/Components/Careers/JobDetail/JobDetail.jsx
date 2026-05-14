import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import "./JobDetail.scss";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiUrl(`/api/jobsAdd/${id}`));
        setJob(res.data);
      } catch (err) {
        console.error("Error loading job details:", err);
        setError("Failed to load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadJobDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="job-detail-loading">
        <div className="spinner"></div>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-detail-error">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error || "Job not found"}</p>
          <button className="back-btn" onClick={() => navigate("/careers")}>
            ← Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const handleApplyClick = () => {
    navigate("/apply", { state: { job } });
  };

  return (
    <div className="job-detail-container">
      <div className="job-detail-hero">
        <div className="hero-content">
          <button className="back-btn" onClick={() => navigate("/careers")}>
            ← Back to Careers
          </button>
          <h1>{job.title}</h1>
          <div className="job-meta-header">
            <span className="department-tag">{job.department}</span>
            <span className="type-tag">{job.type}</span>
          </div>
        </div>
      </div>

      <div className="job-detail-content">
        <div className="content-wrapper">
          <div className="main-content">
            <section className="job-overview">
              <h2>Job Overview</h2>
              <div className="overview-grid">
                <div className="overview-item">
                  <span className="icon">📍</span>
                  <div>
                    <p className="label">Location</p>
                    <p className="value">{job.location}</p>
                  </div>
                </div>
                <div className="overview-item">
                  <span className="icon">⏱️</span>
                  <div>
                    <p className="label">Experience</p>
                    <p className="value">{job.experience}</p>
                  </div>
                </div>
                <div className="overview-item">
                  <span className="icon">💼</span>
                  <div>
                    <p className="label">Employment Type</p>
                    <p className="value">{job.type}</p>
                  </div>
                </div>
                <div className="overview-item">
                  <span className="icon">👥</span>
                  <div>
                    <p className="label">Department</p>
                    <p className="value">{job.department}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="job-description">
              <h2>About This Role</h2>
              <div className="description-content">
                {job.aboutRole ? (
                  <p>{job.aboutRole}</p>
                ) : job.description ? (
                  <p>{job.description}</p>
                ) : (
                  <p>We're looking for a talented professional to join our {job.department} team. If you're passionate about technology and innovation, we'd love to hear from you!</p>
                )}
              </div>
            </section>

            <section className="job-responsibilities">
              <h2>Key Responsibilities</h2>
              <ul className="responsibilities-list">
                {job.responsibilities ? (
                  job.responsibilities.split('\n').filter(line => line.trim()).map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                  ))
                ) : (
                  <>
                    <li>Contribute to innovative projects and solutions</li>
                    <li>Collaborate with a talented and diverse team</li>
                    <li>Work on cutting-edge technology and tools</li>
                    <li>Drive impact and create meaningful value</li>
                  </>
                )}
              </ul>
            </section>

            <section className="job-requirements">
              <h2>What We're Looking For</h2>
              <div className="requirements-grid">
                {job.requirements ? (
                  job.requirements.split('\n').filter(line => line.trim()).map((item, idx) => (
                    <div className="requirement-card" key={idx}>
                      <h3>{idx === 0 ? "Core Requirement" : idx === 1 ? "Skills" : idx === 2 ? "Qualifications" : "Expectation"}</h3>
                      <p>{item.trim()}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="requirement-card">
                      <h3>Technical Skills</h3>
                      <p>Strong technical foundation relevant to the {job.title.toLowerCase()} position</p>
                    </div>
                    <div className="requirement-card">
                      <h3>Experience</h3>
                      <p>{job.experience}</p>
                    </div>
                    <div className="requirement-card">
                      <h3>Soft Skills</h3>
                      <p>Communication, teamwork, and problem-solving abilities</p>
                    </div>
                    <div className="requirement-card">
                      <h3>Passion</h3>
                      <p>Enthusiasm for learning and growing with our organization</p>
                    </div>
                  </>
                )}
              </div>
            </section>

            <section className="job-benefits">
              <h2>Why Join ITCS?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-icon">🏢</span>
                  <h4>Innovative Workspaces</h4>
                  <p>State-of-the-art offices designed for creativity and collaboration</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📚</span>
                  <h4>Continuous Learning</h4>
                  <p>Professional development and certification opportunities</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🤝</span>
                  <h4>Team Building</h4>
                  <p>Regular team activities and workshops to build strong relationships</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">⚖️</span>
                  <h4>Work-Life Balance</h4>
                  <p>Flexible work arrangements and generous leave policies</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🏥</span>
                  <h4>Health Insurance</h4>
                  <p>Comprehensive health coverage for you and your family</p>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">💰</span>
                  <h4>Competitive Compensation</h4>
                  <p>Performance-based compensation and incentive plans</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="job-sidebar">
            <div className="apply-card">
              <h3>Ready to Apply?</h3>
              <p>Send us your resume and let's start your journey with ITCS.</p>
              <button className="apply-btn-primary" onClick={handleApplyClick}>
                Apply Now
              </button>
              <p className="deadline-note">Application deadline: Open until filled</p>
            </div>

            <div className="contact-card">
              <h3>Questions?</h3>
              <p>Get in touch with our HR team</p>
              <div className="contact-info">
                <p>
                  <strong>Email:</strong>
                  <br />
                  <a href="mailto:info@itcs.com.pk">info@itcs.com.pk</a>
                </p>
                <p>
                  <strong>Phone:</strong>
                  <br />
                  <a href="tel:+9221111482711">021 111-482-711</a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
