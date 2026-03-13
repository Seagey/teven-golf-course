import React, { useEffect, useRef, useContext, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShoppingBag, CloudSun, CloudRain, Thermometer, Droplets, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalStateContext';

gsap.registerPlugin(ScrollTrigger);

const WeatherStatusWidget = () => {
    const { courseOpen, buggiesAllowed } = useContext(GlobalStateContext);
    const [weather] = useState({ temp: '24°C', condition: 'Sunny', rain: '0%' });

    return (
        <div className="hero-anim absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20 flex flex-col gap-4 bg-black/20 backdrop-blur-xl border border-white/10 p-5 rounded-sm shadow-2xl min-w-[240px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex flex-col">
                    <span className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-bold mb-1">Teven, NSW</span>
                    <div className="flex items-center gap-2">
                        <CloudSun className="w-5 h-5 text-white" />
                        <span className="text-white font-body font-light text-xl">{weather.temp}</span>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[8px] font-bold tracking-[0.2em] uppercase ${courseOpen ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                    {courseOpen ? 'Course Open' : 'Course Closed'}
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${buggiesAllowed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    <ChevronRight size={14} className={buggiesAllowed ? '' : 'rotate-180'} />
                </div>
                <div>
                    <p className="text-white/40 text-[9px] uppercase tracking-widest leading-none mb-1">Buggies & Carts</p>
                    <p className={`text-[10px] font-medium ${buggiesAllowed ? 'text-green-400' : 'text-red-400'}`}>
                        {buggiesAllowed ? 'Allowed Today' : 'Restricted'}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleRestart = () => {
            const iframe = containerRef.current?.querySelector('iframe');
            if (iframe) {
                const currentSrc = iframe.src;
                iframe.src = currentSrc;
            }
        };
        window.addEventListener('restart-hero-video', handleRestart);
        return () => window.removeEventListener('restart-hero-video', handleRestart);
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo('.hero-anim',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
            ).to('.hero-anim', {
                opacity: 0,
                duration: 1.5,
                delay: 5
            });

            const onScroll = () => {
                if (window.scrollY > 0) {
                    gsap.to('.hero-anim', { opacity: 1, duration: 0.5, overwrite: "auto" });
                }
            };
            window.addEventListener('scroll', onScroll);
            return () => window.removeEventListener('scroll', onScroll);
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-primary flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80 overflow-hidden">
                    <div className="hero-image w-full h-full">
                        <iframe
                            src="https://player.vimeo.com/video/658807673?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            className="absolute top-0 left-0 w-full h-full"
                            title="Teven Valley Compilation"
                        ></iframe>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-black/50"></div>
            </div>

            <div className="relative z-10 w-full px-6 flex flex-col items-center text-center mt-20 drop-shadow-2xl">
                <span className="hero-anim text-accent tracking-[0.25em] text-sm md:text-base uppercase font-semibold mb-6">
                    Boutique 9 Hole Golf Course
                </span>
                <h1 className="hero-anim text-white flex flex-col items-center drop-shadow-2xl">
                    <span className="font-cursive text-5xl md:text-6xl text-accent mb-[-1rem] md:mb-[-1.5rem] z-10 font-normal capitalize">Welcome to</span>
                    <span className="font-body text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-[0.1em] uppercase text-white leading-none">Teven</span>
                </h1>

                <div className="hero-anim mt-12 flex flex-col sm:flex-row gap-4">
                    <Link to="/book" className="group relative overflow-hidden bg-accent px-10 py-4 text-xs tracking-widest uppercase font-bold text-primary transition-all duration-500 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-accent/20">
                        <span className="relative z-10 flex items-center gap-2">
                            Book a Tee Time <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                        <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0"></div>
                    </Link>

                    <Link to="/course" className="group px-10 py-4 text-xs tracking-widest uppercase font-bold text-white border border-white/30 backdrop-blur-sm transition-all duration-500 hover:bg-white hover:text-primary hover:-translate-y-1">
                        Explore Course
                    </Link>
                </div>
            </div>

            <div className="hero-anim absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                <span className="text-white/50 text-[10px] uppercase tracking-widest">Discover</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"></div>
            </div>

            <WeatherStatusWidget />
        </section>
    );
};
const Philosophy = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.phi-line', {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-48 bg-primary relative overflow-hidden px-6 md:px-12">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src="/images/course3.jpg" alt="" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="max-w-3xl">
                    <p className="phi-line font-body text-white/50 text-sm md:text-lg mb-8 leading-relaxed">
                        Most boutique courses focus on: <span className="text-white/80">standard layouts and convenience.</span>
                    </p>
                    <h2 className="phi-line font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-12">
                        We focus on: <br />
                        <span className="italic text-accent">Crafting a masterpiece</span> in every hectare.
                    </h2>
                </div>
            </div>
        </section>
    );
};

const Protocol = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');
            cards.forEach((card, i) => {
                if (i === cards.length - 1) return;
                
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    pin: true,
                    pinSpacing: false,
                    scrub: true,
                    animation: gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.5,
                        filter: 'blur(10px)',
                    })
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const steps = [
        { 
            num: '01', 
            title: 'Precision Design', 
            desc: 'Every bunker and green designed by Craig Parry to challenge and inspire golfers of every handicap.',
            anim: 'geometric'
        },
        { 
            num: '02', 
            title: 'Elite Turf Protocol', 
            desc: 'Australia’s first course with Sir Grange Zoysia from tee to green – a surface that breathes perfection.',
            anim: 'scanning'
        },
        { 
            num: '03', 
            title: 'Boutique Community', 
            desc: 'Waitlist-managed memberships and exclusive access to our state-of-the-art putting facility.',
            anim: 'waveform'
        }
    ];

    return (
        <section ref={containerRef} className="bg-primary pt-24">
            {steps.map((step, i) => (
                <div key={i} className="protocol-card h-screen w-full flex items-center justify-center bg-primary sticky top-0 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <span className="font-mono text-accent text-sm mb-4 block">{step.num} // PROCESS</span>
                            <h3 className="font-heading text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight">{step.title}</h3>
                            <p className="font-body text-white/60 text-lg leading-relaxed max-w-md">{step.desc}</p>
                        </div>
                        <div className="order-1 md:order-2 h-[300px] md:h-[500px] bg-black/20 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative">
                            {/* SVG Animations would go here */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {i === 0 && (
                                    <div className="w-48 h-48 border-2 border-accent/20 rounded-full animate-spin-slow flex items-center justify-center">
                                        <div className="w-32 h-32 border-2 border-accent/40 rounded-full animate-reverse-spin flex items-center justify-center">
                                            <div className="w-16 h-16 bg-accent/10 rounded-full"></div>
                                        </div>
                                    </div>
                                )}
                                {i === 1 && (
                                    <div className="w-full h-full p-12">
                                        <div className="w-full h-full border border-accent/20 rounded-xl relative overflow-hidden bg-dot-pattern">
                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_15px_rgba(202,239,78,0.5)] animate-scan"></div>
                                        </div>
                                    </div>
                                )}
                                {i === 2 && (
                                    <svg viewBox="0 0 200 100" className="w-4/5 h-auto text-accent/40 fill-none stroke-current stroke-2">
                                        <path d="M0,50 L20,50 L30,20 L45,80 L55,50 L80,50 L90,10 L110,90 L120,50 L145,50 L155,50 L165,30 L175,70 L185,50 L200,50" className="animate-path" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

const Membership = () => {
    return (
        <section className="py-32 bg-background px-6 md:px-12">
            <div className="max-w-7xl mx-auto text-center mb-20">
                <span className="font-body text-accent text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Club Access</span>
                <h2 className="font-heading text-5xl md:text-7xl text-primary mb-6">Join The Community</h2>
                <p className="font-body text-textdark/40 text-sm tracking-widest uppercase">Limited membership opportunities available</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div className="bg-white p-12 rounded-[2.5rem] border border-black/5 shadow-sm transition-transform hover:scale-[1.02] duration-500">
                    <h3 className="font-heading text-3xl mb-4">General</h3>
                    <div className="text-4xl font-heading mb-8">$200<span className="text-sm font-body text-textdark/40 ml-2">/year</span></div>
                    <ul className="space-y-4 mb-12 text-sm text-textdark/60 font-body">
                        <li>• Official Golf Australia Handicap</li>
                        <li>• Exclusive Course Competitions</li>
                        <li>• Access to Private Facilities</li>
                        <li>• Reciprocal Playing Rights</li>
                    </ul>
                    <button className="w-full py-5 bg-transparent border border-primary text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-primary hover:text-white transition-all">Enquire Now</button>
                </div>
                
                <div className="bg-primary p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group scale-105 z-10">
                    <div className="absolute top-0 right-0 p-8">
                        <div className="bg-accent text-primary text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Recommended</div>
                    </div>
                    <h3 className="font-heading text-3xl mb-4 text-white">Full Member</h3>
                    <div className="text-4xl font-heading mb-8 text-white">$450<span className="text-sm font-body text-white/40 ml-2">/year</span></div>
                    <ul className="space-y-4 mb-12 text-sm text-white/60 font-body">
                        <li>• All General Benefits</li>
                        <li>• Daily Course Access</li>
                        <li>• Buggy & Cart Discounts</li>
                        <li>• Priority Booking (14 Day)</li>
                    </ul>
                    <button className="w-full py-5 bg-accent text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-white transition-all">Select Tier</button>
                </div>
                
                <div className="bg-white p-12 rounded-[2.5rem] border border-black/5 shadow-sm transition-transform hover:scale-[1.02] duration-500">
                    <h3 className="font-heading text-3xl mb-4">Next Gen</h3>
                    <div className="text-4xl font-heading mb-8">$100<span className="text-sm font-body text-textdark/40 ml-2">/year</span></div>
                    <ul className="space-y-4 mb-12 text-sm text-textdark/60 font-body">
                        <li>• For golfers aged 18 - 30</li>
                        <li>• Handicap & Competitions</li>
                        <li>• Discounted Range Access</li>
                        <li>• Monthly Networking Events</li>
                    </ul>
                    <button className="w-full py-5 bg-transparent border border-primary text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-primary hover:text-white transition-all">Enquire Now</button>
                </div>
            </div>
        </section>
    );
};

const Features = () => {
    const [shufflerIndex, setShufflerIndex] = useState(0);
    const shufflerItems = [
        "Golf Australia Magazine Rated",
        "Sir Grange Zoysia Turf",
        "Premium Boutique Experience"
    ];

    const [typewriterText, setTypewriterText] = useState("");
    const typewriterMessages = [
        "INITIALIZING COURSE DATA...",
        "CRAIG PARRY DESIGN DETECTED...",
        "OPTIMIZING FOR ALL HANDICAPS...",
        "SYMMETRICAL TEE PLACEMENTS LOADED.",
        "PLAYABILITY INDEX: 100%"
    ];
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setShufflerIndex((prev) => (prev + 1) % shufflerItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let currentMessage = typewriterMessages[messageIndex];
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < currentMessage.length) {
                setTypewriterText(currentMessage.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setMessageIndex((prev) => (prev + 1) % typewriterMessages.length);
                }, 2000);
            }
        }, 50);
        return () => clearInterval(typingInterval);
    }, [messageIndex]);

    return (
        <section className="py-32 bg-white relative overflow-hidden px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Diagnostic Shuffler */}
                    <div className="bg-background p-8 rounded-[2rem] border border-black/5 shadow-sm h-[400px] flex flex-col justify-between relative overflow-hidden group">
                        <div>
                            <h3 className="font-heading text-2xl text-primary mb-2">The Best 9 Hole Course</h3>
                            <p className="font-body text-xs text-textdark/40 uppercase tracking-widest">Golf Australia Magazine</p>
                        </div>
                        <div className="relative h-48 flex items-center justify-center">
                            {shufflerItems.map((item, idx) => {
                                const offset = (idx - shufflerIndex + shufflerItems.length) % shufflerItems.length;
                                return (
                                    <div 
                                        key={idx}
                                        className="absolute w-full py-4 px-6 bg-white border border-black/5 rounded-xl shadow-lg transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                        style={{
                                            transform: `translateY(${offset * 20}px) scale(${1 - offset * 0.05})`,
                                            opacity: offset === 0 ? 1 : 0.4,
                                            zIndex: shufflerItems.length - offset
                                        }}
                                    >
                                        <p className="text-primary font-body text-sm font-bold tracking-tight">{item}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Card 2: Telemetry Typewriter */}
                    <div className="bg-background p-8 rounded-[2rem] border border-black/5 shadow-sm h-[400px] flex flex-col justify-between relative overflow-hidden group">
                        <div>
                            <h3 className="font-heading text-2xl text-primary mb-2">Expertly Designed</h3>
                            <p className="font-body text-xs text-textdark/40 uppercase tracking-widest">For All Levels</p>
                        </div>
                        <div className="bg-black/95 rounded-xl p-6 h-48 font-mono text-[10px] text-accent/80 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                                <span className="uppercase tracking-[0.2em] text-[8px]">Live Feed</span>
                            </div>
                            <p className="leading-relaxed">
                                {typewriterText}
                                <span className="inline-block w-1.5 h-3 bg-accent ml-1 animate-pulse"></span>
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Cursor Protocol Scheduler */}
                    <div className="bg-background p-8 rounded-[2rem] border border-black/5 shadow-sm h-[400px] flex flex-col justify-between relative overflow-hidden group">
                        <div>
                            <h3 className="font-heading text-2xl text-primary mb-2">Vibrant Community</h3>
                            <p className="font-body text-xs text-textdark/40 uppercase tracking-widest">More Than Just Golf</p>
                        </div>
                        <div className="relative bg-white border border-black/5 rounded-xl p-6 shadow-md h-48">
                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {['S','M','T','W','T','F','S'].map((d, i) => (
                                    <div key={i} className={`h-8 flex items-center justify-center rounded-sm text-[10px] font-bold ${i === 3 ? 'bg-accent text-primary' : 'bg-gray-50 text-gray-400'}`}>
                                        {d}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="h-2 w-2/3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent/40 w-3/4"></div>
                                </div>
                                <div className="h-2 w-1/2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent w-1/2"></div>
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                                <ArrowUpRight className="text-accent animate-bounce" size={40} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const QuoteSection = () => {
    return (
        <section className="relative py-48 px-6 bg-primary flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/images/course6.jpg"
                    alt="Teven Golf Course Aerial"
                    className="w-full h-full object-cover opacity-20"
                    style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute inset-0 bg-primary/70"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-snug">
                    "A layout that allows for a quick yet rewarding round, with each hole offering its own set of <span className="italic text-accent">challenges and joy.</span>"
                </h3>
                <p className="mt-8 text-accent text-sm tracking-widest uppercase font-medium">
                    — Premium Boutique Golfing
                </p>
            </div>
        </section>
    );
};

const FeaturedShop = () => {
    const { products } = useContext(GlobalStateContext);
    const shopItems = products.slice(0, 3);

    return (
        <section id="shop" className="py-32 px-6 md:px-12 lg:px-24 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-accent tracking-widest text-xs uppercase font-medium mb-3 block">Exclusive Apparel</span>
                        <h2 className="font-heading text-4xl md:text-5xl text-primary">The Pro Shop</h2>
                    </div>
                    <Link to="/shop" className="inline-flex items-center gap-2 text-textdark text-xs tracking-widest uppercase font-medium hover:text-accent transition-colors">
                        View All Collection <ArrowUpRight className="w-3 h-3" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {shopItems.map((item, i) => (
                        <Link to={`/shop/${item.name.replace(/\s+/g, '-').toLowerCase()}`} key={i} className="group cursor-pointer">
                            <div className="relative aspect-square overflow-hidden bg-[#F4F4F4] mb-6">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                                    <ShoppingBag className="w-4 h-4 text-primary" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-1">
                                <h3 className="font-heading text-xl text-primary">{item.name}</h3>
                                <p className="font-body font-medium text-accent">{item.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MembershipCTA = () => {
    return (
        <section id="membership" className="py-32 px-6 md:px-12 lg:px-24 bg-primary text-white border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0A110D]"></div>
            <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
                <span className="text-accent tracking-widest text-xs uppercase font-medium mb-4 block">Join The Club</span>
                <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-8">
                    Elevate Your Game
                </h2>
                <p className="font-body font-light text-white/70 text-lg mb-12 leading-relaxed">
                    Experience Teven Golf Course year-round. Beyond stunning fairways, enjoy exclusive access to competitions, our bespoke putting facility, and premium reciprocal privileges.
                </p>
                <Link to="/membership" className="inline-flex items-center gap-3 bg-accent text-primary px-10 py-5 text-sm tracking-widest uppercase font-bold hover:bg-white transition-all duration-300 shadow-xl shadow-accent/20">
                    Explore Membership Options <ArrowUpRight size={18} />
                </Link>
            </div>
        </section>
    );
};

const CourseShowcase = () => {
    const sectionRef = useRef(null);
    const images = [
        { src: '/images/course1.jpg', title: 'The Par 3 Challenge', desc: 'Precision over distance.' },
        { src: '/images/course2.jpg', title: 'Sir Grange Greens', desc: 'Purity in every putt.' },
        { src: '/images/course3.jpg', title: 'Natural Hinterland', desc: 'Where golf meets serenity.' },
        { src: '/images/course4.jpg', title: 'Creek Crossing', desc: 'Strategic aquatic hazards.' }
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.showcase-item', {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-background px-6 md:px-12">
            <div className="max-w-7xl mx-auto mb-16">
                <span className="font-body text-accent text-xs font-bold tracking-[0.4em] uppercase mb-4 block">The Experience</span>
                <h2 className="font-heading text-5xl md:text-7xl text-primary">Course Highlights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {images.map((img, i) => (
                    <div key={i} className="showcase-item group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-black/5">
                        <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                            <h3 className="text-white font-heading text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h3>
                            <p className="text-white/60 font-body text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{img.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const CorporatePartnerships = () => {
    const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Form logic would go here
    };

    return (
        <section className="py-32 bg-white px-6 md:px-12 lg:px-24 border-t border-black/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left: Enquiry Form */}
                    <div className="flex flex-col">
                        <span className="font-body text-accent text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Collaboration</span>
                        <h2 className="font-heading text-5xl md:text-6xl text-primary mb-8">Corporate Partnerships</h2>
                        <p className="font-body text-textdark/60 text-lg mb-12 leading-relaxed max-w-lg">
                            Elevate your brand with Teven Golf Course. We offer bespoke partnership opportunities ranging from tournament sponsorship to exclusive client experiences.
                        </p>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] uppercase tracking-widest text-textdark/40 font-bold ml-1">Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="bg-background border border-black/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-colors"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] uppercase tracking-widest text-textdark/40 font-bold ml-1">Company</label>
                                        <input 
                                            type="text" 
                                            className="bg-background border border-black/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-colors"
                                            placeholder="Organization name"
                                            value={formData.company}
                                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest text-textdark/40 font-bold ml-1">Email</label>
                                    <input 
                                        type="email" 
                                        required
                                        className="bg-background border border-black/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-colors"
                                        placeholder="professional@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest text-textdark/40 font-bold ml-1">Message</label>
                                    <textarea 
                                        rows="4"
                                        className="bg-background border border-black/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                                        placeholder="Tell us about your interest..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    />
                                </div>
                                <button className="mt-4 py-5 bg-primary text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-accent hover:text-primary transition-all shadow-lg">
                                    Send Enquiry
                                </button>
                            </form>
                        ) : (
                            <div className="bg-background border border-accent/20 rounded-[2.5rem] p-12 text-center flex flex-col items-center">
                                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6 text-primary">
                                    <ArrowUpRight size={32} />
                                </div>
                                <h3 className="font-heading text-3xl text-primary mb-4">Message Received</h3>
                                <p className="font-body text-textdark/60 text-sm">Our corporate accounts team will contact you within 24 hours.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-8 text-accent underline text-xs tracking-widest uppercase font-bold">New Enquiry</button>
                            </div>
                        )}
                    </div>

                    {/* Right: Existing Partnerships (Tin Horse Ranch) */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-background rounded-[3rem] overflow-hidden border border-black/5 shadow-2xl relative group">
                            <div className="grid grid-cols-2 h-48 md:h-64">
                                <div className="overflow-hidden">
                                    <img src="/images/partners/tin-horse-ranch-1.jpg" alt="Tin Horse Ranch Pool" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                </div>
                                <div className="overflow-hidden">
                                    <img src="/images/partners/tin-horse-ranch-2.jpg" alt="Tin Horse Ranch Aerial" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                </div>
                            </div>
                            <div className="p-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-accent font-mono text-[10px] tracking-widest uppercase mb-1 block">Preferred Accommodation</span>
                                        <h3 className="font-heading text-3xl text-primary uppercase">Tin Horse Ranch</h3>
                                    </div>
                                    <div className="bg-primary px-4 py-2 rounded-xl text-white text-[10px] font-bold tracking-[0.1em] text-center">
                                        <span className="block text-accent text-lg">10%</span> OFF
                                    </div>
                                </div>
                                
                                <p className="font-body text-textdark/60 text-sm leading-relaxed mb-6">
                                    Set on 33 beautiful acres in the Byron Hinterland, Tin Horse Ranch offers elite farm stays featuring a 3-bedroom homestead, 3-bedroom cabin, and a studio. 
                                </p>

                                <div className="flex flex-col gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-black/5 mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <p className="text-[11px] font-body text-textdark/80 font-bold uppercase tracking-widest">Code: TEVENGOLF10</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <p className="text-[11px] font-body text-textdark/80 font-bold uppercase tracking-widest">11 mins to Teven Golf Course</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <a href="https://booking.tinhorseranch.com.au" target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary text-white py-4 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full text-center hover:bg-accent hover:text-primary transition-all">
                                        Book Now
                                    </a>
                                    <a href="https://www.tinhorseranch.com.au/play-golf/" target="_blank" rel="noopener noreferrer" className="flex-1 border border-primary/20 text-primary py-4 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full text-center hover:bg-primary hover:text-white transition-all">
                                        Event Packages
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border border-accent/20 rounded-[2rem] bg-accent/5">
                            <h4 className="font-heading text-xl text-primary mb-2 text-center uppercase tracking-tight">Regional Qualifier Specials</h4>
                            <p className="text-[11px] text-center font-body text-textdark/60 uppercase tracking-widest">Preferential rates for NSW Open Regional Qualifier & Teven Junior Classic</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Home = () => {
    return (
        <main>
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
            <CourseShowcase />
            <CorporatePartnerships />
            <Membership />
            <QuoteSection />
            <FeaturedShop />
            <MembershipCTA />
        </main>
    );
};
