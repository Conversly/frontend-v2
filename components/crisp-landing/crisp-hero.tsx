import React from 'react';
import './landing.css';

export default function CrispHero() {
  return (
    <div className="home-hero">
      <div className="common-hero home-hero__inner">
        <div className="common-hero__wrapper">
          <a href="#" className="common-pill-link common-hero__pill-link">
            <span className="common-pill-link__label">
              <span className="common-pill-link__badge font-sans-bold">NEW!</span>
              Build <span className="font-sans-bold px-1">AI Agents</span> with Verly
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="nuxt-icon common-icon common-icon--icon-chevron-right common-pill-link__chevron" height="15" width="15">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m6 12 4-4-4-4"></path>
            </svg>
          </a>
          
          <div className="page-main-title page-main-title--large page-main-title--black page-main-title--title common-hero__title">
            <div className="page-wrapper page-wrapper--generic page-wrapper--regular page-main-title__wrapper">
              <div className="page-main-title__title-wrapper">
                <h1 className="page-main-title__title font-title-bold">
                  <span>
                    Augment your <span className="emphasis"><span className="emphasis-text">customer</span></span> experience.<br />
                    AI made to support your team &amp; customers.
                  </span>
                </h1>
              </div>
              
              <div className="page-main-title__benefits">
                <div className="common-benefit-pills home-hero__benefits">
                  <div className="common-benefit-pill common-benefit-pill--green common-benefit-pill--icon-paint-stroke">
                    <span className="common-benefit-pill__icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="nuxt-icon common-icon common-icon--icon-check-circle" height="24" width="24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15.243 9.297-4.865 5.946-2.162-2.162M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path>
                      </svg>
                    </span>
                    <span className="common-benefit-pill__text">
                      <span className="common-benefit-pill__label font-sans-bold">All-in-one</span>
                      <span className="common-benefit-pill__description">Omnichannel inbox</span>
                    </span>
                  </div>
                  <div className="common-benefit-pill common-benefit-pill--purple common-benefit-pill--icon-paint-fill">
                    <span className="common-benefit-pill__icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="nuxt-icon common-icon common-icon--icon-scratch" height="24" width="24">
                        <path fill="currentColor" d="M3.418 20.181c.763.737 2.22.909 3.354-.114.422-.376 1.219-1.229 2.48-2.49 6.16-6.24 9.965-10.175 10.638-9.555.546.487-1.552 3.46-3.66 6.37-3.826 5.325-7.052 9.207-4.625 11.634 1.904 1.904 4.78.168 9.4-3.885 2.479-2.183 4.214-3.802 4.63-3.376.287.275-.373 1.347-1.207 2.793-1.191 2.045-2.77 4.355-1.228 5.894 1.084 1.072 3.124.61 5.508-1.742.49-.492.6-1.07.192-1.476-.388-.375-.934-.317-1.344.05-1.543 1.488-2.683 2.123-2.878 1.915-.231-.223.42-1.4 1.564-3.421 1.571-2.79 2.529-4.667 1.076-6.078-1.932-1.876-4.2.105-8.142 3.573-3.33 2.932-4.697 3.707-5.013 3.377-.438-.475.793-2.14 4.445-7.242 3.935-5.503 6.287-9.083 4.063-11.242-2.9-2.83-6.799-.74-16.456 8.815-1.389 1.376-2.268 2.221-2.709 2.733-1.12 1.292-.863 2.72-.088 3.467z"></path>
                      </svg>
                    </span>
                    <span className="common-benefit-pill__text">
                      <span className="common-benefit-pill__label font-sans-bold">AI Agents</span>
                      <span className="common-benefit-pill__description">Build your AI workflows</span>
                    </span>
                  </div>
                  <div className="common-benefit-pill common-benefit-pill--blue common-benefit-pill--icon-paint-fill">
                    <span className="common-benefit-pill__icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="nuxt-icon common-icon common-icon--icon-infinity" height="28" width="28">
                        <path fill="currentColor" d="M28.429 12.223a7.28 7.28 0 0 0-6.506-3.46 6.875 6.875 0 0 0-5.015 2.658c.106.174.222.34.318.522l1.318 2.486.201-.383a4.066 4.066 0 0 1 3.31-2.285 4.266 4.266 0 0 1 3.83 2.091c.798 1.348.798 3.025 0 4.373s-2.268 2.15-3.83 2.091a4.063 4.063 0 0 1-3.308-2.284L17.69 16.04l-1.79-3.4a7.064 7.064 0 0 0-5.837-3.884C7.4 8.647 4.89 10.011 3.524 12.31s-1.365 5.162 0 7.46 3.875 3.663 6.54 3.554a6.875 6.875 0 0 0 5.016-2.659c-.106-.174-.222-.34-.318-.522l-1.319-2.492-.2.383a4.066 4.066 0 0 1-3.31 2.285 4.28 4.28 0 0 1-3.84-2.06 4.261 4.261 0 0 1 0-4.432 4.291 4.291 0 0 1 3.664-2.068h.181a4.063 4.063 0 0 1 3.309 2.284l1.05 1.997 1.79 3.4a7.064 7.064 0 0 0 5.836 3.884h.314c2.63-.003 5.054-1.43 6.338-3.732s1.228-5.12-.146-7.37z"></path>
                      </svg>
                    </span>
                    <span className="common-benefit-pill__text">
                      <span className="common-benefit-pill__label font-sans-bold">Flat pricing</span>
                      <span className="common-benefit-pill__description">Lower your cost per agent</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="page-main-title__buttons">
                <div className="common-signup-cta common-signup-cta--medium home-hero__signup-cta">
                  <div className="common-signup-cta__field">
                    <a href="https://app.verly.ai/signup" rel="noopener noreferrer" className="common-button common-button--blue common-button--medium font-sans-bold common-button--roundish common-signup-cta__button common-signup-cta__button--large">
                      <span className="common-button__label ellipsis">Get your AI Agent</span>
                      <img width="20" height="20" alt="" src="https://crisp.chat/_ipx/s_40x40/components/home/HomeHero/signup_arrow.svg" className="common-icon common-button__icon common-button__icon--right" />
                    </a>
                    <a href="https://app.verly.ai/signup" rel="noopener noreferrer" className="common-button common-button--blue common-button--medium font-sans-bold common-button--roundish common-signup-cta__button common-signup-cta__button--small">
                      <span className="common-button__label ellipsis">Signup</span>
                      <img width="20" height="20" alt="" src="https://crisp.chat/_ipx/s_40x40/components/home/HomeHero/signup_arrow.svg" className="common-icon common-button__icon common-button__icon--right" />
                    </a>
                  </div>
                  <span className="common-explainer common-explainer--black common-signup-cta__explainer">
                    <span className="font-sans-bold">14 days free trial</span> — All Verly features — No card required
                  </span>
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
        <div className="common-decor common-decor--hide-on-mobile home-hero-background" style={{ backgroundColor: "#71b9ed", "--ab6c8f6e": "0.03", "--83ef45a8": "0.04" } as React.CSSProperties}>
          <div className="common-decor__grid"></div>
          <div className="common-decor__grain"></div>
          <picture className="common-decor__texture common-decor__texture--full">
            <img alt="home-hero-background" loading="eager" style={{ objectPosition: "center 75%" }} src="https://crisp.chat/_ipx/q_80/components/home/HomeHeroBackground/texture.webp" />
          </picture>
        </div>
      </div>
    </div>
  );
}
