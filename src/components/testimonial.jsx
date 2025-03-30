import React from "react";
import { Link } from "react-router-dom";

export default function Testimonial(props) {
  const { title1, desc1, title2, desc2, image, side, links, alt } = props.props;

  return (
    <div className="bg-cover py-10 px-4 sm:px-8 md:px-16 lg:px-20 my-10">
      <div
        className={`flex flex-col ${
          side === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center lg:justify-between gap-10`}
      >
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={image}
            alt={alt}
            className="max-w-full h-auto rounded-lg object-contain lg:max-h-[400px]"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center items-center lg:items-start space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-subtitle text-black">
            {title2}
          </h2>
          <p className="font-quote text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
            {desc2}
          </p>

          {/* Links Section */}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-4">
              {links.map((link, index) =>
                link.clickAction ? (
                  <button
                    key={index}
                    onClick={link.clickAction}
                    className={`block w-full lg:w-auto text-center text-xl animate-fade-up h-11 rounded-md py-2 px-7 ${
                      index % 2 === 0
                        ? "bg-c4p hover:bg-c4p-hover text-black hover:text-white"
                        : "border border-black text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {link.text}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={link.url}
                    className={`block w-full lg:w-auto text-center text-xl animate-fade-up h-11 rounded-md py-2 px-7 ${
                      index % 2 === 0
                        ? "bg-c4p hover:bg-c4p-hover text-black hover:text-white"
                        : "border border-black text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {link.text}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
