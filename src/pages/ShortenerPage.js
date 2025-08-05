import React from "react";
import UrlForm from "../components/UrlForm";
import { getUrls, saveUrls } from "../utils/storage";
import { createLogger } from "../utils/logger";

const logger = createLogger();

export default function ShortenerPage() {
  const handleShorten = (rows) => {
    const urls = getUrls();
    const newUrls = rows.map((row) => {
      const shortcode = row.shortcode || Math.random().toString(36).substr(2, 6);
      if (urls.some((u) => u.shortcode === shortcode)) {
        alert(`Shortcode already exists: ${shortcode}`);
        logger.error("Shortcode collision", { shortcode });
        return null;
      }
      const validity = row.validity ? parseInt(row.validity) : 30;
      const expiry = new Date(Date.now() + validity * 60000).toISOString();
      const newUrl = {
        longUrl: row.longUrl,
        shortcode,
        expiry,
        created: new Date().toISOString(),
        clicks: []
      };
      logger.info("URL shortened", newUrl);
      return newUrl;
    }).filter(Boolean);

    saveUrls([...urls, ...newUrls]);
    alert("URLs shortened successfully!");
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <UrlForm onSubmit={handleShorten} />
    </div>
  );
}
