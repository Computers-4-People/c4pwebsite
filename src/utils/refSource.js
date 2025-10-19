// Persist and read an affiliate/referral source with a TTL.
const KEY = "shield_ref_source";
const TTL_DAYS = 60;

const now = () => Date.now();
const days = (n) => n * 24 * 60 * 60 * 1000;

export function setRefSource(value) {
  if (!value || typeof window === "undefined") return;
  const record = { value, ts: now(), exp: now() + days(TTL_DAYS) };
  localStorage.setItem(KEY, JSON.stringify(record));
}

export function getRefSource() {
  if (typeof window === "undefined") return "";
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return "";
    const { value, exp } = JSON.parse(raw);
    if (exp && now() > exp) {
      localStorage.removeItem(KEY);
      return "";
    }
    return value || "";
  } catch {
    return "";
  }
}
