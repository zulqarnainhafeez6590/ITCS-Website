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
        const [devRes, approvedRes, customRes] = await Promise.all([
          fetch(`https://dev.to/api/organizations/${organization}/articles?per_page=50&_=${Date.now()}`),
          axios.get(apiUrl("/api/blogs/approved-ids")),
          axios.get(apiUrl("/api/custom-blogs/published"))
        ]);

        const devBlogs = await devRes.json();
        const approvedData = approvedRes.data;
        const customBlogs = customRes.data;

        const approvedIds = approvedData.map(item => item.devId);
        const authorMap = {};
        const dateMap = {};

        approvedData.forEach(item => {
          if (item.customAuthor) authorMap[item.devId] = item.customAuthor;
          if (item.customDate) dateMap[item.devId] = item.customDate;
        });

        // Approved Dev.to blogs
        const approvedDevBlogs = devBlogs
          .filter(blog => approvedIds.includes(blog.id))
          .map(blog => {
            const approvedRecord = approvedData.find(item => item.devId === blog.id);
            return {
              ...blog,
              displayAuthor: authorMap[blog.id] || blog.user?.username || "Unknown",
              displayDate: dateMap[blog.id] || blog.readable_publish_date,
              isCustom: false,
              approvedAt: approvedRecord?.createdAt || new Date(0)
            };
          });

        // Format custom published blogs
        const formattedCustomBlogs = customBlogs.map(blog => ({
          id: blog._id,
          title: blog.title,
          description: blog.excerpt || blog.metaDescription,
          cover_image: blog.featuredImage,
          social_image: blog.ogImage,
          user: { username: blog.author, name: blog.author },
          published_at: blog.publishDate,
          readable_publish_date: new Date(blog.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          reading_time_minutes: Math.ceil(blog.content.split(' ').length / 200),
          displayAuthor: blog.author,
          displayDate: blog.publishDate,
          isCustom: true,
          slug: blog.slug,
          updatedAt: blog.updatedAt
        }));

        // Combine and sort by latest (approval date for Dev.to, publishDate for custom)
        const allPosts = [...approvedDevBlogs, ...formattedCustomBlogs];
        allPosts.sort((a, b) => {
          const dateA = a.isCustom ? new Date(a.updatedAt || a.published_at) : new Date(a.approvedAt);
          const dateB = b.isCustom ? new Date(b.updatedAt || b.published_at) : new Date(b.approvedAt);
          return dateB - dateA;
        });
        
        setPosts(allPosts);

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

                <Link to={post.isCustom ? `/custom-blog/${post.slug}` : `/blog/${post.id}`} className="read-more">
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
