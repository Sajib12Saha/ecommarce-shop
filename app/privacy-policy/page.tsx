
import { siteMeta } from "@/data";
import type { Metadata } from "next";
import { PrivacyPolicyClient } from "./_components/privacy-policy-client";
import { getPrivacyPolicy } from "@/actions/business-info";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await getPrivacyPolicy();

    const title = data?.metaTitle || `Privacy Policy | ${siteMeta.siteName}`;
    const description =
      data?.metaDescription ||
      "Hillora-এর প্রাইভেসি পলিসি জানুন — আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি।";
    const keywords = data?.metaKeyWords?.join(", ") || siteMeta.keyWords;

    return {
      title,
      description,
      keywords,
      openGraph: {
        title: title,
        description: description,
        url: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_WWW_URL}/privacy-policy`,
        siteName: siteMeta.siteName,
        type: "website",
        images: [
          {
            url: siteMeta.openGraph.image,
            width: 1200,
            height: 630,
            alt: `${siteMeta.siteName} Privacy Policy Page`,
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
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_WWW_URL}/privacy-policy`,
      },
    };
  } catch (error) {
    console.error("Failed to fetch privacy policy metadata:", error);

    return {
      title: `Privacy Policy | ${siteMeta.siteName}`,
      description:
        "Hillora-এর প্রাইভেসি পলিসি জানুন — আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি।",
      keywords: siteMeta.keyWords,
    };
  }
}

const PrivacyPolicyPage = async () => {
  return <PrivacyPolicyClient />;
};

export default PrivacyPolicyPage;