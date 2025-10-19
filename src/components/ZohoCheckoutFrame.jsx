import React, { useMemo } from "react";
import { getRefSource } from "../utils/refSource";

/**
 * Renders a Zoho Hosted Payment Page in an iframe and injects your referral
 * into the custom customer field API name: cf_who_told_you_about_us
 *
 * Props:
 *  - baseUrl: string (required) Hosted page URL from Zoho Billing
 *  - params:  object (optional)  Additional prefill params (addons, address, etc.)
 *  - height:  string (optional)  iframe height (default "1300px")
 */
export default function ZohoCheckoutFrame({ baseUrl, params = {}, height = "1300px" }) {
  const src = useMemo(() => {
    if (!baseUrl) return "";
    const url = new URL(baseUrl);

    // Add any page-specific params (URLSearchParams encodes values only)
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        url.searchParams.set(k, String(v));
      }
    });

    // Inject referral into your exact custom field API name
    const ref = getRefSource();
    if (ref) {
      url.searchParams.set("cf_who_told_you_about_us", ref);
      // Alternative also accepted by Zoho in many cases:
      // url.searchParams.set("customer.cf_who_told_you_about_us", ref);
    }

    return url.toString();
  }, [baseUrl, params]);

  return (
    <iframe
      title="Zoho Subscription Checkout"
      src={src}
      width="100%"
      height={height}
      frameBorder="0"
      scrolling="no"
      style={{ border: "none", backgroundColor: "#ffffff" }}
    />
  );
}
