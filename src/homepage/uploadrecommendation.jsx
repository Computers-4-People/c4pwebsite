import React from "react";

export default function UploadRecommendation() {
  // Function to parse query parameters from the URL
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      Name_First: params.get("Name_First") || "",
      Name_Last: params.get("Name_Last") || "",
      Name1_First: params.get("Name1_First") || "",
      Name2_First: params.get("Name2_First") || "",
      partner: params.get("partner") || "",
      email: params.get("email") || "",
      ID: params.get("ID") || "",
    };
  };

  // Extract query parameters
  const {
    Name_First,
    Name_Last,
    Name1_First,
    Name2_First,
    partner,
    email,
    ID,
  } = getQueryParams();

  // Construct the Zoho form URL with prefilled parameters
  const formURL = `https://forms.zohopublic.com/Computers4People/form/UploadRecommendation2025/formperma/2BGXUQSSIzAowkBmxjLY4y1e2VU9M03gznRNMbE5w8Q?Name_First=${encodeURIComponent(
    Name_First
  )}&Name_Last=${encodeURIComponent(Name_Last)}&Name1_First=${encodeURIComponent(
    Name1_First
  )}&Name2_First=${encodeURIComponent(Name2_First)}&partner=${encodeURIComponent(
    partner
  )}&email=${encodeURIComponent(email)}&ID=${encodeURIComponent(ID)}`;

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
        aria-label="Upload Recommendation Form"
        style={{ width: "100%", height: "100%", border: "none" }} // Fullscreen iframe without borders
        src={formURL} // Dynamically set the form URL
      ></iframe>
    </div>
  );
}
