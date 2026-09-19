import React from 'react';

export type SupportedCountry = 
  | 'gb' | 'uk' | 'london' | 'united kingdom'
  | 'se' | 'stockholm' | 'sweden'
  | 'sa' | 'riyadh' | 'saudi arabia'
  | 'pk' | 'karachi' | 'pakistan'
  | 'jp' | 'tokyo' | 'japan'
  | 'au' | 'sydney' | 'australia';

interface NationalFlagProps {
  country: string;
  className?: string;
  aspectRatio?: '4:3' | '3:2' | '16:10' | '1:1';
}

// 1. United Kingdom (Union Jack) - Precise Royal Standards
export function UKFlagSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 36" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-label="Flag of the United Kingdom"
    >
      <clipPath id="uk-flag-clip">
        <rect width="60" height="36" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        {/* Navy Blue Field */}
        <rect width="60" height="36" fill="#012169" />
        
        {/* St Andrew's White Diagonals */}
        <path d="M0 0 L60 36 M60 0 L0 36" stroke="#FFFFFF" strokeWidth="7.2" />
        
        {/* St Patrick's Red Diagonals (Counterchanged pinwheel) */}
        <path d="M0 0 L25 15" stroke="#C8102E" strokeWidth="2.4" />
        <path d="M35 21 L60 36" stroke="#C8102E" strokeWidth="2.4" />
        <path d="M60 0 L35 15" stroke="#C8102E" strokeWidth="2.4" />
        <path d="M25 21 L0 36" stroke="#C8102E" strokeWidth="2.4" />
        
        {/* St George's White Cross */}
        <path d="M30 0 V36 M0 18 H60" stroke="#FFFFFF" strokeWidth="12" />
        
        {/* St George's Red Cross */}
        <path d="M30 0 V36 M0 18 H60" stroke="#C8102E" strokeWidth="7.2" />
      </g>
    </svg>
  );
}

// 2. Sweden (Nordic Cross) - Swedish National Standard (#006AA7 & #FECC00)
export function SwedenFlagSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 38" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-label="Flag of Sweden"
    >
      {/* Swedish Blue Field */}
      <rect width="60" height="38" fill="#006AA7" />
      
      {/* Swedish Gold Nordic Cross */}
      <rect x="19" width="9.5" height="38" fill="#FECC00" />
      <rect y="14.25" width="60" height="9.5" fill="#FECC00" />
    </svg>
  );
}

// 3. Saudi Arabia - Authentic Royal Green, Shahada Calligraphy & Broadsword
export function SaudiFlagSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 40" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-label="Flag of Saudi Arabia"
    >
      {/* Official Saudi Green */}
      <rect width="60" height="40" fill="#006C35" />
      
      {/* White Shahada Calligraphic Inscription (Precision stylized thuluth strokes) */}
      <g fill="#FFFFFF" transform="translate(10, 7) scale(0.68)">
        <path d="M2 13h4v2H2zm6-4h3v6H8zm5 2h3.5v4H13zm5.5-3h3v7h-3zm5 1h3.5v6H23.5zm5-2h3v8h-3zm5 3h3.5v5H33.5zm5-4h3v9h-3zm5 2h4.5v7H43.5zm6.5-1h3v8h-3z" opacity="0.96" />
        <path d="M1 8c3-1.2 6-1.2 9 0v2.2c-3-1.2-6-1.2-9 0zm14 0c3-1.2 6-1.2 9 0v2.2c-3-1.2-6-1.2-9 0zm14 0c3-1.2 6-1.2 9 0v2.2c-3-1.2-6-1.2-9 0zm14 0c3-1.2 6-1.2 9 0v2.2c-3-1.2-6-1.2-9 0z" />
        <circle cx="8" cy="5.5" r="1.3" />
        <circle cx="21" cy="5.5" r="1.3" />
        <circle cx="34" cy="5.5" r="1.3" />
        <circle cx="47" cy="5.5" r="1.3" />
        <circle cx="55" cy="6" r="1.1" />
      </g>
      
      {/* Traditional White Arab Curved Broadsword */}
      <g fill="#FFFFFF" transform="translate(11, 26) scale(0.72)">
        {/* Pointing to hoist (left) as per official Saudi flag specification */}
        <path d="M50 4.2L6 4.2C3 4.2 1.5 5 1 6c0.5 1 2 1.8 5 1.8l44 0c1.5 0 2.5-0.8 2.5-1.8S51.5 4.2 50 4.2z" />
        {/* Guard */}
        <path d="M46 1.5c-0.8-1-1.8-1.5-2.8-1.5s-2 0.5-2.8 1.5v9c0.8 1 1.8 1.5 2.8 1.5s2-0.5 2.8-1.5v-9z" />
        {/* Curved Hilt & Pommel */}
        <path d="M48 6l5.5-0.5c1.8 0 3 1.2 3 2.8s-1.2 2.8-3 2.8l-2.5-0.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// 4. Pakistan - Official Star & Crescent (#01411C with 1/4 White Hoist)
