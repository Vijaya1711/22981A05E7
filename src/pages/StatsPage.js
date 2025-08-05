import React from "react";
import { getUrls } from "../utils/storage";

export default function StatsPage() {
  const urls = getUrls();

  return (
    <div>
      <h2>URL Statistics</h2>
      {urls.map((url) => (
        <div key={url.shortcode}>
          <p>Short URL: <a href={`/${url.shortcode}`}>{window.location.origin}/{url.shortcode}</a></p>
          <p>Created: {url.created}</p>
          <p>Expires: {url.expiry}</p>
          <p>Total Clicks: {url.clicks.length}</p>
          <ul>
            {url.clicks.map((c, idx) => (
              <li key={idx}>{c.timestamp} - {c.source} - {c.location}</li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  );
}
