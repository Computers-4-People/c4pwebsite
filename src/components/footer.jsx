// src/components/Footer.js
import React from 'react';
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { openZohoDeskKB } from '../utils/openKb'; // Import the helper function

export default function Footer() {
  return (
    <div className="relative">
      {/* Gradient fade effect at the top with negative margin for overlap */}
      <div className="w-full h-10 bg-gradient-to-b from-transparent to-black -mt-5"></div>

      <div className="w-full bg-black text-white py-10 flex flex-col items-center">
        {/* Footer Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-16 px-10 py-10 w-full max-w-7xl text-center md:text-left">
          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold text-xl mb-4">
              <Link to="/" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Computers 4 People
              </Link>
            </div>
            <Link to="/about" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              About Us
            </Link>
            <Link to="/team/" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Team
            </Link>
            <Link to="/contact" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Contact Us
            </Link>
            <Link to="/terms-of-service" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Terms of Service
            </Link>
            <Link to="/privacypolicy" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Privacy Policy
            </Link>
            
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold text-xl mb-4">
              <Link to="/programs" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Programs
              </Link>
            </div>
            <Link to="/apply" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Apply for a Computer
            </Link>
            <Link to="/shield" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Affordable Internet
            </Link>
            <Link to="/dsclasses" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Digital Skills Classes
            </Link>
            <Link to="/partner" className="hover:text-c4p">Non-Profit Partners</Link>
            <Link to="/blog" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Blog
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold text-xl mb-4">
              <Link to="/support" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Get Involved
              </Link>
            </div>
            <Link to="/donate" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Donate Computers
            </Link>
            <Link to="/support" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Fund Our Work
            </Link>
            <Link to="/ewastedropoff" className="hover:text-c4p mb-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              E-Waste Dropoff
            </Link>
            <Link to="/volunteer" className="hover:text-c4p">
            Volunteer
            </Link>
            <Link to="https://careers.computers4people.org" className="hover:text-c4p">
              Work @ C4P
            </Link>
          </div>

          {/* Column 4 - Newsletter on Top and Social Media Below */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-full">
              <iframe
                scrolling="no"
                title="Zoho Newsletter Signup"
                frameBorder="0"
                id="iframewin"
                width="100%"
                height="100%"
                src="https://uxnz-zgph.maillist-manage.net/ua/Optin?od=11287ecb6ce88d&zx=130f0ab1e&tD=1a65a3c9c40db029&sD=1a65a3c9c57a8e73"
              />
            </div>
            <div className="text-xl mt-10 font-bold text-center w-full">Follow Us</div>
            <div className="w-full flex justify-around mt-4">
              <a href="https://www.facebook.com/Computers4People" aria-label='Facebook'><FaFacebook size={30} /></a>
              <a href="https://www.instagram.com/computers4people/" aria-label='Instagram'><FaInstagram size={30} /></a>
              <a href="https://twitter.com/Computer4people" aria-label='X.com'><FaXTwitter size={30} /></a>
              <a href="https://www.linkedin.com/company/computers4people" aria-label='LinkedIn'><FaLinkedin size={30} /></a>
              <a href="https://www.tiktok.com/@computers4people" aria-label='TikTok'><FaTiktok size={30} /></a>
              <a href="https://www.youtube.com/@Computers4People" aria-label='YouTube'><FaYoutube size={30} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Candid Seal and Copyright */}
        <div className="relative w-full max-w-7xl px-10">
          {/* Candid Seal - Positioned on left side */}
          <div className="absolute left-20 -top-20 hidden md:block z-20">
            <a href="https://app.candid.org/profile/9813077/computers-for-people-inc-83-3405612" target="_blank" rel="noopener noreferrer">
              <img src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9813077/svg" alt="Candid Seal" className="h-24 cursor-pointer" />
            </a>
          </div>

          {/* Candid Seal - Mobile version (centered above copyright) */}
          <div className="flex justify-center mb-4 md:hidden">
            <a href="https://app.candid.org/profile/9813077/computers-for-people-inc-83-3405612" target="_blank" rel="noopener noreferrer">
              <img src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9813077/svg" alt="Candid Seal" className="h-20" />
            </a>
          </div>

          {/* Copyright - Centered */}
          <div className="text-center text-sm text-gray-400 py-6">
            © 2025 Computers For People Inc.
          </div>
        </div>
      </div>
    </div>
  );
}
