import React from "react";

export default function PowerUpYourImpact() {
  // Function to parse query parameters from the URL
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      donation: params.get("donation") || "",
      namefirst: params.get("namefirst") || "",
      namelast: params.get("namelast") || "",
      donorid: params.get("donorid") || "",
      email: params.get("email") || "",
    };
  };

  // Extract query parameters
  const { donation, namefirst, namelast, donorid, email } = getQueryParams();

  // Construct the Zoho form URL with prefilled parameters
  const formURL = `https://forms.zohopublic.com/Computers4People/form/PowerUpYourImpact/formperma/LmAXXibSDPx5S4DW1KDvQYhkRmKbWcTTZy9XJuqt6uc?donation=${encodeURIComponent(
    donation
  )}&namefirst=${encodeURIComponent(namefirst)}&namelast=${encodeURIComponent(
    namelast
  )}&donorid=${encodeURIComponent(donorid)}&email=${encodeURIComponent(email)}`;

  return (
    <div
      id="main-content"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/refurbishedbackground.png')`,
        display: "flex",
        alignItems: "center", // Aligns iframe vertically
        justifyContent: "center", // Aligns iframe horizontally
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-fixed"
    >
      <iframe
        className="pt-20"
        scrolling="no"
        aria-label="Power Up Your Impact Form"
        style={{ width: "100%", height: "100%", border: "none" }} // Fullscreen iframe without borders
        src={formURL} // Dynamically set the form URL
      ></iframe>
    </div>
  );
}
