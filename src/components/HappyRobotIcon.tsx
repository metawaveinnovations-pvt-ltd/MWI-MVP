interface HappyRobotIconProps {
  className?: string;
  size?: number | string;
}

export function HappyRobotIcon({ className = "w-14 h-14", size }: HappyRobotIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="5 4 92 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* White Ceramic / Polymer Body Gradients */}
        <linearGradient id="whiteShellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Cobalt / Azure Blue Accent Gradient */}
        <linearGradient id="azureBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="40%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        {/* Dark LED Digital Screen Gradient */}
        <linearGradient id="ledScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="50%" stopColor="#0B1329" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>

        {/* Golden Chart & Coin Gradient */}
        <linearGradient id="goldCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="60%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>

        {/* Glowing Arc Reactor Core */}
        <radialGradient id="coreGlowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#93C5FD" />
          <stop offset="85%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </radialGradient>

        {/* Soft Drop Shadow for 3D realism */}
        <filter id="robot3DDropShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#0F172A" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter="url(#robot3DDropShadow)">
        {/* --- BODY & TORSO --- */}
        {/* Lower Blue Pants/Legs Base */}
        <path d="M46 76 Q54 78 62 76 L65 88 Q54 91 43 88 Z" fill="url(#azureBlueGrad)" />
        {/* White Curved Torso */}
        <path
          d="M38 56 C38 52 44 50 54 50 C64 50 70 52 70 56 C70 65 67 78 54 78 C41 78 38 65 38 56 Z"
          fill="url(#whiteShellGrad)"
        />
        {/* Torso Top Blue Collar Trim */}
        <path d="M43 51 Q54 48 65 51 Q62 55 54 55 Q46 55 43 51 Z" fill="url(#azureBlueGrad)" />

        {/* Chest Arc Reactor (Glowing Circle) */}
        <circle cx="54" cy="65" r="7" fill="url(#azureBlueGrad)" />
        <circle cx="54" cy="65" r="5.2" fill="url(#coreGlowGrad)" />
        <circle cx="53" cy="63.5" r="1.5" fill="#FFFFFF" />

        {/* --- WAVING RIGHT ARM & HAND --- */}
        {/* Upper Arm Segment */}
        <circle cx="74" cy="59" r="4.5" fill="url(#whiteShellGrad)" />
        {/* Blue Elbow Ring */}
        <ellipse cx="78" cy="55" rx="2.5" ry="1.5" fill="url(#azureBlueGrad)" transform="rotate(-30 78 55)" />
        {/* Forearm Segment */}
        <path d="M78 54 L85 45 C87 42 90 44 88 47 L83 56 Z" fill="url(#whiteShellGrad)" />
        {/* Blue Wrist Cuff */}
        <ellipse cx="86" cy="46" rx="3.5" ry="2" fill="url(#azureBlueGrad)" transform="rotate(35 86 46)" />
        {/* Waving Hand (Palm & Fingers) */}
        <circle cx="89" cy="43" r="4" fill="url(#azureBlueGrad)" />
        {/* White Finger Tips */}
        <circle cx="85" cy="38" r="1.3" fill="#FFFFFF" />
        <circle cx="89" cy="36" r="1.3" fill="#FFFFFF" />
        <circle cx="93" cy="38" r="1.3" fill="#FFFFFF" />
        <circle cx="95" cy="42" r="1.2" fill="#FFFFFF" />

        {/* --- HEAD & HELMET --- */}
        {/* Left Blue Ear Headphone Pod */}
        <rect x="25" y="21" width="4.5" height="15" rx="2.25" fill="url(#azureBlueGrad)" />
        {/* Right Blue Ear Headphone Pod */}
        <rect x="76.5" y="21" width="4.5" height="15" rx="2.25" fill="url(#azureBlueGrad)" />

        {/* Main White Helmet Shell */}
        <path
          d="M27 24 C27 10 38 6 53 6 C68 6 79 10 79 24 C79 40 70 48 53 48 C36 48 27 40 27 24 Z"
          fill="url(#whiteShellGrad)"
        />

        {/* Blue Seam Highlights on Helmet */}
        <path d="M41 8 C44 14 45 18 44 21" stroke="url(#azureBlueGrad)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M65 8 C62 14 61 18 62 21" stroke="url(#azureBlueGrad)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M37 43 Q53 47 69 43" stroke="url(#azureBlueGrad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

        {/* Black Glossy Screen Faceplate */}
        <rect x="32" y="16" width="42" height="26" rx="9" fill="url(#ledScreenGrad)" />
        {/* Subtle Horizontal LED Screen Scanlines */}
        <line x1="34" y1="20" x2="72" y2="20" stroke="#38BDF8" strokeWidth="0.4" opacity="0.25" />
        <line x1="34" y1="24" x2="72" y2="24" stroke="#38BDF8" strokeWidth="0.4" opacity="0.25" />
        <line x1="34" y1="28" x2="72" y2="28" stroke="#38BDF8" strokeWidth="0.4" opacity="0.25" />
        <line x1="34" y1="32" x2="72" y2="32" stroke="#38BDF8" strokeWidth="0.4" opacity="0.25" />
        <line x1="34" y1="36" x2="72" y2="36" stroke="#38BDF8" strokeWidth="0.4" opacity="0.25" />

        {/* Happy Big Glowing Eyes */}
        {/* Left Eye */}
        <ellipse cx="44" cy="27" rx="4.5" ry="5.5" fill="#FFFFFF" />
        {/* Right Eye */}
        <ellipse cx="62" cy="27" rx="4.5" ry="5.5" fill="#FFFFFF" />

        {/* Happy Smiling LED Mouth */}
        <path
          d="M49 35 Q53 38 57 35"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* --- SMART DASHBOARD / TECH LAPTOP CONSOLE (LEFT SIDE) --- */}
        {/* Laptop Outer Blue Chassis */}
        <rect x="8" y="47" width="37" height="34" rx="4" fill="url(#azureBlueGrad)" />
        {/* Laptop Dark Screen Inset */}
        <rect x="10" y="49" width="33" height="21" rx="2.5" fill="#090E1A" />

        {/* Yellow/Gold Candlestick Bars on Chart */}
        <rect x="13" y="55" width="2" height="9" rx="0.5" fill="url(#goldCoinGrad)" />
        <rect x="16" y="52" width="2.2" height="12" rx="0.5" fill="url(#goldCoinGrad)" />
        <rect x="19.5" y="57" width="2" height="7" rx="0.5" fill="url(#goldCoinGrad)" />
        <rect x="23" y="50" width="2.2" height="14" rx="0.5" fill="url(#goldCoinGrad)" />

        {/* Growth Trend Nodes */}
        <circle cx="14" cy="67" r="1" fill="#60A5FA" />
        <circle cx="18" cy="65" r="1" fill="#60A5FA" />
        <circle cx="22" cy="63" r="1" fill="#60A5FA" />
        <line x1="14" y1="67" x2="18" y2="65" stroke="#60A5FA" strokeWidth="0.8" />
        <line x1="18" y1="65" x2="22" y2="63" stroke="#60A5FA" strokeWidth="0.8" />

        {/* Mini Pie / Donut Chart */}
        <circle cx="37" cy="65" r="3.5" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
        <circle cx="37" cy="65" r="3.5" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="6 15" fill="none" />

        {/* Horizontal Mini Metric Bars */}
        <rect x="28" y="52" width="13" height="2" rx="1" fill="#FFFFFF" opacity="0.8" />
        <rect x="28" y="56" width="10" height="2" rx="1" fill="url(#goldCoinGrad)" />
        <rect x="28" y="60" width="8" height="2" rx="1" fill="url(#goldCoinGrad)" />

        {/* Laptop Keyboard (Clean White Keys Grid) */}
        <rect x="10" y="71" width="33" height="8" rx="1.5" fill="#1E293B" />
        {/* Keys rows */}
        <rect x="12" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="15" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="18" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="21" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="24" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="27" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="30" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="33" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="36" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="39" y="72.5" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />

        <rect x="13" y="75" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="16" y="75" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="19" y="75" width="10" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="30" y="75" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="33" y="75" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />
        <rect x="36" y="75" width="2" height="1.2" rx="0.4" fill="#F8FAFC" />

        {/* Laptop Trackpad & Base Lip */}
        <rect x="22" y="82" width="9" height="2" rx="1" fill="#0F172A" />

        {/* Floating Percentage / Badge Node (Left) */}
        <circle cx="8" cy="65" r="4.5" fill="url(#azureBlueGrad)" />
        <text x="8" y="67.2" fill="#FFFFFF" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">%</text>

        {/* Floating Gold Dollar Node (Right of laptop) */}
        <circle cx="44" cy="57" r="4.5" fill="url(#goldCoinGrad)" />
        <text x="44" y="59.2" fill="#FFFFFF" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">$</text>
      </g>
    </svg>
  );
}
