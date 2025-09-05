import { getCategories } from "@/actions/category";
import { getProducts } from "@/actions/product";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

 const {data:products} = await getProducts()
 const { data: categories } = await getCategories();

  // Static pages
  const staticPages = ["", "/about", "/faq", ];

  const urls = staticPages
    .map(
      (page) => `
      <url>
        <loc>${baseUrl}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
    )
    .join("");

  const productUrls = products
    .map(
      (p) => `
      <url>
        <loc>${baseUrl}/product/${p.id}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>`
    )
    .join("");

      const categoryUrls = categories
    .map(
      (c) => `
      <url>
        <loc>${baseUrl}/category/${c.id}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
    ${productUrls}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
