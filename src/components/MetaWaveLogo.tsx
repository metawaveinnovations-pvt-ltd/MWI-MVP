import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  alt?: string;
}

export default function MetaWaveLogo({ className = '', size = 32, showText = false, alt = "MetaWave Logo" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} id="metawave-logo">
      <img
        src="/Meta_Logo.webp"
        alt={alt}
        width={size}
        height={size}
        loading="eager"
        // @ts-ignore
        fetchPriority="high"
        decoding="async"
        referrerPolicy="no-referrer"
        className="transition-all duration-300 transform hover:scale-105 object-contain"
        style={{ width: `${size}px`, height: `${size}px` }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/assets/images/logo.png';
        }}
      />

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-sans font-extrabold text-[#1E293B] text-xs tracking-wider leading-none uppercase">
            MetaWave
          </span>
          <span className="font-mono text-[8px] font-black tracking-widest text-[#326E45] mt-0.5 uppercase leading-none">
            Innovations
          </span>
        </div>
      )}
    </div>
  );
}

