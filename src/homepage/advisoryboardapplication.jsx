import React from "react";

export default function AdvisoryBoardApplication() {
  return (
    <div
      id="main-content"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/refurbishedbackground.png')",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "300vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-fixed"
    >
      <iframe
        className="pt-20"
        scrolling="no"
        aria-label="Advisory Board Application Form"
        style={{ width: "100%", height: "100%", border: "none" }}
        src="https://forms.zohopublic.com/Computers4People/form/C4PAdvisoryBoardApplication/formperma/mtBceFBAMg9INwU8nSM3k8D_k3z0tZkjwcvYeQtduF4"
      ></iframe>
    </div>
  );
}
