"use client";

import Navbar from "@/components/crisp-landing/crisp-navbar";
import Footer from "@/components/crisp-landing/crisp-footer";
import { FEATURES_DATA } from "./constants";
import "../landing-page.css"; // Ensure Crisp-specific styles are applied

export default function FeaturesPage() {
    return (
        <div className="page-container relative bg-white selection:bg-blue-100 min-h-screen flex flex-col">
            <Navbar />
            
            <div className="pt-[140px] pb-32 flex-grow">
                <main className="page-wrapper page-wrapper--regular max-w-6xl mx-auto px-4 md:px-0">
                    <header className="page-main-title text-center mb-24 max-w-3xl mx-auto">
                        <div className="page-main-title__wrapper">
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#0f1e35] mb-6">
                                Features
                            </h1>
                            <p className="text-lg md:text-xl text-[#5d6b98] leading-relaxed">
                                Get to know all our features that are part of the comprehensive multi-channel help desk software, all described in one place and in depth.
                            </p>
                        </div>
                    </header>

                    <div className="flex flex-col gap-24">
                        {FEATURES_DATA.map((category, idx) => {
                            const reverse = idx % 2 !== 0;
                            // Rotate through some container colors from landing-page.css
                            const colors = ['common-colored-container--blue', 'common-colored-container--light-blue', 'common-colored-container--green', 'common-colored-container--purple', 'common-colored-container--orange'];
                            const containerColorClass = colors[idx % colors.length];

                            return (
                                <section key={idx} className="flex flex-col gap-12">
                                    {/* Category Highlight */}
                                    <div className={`common-colored-container common-colored-container--horizontal ${reverse ? 'common-colored-container--horizontal-reverse' : ''} ${containerColorClass} w-full`}>
                                        <div className="common-colored-container__content flex flex-col md:flex-row items-center justify-between gap-12 w-full">
                                            <div className="flex flex-col gap-4 flex-1 text-left">
                                                <h2 className="text-3xl md:text-4xl font-bold mb-2">{category.title}</h2>
                                                <p className="text-lg opacity-90 leading-relaxed max-w-xl">{category.description}</p>
                                                {category.link && (
                                                    <div className="mt-4">
                                                        <a href={category.link} className="common-button common-button--white common-button--medium">
                                                            <span className="common-button__label font-medium text-blue-600">Learn More</span>
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            {category.image && (
                                                <div className="flex-1 flex justify-center w-full md:w-1/2">
                                                    <img 
                                                        src={category.image} 
                                                        alt={category.title} 
                                                        className="max-h-[320px] object-contain rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Features Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {category.features.map((feature, fIndex) => (
                                            <a key={fIndex} href={feature.link || '#'} className="block h-full group no-underline">
                                                <article className="common-card common-card--feature h-full flex flex-col p-8 transition-all duration-300 bg-white border border-[#eaecf5] rounded-2xl hover:border-blue-500 hover:shadow-xl hover:-translate-y-1">
                                                    <div className="flex flex-col h-full gap-4">
                                                        {feature.icon && (
                                                            <div 
                                                            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2 ${feature.colorClass || 'text-blue-600 bg-blue-50'}`}
                                                        >
                                                                {feature.icon}
                                                            </div>
                                                        )}
                                                        <h3 className="text-xl font-bold text-[#15254c] m-0 group-hover:text-blue-600 transition-colors">
                                                            {feature.title}
                                                        </h3>
                                                        <p className="text-[#5d6b98] text-[15px] leading-relaxed m-0 flex-grow">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </article>
                                            </a>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </main>
            </div>
            
            <Footer />
        </div>
    );
}
