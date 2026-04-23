import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { apiUrl } from "../../config/api";
import "./Blog.scss";
import "./BlogDetail.scss";

const BlogDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [customAuthor, setCustomAuthor] = useState(null);

  
  useEffect(() => {
    fetch(`https://dev.to/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))
      .catch((err) => console.error("Error fetching article:", err));
  }, [id]);

  
  useEffect(() => {
    const fetchCustomAuthor = async () => {
      try {
        const res = await fetch(apiUrl("/api/blogs/approved-ids"));
        const data = await res.json();

        const match = data.find((blog) => blog.devId === Number(id));
        if (match && match.customAuthor) {
          setCustomAuthor(match.customAuthor);
        }
      } catch (err) {
        console.error("Error fetching custom author:", err);
      }
    };

    fetchCustomAuthor();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  
  const displayAuthor =
    customAuthor || article.user?.name || article.user?.username || "Unknown Author";

  return (
    <div className="blog-detail">
      {/* Dynamic cover image */}
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

      <div
        className="blog-body"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(article.body_html),
        }}
      />
    </div>
  );
};

export default BlogDetail;
