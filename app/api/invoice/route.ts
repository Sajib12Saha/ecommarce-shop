
import { NextRequest, NextResponse } from "next/server";
import puppeteerCore from "puppeteer-core";
import chromiumModule from "@sparticuz/chromium";

const chromium: any = chromiumModule;

async function launchBrowser() {
  if (process.env.VERCEL) {
    // Production (Vercel)
    return puppeteerCore.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: await chromium.executablePath(),
      headless: true,
      defaultViewport: { width: 1280, height: 800 },
    });
  } else {
    // Local development
    const puppeteer = await import("puppeteer"); // full Puppeteer
    return puppeteer.default.launch({
      headless: true,
      defaultViewport: { width: 1280, height: 800 },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();
    const browser = await launchBrowser();
    const page: any = await browser.newPage(); // TypeScript workaround

    // Set HTML content
    await page.setContent(html, { waitUntil: "networkidle2" });

    // Wait for all images to finish loading
    await page.evaluate(async () => {
      const imgs = Array.from(document.images);
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return;
          return new Promise<void>((resolve) => {
            img.onload = img.onerror = () => resolve();
          });
        })
      );
    });

    // Small delay for serverless stability
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=invoice.pdf",
      },
    });
  } catch (err) {
    console.error("PDF generation failed:", err);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
