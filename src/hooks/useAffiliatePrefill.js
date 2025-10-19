// src/hooks/useAffiliatePrefill.js
import { useEffect } from "react";
import { setRefSource } from "../utils/refSource";

export default function useAffiliatePrefill() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);

    const ref =
      params.get("ref") ||
      params.get("source") ||
      params.get("utm_source") ||
      "";
    const coupon = params.get("coupon") || params.get("coupon_code") || "";

    if (ref) localStorage.setItem("shield_ref_source", ref);
    if (coupon) localStorage.setItem("shield_coupon", coupon);
  }, []);
}
