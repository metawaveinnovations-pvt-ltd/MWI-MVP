interface SmartRobotIconProps {
  className?: string;
  size?: number | string;
}

export function SmartRobotIcon({ className = "w-8 h-8", size }: SmartRobotIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* Volumetric Studio Shading Gradients */}
        <radialGradient id="smrDomeLight" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#F1F5F9" />
          <stop offset="75%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </radialGradient>

        <linearGradient id="smrArmorShade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#F8FAFC" />
          <stop offset="70%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        <linearGradient id="smrDarkJoint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="35%" stopColor="#334155" />
          <stop offset="70%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#090D16" />
        </linearGradient>

        <linearGradient id="smrObsidianVisor" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="40%" stopColor="#0F172A" />
          <stop offset="85%" stopColor="#020617" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>

        <linearGradient id="smrGlassReflect" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="smrEmeraldOptic" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#34D399" />
          <stop offset="70%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>

        <filter id="smrBloom" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="smrDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#smrDropShadow)">
        {/* --- ANTENNA & COMMUNICATION BEACON --- */}
        <path d="M32 4V13" stroke="url(#smrDarkJoint)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="5" r="4" fill="url(#smrEmeraldOptic)" filter="url(#smrBloom)" />
        <circle cx="31" cy="4" r="1.3" fill="#FFFFFF" />

        {/* --- EAR SENSORS (3D CYLINDRICAL PODS) --- */}
        {/* Left Ear */}
        <rect x="7" y="23" width="6" height="16" rx="3" fill="url(#smrDarkJoint)" />
        <rect x="8" y="25" width="4" height="12" rx="2" fill="#22D3EE" opacity="0.8" filter="url(#smrBloom)" />

        {/* Right Ear */}
        <rect x="51" y="23" width="6" height="16" rx="3" fill="url(#smrDarkJoint)" />
        <rect x="52" y="25" width="4" height="12" rx="2" fill="#22D3EE" opacity="0.8" filter="url(#smrBloom)" />

        {/* --- MAIN 3D SCULPTED CERAMIC HELMET CHASSIS --- */}
        <path
          d="M14 22C14 15.3726 19.3726 10 26 10H38C44.6274 10 50 15.3726 50 22V40C50 46.6274 44.6274 52 38 52H26C19.3726 52 14 46.6274 14 40V22Z"
          fill="url(#smrDomeLight)"
          stroke="#CBD5E1"
          strokeWidth="1.2"
        />

        {/* Top Chamfer Edge Specular Arc */}
        <path d="M18 14C22 11.5 27 11 32 11C37 11 42 11.5 46 14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

        {/* --- CURVED 3D OBSIDIAN GLASS FACEPLATE VISOR --- */}
        <rect
          x="18"
          y="18"
          width="28"
          height="26"
          rx="8"
          fill="url(#smrObsidianVisor)"
          stroke="#090D16"
          strokeWidth="1"
        />
        {/* Visor Specular Reflection */}
        <path d="M20 20C24 18 40 18 44 20C40 24 24 24 20 20Z" fill="url(#smrGlassReflect)" />
        <path d="M20 19C24 17.5 40 17.5 44 19" stroke="#38BDF8" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />

        {/* --- DUAL 3D GLOWING EMERALD OPTICAL SENSORS --- */}
        {/* Left Sensor */}
        <g filter="url(#smrBloom)">
          <circle cx="26" cy="28" r="5" fill="#042F2E" stroke="#22D3EE" strokeWidth="1.2" />
          <circle cx="26" cy="28" r="3.4" fill="url(#smrEmeraldOptic)" />
          <circle cx="24.8" cy="26.8" r="1.2" fill="#FFFFFF" />
        </g>

        {/* Right Sensor */}
        <g filter="url(#smrBloom)">
          <circle cx="38" cy="28" r="5" fill="#042F2E" stroke="#22D3EE" strokeWidth="1.2" />
          <circle cx="38" cy="28" r="3.4" fill="url(#smrEmeraldOptic)" />
          <circle cx="36.8" cy="26.8" r="1.2" fill="#FFFFFF" />
        </g>

        {/* Center Neural Optical Data Bridge */}
        <line x1="31" y1="28" x2="33" y2="28" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />

        {/* Digital Mouth / Speaker Array */}
        <line x1="24" y1="38" x2="40" y2="38" stroke="#34D399" strokeWidth="2" strokeLinecap="round" filter="url(#smrBloom)" />
        <line x1="27" y1="41" x2="37" y2="41" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />

        {/* --- 3D TITANIUM NECK CONNECTOR & FLANGE --- */}
        <path
          d="M26 52L28 58H36L38 52"
          fill="url(#smrDarkJoint)"
          stroke="#475569"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="55" r="1.5" fill="#10B981" filter="url(#smrBloom)" />
      </g>
    </svg>
  );
}
