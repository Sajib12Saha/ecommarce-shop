"use client";

import { blobDimensionMap, BlobIllustrationProps } from "./not-found-state";


   

export function LoadingState({ size = "md", className = "" }: BlobIllustrationProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <div className={`relative ${blobDimensionMap[size]} ${className}`}>
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <path
            className="fill-yellow-400 animate-[blob-pulse_1.8s_ease-in-out_infinite]"
            d="M42,-56C55,-48,66,-33,70,-16C74,1,71,20,61,36C51,52,34,65,14,69C-6,73,-28,68,-45,55C-62,42,-74,21,-74,0C-74,-21,-62,-42,-45,-55C-28,-68,-6,-73,14,-70C25,-68,34,-63,42,-56Z"
            transform="translate(100 100)"
          />
        </svg>
        <style>{`
          @keyframes blob-pulse {
            0%, 100% { transform: scale(0.9) rotate(0deg); opacity: 0.85; }
            50% { transform: scale(1.05) rotate(8deg); opacity: 1; }
          }
        `}</style>
      </div>

      <p className="text-sm font-medium text-gray-500">
        Picking the freshest results&hellip;
      </p>
    </div>
  );
}

export default LoadingState;