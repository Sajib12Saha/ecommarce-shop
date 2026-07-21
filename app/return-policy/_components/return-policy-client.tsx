"use client";

import { Loader2 } from "lucide-react";
import { HeadingTitle } from "@/components/heading-title";

import { useCustomQuery } from "@/hooks/use-custom-query";
import { getReturnPolicy } from "@/actions/business-info";
import { NoContentIcon } from "@/components/no-content-icon";

export const ReturnPolicyClient = () => {
  const { data, isLoading, error } = useCustomQuery<{ data: any }>(
    ["get-return-policy"],
    () => getReturnPolicy()
  );

  const policyData = data?.data;
  const returnPolicyContent = policyData?.returnPolicyContent || "";

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl w-full px-6 py-8 space-y-4 min-h-[60vh] flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl w-full px-6 py-8 space-y-4 min-h-[60vh]">
        <HeadingTitle title="Return Policy" />
        <div className="flex flex-col items-center justify-center py-12 text-center shadow-md rounded-xl p-4">
      <NoContentIcon size={180} primaryColor="#DC2626"/>
      <p className="text-red-500 font-semibold">Failed to load return policy. Please try again later.</p>
        </div>
      
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl w-full px-6 py-8 space-y-4 min-h-[60vh]">
      <HeadingTitle title="Return Policy" />
      {returnPolicyContent ? (
        <div className="shadow-md rounded-xl p-4">
          <div
            className="tiptap"
            dangerouslySetInnerHTML={{ __html: returnPolicyContent }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center shadow-md rounded-xl p-4">
          <NoContentIcon size={180} primaryColor="#EAB308"/>
          <p className="mt-4 font-semibold">
            No return policy content available at the moment. Please check back later.
          </p>
        </div>
      )}
    </main>
  );
};