import React from 'react';

interface TechLogoProps {
  id: string;
  className?: string;
  fallbackIcon?: React.ComponentType<{ size?: number | string; className?: string }>;
}

export function TechLogo({ id, className = "w-6 h-6", fallbackIcon: FallbackIcon }: TechLogoProps) {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="React JS Logo">
          <circle cx="50" cy="50" r="8" fill="#61DAFB" />
          <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(120 50 50)" />
        </svg>
      );

    case 'nextjs':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Next.js Logo">
          <circle cx="64" cy="64" r="60" fill="#000000" />
          <path d="M42 40v48h10V56.5l28.8 31.5H90V40h-9.5v31.5L51.5 40H42z" fill="#FFFFFF" />
          <path d="M80.5 40h9.5v28.8l-9.5-10.4V40z" fill="url(#next-grad)" />
          <defs>
            <linearGradient id="next-grad" x1="85" y1="40" x2="85" y2="68.8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'typescript':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TypeScript Logo">
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path d="M70.3 64.7h13.8v7.8c-2.4-1.2-5.1-2-8.1-2.4-3-.4-5.7.1-8.1 1.5-2.4 1.4-3.6 3.6-3.6 6.6 0 2.2.7 4 2.1 5.4 1.4 1.4 3.7 2.6 6.9 3.6 4.3 1.3 7.5 2.7 9.6 4.2 2.1 1.5 3.6 3.3 4.5 5.4.9 2.1 1.4 4.6 1.4 7.5 0 4.5-1.5 8.2-4.5 11.1-3 2.9-7.2 4.3-12.6 4.3-3.6 0-7.2-.6-10.8-1.8-3.6-1.2-6.8-2.9-9.6-5.1l4.8-10.5c2.7 2.1 5.6 3.8 8.7 5 3.1 1.2 6.1 1.8 9 1.8 2.8 0 4.9-.6 6.3-1.8 1.4-1.2 2.1-2.8 2.1-4.8 0-1.8-.6-3.3-1.8-4.5-1.2-1.2-3.3-2.3-6.3-3.3-4.5-1.5-7.8-3-9.9-4.5-2.1-1.5-3.6-3.2-4.5-5.1-.9-1.9-1.4-4.2-1.4-6.9 0-4.2 1.4-7.6 4.2-10.2 2.8-2.6 6.8-3.9 12-3.9 3.2 0 6.3.5 9.3 1.5 3 1 5.7 2.3 8.1 3.9l-4.5 10.2zM21 44.7h45.3v11.7H49.2v62.4H35.1V56.4H21V44.7z" fill="#FFFFFF" />
        </svg>
      );

    case 'tailwind':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tailwind CSS Logo">
          <path d="M32 40c6.4-12.8 16-19.2 28.8-19.2 19.2 0 22.4 14.4 32 17.6 6.4 2.1 12.8 0 19.2-6.4-6.4 12.8-16 19.2-28.8 19.2-19.2 0-22.4-14.4-32-17.6-6.4-2.1-12.8 0-19.2 6.4zm-16 32c6.4-12.8 16-19.2 28.8-19.2 19.2 0 22.4 14.4 32 17.6 6.4 2.1 12.8 0 19.2-6.4-6.4 12.8-16 19.2-28.8 19.2-19.2 0-22.4-14.4-32-17.6-6.4-2.1-12.8 0-19.2 6.4z" fill="#38BDF8" />
        </svg>
      );

    case 'vite':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vite Logo">
          <path d="M123.5 18.5L67 119.5c-1.5 2.6-5.3 2.6-6.8 0L3.5 18.5c-1.6-2.9.8-6.5 4.1-6L61 21.5c1.8.3 3.6-.5 4.6-2L119.4 12.5c3.3-.5 5.7 3.1 4.1 6z" fill="url(#vite-grad1)" />
          <path d="M85.4 13.5L62.2 55.8c-.8 1.4-2.8 1.5-3.7.1L42.5 28.4c-1-1.6.4-3.7 2.3-3.4l37.8 6.3c1.3.2 2.4-.8 2.8-2.1l.8-2.6c.4-1.5-.7-3.1-2.3-3.1h-1.5z" fill="url(#vite-grad2)" />
          <path d="M68.5 20.5l-24 43.8c-.8 1.5-3 .1-2.8-1.6l2.9-20.5c.3-2-1.6-3.6-3.5-3.1L24 23.5c-1.8.5-2.7 2.6-1.8 4.2l28 51.5c1.2 2.2 4.4 2 5.3-.3l10.8-27.2c.6-1.5 2.6-1.8 3.6-.6l12.8 15.2c1.2 1.4 3.4 1 4-0.8l7.5-23.5c.6-1.9-1.2-3.7-3.1-3.2L68.5 20.5z" fill="#FFD029" />
          <defs>
            <linearGradient id="vite-grad1" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id="vite-grad2" x1="30" y1="10" x2="90" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFEA83" />
              <stop offset="1" stopColor="#FFDD35" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'nodejs':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Node.js Logo">
          <path d="M64 8l52 30v60l-52 30L12 98V38l52-30z" fill="#339933" />
          <path d="M64 22l39 22.5v45L64 112 25 89.5v-45L64 22z" fill="#539E43" />
          <path d="M64 50c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm0 22c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="#FFFFFF" />
        </svg>
      );

    case 'python':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Python Logo">
          <path d="M62.6 8c-28.7 0-26.9 12.5-26.9 12.5v13h27.4v3.9H24.8S8 35.5 8 64.2c0 28.7 14.8 27.7 14.8 27.7h8.8V79.2c0-15.5 13.3-15 13.3-15h26.7s12.8.2 12.8-12.3V20.5S100.2 8 62.6 8zm-14.7 8.3c2.7 0 4.8 2.2 4.8 4.8s-2.2 4.8-4.8 4.8-4.8-2.2-4.8-4.8 2.1-4.8 4.8-4.8z" fill="#3776AB" />
          <path d="M65.4 120c28.7 0 26.9-12.5 26.9-12.5V94.5H64.9v-3.9h38.3s16.8 1.9 16.8-26.8c0-28.7-14.8-27.7-14.8-27.7h-8.8v12.7c0 15.5-13.3 15-13.3 15H56.4s-12.8-.2-12.8 12.3v31.3S43.8 120 65.4 120zm14.7-8.3c-2.7 0-4.8-2.2-4.8-4.8s2.2-4.8 4.8-4.8 4.8 2.2 4.8 4.8-2.2 4.8-4.8 4.8z" fill="#FFD43B" />
        </svg>
      );

    case 'nestjs':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NestJS Logo">
          <path d="M112.5 48.5c-2.8-14.2-13.5-25.5-27.5-28.8L64 15 43 19.7C29 23 18.3 34.3 15.5 48.5 12 66.2 21 83.5 37 91.2L64 104l27-12.8c16-7.7 25-25 21.5-42.7z" fill="#E0234E" />
          <path d="M64 25L47 62h15v28l20-38H67V25z" fill="#FFFFFF" />
        </svg>
      );

    case 'golang':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Go Golang Logo">
          <path d="M14 44h40c2.2 0 4 1.8 4 4v8c0 2.2-1.8 4-4 4H14c-2.2 0-4-1.8-4-4v-8c0-2.2 1.8-4 4-4zm0 24h30c2.2 0 4 1.8 4 4v8c0 2.2-1.8 4-4 4H14c-2.2 0-4-1.8-4-4v-8c0-2.2 1.8-4 4-4zm70-24c-19.9 0-36 16.1-36 36s16.1 36 36 36 36-16.1 36-36h-36v12h22.6c-2.8 7.1-9.7 12-17.6 12-10.5 0-19-8.5-19-19s8.5-19 19-19c5.2 0 9.8 2.1 13.2 5.5l8.5-8.5C92.2 47.1 83.7 44 84 44z" fill="#00ADD8" />
        </svg>
      );

    case 'postgres':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PostgreSQL Logo">
          <path d="M63.8 10c-28.7 0-52 23.3-52 52 0 21.5 13 39.9 31.6 47.8 2.6.5 3.5-1.1 3.5-2.5 0-1.2 0-4.5-.1-8.8-12.7 2.8-15.4-6.1-15.4-6.1-2.1-5.3-5.1-6.7-5.1-6.7-4.1-2.8.3-2.8.3-2.8 4.6.3 7 4.7 7 4.7 4.1 7 10.7 5 13.3 3.8.4-3 1.6-5 2.9-6.2-10.1-1.1-20.8-5.1-20.8-22.6 0-5 1.8-9.1 4.7-12.3-.5-1.2-2-5.8.4-12.1 0 0 3.8-1.2 12.6 4.7 3.6-1 7.5-1.5 11.4-1.5s7.8.5 11.4 1.5c8.8-5.9 12.6-4.7 12.6-4.7 2.5 6.3 1 10.9.5 12.1 3 3.2 4.7 7.3 4.7 12.3 0 17.5-10.7 21.5-20.9 22.6 1.6 1.4 3.1 4.2 3.1 8.5 0 6.1-.1 11-.1 12.5 0 1.4 1 3.1 3.5 2.5C98.8 101.9 111.8 83.5 111.8 62c0-28.7-23.3-52-48-52z" fill="#336791" />
        </svg>
      );

    case 'redis':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Redis Logo">
          <path d="M22 36l42-18 42 18-42 18-42-18z" fill="#D82C23" />
          <path d="M22 36v24l42 18V54L22 36z" fill="#A3221B" />
          <path d="M106 36v24L64 78V54l42-18z" fill="#C02720" />
          <path d="M22 66l42-18 42 18-42 18-42-18z" fill="#D82C23" />
          <path d="M22 66v24l42 18V84L22 66z" fill="#A3221B" />
          <path d="M106 66v24L64 108V84l42-18z" fill="#C02720" />
        </svg>
      );

    case 'pinecone':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pinecone Logo">
          <rect width="128" height="128" rx="28" fill="#101828" />
          <path d="M64 24L36 52h56L64 24zm-22 32L18 80h92L86 56H42zm-6 32L12 108h104L92 88H36z" fill="#326E45" />
        </svg>
      );

    case 'supabase':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Supabase Logo">
          <path d="M72.2 10.3c-2.4-3.1-7.4-1.8-8 2.1L51 86.6c-.6 3.9 3.8 6.8 7.3 4.8l47.2-27.1c3.5-2 3.2-7.2-.5-8.7L72.2 10.3z" fill="url(#supabase-g1)" />
          <path d="M55.8 117.7c2.4 3.1 7.4 1.8 8-2.1l13.2-74.2c.6-3.9-3.8-6.8-7.3-4.8L22.5 63.7c-3.5 2-3.2 7.2.5 8.7l32.8 45.3z" fill="url(#supabase-g2)" />
          <defs>
            <linearGradient id="supabase-g1" x1="50" y1="10" x2="105" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3ECF8E" />
              <stop offset="1" stopColor="#24B47E" />
            </linearGradient>
            <linearGradient id="supabase-g2" x1="20" y1="40" x2="75" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3ECF8E" />
              <stop offset="1" stopColor="#00C2B2" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'gemini':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google Gemini Logo">
          <path d="M64 8C64 38.9 38.9 64 8 64c30.9 0 56 25.1 56 56 0-30.9 25.1-56 56-56-30.9 0-56-25.1-56-56z" fill="url(#gemini-star)" />
          <defs>
            <linearGradient id="gemini-star" x1="8" y1="8" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A73E8" />
              <stop offset="0.33" stopColor="#8AB4F8" />
              <stop offset="0.66" stopColor="#C58AF9" />
              <stop offset="1" stopColor="#E255A1" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'openai':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OpenAI Logo">
          <rect width="128" height="128" rx="28" fill="#10A37F" />
          <path d="M98.5 56.7c-1.3-4.1-3.8-7.7-7.2-10.2l-1.3-.9c.4-2.5.2-5.1-.5-7.5-1.3-4.5-4.1-8.3-8-10.7-3.9-2.4-8.5-3.3-13-2.5-1.9.3-3.7 1-5.4 2-2.1-3.2-5.1-5.7-8.7-7.2s-7.6-1.8-11.4-1c-4.5 1-8.5 3.5-11.3 7.2-2.8 3.7-4.1 8.3-3.7 12.9 0 .6.1 1.2.2 1.8-3.3.9-6.3 2.7-8.6 5.3-3.3 3.7-5 8.5-4.8 13.4.2 4.9 2.3 9.5 5.9 12.9.8.8 1.8 1.5 2.8 2.1-.4 2.5-.2 5.1.5 7.5 1.3 4.5 4.1 8.3 8 10.7 3.9 2.4 8.5 3.3 13 2.5 1.9-.3 3.7-1 5.4-2 2.1 3.2 5.1 5.7 8.7 7.2s7.6 1.8 11.4 1c4.5-1 8.5-3.5 11.3-7.2 2.8-3.7 4.1-8.3 3.7-12.9 0-.6-.1-1.2-.2-1.8 3.3-.9 6.3-2.7 8.6-5.3 3.3-3.7 5-8.5 4.8-13.4-.2-4.9-2.3-9.5-5.9-12.9z" fill="#FFFFFF" opacity="0.95" />
        </svg>
      );

    case 'langchain':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="LangChain Logo">
          <rect width="128" height="128" rx="28" fill="#1C3C3C" />
          <path d="M38 42h52c3.3 0 6 2.7 6 6v4c0 3.3-2.7 6-6 6H38c-3.3 0-6-2.7-6-6v-4c0-3.3 2.7-6 6-6zm0 28h52c3.3 0 6 2.7 6 6v4c0 3.3-2.7 6-6 6H38c-3.3 0-6-2.7-6-6v-4c0-3.3 2.7-6 6-6z" fill="#326E45" />
          <circle cx="48" cy="51" r="5" fill="#38BDF8" />
          <circle cx="80" cy="79" r="5" fill="#38BDF8" />
          <path d="M48 51l32 28" stroke="#38BDF8" strokeWidth="4" />
        </svg>
      );

    case 'aws':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AWS Logo">
          <rect width="128" height="128" rx="28" fill="#232F3E" />
          <path d="M42 62c-6.8 0-12-3.2-12-8.5 0-5.8 5.6-8.8 14-8.8 2.8 0 5.4.3 7.8.8v2.7c-2.4-.6-5.1-.9-7.8-.9-6 0-9.8 1.8-9.8 4.6 0 2.5 3 4.2 8.4 4.2 3.6 0 7.2-.8 9.6-2.2v4.8c-2.8 1.9-6.6 3.3-10.2 3.3zm24-17h4.8v16.5H66V45zm22.4 12.2l6-12.2h5.4l-8.6 16.5h-5.2l-5.6-11.2-5.6 11.2h-5.2L49.6 45h5.4l6 12.2 4.2-8.6 3.2-3.6z" fill="#FFFFFF" />
          <path d="M30 84c22.5 13.5 48.5 13.5 68 0" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M96 79l4 7-8 1" fill="#FF9900" />
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Docker Logo">
          <rect width="128" height="128" rx="28" fill="#2496ED" />
          <path d="M106 62c-2.8-2.1-9.1-2.8-14-1.4-1.4-6.3-7-11.2-14-11.2H70V36H56v14H42V36H28v14H14v14h70c4.9 0 9.1 4.2 9.1 9.1 0 14.7-11.9 26.6-26.6 26.6H14c-2.8 0-5.6 2.4-5.6 5.2 0 2.8 2.4 5.2 5.6 5.2h52.5c20.3 0 36.8-16.4 36.8-36.8 0-3.1-.7-6.3-1.8-9.1z" fill="#FFFFFF" />
        </svg>
      );

    case 'kubernetes':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kubernetes Logo">
          <rect width="128" height="128" rx="28" fill="#326CE5" />
          <path d="M64 24L32 42.5v37L64 98l32-18.5v-37L64 24zm0 10.5l23 13.3v26.4L64 87.5 41 74.2V47.8L64 34.5z" fill="#FFFFFF" />
          <circle cx="64" cy="61" r="9" fill="#FFFFFF" />
        </svg>
      );

    case 'rag':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RAG Architecture Logo">
          <rect width="128" height="128" rx="28" fill="#1E293B" />
          <path d="M36 44h56M36 64h56M36 84h36" stroke="#326E45" strokeWidth="8" strokeLinecap="round" />
          <circle cx="88" cy="84" r="8" fill="#10B981" />
        </svg>
      );

    case 'vectordb':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vector DB Logo">
          <rect width="128" height="128" rx="28" fill="#0F172A" />
          <circle cx="44" cy="44" r="10" fill="#38BDF8" />
          <circle cx="84" cy="44" r="10" fill="#818CF8" />
          <circle cx="64" cy="84" r="10" fill="#34D399" />
          <path d="M44 44l40 0M44 44l20 40M84 44l-20 40" stroke="#64748B" strokeWidth="4" strokeDasharray="4 4" />
        </svg>
      );

    case 'gcp-aws':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GCP & AWS Logo">
          <path d="M36 78c-12.2 0-22-9.8-22-22 0-10.8 7.8-19.8 18.2-21.6C34.7 21.8 46.2 14 59 14c14.6 0 27.2 9.8 30.6 23.8 8.8 1.4 15.4 9 15.4 18.2 0 10-8.2 18-18.2 18H36z" fill="#4285F4" opacity="0.15" />
          <path d="M28 80c-11 0-20-9-20-20 0-9.8 7.1-18 16.6-19.6C26.8 28.9 37.3 22 49 22c13.3 0 24.8 8.9 27.9 21.6 8 1.3 14.1 8.2 14.1 16.4 0 9.1-7.5 16.4-16.6 16.4H28z" fill="#4285F4" />
          <path d="M88 108c-10 0-18-8-18-18 0-8.8 6.3-16.2 14.9-17.7C86.9 62 96.3 56 106.8 56c12 0 22.3 8 25.1 19.4 7.2 1.2 12.7 7.4 12.7 14.8 0 8.2-6.8 14.8-15 14.8H88z" fill="#FF9900" />
        </svg>
      );

    case 'docker-k8s':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Docker & Kubernetes Logo">
          <path d="M120 62c-3.2-2.4-10.4-3.2-16-1.6-1.6-7.2-8-12.8-16-12.8H80V32H64v16H48V32H32v16H16v16h80c5.6 0 10.4 4.8 10.4 10.4 0 16.8-13.6 30.4-30.4 30.4H16c-3.2 0-6.4 2.8-6.4 6 0 3.2 2.8 6 6.4 6h60c23.2 0 42-18.8 42-42 0-3.6-.8-7.2-2-10.4z" fill="#2496ED" />
          <circle cx="64" cy="24" r="6" fill="#326CE5" />
        </svg>
      );

    case 'github-actions':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GitHub Actions Logo">
          <rect width="128" height="128" rx="28" fill="#2088FF" />
          <path d="M42 38l28 26-28 26" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M78 88h12" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'flutter':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flutter Logo">
          <path d="M72 16L24 64l16 16L88 32H72z" fill="#54C5F8" />
          <path d="M88 64L56 96l16 16 48-48H88z" fill="#02569B" />
          <path d="M56 96l16-16 16 16-16 16-16-16z" fill="#0175C2" />
        </svg>
      );

    case 'react-native':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="React Native Logo">
          <rect width="128" height="128" rx="28" fill="#09131B" />
          <circle cx="64" cy="64" r="10" fill="#61DAFB" />
          <ellipse cx="64" cy="64" rx="44" ry="16" stroke="#61DAFB" strokeWidth="5" transform="rotate(0 64 64)" fill="none" />
          <ellipse cx="64" cy="64" rx="44" ry="16" stroke="#61DAFB" strokeWidth="5" transform="rotate(60 64 64)" fill="none" />
          <ellipse cx="64" cy="64" rx="44" ry="16" stroke="#61DAFB" strokeWidth="5" transform="rotate(120 64 64)" fill="none" />
        </svg>
      );

    case 'sonarqube':
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SonarQube Logo">
          <rect width="128" height="128" rx="28" fill="#4E9BCD" />
          <path d="M34 84C42 66 58 54 80 50" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M28 62C40 44 60 32 88 28" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" fill="none" />
          <circle cx="88" cy="88" r="10" fill="#FFFFFF" />
        </svg>
      );

    default:
      if (FallbackIcon) {
        return <FallbackIcon className={className} />;
      }
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#326E45" />
        </svg>
      );
  }
}
