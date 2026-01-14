import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import articles from "./articlesData";

export default function BlogArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find the article by slug
  const article = articles.find(a => a.slug === slug);

  // Scroll to top when article loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If article not found, redirect to blog
  useEffect(() => {
    if (!article) {
      navigate('/blog');
    }
  }, [article, navigate]);

  // Set page title for SEO
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Computers 4 People Blog`;
    }
  }, [article]);

  // If article not found, show nothing while redirecting
  if (!article) {
    return null;
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Convert markdown-style content to JSX
  const renderContent = (content) => {
    // Split content into paragraphs and headings
    const lines = content.trim().split('\n\n');

    return lines.map((line, index) => {
      // Heading 2
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6">
            {line.replace('## ', '')}
          </h2>
        );
      }

      // Heading 3
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
            {line.replace('### ', '')}
          </h3>
        );
      }

      // Bold text (e.g., **text**)
      const boldPattern = /\*\*(.*?)\*\*/g;
      const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

      let processedLine = line;

      // Process links
      const links = [];
      processedLine = processedLine.replace(linkPattern, (_match, text, url) => {
        const placeholder = `__LINK_${links.length}__`;
        links.push({ text, url });
        return placeholder;
      });

      // Split by bold markers
      const parts = processedLine.split(boldPattern);

      return (
        <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
          {parts.map((part, i) => {
            // Check if this part contains a link placeholder
            const linkMatch = part.match(/__LINK_(\d+)__/);
            if (linkMatch) {
              const linkIndex = parseInt(linkMatch[1]);
              const link = links[linkIndex];
              return (
                <Link
                  key={i}
                  to={link.url}
                  className="text-green-600 hover:underline font-semibold"
                >
                  {link.text}
                </Link>
              );
            }

            // Odd indices are bold text (between ** **)
            if (i % 2 === 1) {
              return <strong key={i} className="font-bold text-gray-900">{part}</strong>;
            }
            return <span key={i}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div id="main-content" className="font-sans pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="text-sm">
            <Link to="/" className="text-green-600 hover:underline">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/blog" className="text-green-600 hover:underline">Blog</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-8 pb-8 border-b border-gray-200">
          <span className="font-medium">{article.author}</span>
          <span>•</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        {/* Featured Image (if available) */}
        {article.image && (
          <div className="mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {renderContent(article.content)}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            to="/blog"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>

      {/* Related Articles Section */}
      <div className="bg-gray-50 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles
              .filter(a => a.slug !== slug)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  to={`/blog/${relatedArticle.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                      {relatedArticle.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      {relatedArticle.readTime}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
