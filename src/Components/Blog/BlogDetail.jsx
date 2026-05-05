import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import { apiUrl } from "../../config/api";
import "./Blog.scss";
import "./BlogDetail.scss";

const BlogDetail = () => {
  const { id, slug } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [customAuthor, setCustomAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isCustomBlog = location.pathname.includes('/custom-blog/');

  useEffect(() => {
    if (isCustomBlog && slug) {
      fetchCustomBlog(slug);
    } else if (id) {
      fetchDevToArticle(id);
    }
  }, [id, slug, isCustomBlog]);

  const fetchCustomBlog = async (blogSlug) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(apiUrl(`/api/custom-blogs/slug/${blogSlug}`));

      if (!res.data || !res.data.title) {
        setError("Blog post not found");
        setArticle(null);
        return;
      }

      const blog = res.data;

      // Transform custom blog to match Dev.to structure
      setArticle({
        title: blog.title,
        body_html: blog.content,
        cover_image: blog.featuredImage,
        user: { name: blog.author },
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription,
        metaKeywords: blog.metaKeywords,
        ogImage: blog.ogImage,
      });

      if (blog.author) {
        setCustomAuthor(blog.author);
      }
    } catch (err) {
      console.error("Error fetching custom blog:", err);
      setError(err.response?.data?.error || "Failed to load blog post");
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchDevToArticle = async (articleId) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`https://dev.to/api/articles/${articleId}`);
      const data = await res.json();

      if (!res.ok || data.error || !data.title) {
        setError(data.error || "Blog post not found or not approved");
        setArticle(null);
        return;
      }

      setArticle(data);

      // Fetch custom author
      const customRes = await fetch(apiUrl("/api/blogs/approved-ids"));
      const customData = await customRes.json();

      const match = customData.find((blog) => blog.devId === Number(articleId));
      if (match && match.customAuthor) {
        setCustomAuthor(match.customAuthor);
      }
    } catch (err) {
      console.error("Error fetching article:", err);
      setError("Failed to load blog post. Please try again later.");
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="blog-detail-loading">Loading...</p>;
  if (error) return <p className="blog-detail-error">Error: {error}</p>;
  if (!article) return <p className="blog-detail-not-found">Blog not found</p>;

  const displayAuthor =
    customAuthor || article.user?.name || article.user?.username || "Unknown Author";

  return (
    <div className="blog-detail">
      {article.cover_image && (
        <img
          src={article.cover_image}
          alt={article.title}
          className="detail-cover"
        />
      )}

      <h1>{article.title}</h1>

      {/* Author Info */}
      <p className="author-name">Author - {displayAuthor}</p>

      <div className="blog-body">
        {article.body_html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.body_html),
            }}
          />
        ) : (
          <p>No content available</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
