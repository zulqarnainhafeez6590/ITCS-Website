import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config/api";
import "./Blog.scss";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("all");
  const [loading, setLoading] = useState(true);

  const organization = import.meta.env.VITE_DEVTO_ORG || "itcs11";
  const devtoApiBase = import.meta.env.VITE_DEVTO_API_BASE || "https://dev.to/api";

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const [devRes, approvedRes] = await Promise.all([
          fetch(`${devtoApiBase}/organizations/${organization}/articles?per_page=50&_=${Date.now()}`),
          axios.get(apiUrl("/api/blogs/approved-ids"))
        ]);

        const devBlogs = await devRes.json();
        const approvedData = approvedRes.data;

        const approvedIds = approvedData.map(item => item.devId);
        const authorMap = {};
        const dateMap = {};

        approvedData.forEach(item => {
          if (item.customAuthor) authorMap[item.devId] = item.customAuthor;
          if (item.customDate) dateMap[item.devId] = item.customDate;
        });

        const approvedBlogs = devBlogs
          .filter(blog => approvedIds.includes(blog.id))
          .map(blog => ({
            ...blog,
            displayAuthor: authorMap[blog.id] || blog.user?.username || "Unknown",
            displayDate: dateMap[blog.id] || blog.readable_publish_date
          }));

        approvedBlogs.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
        setPosts(approvedBlogs);

        const allTags = approvedBlogs.flatMap(blog => blog.tag_list || []);
        const uniqueTags = Array.from(new Set(allTags)).sort();
        setTags(["all", ...uniqueTags]);

      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = activeTag === "all"
    ? posts
    : posts.filter(post => post.tag_list?.includes(activeTag));

  // Function to format date like "September 23, 2025"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className="blog-public-container">
      <h2 className="blog-public-title">Our Blogs</h2>

      {loading && <p className="loading-text">Loading approved blogs...</p>}

      <div className="tag-pills">
        {tags.map(tag => (
          <button
            key={tag}
            className={`tag-pill ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
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
                  {post.displayAuthor} • {formatDate(post.displayDate)} • {post.reading_time_minutes} min read
                </p>

                <p className="description">{post.description}</p>

                <div className="tags-small">
                  {post.tag_list?.slice(0, 3).map(tag => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>

                <Link to={`/blog/${post.id}`} className="read-more">
                  Read more
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className="no-posts">
            {loading ? "Loading..." : "No blogs found for this tag."}
          </p>
        )}
      </div>
    </div>
  );
}
