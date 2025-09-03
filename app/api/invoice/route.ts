// app/api/generate-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import puppeteerCore from "puppeteer-core";
import chromiumModule from "@sparticuz/chromium";

const chromium: any = chromiumModule;

async function launchBrowser() {
  if (process.env.VERCEL) {
    return puppeteerCore.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: await chromium.executablePath(),
      headless: true,
      defaultViewport: { width: 1280, height: 800 },
    });
  } else {
    const puppeteer = await import("puppeteer");
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
    const page: any = await browser.newPage();

    // Wait for DOM content to load
    await page.goto("about:blank");
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // Wait for images to load
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

    // Extra small delay for serverless
    await new Promise((resolve) => setTimeout(resolve, 700));

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
