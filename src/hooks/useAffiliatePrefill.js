import { useEffect } from "react";
import { setRefSource } from "../utils/refSource";

/** Capture a referral tag from the URL once and persist it */
export default function useAffiliatePrefill() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ref =
      params.get("ref") ||
      params.get("source") ||
      params.get("utm_source") ||
      params.get("utm_campaign") ||
      "";

    if (ref) setRefSource(ref);
  }, []);
}
