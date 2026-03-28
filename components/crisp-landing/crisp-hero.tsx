import React from 'react';

export default function CrispHero() {
  return (
    <div className="home-hero">
      <div className="common-hero home-hero__inner">
        <div className="common-hero__wrapper">
          {/* <a href="https://verlyai.xyz/login" target="_blank" rel="noopener noreferrer" className="common-pill-link common-hero__pill-link">
            <span className="common-pill-link__label">
              <span className="common-pill-link__badge font-sans-bold border-blue-200"></span>
              Build <span className="font-sans-bold px-1 text-blue-600">AI Agents</span> with Verly
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="nuxt-icon common-icon common-icon--icon-chevron-right common-pill-link__chevron text-blue-600" height="15" width="15">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m6 12 4-4-4-4"></path>
            </svg>
          </a> */}
          
          <div className="page-main-title page-main-title--large page-main-title--black page-main-title--title common-hero__title">
            <div className="page-wrapper page-wrapper--generic page-wrapper--regular page-main-title__wrapper">
              <div className="page-main-title__title-wrapper">
                <h1 className="page-main-title__title font-title-bold">
                  <span>
                    Handle <span className="emphasis"><span className="emphasis-text">10X More</span></span> Customers.<br />
                    Without hiring anyone.
                  </span>
                </h1>
              </div>
              
              {/* Removed original three feature pills */}
              <div className="page-main-title__buttons mt-6">
                <div className="common-signup-cta common-signup-cta--medium home-hero__signup-cta">
                  <div className="common-signup-cta__field">
                    <a href="https://calendly.com/rdhakad2002/30min" target="_blank" rel="noopener noreferrer" className="common-button common-button--medium font-sans-bold common-button--roundish" style={{ background: '#fff', color: '#111827' }}>
                      <span className="common-button__label ellipsis">Schedule a Demo</span>
                    </a>
                    <a href="https://app.verly.ai/signup" rel="noopener noreferrer" className="common-button common-button--blue common-button--medium font-sans-bold common-button--roundish">
                      <span className="common-button__label ellipsis">Try it Now</span>
                      <img width="20" height="20" alt="" src="https://crisp.chat/_ipx/s_40x40/components/home/HomeHero/signup_arrow.svg" className="common-icon common-button__icon common-button__icon--right" />
                    </a>
                  </div>
                  
                  <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1.5 text-[13px] font-semibold text-gray-600 bg-gray-50/80 border border-gray-200/60 rounded-lg shadow-sm">No setup fee</span>
                    <span className="px-3 py-1.5 text-[13px] font-semibold text-gray-600 bg-gray-50/80 border border-gray-200/60 rounded-lg shadow-sm">24/7 Customer service</span>
                    <span className="px-3 py-1.5 text-[13px] font-semibold text-gray-600 bg-gray-50/80 border border-gray-200/60 rounded-lg shadow-sm">No credit card required</span>
                    <span className="px-3 py-1.5 text-[13px] font-semibold text-gray-600 bg-gray-50/80 border border-gray-200/60 rounded-lg shadow-sm">Cancel any time</span>
                    <span className="px-3 py-1.5 text-[13px] font-semibold text-gray-600 bg-gray-50/80 border border-gray-200/60 rounded-lg shadow-sm">30-day free trial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="home-hero-app home-hero__app" style={{ "--73f2e486": "40%" } as React.CSSProperties}>
          <div className="home-hero-app__container">
            <div className="common-ghost-container common-ghost-container--white home-hero-app__screenshot-container">
              <div className="common-ghost-container__content home-hero-app__content">
                <button className="home-hero-app__play" aria-label="Play video">
                  <div className="home-hero-app__play-inner">
                    <img width="36" height="36" alt="Play" loading="lazy" src="https://crisp.chat/_ipx/s_72x72/components/home/HomeHeroApp/play_icon.svg" className="common-icon home-hero-app__play-icon" />
                    <div className="home-hero-app__play-text">
                      <span className="home-hero-app__play-title font-sans-bold">Discover Verly</span>
                      <span className="home-hero-app__play-description">Video, 2 mins</span>
                    </div>
                  </div>
                </button>
                <picture className="home-hero-app__screenshot">
                  <source type="image/webp" srcSet="https://crisp.chat/_ipx/w_2800&f_webp&q_90/components/home/HomeHeroApp/screenshot.png" />
                  <img width="980" alt="home-hero-screenshot" src="https://crisp.chat/_ipx/w_2800&f_png&q_90/components/home/HomeHeroApp/screenshot.png" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="common-hero__background">
        <div className="common-decor common-decor--hide-on-mobile home-hero-background" style={{ backgroundColor: "transparent" } as React.CSSProperties}>
          <div className="common-decor__grid" style={{ opacity: 0.2 }}></div>
          <picture className="common-decor__texture common-decor__texture--full">
            <img alt="home-hero-background" loading="eager" style={{ objectPosition: "center", opacity: 0.9 }} src="/wallpaper.jpg" className="w-full h-full object-cover" />
          </picture>
        </div>
      </div>
    </div>
  );
}
