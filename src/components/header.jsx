import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  const { bgImage, titlePart1, titlePart2, description, links, logos } = props.props;

  const renderLinkItem = (link, index) => {
    const commonClasses =
      "block flex items-center justify-center text-center text-sm sm:text-base md:text-lg animate-fade-up h-11 rounded-md px-4 sm:px-5 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap";
    const styleClasses =
      index % 2 === 0
        ? "bg-c4p hover:bg-c4p-hover hover:text-white"
        : "border border-white text-white hover:bg-white hover:text-black";

    if (link.url && link.url.includes(".pdf")) {
      return (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${commonClasses} ${styleClasses}`}
        >
          {link.text}
        </a>
      );
    } else if (link.url) {
      return (
        <Link key={index} to={link.url} className={`${commonClasses} ${styleClasses}`}>
          {link.text}
        </Link>
      );
    } else if (link.clickAction) {
      return (
        <button
          key={index}
          onClick={link.clickAction}
          className={`${commonClasses} ${styleClasses}`}
        >
          {link.text}
        </button>
      );
    }
  };

  return (
    <div
      className="header-container bg-cover bg-no-repeat h-screen overflow-y-auto md:overflow-y-visible w-full flex flex-col justify-end items-start md:flex-row pb-10 md:items-center md:justify-start"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%), url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="px-6 sm:px-10 md:px-20 w-full">
        <div className="inline-block">
          <h1 className="font-title mb-4 text-left">
            <p className="whitespace-nowrap md:whitespace-normal text-c4p animate-fade-up dynamic-font-mobile">
              {titlePart1}
            </p>
            <p className="whitespace-nowrap md:whitespace-normal text-white animate-fade-up dynamic-font-mobile">
              {titlePart2}
            </p>
          </h1>
        </div>
        <div className="animate-fade-up">
          <p className="font-paragraph text-white mb-4 md:w-3/4 text-left dynamic-font-desc">
            {description}
          </p>
          <div className="font-subtitle flex flex-col gap-3 sm:flex-row sm:gap-5 md:w-3/4">
            {links.map(renderLinkItem)}
          </div>
        </div>
      </div>

      {logos && (
        <div className="md:absolute md:bottom-4 md:left-4 text-left mt-6 md:mt-0">
          <div className="flex justify-start space-x-4">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Partner Logo ${index + 1}`}
                className="h-10 sm:h-14 md:h-20 lg:h-24 w-auto"
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .header-container {
            background-position: right !important;
          }
          .dynamic-font-mobile {
            font-size: clamp(2rem, 5vw, 4rem);
            line-height: 1.2;
          }
          .dynamic-font-desc {
            font-size: clamp(1rem, 3vw, 1.5rem);
            line-height: 1.3;
          }
        }
        @media (min-width: 769px) {
          .dynamic-font-mobile {
            font-size: 5rem;
            line-height: 1.1;
          }
          .dynamic-font-desc {
            font-size: 1.75rem;
            line-height: 1.2;
          }
        }
      `}</style>
    </div>
  );
}
