import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Trophy, Flag, ShieldCheck, CalendarRange, Download, Smartphone } from 'lucide-react';

export const Membership = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tiers = [
        {
            name: 'Full Membership',
            price: '$1,742.00',
            desc: 'The ultimate Teven experience.',
            feats: ['Unlimited standard green fees included', 'Eligible for all club competitions', 'Members Only putting facility access', 'Reciprocal rights at Monash Golf Club', 'Secondary 9-hole round: $14 additional fee'],
            featured: true
        },
        {
            name: 'General Membership',
            price: '$546.00',
            desc: '+ $28.00 green fee per round.',
            feats: ['Pro-rata pricing available', 'Eligible for all club competitions', 'Members Only putting facility access', 'Reciprocal rights at Monash Golf Club']
        },
        {
            name: 'Next Gen (18–21 yrs)',
            price: '$260.00',
            desc: '+ $15.00 green fee per round.',
            feats: ['Discounted rate for young adults', 'Full access to competitions', 'Members Only putting facility access']
        },
        {
            name: 'Junior (15–17 yrs)',
            price: '$182.00',
            desc: '+ $5.00 green fee per round.',
            feats: ['Perfect for developing players', 'Access to Junior competitions']
        },
        {
            name: 'Cadet (Under 15 yrs)',
            price: '$94.00',
            desc: '+ $5.00 green fee per round.',
            feats: ['Introduction to golf', 'Access to Junior competitions']
        }
    ];

    return (
        <main className="pt-32 pb-24 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-24">
                    <span className="text-accent tracking-widest text-xs uppercase font-medium mb-4 block">Join The Club</span>
                    <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] text-primary leading-tight mb-8">
                        2026 <span className="italic text-accent font-light">Membership</span>
                    </h1>
                    <p className="font-body text-textdark/70 text-lg max-w-2xl font-light leading-relaxed">
                        Experience Teven year-round. New members are welcome to join at any time, with pro-rata pricing available to ensure fair cost based on joining date.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-32">
                    {tiers.map((tier, i) => (
                        <div key={i} className={`p-10 flex flex-col gap-8 rounded-sm transition-transform duration-500 hover:-translate-y-1 ${tier.featured ? 'bg-[#1e402a] border border-accent/20 shadow-2xl scale-[1.02]' : 'bg-white border border-black/5 hover:shadow-xl'}`}>
                            <div>
                                <h3 className={`font-heading text-2xl mb-4 ${tier.featured ? 'text-accent' : 'text-primary'}`}>{tier.name}</h3>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className={`font-heading text-4xl tracking-tight ${tier.featured ? 'text-white' : 'text-primary'}`}>{tier.price}</span>
                                    <span className={`font-body text-xs font-light mb-1 ${tier.featured ? 'text-white/50' : 'text-textdark/50'}`}>/ yr</span>
                                </div>
                                <p className={`font-body text-sm font-medium ${tier.featured ? 'text-white/80' : 'text-textdark/70'}`}>{tier.desc}</p>
                            </div>

                            <div className={`w-full h-[1px] ${tier.featured ? 'bg-white/10' : 'bg-black/5'}`}></div>

                            <ul className="flex flex-col gap-4 font-body text-sm font-light flex-grow">
                                {tier.feats.map((f, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <Check size={16} className={`shrink-0 mt-0.5 ${tier.featured ? 'text-accent' : 'text-primary'}`} />
                                        <span className={`${tier.featured ? 'text-white/80' : 'text-textdark/80'}`}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <a href="https://forms.gle/QrRZC4Yx6et2LQer5" target="_blank" rel="noreferrer" className={`w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 text-center flex items-center justify-center ${tier.featured ? 'bg-accent text-primary hover:bg-white' : 'bg-transparent border border-primary/20 text-primary hover:border-primary hover:bg-primary/5'}`}>
                                Apply Now
                            </a>
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <span className="font-body text-accent text-xs tracking-[0.3em] uppercase font-bold mb-6 block">Club Life</span>
                        <h3 className="font-heading text-4xl md:text-5xl text-primary mb-8 leading-tight">More Than Just A Round Of Golf.</h3>
                        <p className="font-body text-textdark/70 text-lg font-light leading-relaxed mb-8">
                            Membership at Teven extends beyond the fairways. We offer exclusive access to pristine training facilities, competitive play, and partner networks.
                        </p>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white p-8 border border-black/5 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                            <Trophy className="w-8 h-8 text-accent mb-6" />
                            <h4 className="font-heading text-2xl text-primary mb-4">Competitions</h4>
                            <p className="font-body text-textdark/70 text-sm font-light leading-relaxed">
                                Join regular tournaments or casual play. See our detailed weekly schedule below to find the right event for your skill level.
                            </p>
                        </div>

                        <div className="bg-white p-8 border border-black/5 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                            <Flag className="w-8 h-8 text-accent mb-6" />
                            <h4 className="font-heading text-2xl text-primary mb-4">Putting Facility</h4>
                            <p className="font-body text-textdark/70 text-sm font-light leading-relaxed">
                                Hone your short game anytime. The Members Only putting facility is open every single day. No bookings required—just show up and practise perfectly manicured Zoysia.
                            </p>
                        </div>

                        <div className="sm:col-span-2 bg-[#0A110D] p-8 border border-white/5 rounded-sm shadow-xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                            <ShieldCheck className="w-12 h-12 text-accent shrink-0 relative z-10" />
                            <div className="relative z-10 text-center sm:text-left">
                                <h4 className="font-heading text-2xl text-white mb-2">Monash Golf Club Reciprocal</h4>
                                <p className="font-body text-white/70 text-sm font-light leading-relaxed">
                                    Members of Monash Golf Club and Teven Golf Club enjoy a formal reciprocal playing agreement, vastly expanding your premium golfing options.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule & Calendar Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Weekly Schedule */}
                    <div className="bg-white p-10 border border-black/10 rounded-sm shadow-xl relative overflow-hidden group hover:border-accent/30 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                        <CalendarRange className="w-10 h-10 text-primary mb-8" />
                        <h3 className="font-heading text-3xl md:text-4xl text-primary mb-4">Weekly Schedule</h3>
                        <p className="font-body text-textdark/70 text-sm font-light leading-relaxed mb-8 bg-gray-50 p-4 rounded border-l-4 border-primary">
                            <strong>Note:</strong> Members and visiting players with a Golf Link number are eligible for competitions. Members can make bookings directly through the <strong>Golf Australia app</strong>.
                        </p>

                        <div className="flex flex-col gap-4 font-body text-sm text-textdark">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 border-b border-black/5 pb-4">
                                <span className="font-bold text-primary min-w-[100px]">Monday</span>
                                <span className="font-light text-textdark/80">Rolling competition (non-competitive environment to encourage new golfers). Casual play available all day.</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 border-b border-black/5 pb-4">
                                <span className="font-bold text-primary min-w-[100px]">Tuesday</span>
                                <span className="font-light text-textdark/80">Afternoon Competition.</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 border-b border-black/5 pb-4">
                                <span className="font-bold text-primary min-w-[100px]">Wednesday</span>
                                <span className="font-light text-textdark/80">Rolling competition. Casual play available all day.</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 border-b border-black/5 pb-4">
                                <span className="font-bold text-primary min-w-[100px]">Thursday</span>
                                <span className="font-light text-textdark/80">Casual play all day.</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 border-b border-black/5 pb-4">
                                <span className="font-bold text-primary min-w-[100px]">Friday</span>
                                <span className="font-light text-textdark/80">Casual play all day. 3rd Friday of each month features a Fun Friday afternoon competition.</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 border-b border-black/5 pb-4">
                                <span className="font-bold text-primary min-w-[100px]">Saturday</span>
                                <span className="font-light text-textdark/80">Morning Competition.</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                                <span className="font-bold text-primary min-w-[100px]">Sunday</span>
                                <span className="font-light text-textdark/80">Casual play all day.</span>
                            </div>
                        </div>
                    </div>

                    {/* Document Viewer / Apps */}
                    <div className="flex flex-col gap-8">
                        {/* 2026 Calendar Card */}
                        <div className="bg-[#122618] p-10 rounded-sm shadow-xl flex flex-col h-full relative overflow-hidden min-h-[500px]">
                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="font-heading text-3xl md:text-4xl text-white mb-4">2026 Fixture Calendar</h3>
                                <p className="font-body text-white/70 text-sm font-light leading-relaxed mb-6">
                                    View or download the complete Teven Golf Course tournament and event schedule for the 2026 season.
                                </p>

                                <div className="bg-white/5 border border-white/10 w-full flex-grow rounded-sm mb-6 min-h-[300px] overflow-hidden">
                                    <iframe
                                        src="/TGC_2026_Calendar.pdf#toolbar=0"
                                        className="w-full h-full min-h-[300px]"
                                        title="Teven 2026 Calendar PDF"
                                    ></iframe>
                                </div>

                                <a
                                    href="/TGC_2026_Calendar.pdf"
                                    download
                                    className="mt-auto inline-flex items-center justify-center gap-3 bg-accent text-primary px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors w-full"
                                >
                                    Download Calendar <Download size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Golf App Highlight */}
                        <div className="bg-white p-8 border border-black/10 rounded-sm shadow-md flex items-center justify-between gap-6 group hover:border-primary/50 transition-colors cursor-pointer">
                            <div>
                                <h4 className="font-heading text-2xl text-primary mb-2 flex items-center gap-3">
                                    <Smartphone className="text-accent" size={24} /> Bookings via App
                                </h4>
                                <p className="font-body text-textdark/70 text-sm font-light">
                                    Members can conveniently manage all tee times and bookings through the <strong>Golf Australia app</strong>.
                                </p>
                            </div>
                            <ArrowUpRight className="w-6 h-6 text-black/20 group-hover:text-accent transition-colors" />
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
};
