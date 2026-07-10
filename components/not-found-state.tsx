"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type BlobSize = "sm" | "md" | "lg";

export interface BlobIllustrationProps {
  msg?: string;
  size?: BlobSize;
  className?: string;
}

export const blobDimensionMap: Record<BlobSize, string> = {
  sm: "h-40 w-52",
  md: "h-56 w-72",
  lg: "h-72 w-96",
};

export function NotFoundState({ msg, size = "md", className = "" }: BlobIllustrationProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className={`relative ${blobDimensionMap[size]} ${className}`}>
        <svg viewBox="0 0 400 300" className="h-full w-full">
          <ellipse cx="90" cy="278" rx="34" ry="6" fill="black" />
          <ellipse cx="232" cy="286" rx="46" ry="7" fill="black" />
          <ellipse cx="352" cy="200" rx="26" ry="5" fill="black" opacity="0.5" />

          <g style={{ transformOrigin: "90px 210px" }} className="animate-[leaf-sway_4s_ease-in-out_infinite]">
            <path d="M65,212 L115,212 L108,268 L72,268 Z" fill="white" stroke="black" strokeWidth="4" />
            <rect x="58" y="200" width="64" height="14" rx="4" fill="black" />
            {[-60, -40, -20, 0, 20, 40, 60].map((angle, i) => (
              <path
                key={angle}
                className="fill-primary"
                stroke="black"
                strokeWidth="2.5"
                transform={`translate(90 205) rotate(${angle}) scale(${1 - Math.abs(i - 3) * 0.08})`}
                d="M0,0 C-8,-25 -6,-58 0,-78 C6,-58 8,-25 0,0 Z"
              />
            ))}
          </g>

          <g className="animate-[badge-float_3.5s_ease-in-out_infinite]">
            <rect x="150" y="40" width="44" height="54" rx="10" fill="white" stroke="black" strokeWidth="3" />
            <rect x="150" y="40" width="22" height="27" className="fill-primary" />
            <rect x="172" y="67" width="22" height="27" className="fill-primary" />
            <circle cx="161" cy="80" r="3" fill="black" />
          </g>

          <g>
            <path
              d="M210,146 C204,124 216,108 236,110 C250,111 254,124 250,138 C246,129 238,123 228,123 C217,123 212,133 210,146 Z"
              fill="black"
            />
            <circle cx="230" cy="150" r="20" fill="#FBEBD3" stroke="black" strokeWidth="3" />
            <ellipse cx="230" cy="196" rx="27" ry="33" fill="white" stroke="black" strokeWidth="3" />
            <path
              d="M204,222 C190,232 185,252 200,262 C215,270 231,264 233,251 C235,264 251,270 265,259 C279,249 271,229 257,222 C245,216 216,216 204,222 Z"
              className="fill-primary"
              stroke="black"
              strokeWidth="3"
            />
            <ellipse cx="200" cy="260" rx="11" ry="6" fill="black" />
            <ellipse cx="263" cy="258" rx="11" ry="6" fill="black" />

            <path d="M212,206 L248,206 L242,226 L218,226 Z" fill="white" stroke="black" strokeWidth="3" />
            <line x1="216" y1="213" x2="244" y2="213" stroke="black" strokeWidth="1.5" />
            <line x1="217" y1="219" x2="243" y2="219" stroke="black" strokeWidth="1.5" />

            <text x="230" y="222" textAnchor="middle" className="fill-black text-[10px] font-bold">
              404
            </text>
          </g>

          <g>
            <rect x="320" y="130" width="72" height="7" fill="black" rx="2" />
            <path d="M348,90 L360,130 L336,130 Z" className="fill-primary" stroke="black" strokeWidth="2.5" />
            <rect x="345" y="70" width="6" height="24" fill="black" />
            {[
              { x: 326, color: "fill-primary" },
              { x: 340, color: "fill-black" },
              { x: 354, color: "fill-white" },
              { x: 368, color: "fill-primary" },
            ].map((box) => (
              <rect
                key={box.x}
                x={box.x}
                y="138"
                width="12"
                height="40"
                className={box.color}
                stroke="black"
                strokeWidth="2"
              />
            ))}
          </g>
        </svg>

        <style>{`
          @keyframes leaf-sway {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
          }
          @keyframes badge-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}</style>
      </div>

      <div className="space-y-2">
        <p className="max-w-xs text-sm">{msg}</p>
      </div>

      <Button onClick={() => router.push("/")}>Back to the main</Button>
    </div>
  );
}