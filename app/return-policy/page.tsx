
import { siteMeta } from "@/data";
import type { Metadata } from "next";
import { ReturnPolicyClient } from "./_components/return-policy-client";
import { getReturnPolicy } from "@/actions/business-info";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await getReturnPolicy();

    const title = data?.metaTitle || `Return Policy | ${siteMeta.siteName}`;
    const description =
      data?.metaDescription ||
      "Hillora-এর রিটার্ন পলিসি জানুন — পণ্য ফেরত ও রিফান্ড সংক্রান্ত সকল নিয়মাবলী।";
    const keywords = data?.metaKeyWords?.join(", ") || siteMeta.keyWords;

    return {
      title,
      description,
      keywords,
      openGraph: {
        title: title,
        description: description,
        url: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_WWW_URL}/return-policy`,
        siteName: siteMeta.siteName,
        type: "website",
        images: [
          {
            url: siteMeta.openGraph.image,
            width: 1200,
            height: 630,
            alt: `${siteMeta.siteName} Return Policy Page`,
          },
        ],
        locale: "bn_BD",
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [siteMeta.twitter.image],
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_WWW_URL}/return-policy`,
      },
    };
  } catch (error) {
    console.error("Failed to fetch return policy metadata:", error);

    return {
      title: `Return Policy | ${siteMeta.siteName}`,
      description:
        "Hillora-এর রিটার্ন পলিসি জানুন — পণ্য ফেরত ও রিফান্ড সংক্রান্ত সকল নিয়মাবলী।",
      keywords: siteMeta.keyWords,
    };
  }
}

const ReturnPolicyPage = async () => {
  return <ReturnPolicyClient />;
};

export default ReturnPolicyPage;