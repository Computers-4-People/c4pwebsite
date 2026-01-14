import React from "react";
import { Link } from "react-router-dom";
import articles from "../blog/articlesData";

export default function Blog() {
    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Get the latest/featured article
    const featuredArticle = articles[0];

    return (
        <div id="main-content" className='font-sans overflow-x-hidden'>
            {/* Modern Hero Section with Featured Article */}
            <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-green-700 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-lg">
                            {featuredArticle.category}
                        </span>
                        <h1 className='font-bold text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight'>
                            <span className='bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent block mb-4'>
                                {featuredArticle.title.split(':')[0]}
                            </span>
                            {featuredArticle.title.split(':')[1] && (
                                <span className='text-white block'>
                                    {featuredArticle.title.split(':')[1]}
                                </span>
                            )}
                        </h1>
                        <p className='text-gray-300 text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed'>
                            {featuredArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-center gap-6 text-gray-400 text-sm mb-10">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                {formatDate(featuredArticle.date)}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                {featuredArticle.readTime}
                            </span>
                        </div>
                        <Link
                            to={`/blog/${featuredArticle.slug}`}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Read Full Article
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div id="media-highlights" className="mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-4">
                        Explore Our Expert Tips and Guides
                    </h2>
                    <p className='text-black text-xl md:text-2xl'>
                        Explore articles covering everything from practical guides to the latest digital equity news.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            to={`/blog/${article.slug}`}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Article Image */}
                            {article.image && (
                                <div className="h-48 bg-gray-200 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/blog/blogstock.png';
                                        }}
                                    />
                                </div>
                            )}

                            {/* Article Content */}
                            <div className="p-6">
                                {/* Category Badge */}
                                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                                    {article.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {article.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                {/* Meta Info */}
                                <div className="flex items-center gap-3 text-gray-500 text-xs">
                                    <span>{formatDate(article.date)}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Social Media CTA Section */}
            <div className='bg-gradient-to-br from-green-50 to-white py-20 px-4 sm:px-10 md:px-20'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold mb-6">
                        Stay Connected With Us
                    </h2>
                    <p className='text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto'>
                        Follow our journey on social media for the latest updates, digital skills tips, success stories, and behind-the-scenes content. Join our growing community!
                    </p>
                    <p className='text-base text-gray-600 mb-10'>
                        Find all our social media links in the footer below 👇
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            View All Social Media
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
