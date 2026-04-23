import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import "./BlogApproval.scss";

export default function BlogApproval() {
  const [blogs, setBlogs] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [authors, setAuthors] = useState({});
  const [dates, setDates] = useState({});
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const organization = "itcs11";

  // Fetch all Dev.to blogs
  const fetchAllDevBlogs = async () => {
    let allBlogs = [];
    let page = 1;
    while (true) {
      const res = await fetch(
        `https://dev.to/api/organizations/${organization}/articles?per_page=100&page=${page}`
      );
      const data = await res.json();
      if (data.length === 0) break;
      allBlogs = [...allBlogs, ...data];
      page++;
    }
    return allBlogs;
  };

  // Sort blogs by date (customDate if exists, else Dev.to date)
  const sortBlogsByDate = (blogsList, dateMap) => {
    return [...blogsList].sort((a, b) => {
      const dateA = dateMap[a.id] ? new Date(dateMap[a.id]) : new Date(a.published_at || a.created_at);
      const dateB = dateMap[b.id] ? new Date(dateMap[b.id]) : new Date(b.published_at || b.created_at);
      return dateB - dateA; // newest first
    });
  };

  // Fetch blogs and statuses
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const [devBlogs, statusRes] = await Promise.all([
        fetchAllDevBlogs(),
        axios.get(apiUrl("/api/blogs/statuses"))
      ]);

      const statusMap = {};
      const authorMap = {};
      const dateMap = {};

      if (Array.isArray(statusRes.data)) {
        statusRes.data.forEach(b => {
          statusMap[b.devId] = b.status;
          authorMap[b.devId] = b.customAuthor || "";
          dateMap[b.devId] = b.customDate || "";
        });
      }

      setStatuses(statusMap);
      setAuthors(authorMap);
      setDates(dateMap);

      let visibleBlogs = devBlogs.filter(blog => statusMap[blog.id] !== "rejected");
      visibleBlogs = sortBlogsByDate(visibleBlogs, dateMap);

      setBlogs(visibleBlogs);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch blogs or statuses.");
    } finally {
      setLoading(false);
    }
  };

  // Update blog status
  const updateStatus = async (devId, status) => {
    try {
      await axios.patch(apiUrl(`/api/blogs/${devId}/status`), { status });
      setStatuses(prev => ({ ...prev, [devId]: status }));
      if (status === "rejected") setBlogs(prev => prev.filter(blog => blog.id !== devId));
    } catch {
      alert("Failed to update status.");
    }
  };

  // Update author
  const updateAuthor = async (devId, author) => {
    try {
      await axios.patch(apiUrl(`/api/blogs/${devId}/status`), { customAuthor: author });
      setAuthors(prev => ({ ...prev, [devId]: author }));
    } catch {
      alert("Failed to update author.");
    }
  };

  // Update custom date and re-sort blogs
  const updateDate = async (devId, customDate) => {
    if (!customDate) return alert("Date cannot be empty.");
    try {
      await axios.patch(apiUrl(`/api/blogs/${devId}/status`), { customDate });
      setDates(prev => {
        const newDates = { ...prev, [devId]: customDate };
        setBlogs(prevBlogs => sortBlogsByDate(prevBlogs, newDates));
        return newDates;
      });
    } catch {
      alert("Failed to update date.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="blog-approval-container">
      <h2>Blogs for Approval</h2>

      {loading && <p className="loading-text">Loading blogs...</p>}

      <div className="blog-grid">
        {currentBlogs.map(blog => (
          <article key={blog.id} className="blog-card">
            <div className="blog-card__content">
              {(blog.cover_image || blog.social_image) && (
                <img
                  src={blog.cover_image || blog.social_image}
                  alt={blog.title}
                  className="blog-cover"
                  loading="lazy"
                />
              )}
              <h3>{blog.title}</h3>
              <p className="meta">
                Author: {authors[blog.id] || blog.user?.username || "Unknown"} •{" "}
                {dates[blog.id]
                  ? new Date(dates[blog.id]).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                  : blog.readable_publish_date} • {blog.reading_time_minutes} min read
              </p>
              <p className="description">{blog.description}</p>
              <div className="tags-small">
                {blog.tag_list?.slice(0, 3).map(tag => <span key={tag}>#{tag}</span>)}
              </div>
              <Link
                to={`/admin/blog/${blog.id}`}
                state={{ customAuthor: authors[blog.id] || "" }}
                className="read-more"
              >
                Read More
              </Link>
            </div>

            <div className="blog-card__footer">
              <div className="author-edit">
                <input
                  type="text"
                  placeholder="Edit author name"
                  value={authors[blog.id] || ""}
                  onChange={e => setAuthors(prev => ({ ...prev, [blog.id]: e.target.value }))}
                />
                <button onClick={() => updateAuthor(blog.id, authors[blog.id] || "")}>Save Author</button>
              </div>

              <div className="date-edit">
                <input
                  type="date"
                  value={dates[blog.id] || ""}
                  onChange={e => setDates(prev => ({ ...prev, [blog.id]: e.target.value }))}
                />
                <button onClick={() => updateDate(blog.id, dates[blog.id] || "")}>Save Date</button>
              </div>

              <div className="approval-buttons">
                <button
                  className="approve-btn"
                  disabled={statuses[blog.id] === "approved"}
                  onClick={() => updateStatus(blog.id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  disabled={statuses[blog.id] === "rejected"}
                  onClick={() => updateStatus(blog.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>

        {currentPage !== 1 && <button onClick={() => setCurrentPage(1)}>1</button>}
        {currentPage > 3 && <span className="dots">...</span>}

        {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
          .filter(page => page >= 1 && page <= totalPages)
          .map(page => (
            <button key={page} className={page === currentPage ? "active-page" : ""} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          ))}

        {currentPage < totalPages - 2 && <span className="dots">...</span>}
        {currentPage !== totalPages && <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>}

        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>

        <div className="jump-to-page">
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder="Go to..."
            onKeyDown={e => {
              if (e.key === "Enter") {
                const page = Number(e.target.value);
                if (page >= 1 && page <= totalPages) setCurrentPage(page);
              }
            }}
          />
        </div>
      </div>

      {!loading && blogs.length === 0 && <p className="no-blogs">No blogs pending approval.</p>}
    </div>
  );
}
