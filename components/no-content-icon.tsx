"use client";

interface NoContentIconProps {
  size?: number;
  primaryColor?: string;
  className?: string;
}


export const NoContentIcon = ({
  size = 220,
  primaryColor = "#FFC107",
  className = "",
}: NoContentIconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 220 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="No content available"
    >
      <style>
        {`
          .nci-shadow {
            animation: nci-shadowPulse 3s ease-in-out infinite;
            transform-origin: center;
          }
          @keyframes nci-shadowPulse {
            0%, 100% { transform: scaleX(1); opacity: 0.25; }
            50% { transform: scaleX(0.82); opacity: 0.12; }
          }

          .nci-boxgroup {
            animation: nci-bob 3s ease-in-out infinite;
            transform-origin: center;
          }
          @keyframes nci-bob {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }

          .nci-lid {
            animation: nci-lidWiggle 3s ease-in-out infinite;
            transform-origin: 60px 78px;
          }
          @keyframes nci-lidWiggle {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-3deg); }
          }

          .nci-question {
            animation: nci-pop 3s ease-in-out infinite;
            transform-origin: center;
          }
          @keyframes nci-pop {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.7; }
          }

          .nci-magnifier {
            animation: nci-glassSwing 4s ease-in-out infinite;
            transform-origin: 165px 95px;
          }
          @keyframes nci-glassSwing {
            0%, 100% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(-8deg) scale(1.03); }
            75% { transform: rotate(6deg) scale(1.03); }
          }

          .nci-dot {
            animation: nci-floatDot 3.5s ease-in-out infinite;
          }
          @keyframes nci-floatDot {
            0%, 100% { transform: translateY(0px); opacity: 0.6; }
            50% { transform: translateY(-10px); opacity: 1; }
          }
        `}
      </style>

      {/* floating dots */}
      <circle className="nci-dot" cx="30" cy="20" r="5" fill={primaryColor} opacity="0.35" style={{ animationDelay: "0s" }} />
      <circle className="nci-dot" cx="196" cy="45" r="7" fill={primaryColor} opacity="0.5" style={{ animationDelay: "0.6s" }} />
      <circle className="nci-dot" cx="15" cy="140" r="4" fill={primaryColor} opacity="0.3" style={{ animationDelay: "1.2s" }} />
      <circle className="nci-dot" cx="180" cy="150" r="6" fill={primaryColor} opacity="0.4" style={{ animationDelay: "0.3s" }} />

      {/* shadow */}
      <ellipse className="nci-shadow" cx="100" cy="178" rx="60" ry="10" fill={primaryColor} />

      <g className="nci-boxgroup">
        {/* back panel */}
        <path
          d="M40 90 L100 75 L160 90 L160 150 L100 165 L40 150 Z"
          fill={primaryColor}
          fillOpacity="0.25"
          stroke={primaryColor}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* front-left flap */}
        <path
          d="M40 90 L100 105 L100 165 L40 150 Z"
          fill={primaryColor}
          stroke={primaryColor}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* front-right flap */}
        <path
          d="M160 90 L100 105 L100 165 L160 150 Z"
          fill={primaryColor}
          fillOpacity="0.75"
          stroke={primaryColor}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* lid */}
        <g className="nci-lid">
          <path d="M40 90 L100 75 L100 88 L45 102 Z" fill={primaryColor} />
        </g>
        <path d="M160 90 L100 75 L100 88 L155 102 Z" fill={primaryColor} />

        {/* question mark */}
        <text
          className="nci-question"
          x="100"
          y="128"
          fontSize="34"
          fontWeight="700"
          fill="#7A5200"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          ?
        </text>

        {/* magnifier */}
        <g className="nci-magnifier">
          <circle cx="165" cy="95" r="16" fill="none" stroke={primaryColor} strokeWidth="5" />
          <line x1="176" y1="106" x2="190" y2="120" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};