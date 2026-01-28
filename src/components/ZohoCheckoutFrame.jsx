// src/components/ZohoCheckoutFrame.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getRefSource } from "../utils/refSource";

export default function ZohoCheckoutFrame({
  baseUrl,
  params = {},
  height = "1300px",
  mobileHeight = "140vh",
  scrolling = "no",
  mobileScrolling = "yes",
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const handleChange = (event) => setIsMobile(event.matches);
    setIsMobile(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const src = useMemo(() => {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });

    const ref = localStorage.getItem("shield_ref_source");
    const coupon = localStorage.getItem("shield_coupon");

    if (ref) url.searchParams.set("cf_who_told_you_about_us", ref);
    if (coupon) url.searchParams.set("coupon_code", coupon);

    return url.toString();
  }, [baseUrl, params]);

  const frameHeight = isMobile ? mobileHeight : height;
  const frameScrolling = isMobile ? mobileScrolling : scrolling;
  const frameStyle = {
    border: "none",
    backgroundColor: "#fff",
    display: "block",
    ...(isMobile ? { minHeight: "900px" } : null),
  };

  return (
    <iframe
      src={src}
      width="100%"
      height={frameHeight}
      frameBorder="0"
      scrolling={frameScrolling}
      style={frameStyle}
      title="Zoho Checkout"
    />
  );
}
