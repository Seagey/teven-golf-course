import React, { useEffect } from 'react';
import { DigitalScorecard } from '../DigitalScorecard';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Scorecard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleOpenCaddy = () => {
        // We use a custom event pattern since TevenCaddy is mounted at the App root
        window.dispatchEvent(new CustomEvent('openTevenCaddy'));
    };

    return (
        <main className="pt-32 pb-24 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <span className="text-accent tracking-widest text-xs uppercase font-medium mb-3 block">Player Resources</span>
                    <h1 className="font-heading text-5xl md:text-7xl text-primary leading-tight mb-6">Course Guide <br /><span className="italic text-accent font-light">& Settings</span></h1>
                    <p className="font-body text-textdark/70 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Navigate the beautiful Craig Parry layout with our comprehensive interactive scorecard and AI rules assistant.
                    </p>
                </div>

                {/* Main digital scorecard component extracted from the homepage */}
                <div className="mb-24">
                    <DigitalScorecard />
                </div>

                {/* Teven Caddy Callout Box */}
                <div className="max-w-4xl mx-auto bg-primary rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl">
                    <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                        <span className="font-body text-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 flex items-center gap-2">
                            <MessageCircle size={14} /> AI Assistant
                        </span>
                        <h3 className="font-heading text-4xl lg:text-5xl text-white mb-6 leading-tight">Teven Caddy</h3>
                        <p className="font-body text-white/70 font-light text-base leading-relaxed mb-10">
                            Not sure if you get a drop from the new garden bed on the 9th? Or looking for a ruling on relief from the cart paths? Instantly ask the official Teven Caddy AI for rulings based on local conditions and Golf Australia guidelines.
                        </p>
                        <button
                            onClick={handleOpenCaddy}
                            className="inline-flex items-center justify-center gap-3 bg-accent text-primary px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors w-fit shadow-lg shadow-accent/20"
                        >
                            Ask Teven Caddy <ArrowUpRight size={16} />
                        </button>
                    </div>
                    <div className="w-full md:w-1/2 relative bg-[#122618]">
                        <img
                            src="/images/teven_golf_3.jpg"
                            alt="Teven Golf Course scenery"
                            className="w-full h-full object-cover mix-blend-luminosity opacity-40 min-h-[300px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
                    </div>
                </div>

            </div>
        </main>
    );
};