export function PakistanFlagSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 40" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-label="Flag of Pakistan"
    >
      {/* Dark Green Field */}
      <rect width="60" height="40" fill="#01411C" />
      
      {/* White Vertical Stripe on Hoist (Representing religious minorities & peace) */}
      <rect width="15" height="40" fill="#FFFFFF" />
      
      {/* Star & Crescent tilted towards upper fly */}
      <g transform="translate(37.5, 20) rotate(-40)">
        {/* Crescent Moon */}
        <path 
          d="M 0 -11 A 11 11 0 1 0 0 11 A 8.8 8.8 0 1 1 0 -11 Z" 
          fill="#FFFFFF" 
        />
        {/* Five-pointed star */}
        <polygon 
          points="0,-5 1.4,-1.5 5,-1.5 2,0.8 3.2,4.2 0,2 -3.2,4.2 -2,0.8 -5,-1.5 -1.4,-1.5" 
          fill="#FFFFFF" 
          transform="translate(4.5, -4.5) rotate(15) scale(1.05)"
        />
      </g>
    </svg>
  );
}

// 5. Japan (Hinomaru) - Crimson Sun Disc on Crisp White Field
export function JapanFlagSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 40" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-label="Flag of Japan"
    >
      {/* Pure White Field */}
      <rect width="60" height="40" fill="#FFFFFF" />
      
      {/* Crimson Sun Disc (3/5 of height = 24 diameter, radius 12) */}
      <circle cx="30" cy="20" r="12" fill="#BC002D" />
    </svg>
  );
}

// 6. Australia - Commonwealth Blue Ensign with Union Jack, 7-Point Star & Southern Cross
export function AustraliaFlagSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 40" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-label="Flag of Australia"
    >
      {/* Navy Blue Ensign */}
      <rect width="60" height="40" fill="#00008B" />
      
      {/* Canton: Union Flag (Upper hoist quadrant) */}
      <g>
        <clipPath id="au-flag-canton">
          <rect width="30" height="20" />
        </clipPath>
        <g clipPath="url(#au-flag-canton)">
          <rect width="30" height="20" fill="#012169" />
          {/* White diagonals */}
          <path d="M0 0 L30 20 M30 0 L0 20" stroke="#FFFFFF" strokeWidth="4.2" />
          {/* Red diagonals */}
          <path d="M0 0 L12 8 M18 12 L30 20" stroke="#C8102E" strokeWidth="1.4" />
          <path d="M30 0 L18 8 M12 12 L0 20" stroke="#C8102E" strokeWidth="1.4" />
          {/* White cross */}
          <path d="M15 0 V20 M0 10 H30" stroke="#FFFFFF" strokeWidth="7" />
          {/* Red cross */}
          <path d="M15 0 V20 M0 10 H30" stroke="#C8102E" strokeWidth="4.2" />
        </g>
      </g>
      
      {/* Large 7-pointed Commonwealth Star (Lower hoist quadrant) */}
      <polygon 
        points="15,25.5 16.2,28.2 19,28 17.2,30.3 18.5,33 15.8,32 15,34.5 14.2,32 11.5,33 12.8,30.3 11,28 13.8,28.2"
        fill="#FFFFFF" 
      />
      
      {/* Southern Cross Constellation */}
      {/* Gamma Crucis (top) */}
      <polygon points="46,5 46.5,6.5 48,6.4 46.8,7.5 47.3,9 46,8.2 44.7,9 45.2,7.5 44,6.4 45.5,6.5" fill="#FFFFFF" transform="scale(0.9) translate(6, 1)" />
      {/* Beta Crucis (right) */}
      <polygon points="52,14 52.5,15.5 54,15.4 52.8,16.5 53.3,18 52,17.2 50.7,18 51.2,16.5 50,15.4 51.5,15.5" fill="#FFFFFF" transform="scale(0.9) translate(7, 2)" />
      {/* Delta Crucis (left) */}
      <polygon points="40,16 40.5,17.5 42,17.4 40.8,18.5 41.3,20 40,19.2 38.7,20 39.2,18.5 38,17.4 39.5,17.5" fill="#FFFFFF" transform="scale(0.9) translate(5, 2)" />
      {/* Alpha Crucis (bottom) */}
      <polygon points="46,29 46.5,30.5 48,30.4 46.8,31.5 47.3,33 46,32.2 44.7,33 45.2,31.5 44,30.4 45.5,30.5" fill="#FFFFFF" transform="scale(0.9) translate(6, 2)" />
      {/* Epsilon Crucis (small 5-pointed star) */}
      <polygon points="47,20 47.6,21.3 49,21.4 47.9,22.3 48.3,23.6 47.1,22.8 45.9,23.6 46.3,22.3 45.2,21.4 46.6,21.3" fill="#FFFFFF" transform="scale(0.75) translate(18, 5)" />
    </svg>
  );
}

