import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUrls, saveUrls } from "../utils/storage";
import { createLogger } from "../utils/logger";

const logger = createLogger();

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = getUrls();
    const entry = urls.find((u) => u.shortcode === shortcode);
    if (!entry) {
      alert("Short URL not found");
      navigate("/");
      return;
    }
    if (new Date(entry.expiry) < new Date()) {
      alert("Link expired");
      navigate("/");
      return;
    }
    entry.clicks.push({
      timestamp: new Date().toISOString(),
      source: document.referrer || "Direct",
      location: "Unknown"
    });
    saveUrls(urls);
    logger.info("Short URL clicked", { shortcode });
    window.location.href = entry.longUrl;
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}
