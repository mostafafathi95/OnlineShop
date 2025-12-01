import { Router } from "express";

const router = Router();

// Dynamic sitemap endpoint
router.get("/sitemap.xml", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/products</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/articles</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/news</loc>
    <priority>0.8</priority>
  </url>
</urlset>`;

  res.type("application/xml").send(xml);
});

// Robots.txt endpoint
router.get("/robots.txt", (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /account
Disallow: /api
Sitemap: ${req.protocol}://${req.get("host")}/sitemap.xml`;

  res.type("text/plain").send(robots);
});

export default router;
