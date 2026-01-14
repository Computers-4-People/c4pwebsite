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
            {/* Hero Section with Featured Article */}
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%), url('/blog/blogbackground.png')`
                }}
                className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                    <div className="col-start-1 md:col-end-5">
                        <span className="inline-block bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                            {featuredArticle.category}
                        </span>
                        <h1 className='font-subtitle text-5xl md:text-6xl lg:text-7xl mb-6'>
                            <p className='text-c4p animate-fade-up uppercase'>{featuredArticle.title.split(':')[0]}</p>
                            {featuredArticle.title.split(':')[1] && (
                                <p className='text-white animate-fade-up uppercase'>{featuredArticle.title.split(':')[1]}</p>
                            )}
                        </h1>
                        <div className="animate-fade-up">
                            <p className='text-white text-xl md:text-2xl mb-6'>
                                {featuredArticle.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-white text-sm mb-6">
                                <span>{formatDate(featuredArticle.date)}</span>
                                <span>•</span>
                                <span>{featuredArticle.readTime}</span>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <Link
                                    to={`/blog/${featuredArticle.slug}`}
                                    className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
                                >
                                    Read Article
                                </Link>
                            </div>
                        </div>
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

            {/* YouTube Section */}
            <div className='bg-cover font-sans justify-evenly px-4 mt-20 mb-20 sm:px-10 md:px-20 py-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                    {/* Text Section */}
                    <div className='flex flex-col text-left md:ml-20 mt-20'>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6">
                            Watch Our Latest Videos and Tutorials on YouTube
                        </h2>
                        <p className='text-lg md:text-xl leading-7 md:leading-8 lg:leading-10'>
                            Check out our YouTube channel for digital skills classes, tutorials, and more—Computers 4 People On YouTube is an extension of our blog for deeper insights and practical tips.
                        </p>
                        <div className="flex flex-col md:flex-row mt-10">
                            <a
                                href="https://www.youtube.com/@Computers4People"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
                            >
                                Computers 4 People On YouTube
                            </a>
                        </div>
                    </div>
                    {/* Image Section */}
                    <div className='flex justify-center'>
                        <img src="../blog/blogphoto.png" alt="YouTube Content" className='w-full h-auto md:max-w-md' />
                    </div>
                </div>
            </div>
        </div>
    );
}
