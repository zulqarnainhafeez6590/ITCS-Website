const normalizeBaseUrl = (value) => {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\/+$/, "");
};

const isLocalhostBaseUrl = (value) => {
  if (!value) return false;

  try {
    const { hostname } = new URL(value);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
};

const configuredBaseUrl = normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL);
const canUseConfiguredBaseUrl =
  configuredBaseUrl &&
  !(import.meta.env.PROD && isLocalhostBaseUrl(configuredBaseUrl));

export const API_BASE_URL = canUseConfiguredBaseUrl
  ? configuredBaseUrl
  : import.meta.env.DEV
    ? "http://localhost:5000"
    : "";

export const apiUrl = (path = "") => {
  if (!path) return API_BASE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
