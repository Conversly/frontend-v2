import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Certificate = () => {
    return (
        <section className="crisp-section">
            <div className="crisp-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Copy */}
                    <div className="flex flex-col gap-8">
                        <h2 className="crisp-title">
                            The best AI support platform,{' '}
                            <span className="text-[#3E80F1]">
                                at an (almost) unbelievable value
                            </span>
                        </h2>

                        <p className="crisp-subtitle">
                            You don&apos;t need to spend a fortune to deliver stellar service.
                            Replace Zendesk, Freshdesk, Intercom, and other point solutions
                            with Verly to cut costs and get better results.
                        </p>

                        {/* G2 Badges Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://hiverhq.com/wp-content/uploads/2025/10/badges@2x.png"
                            alt="VerlyAI G2 Award Badges – Users Love Us, Best Support, Best Usability, High Performer, Leader"
                            width={812}
                            height={163}
                            loading="lazy"
                            className="max-w-full h-auto"
                        />

                        {/* CTA Buttons */}
                        <div className="flex gap-4 flex-wrap">
                            <Link
                                href="/login"
                                className="crisp-btn-primary px-8 py-4 text-[17px]"
                            >
                                Start free trial
                            </Link>
                            <Link
                                href="https://calendly.com/rdhakad2002/30min"
                                target="_blank"
                                className="crisp-btn-secondary px-8 py-4 text-[17px]"
                            >
                                Book a demo
                            </Link>
                        </div>
                    </div>

                    {/* Right: Love Wall Visual */}
                    <div className="flex items-center justify-center">
                        <Image
                            src="/love_wall.png"
                            alt="Customer love wall with reviews, ratings, and trust signals"
                            width={520}
                            height={520}
                            className="w-full max-w-[520px] h-auto rounded-3xl"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Certificate;
