// src/components/ZohoCheckoutFrame.jsx
import React, { useMemo } from "react";
import { getRefSource } from "../utils/refSource";

export default function ZohoCheckoutFrame({ baseUrl, params = {}, height = "1300px" }) {
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

  return (
    <iframe
      src={src}
      width="100%"
      height={height}
      frameBorder="0"
      scrolling="no"
      style={{ border: "none", backgroundColor: "#fff" }}
      title="Zoho Checkout"
    />
  );
}
