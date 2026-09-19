interface Robot3DIconProps {
  className?: string;
  size?: number | string;
}

export function Robot3DIcon({ className = "w-6 h-6", size }: Robot3DIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* Blue Gloss Gradient */}
        <linearGradient id="robotBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="35%" stopColor="#3B82F6" />
          <stop offset="85%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        {/* Head Gradient with Soft Bevel */}
        <linearGradient id="robotHeadGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="25%" stopColor="#3B82F6" />
          <stop offset="75%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        {/* Orange Accent Gradient */}
        <linearGradient id="robotOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Chest Plate Metallic Gradient */}
        <linearGradient id="robotChestPlate" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Eye Pupil Depth */}
        <radialGradient id="robotEyePupil" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="60%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>

        {/* Antenna Ball Glow */}
        <radialGradient id="antennaBallGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>

        {/* Soft Drop Shadow for Depth */}
        <filter id="robotShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#robotShadow)">
        {/* === ANTENNA === */}
        {/* Antenna Base Cap */}
        <ellipse cx="60" cy="20" rx="14" ry="4.5" fill="url(#robotOrangeGrad)" />
        {/* Antenna Rod */}
        <rect x="58" y="10" width="4" height="11" rx="2" fill="#2563EB" />
        {/* Antenna Sphere */}
        <circle cx="60" cy="9" r="4.5" fill="url(#antennaBallGrad)" />
        <circle cx="58.5" cy="7.5" r="1.2" fill="#FFFFFF" opacity="0.85" />

        {/* === EARS === */}
        {/* Left Ear Knob */}
        <rect x="30" y="27" width="6" height="15" rx="3" fill="url(#robotOrangeGrad)" />
        {/* Right Ear Knob */}
        <rect x="84" y="27" width="6" height="15" rx="3" fill="url(#robotOrangeGrad)" />

        {/* === FEET & LEGS === */}
        {/* Left Leg Joint (Orange) */}
        <rect x="43" y="94" width="8" height="9" rx="3" fill="url(#robotOrangeGrad)" />
        {/* Right Leg Joint (Orange) */}
        <rect x="69" y="94" width="8" height="9" rx="3" fill="url(#robotOrangeGrad)" />

        {/* Left Boot Top */}
        <rect x="40" y="99" width="14" height="11" rx="4" fill="url(#robotBlueGrad)" />
        {/* Left Sole */}
        <ellipse cx="47" cy="112" rx="11" ry="4.5" fill="url(#robotBlueGrad)" />

        {/* Right Boot Top */}
        <rect x="66" y="99" width="14" height="11" rx="4" fill="url(#robotBlueGrad)" />
        {/* Right Sole */}
        <ellipse cx="73" cy="112" rx="11" ry="4.5" fill="url(#robotBlueGrad)" />

        {/* === ARMS & HANDS === */}
        {/* Left Shoulder (Blue Sphere) */}
        <circle cx="34" cy="59" r="6.5" fill="url(#robotBlueGrad)" />
        {/* Left Arm (Orange) */}
        <rect x="29.5" y="63" width="9" height="19" rx="4.5" fill="url(#robotOrangeGrad)" />
        {/* Left Wrist Cuff (Blue Ring) */}
        <ellipse cx="34" cy="83" rx="7.5" ry="3" fill="url(#robotBlueGrad)" />
        {/* Left Claw Hand */}
        <path
          d="M32 85 C28 89 27 96 33 100 C35 101 37 99 35 97 C31 94 32 90 35 87 Z"
          fill="url(#robotBlueGrad)"
        />

        {/* Right Shoulder (Blue Sphere) */}
        <circle cx="86" cy="59" r="6.5" fill="url(#robotBlueGrad)" />
        {/* Right Arm (Orange) */}
        <rect x="81.5" y="63" width="9" height="19" rx="4.5" fill="url(#robotOrangeGrad)" />
        {/* Right Wrist Cuff (Blue Ring) */}
        <ellipse cx="86" cy="83" rx="7.5" ry="3" fill="url(#robotBlueGrad)" />
        {/* Right Claw Hand */}
        <path
          d="M88 85 C92 89 93 96 87 100 C85 101 83 99 85 97 C89 94 88 90 85 87 Z"
          fill="url(#robotBlueGrad)"
        />

        {/* === NECK === */}
        <rect x="53" y="47" width="14" height="7" rx="3.5" fill="url(#robotOrangeGrad)" />

        {/* === BODY / TORSO === */}
        <rect x="38" y="52" width="44" height="42" rx="10" fill="url(#robotBlueGrad)" />
        {/* Chest Inset Panel (Grey Plate) */}
        <rect x="42" y="56" width="36" height="26" rx="6" fill="url(#robotChestPlate)" />
        {/* Chest Panel Specular */}
        <rect x="43" y="57" width="34" height="3" rx="1.5" fill="#FFFFFF" opacity="0.2" />

        {/* Left Chest Dial / Button (Orange) */}
        <circle cx="51" cy="71" r="5" fill="url(#robotOrangeGrad)" />
        <circle cx="49.5" cy="69.5" r="1.5" fill="#FFFFFF" opacity="0.6" />

        {/* Right Chest Dial / Button (Orange) */}
        <circle cx="69" cy="71" r="5" fill="url(#robotOrangeGrad)" />
        <circle cx="67.5" cy="69.5" r="1.5" fill="#FFFFFF" opacity="0.6" />

        {/* === HEAD === */}
        <rect x="34" y="19" width="52" height="33" rx="12" fill="url(#robotHeadGrad)" />
        {/* Head Top Bevel Specular */}
        <path d="M42 22 Q60 19 78 22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* LEFT EYE */}
        {/* White Eye Ring/Base */}
        <circle cx="48" cy="34" r="7" fill="#F1F5F9" />
        <circle cx="48" cy="34" r="5.5" fill="url(#robotEyePupil)" />
        {/* Specular Highlight */}
        <circle cx="46.5" cy="32.5" r="1.8" fill="#FFFFFF" />
        <circle cx="49.5" cy="35.5" r="0.7" fill="#FFFFFF" opacity="0.8" />

        {/* RIGHT EYE */}
        {/* White Eye Ring/Base */}
        <circle cx="72" cy="34" r="7" fill="#F1F5F9" />
        <circle cx="72" cy="34" r="5.5" fill="url(#robotEyePupil)" />
        {/* Specular Highlight */}
        <circle cx="70.5" cy="32.5" r="1.8" fill="#FFFFFF" />
        <circle cx="73.5" cy="35.5" r="0.7" fill="#FFFFFF" opacity="0.8" />

        {/* MOUTH (Soft Rounded Pill Slot) */}
        <rect x="54" y="42" width="12" height="2" rx="1" fill="#1E3A8A" opacity="0.8" />
      </g>
    </svg>
  );
}
