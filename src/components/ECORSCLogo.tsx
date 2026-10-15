import React from 'react';

interface ECORSCLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const ECORSCLogo: React.FC<ECORSCLogoProps> = ({
  className = '',
  size = 56,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none"
        aria-label="East Coast Railway Shramik Congress Official Logo"
      >
        <defs>
          {/* Path for upper curved text: EAST COAST RAILWAY SHRAMIK CONGRESS */}
          <path
            id="ecorscUpperCurve"
            d="M 32,120 A 88,88 0 1,1 208,120"
            fill="none"
          />
          {/* Path for lower curved text: • ECoRSC • */}
          <path
            id="ecorscLowerCurve"
            d="M 206,126 A 88,88 0 0,1 34,126"
            fill="none"
          />
        </defs>

        {/* 1. Outer Saffron/Orange Border Ring */}
        <circle cx="120" cy="120" r="118" fill="#E85A2A" stroke="#C84518" strokeWidth="2" />

        {/* 2. White Ring for Inscribed Union Text */}
        <circle cx="120" cy="120" r="102" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />

        {/* 3. Upper Curved Text: EAST COAST RAILWAY SHRAMIK CONGRESS */}
        <text
          fill="#111827"
          fontSize="14.2"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
        >
          <textPath href="#ecorscUpperCurve" startOffset="50%" textAnchor="middle">
            EAST COAST RAILWAY SHRAMIK CONGRESS
          </textPath>
        </text>

        {/* 4. Lower Curved Text: • ECoRSC • */}
        <text
          fill="#111827"
          fontSize="17"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="2.5"
        >
          <textPath href="#ecorscLowerCurve" startOffset="50%" textAnchor="middle">
            ●  ECoRSC  ●
          </textPath>
        </text>

        {/* 5. Inner Green Ring */}
        <circle cx="120" cy="120" r="76" fill="#15803D" stroke="#166534" strokeWidth="2" />

        {/* 6. Pure White Center Stage */}
        <circle cx="120" cy="120" r="68" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.8" />

        {/* 7. Central Pedestal & Railway Wheel in Blue */}
        <g id="pedestal">
          {/* Top Platform */}
          <rect x="94" y="148" width="52" height="10" rx="1.5" fill="#2563EB" stroke="#1E40AF" strokeWidth="0.8" />
          {/* Base Platform */}
          <rect x="80" y="157" width="80" height="9" rx="1.5" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="0.8" />

          {/* Wheel / Ashoka Wheel in center of base */}
          <circle cx="120" cy="161.5" r="7" fill="#FFFFFF" stroke="#1E40AF" strokeWidth="1.2" />
          <circle cx="120" cy="161.5" r="2.2" fill="#1E40AF" />
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <line
              key={deg}
              x1={120 + 7 * Math.cos((deg * Math.PI) / 180)}
              y1={161.5 + 7 * Math.sin((deg * Math.PI) / 180)}
              x2={120 - 7 * Math.cos((deg * Math.PI) / 180)}
              y2={161.5 - 7 * Math.sin((deg * Math.PI) / 180)}
              stroke="#1E40AF"
              strokeWidth="0.8"
            />
          ))}
        </g>

        {/* 8. Flagpole */}
        <line x1="124" y1="62" x2="124" y2="150" stroke="#1E3A8A" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="124" cy="62" r="2.5" fill="#F59E0B" />

        {/* 9. Waving Indian National Flag (Tricolor) */}
        <g id="nationalFlag">
          {/* Saffron Top Stripe */}
          <path
            d="M 124 64 C 134 62, 142 66, 152 64 C 153 64, 154 71, 153 71 C 143 73, 134 69, 124 71 Z"
            fill="#FF671F"
          />
          {/* White Middle Stripe */}
          <path
            d="M 124 71 C 134 69, 143 73, 153 71 C 153 71, 154 78, 152 78 C 142 80, 134 76, 124 78 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="0.3"
          />
          {/* Ashoka Chakra */}
          <circle cx="138" cy="74.5" r="2.5" fill="none" stroke="#000080" strokeWidth="0.6" />
          <circle cx="138" cy="74.5" r="0.8" fill="#000080" />
          {/* Green Bottom Stripe */}
          <path
            d="M 124 78 C 134 76, 142 80, 152 78 C 152 78, 151 85, 150 85 C 141 87, 134 83, 124 85 Z"
            fill="#046A38"
          />
        </g>

        {/* 10. Left Worker (Raising Flag with arm stretched) */}
        <g id="workerLeft" fill="#2563EB" stroke="#1E40AF" strokeWidth="0.5">
          {/* Turban / Head */}
          <circle cx="102" cy="98" r="5" />
          <path d="M 97 97 Q 102 93 107 97 Q 102 101 97 97 Z" fill="#1D4ED8" />
          {/* Torso & Kurta */}
          <path d="M 97 103 L 108 103 L 112 126 L 93 126 Z" />
          {/* Left Arm holding tool / banner */}
          <path d="M 97 105 L 85 116 L 81 123 L 85 125 L 89 119 L 98 109 Z" />
          {/* Right Arm raised upward grasping the flagpole */}
          <path d="M 107 105 L 118 92 L 124 94 L 119 104 L 109 110 Z" />
          {/* Legs & Dhoti on pedestal */}
          <path d="M 96 126 L 94 148 L 100 148 L 103 135 L 106 148 L 112 148 L 110 126 Z" />
        </g>

        {/* 11. Right Worker (Holding pickaxe/tool and raising flag) */}
        <g id="workerRight" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="0.5">
          {/* Worker Cap / Head */}
          <circle cx="144" cy="100" r="5" />
          <path d="M 140 98 Q 146 95 149 98 Z" fill="#1E3A8A" />
          {/* Torso & Work Shirt */}
          <path d="M 139 105 L 150 105 L 148 126 L 136 126 Z" />
          {/* Left Arm raised grasping flagpole together with comrade */}
          <path d="M 139 106 L 126 95 L 124 97 L 132 110 L 138 112 Z" />
          {/* Right Arm holding tool over shoulder */}
          <path d="M 150 106 L 158 116 L 155 125 L 151 124 L 153 118 L 148 112 Z" />
          {/* Tool / Hammer silhouette behind shoulder */}
          <line x1="148" y1="118" x2="162" y2="100" stroke="#1E3A8A" strokeWidth="1.8" />
          <rect x="159" y="98" width="5" height="4" fill="#1E3A8A" />
          {/* Legs & Work Trousers */}
          <path d="M 137 126 L 136 148 L 141 148 L 143 135 L 145 148 L 150 148 L 147 126 Z" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-base font-extrabold tracking-tight text-stone-900 leading-tight">
            ECORSC <span className="text-red-700 font-bold">· NFIR</span>
          </span>
          <span className="text-[11px] text-stone-500 font-medium leading-none">
            East Coast Railway Shramik Congress
          </span>
        </div>
      )}
    </div>
  );
};
