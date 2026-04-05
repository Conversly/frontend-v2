"use client";

import React from "react";

const backers = [
  {
    key: "elevenlabs",
    element: (
      <div className="flex items-center opacity-80 transition-opacity hover:opacity-100">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[#344054]">
          <rect x="0"  y="0"  width="3" height="24" rx="1.5" fill="currentColor" />
          <rect x="5"  y="3"  width="3" height="18" rx="1.5" fill="currentColor" />
          <rect x="10" y="6"  width="3" height="12" rx="1.5" fill="currentColor" />
          <rect x="15" y="3"  width="3" height="18" rx="1.5" fill="currentColor" />
          <rect x="20" y="0"  width="3" height="24" rx="1.5" fill="currentColor" />
        </svg>
        <span className="ml-2.5 whitespace-nowrap text-[16px] font-bold tracking-tight text-[#101828]">
          ElevenLabs<span className="ml-1 text-[13px] font-medium text-[#667085]">Grants</span>
        </span>
      </div>
    ),
  },
  {
    key: "google",
    element: (
      <div className="flex items-center opacity-85 transition-opacity hover:opacity-100">
        <svg width="22" height="22" viewBox="0 0 533 533" fill="none" aria-hidden="true">
          <path d="M329 170H204l-75 130 75 130h125l75-130-75-130Z" fill="#EA4335" />
          <path d="M204 170l-75 130H4l75-130h125Z" fill="#FBBC05" />
          <path d="M204 430l-75-130H4l75 130h125Z" fill="#34A853" />
          <path d="M329 430H204l75-130h125l-75 130Z" fill="#4285F4" />
          <path d="M404 300l75-130h-75l-75 130 75 130h75l-75-130Z" fill="#4285F4" />
        </svg>
        <span className="ml-2.5 whitespace-nowrap text-[16px] font-bold tracking-tight text-[#101828]">
          Google Cloud<span className="ml-1 text-[13px] font-medium text-[#667085]">for Startups</span>
        </span>
      </div>
    ),
  },
  {
    key: "aws",
    element: (
      <div className="flex items-center opacity-85 transition-opacity hover:opacity-100">
        <svg width="38" height="24" viewBox="0 0 100 60" fill="none" aria-hidden="true" className="text-[#101828]">
          <path d="M28.6 25.4c0 1 .1 1.8.3 2.3.2.5.6 1.1 1 1.6.2.2.2.4.2.6 0 .3-.2.5-.5.8l-1.7 1.1c-.2.2-.5.2-.7.2-.3 0-.5-.1-.8-.4-.4-.4-.7-.8-1-1.3-.3-.5-.6-1-.8-1.5-2 2.3-4.4 3.5-7.4 3.5-2.1 0-3.8-.6-5-1.8-1.3-1.2-1.9-2.8-1.9-4.8 0-2.1.7-3.8 2.2-5.1 1.5-1.3 3.4-1.9 5.9-1.9.8 0 1.6.1 2.5.2.9.1 1.8.3 2.8.5v-1.7c0-1.8-.4-3-.1-3.8-.4-.8-1.3-1.1-2.7-1.1-1.5 0-3 .2-4.7.9-1.7.7-2.6 1.1-3.1 1.1-.5 0-.8-.4-.8-1.1v-1.7c0-.6.1-.9.4-1.2s.7-.5 1.3-.7c1.6-.8 3.5-1.5 5.7-2 2.2-.4 4.3-.7 6.3-.7 1.4 0 2.7.2 3.8.5 1.1.3 2 .8 2.7 1.5.7.7 1.2 1.5 1.5 2.5.3 1 .5 2.1.5 3.3v4.3l-.3 8.2Zm-10.2 3.8c.8 0 1.6-.1 2.4-.4.8-.3 1.5-.8 2.1-1.5.4-.4.6-.9.8-1.5.2-.6.3-1.3.3-2.1v-1c-.7-.2-1.4-.3-2.2-.4-.8-.1-1.5-.2-2.2-.2-1.6 0-2.8.3-3.6 1-.8.7-1.2 1.6-1.2 2.8 0 1.2.3 2 .9 2.6.5.5 1.4.7 2.7.7ZM44.6 32c-.7 0-1.1-.1-1.4-.4-.3-.3-.5-.8-.7-1.5L36.2 8.7c-.2-.7-.3-1.2-.3-1.5 0-.6.3-.9.9-.9h3.6c.7 0 1.2.1 1.5.4.3.3.5.8.7 1.5l4.5 17.8 4.2-17.8c.2-.7.4-1.2.7-1.5.3-.3.8-.4 1.5-.4h2.9c.7 0 1.2.1 1.5.4.3.3.5.8.7 1.5l4.2 18 4.6-18c.2-.7.4-1.2.7-1.5.3-.3.8-.4 1.5-.4h3.4c.6 0 .9.3.9.9 0 .2 0 .4-.1.6-.1.2-.1.5-.2.9l-6.5 21.4c-.2.7-.4 1.2-.7 1.5-.3.3-.8.4-1.4.4H62c-.7 0-1.2-.1-1.5-.4-.3-.3-.5-.8-.7-1.5L55.7 12l-4.1 18.1c-.2.7-.4 1.2-.7 1.5-.3.3-.8.4-1.5.4h-4.8ZM87.4 33c-2.1 0-4.2-.2-6.2-.7-2-.5-3.6-1-4.6-1.6-.6-.4-1-.8-1.1-1.2-.1-.4-.2-.8-.2-1.2v-1.8c0-.7.3-1.1.8-1.1.2 0 .4 0 .6.1.2.1.5.2.8.4 1.1.5 2.3.9 3.6 1.2 1.3.3 2.6.4 3.9.4 2.1 0 3.7-.4 4.9-1.1 1.2-.7 1.8-1.8 1.8-3.1 0-.9-.3-1.7-.9-2.3-.6-.6-1.7-1.1-3.3-1.6l-4.7-1.5c-2.4-.7-4.1-1.8-5.2-3.2-1.1-1.4-1.7-2.9-1.7-4.6 0-1.3.3-2.5.9-3.5.6-1 1.4-1.9 2.4-2.6 1-.7 2.1-1.2 3.4-1.6 1.3-.4 2.7-.5 4.1-.5.7 0 1.5.1 2.2.2.8.1 1.5.2 2.2.4.7.2 1.4.4 2 .6.7.2 1.2.5 1.5.7.5.3.9.6 1.1.9.2.3.3.7.3 1.2v1.7c0 .7-.3 1.1-.8 1.1-.3 0-.7-.1-1.3-.4-1.8-.8-3.8-1.2-6.1-1.2-1.9 0-3.4.3-4.4.9-1 .6-1.5 1.5-1.5 2.8 0 .9.3 1.7 1 2.3.7.6 1.9 1.2 3.7 1.7l4.6 1.5c2.3.7 4 1.7 5 3 1 1.3 1.5 2.8 1.5 4.5 0 1.4-.3 2.6-.8 3.7-.6 1.1-1.4 2-2.4 2.8-1 .7-2.2 1.3-3.6 1.7-1.5.5-3 .7-4.6.7Z" fill="currentColor"/>
          <path d="M90.6 44.8c-10.9 8-26.8 12.3-40.4 12.3-19.1 0-36.3-7.1-49.3-18.8-1-.9-.1-2.2 1.1-1.5 14 8.1 31.3 13 49.2 13 12 0 25.3-2.5 37.5-7.7 1.8-.8 3.3 1.2 1.9 2.7Z" fill="#FF9900"/>
          <path d="M95.1 39.7c-1.4-1.8-9.1-.8-12.6-.4-1.1.1-1.2-.8-.3-1.5 6.2-4.3 16.3-3.1 17.5-1.6 1.2 1.5-.3 11.7-6.1 16.5-.9.8-1.7.4-1.3-.6 1.3-3.3 4.2-10.6 2.8-12.4Z" fill="#FF9900"/>
        </svg>
        <span className="ml-2.5 whitespace-nowrap text-[16px] font-bold tracking-tight text-[#101828]">
          aws<span className="ml-1 text-[13px] font-medium text-[#667085]">startups</span>
        </span>
      </div>
    ),
  },
  {
    key: "microsoft",
    element: (
      <div className="flex items-center opacity-85 transition-opacity hover:opacity-100">
        <svg width="20" height="20" viewBox="0 0 23 23" fill="none" aria-hidden="true">
          <rect x="0"  y="0"  width="11" height="11" fill="#F25022" />
          <rect x="12" y="0"  width="11" height="11" fill="#7FBA00" />
          <rect x="0"  y="12" width="11" height="11" fill="#00A4EF" />
          <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
        </svg>
        <span className="ml-2.5 whitespace-nowrap text-[16px] font-bold tracking-tight text-[#101828]">
          Microsoft<span className="ml-1 text-[13px] font-medium text-[#667085]">for Startups</span>
        </span>
      </div>
    ),
  },
  {
    key: "azure",
    element: (
      <div className="flex items-center opacity-85 transition-opacity hover:opacity-100">
        <svg width="24" height="20" viewBox="0 0 96 96" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="az-1" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stopColor="#114A8B"/><stop offset="100%" stopColor="#0669BC"/></linearGradient>
            <linearGradient id="az-2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3CCBF4" stopOpacity=".8"/><stop offset="100%" stopColor="#2892DF" stopOpacity=".2"/></linearGradient>
            <linearGradient id="az-3" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stopColor="#1B9DE2"/><stop offset="100%" stopColor="#1490DF"/></linearGradient>
          </defs>
          <path fill="url(#az-1)" d="M33.338 6.544h26.038L33.013 89.455a4.15 4.15 0 0 1-3.933 2.838H8.149a4.15 4.15 0 0 1-3.937-5.463L29.404 9.382a4.15 4.15 0 0 1 3.934-2.838Z"/>
          <path fill="#0078D4" d="M71.175 60.261H37.54a1.911 1.911 0 0 0-1.305 3.308l21.763 20.322a4.17 4.17 0 0 0 2.846 1.121h19.22Z"/>
          <path fill="url(#az-2)" d="M33.338 6.544a4.12 4.12 0 0 0-3.943 2.879L4.252 86.798a4.15 4.15 0 0 0 3.927 5.495H29.81a4.44 4.44 0 0 0 3.4-2.9l5.014-14.777 17.91 16.705a4.24 4.24 0 0 0 2.666.972H79.23L71.024 60.261l-24.71.006L59.47 6.544Z"/>
          <path fill="url(#az-3)" d="M66.594 9.382a4.145 4.145 0 0 0-3.934-2.838H33.648a4.145 4.145 0 0 1 3.934 2.838l25.192 77.448a4.15 4.15 0 0 1-3.934 5.462h29.01a4.15 4.15 0 0 0 3.933-5.462Z"/>
        </svg>
        <span className="ml-2.5 whitespace-nowrap text-[16px] font-bold tracking-tight text-[#101828]">Azure</span>
      </div>
    ),
  },
];

export default function BackedBy() {
  return (

      <div className="flex w-full flex-wrap border-y border-[#eaecf0] bg-white/40 backdrop-blur-md sm:flex-nowrap">
        {backers.map((b, i) => (
          <div 
            key={b.key} 
            className={`flex flex-1 items-center justify-center p-8 transition-colors hover:bg-white/60 sm:py-10 lg:py-12 ${
              i !== backers.length - 1 ? 'border-b border-[#eaecf0] sm:border-b-0 sm:border-r' : ''
            }`}
          >
            {b.element}
          </div>
        ))}
      </div>
  );
}