// Master NationalFlag Component with automatic lookup and fallbacks
export function NationalFlag({ country, className = "w-full h-full" }: NationalFlagProps) {
  const norm = (country || '').trim().toLowerCase();

  if (norm.includes('gb') || norm.includes('uk') || norm.includes('london') || norm.includes('kingdom')) {
    return <UKFlagSVG className={className} />;
  }
  if (norm.includes('se') || norm.includes('stockholm') || norm.includes('sweden')) {
    return <SwedenFlagSVG className={className} />;
  }
  if (norm.includes('sa') || norm.includes('riyadh') || norm.includes('saudi')) {
    return <SaudiFlagSVG className={className} />;
  }
  if (norm.includes('pk') || norm.includes('karachi') || norm.includes('pakistan')) {
    return <PakistanFlagSVG className={className} />;
  }
  if (norm.includes('jp') || norm.includes('tokyo') || norm.includes('japan')) {
    return <JapanFlagSVG className={className} />;
  }
  if (norm.includes('au') || norm.includes('sydney') || norm.includes('australia')) {
    return <AustraliaFlagSVG className={className} />;
  }

  // Generic fallback if unknown
  return (
    <div className={`flex items-center justify-center bg-slate-200 text-slate-700 font-bold text-xs ${className}`}>
      {country.slice(0, 2).toUpperCase()}
    </div>
  );
}

// Creative Designer Flag Emblem Badge for Card Header (the primary "flagposition")
export function NationalFlagBadge({ 
  country, 
  countryName,
  size = 'md',
  className = ''
}: { 
  country: string; 
  countryName?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-8 h-6 rounded-md',
    md: 'w-11 h-8 rounded-xl',
    lg: 'w-14 h-10 rounded-2xl'
  }[size];

  return (
    <div 
      className={`
        relative overflow-hidden shrink-0 group/flag select-none
        border border-white/40 shadow-sm
        bg-white/20 backdrop-blur-md ring-2 ring-white/20
        transition-all duration-300 hover:scale-105 hover:shadow-md
        ${sizeClasses} ${className}
      `}
      title={countryName || country}
    >
      {/* Crisp Vector National Flag */}
      <NationalFlag country={country} className="w-full h-full object-cover" />
      
      {/* Creative Specular Glass Sheen Overlay for tactile enamel/minted finish */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/40 pointer-events-none" 
        aria-hidden="true"
      />
      {/* Subtle Micro Inner Border */}
      <div 
        className="absolute inset-0 rounded-[inherit] border border-black/10 dark:border-white/10 pointer-events-none" 
        aria-hidden="true"
      />
    </div>
  );
}

// Micro Avatar Flag Stamp for Leader Profiles
export function ProfileFlagStamp({
  country,
  title
}: {
  country: string;
  title?: string;
}) {
  return (
    <span 
      className="absolute -bottom-1 -right-1 w-4 h-3 rounded-[3px] overflow-hidden border-1.5 border-white shadow-xs z-10 bg-slate-100 flex items-center justify-center"
      title={title || country}
    >
      <NationalFlag country={country} className="w-full h-full object-cover" />
    </span>
  );
}
