import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import "./HomeBlog.scss";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const organization = "itcs11";

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const [devRes, approvedRes] = await Promise.all([
          fetch(`https://dev.to/api/organizations/${organization}/articles?per_page=50&_=${Date.now()}`),
          axios.get(apiUrl("/api/blogs/approved-ids"))
        ]);

        const devBlogs = await devRes.json();
        const approvedData = approvedRes.data;

        const approvedIds = approvedData.map(item => item.devId);
        const authorMap = {};
        approvedData.forEach(item => {
          if (item.customAuthor) {
            authorMap[item.devId] = item.customAuthor;
          }
        });

        const approvedBlogs = devBlogs
          .filter(blog => approvedIds.includes(blog.id))
          .map(blog => ({
            ...blog,
            displayAuthor: authorMap[blog.id] || blog.user?.username || "Unknown"
          }));

        approvedBlogs.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
        setPosts(approvedBlogs);

      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-public-container">
      <h2 className="blog-public-title">Our Blogs</h2>

      {loading && <p className="loading-text">Loading approved blogs...</p>}

      <div className="blog-grid">
        {posts.length > 0 ? (
          posts.slice(0, 3).map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-card__content">
                {(post.cover_image || post.social_image) && (
                  <img
                    src={post.cover_image || post.social_image}
                    alt={post.title}
                    className="blog-cover"
                    loading="lazy"
                  />
                )}

                <h3>{post.title}</h3>

                <p className="meta">
                  {post.displayAuthor} • {post.readable_publish_date} • {post.reading_time_minutes} min read
                </p>

                <p className="description">{post.description}</p>

                <Link to={`/blog/${post.id}`} className="read-more">
                  Read more
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className="no-posts">
            {loading ? "Loading..." : "No blogs found."}
          </p>
        )}
      </div>
    </div>
  );
}
