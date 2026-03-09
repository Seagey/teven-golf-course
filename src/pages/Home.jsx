import React, { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShoppingBag, CloudSun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalStateContext';

gsap.registerPlugin(ScrollTrigger);

const WeatherStatusWidget = () => {
    const { courseOpen } = useContext(GlobalStateContext);

    return (
        <div className="hero-anim absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20 flex items-center gap-5 bg-black/20 backdrop-blur-xl border border-white/10 p-5 rounded-sm shadow-2xl">
            <div className="flex flex-col">
                <span className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-bold mb-1.5">Teven, NSW</span>
                <div className="flex items-center gap-2">
                    <CloudSun className="w-5 h-5 text-white" />
                    <span className="text-white font-body font-light text-xl">24°C</span>
                </div>
            </div>

            <div className="w-[1px] h-12 bg-white/20"></div>

            <div className="flex flex-col gap-1.5">
                <span className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-bold">Status</span>
                <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-lg ${courseOpen ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50'}`}></div>
                    <span className={`font-medium text-xs tracking-widest uppercase ${courseOpen ? 'text-white' : 'text-red-100'}`}>
                        {courseOpen ? 'Course Open' : 'Course Closed'}
                    </span>
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

const CourseShowcase = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const images = gsap.utils.toArray('.showcase-img-wrapper');
            images.forEach((wrapper) => {
                const img = wrapper.querySelector('img');

                // Parallax scrub effect on images
                gsap.fromTo(img,
                    { yPercent: -15, scale: 1.05 },
                    {
                        yPercent: 15,
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: wrapper,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                );
            });

            const texts = gsap.utils.toArray('.showcase-text');
            texts.forEach((text) => {
                gsap.fromTo(text,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: text,
                            start: 'top 85%',
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="course" ref={containerRef} className="py-24 md:py-32 bg-background overflow-hidden relative">
            <div className="max-w-[95vw] 2xl:max-w-[90vw] mx-auto flex flex-col gap-32 md:gap-48">

                {/* Introduction Text */}
                <div className="text-center showcase-text max-w-4xl mx-auto px-6 pt-12">
                    <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary leading-tight mb-8">
                        The Best 9 Hole Course <br /><span className="italic text-accent font-light">in Australia</span>
                    </h2>
                    <p className="font-body text-textdark/50 text-xs md:text-sm font-medium uppercase tracking-[0.4em]">
                        A Craig Parry Masterpiece
                    </p>
                </div>

                {/* Feature 1: Full width minimal overlay */}
                <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-sm bg-[#122618] showcase-img-wrapper">
                    <img src="/images/course1.jpg" alt="Immaculate Fairways" className="w-full h-[130%] object-cover origin-center opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 showcase-text z-10 w-full max-w-xl pr-8">
                        <span className="font-body text-accent text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold mb-4 block">01 / The Experience</span>
                        <h3 className="font-heading text-4xl md:text-6xl text-white mb-4 leading-tight">First in Australia</h3>
                        <p className="font-body text-white/80 font-light text-base md:text-lg">Tee to green Sir Grange Zoysia turf providing the ultimate playing surface year-round.</p>
                    </div>
                </div>

                {/* Feature 2: Asymmetric Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center px-4 md:px-8">
                    <div className="lg:col-span-5 showcase-text order-2 lg:order-1 flex flex-col justify-center">
                        <span className="font-body text-accent text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold mb-6 block">02 / The Design</span>
                        <h3 className="font-heading text-4xl md:text-5xl lg:text-7xl text-primary mb-8 leading-none">Built For All Levels</h3>
                        <p className="font-body text-textdark/70 text-lg lg:text-xl font-light leading-relaxed mb-10">
                            Carefully crafted to challenge seasoned professionals while remaining an enjoyable, playable layout for casual rounds. Two dedicated tee boxes allow a full 18-hole experience.
                        </p>
                        <Link to="/course" className="inline-flex items-center justify-center gap-3 border border-primary text-primary px-10 py-5 text-xs tracking-widest uppercase font-medium hover:bg-primary hover:text-white transition-colors self-start">
                            View The Course <ArrowUpRight size={16} />
                        </Link>
                    </div>
                    <div className="lg:col-span-7 relative aspect-[4/5] md:aspect-[4/3] overflow-hidden order-1 lg:order-2 rounded-sm shadow-2xl showcase-img-wrapper">
                        <img src="/images/teven_golf_3.jpg" alt="Course Design" className="w-full h-[130%] object-cover" />
                    </div>
                </div>

                {/* Feature 3: Full width natural image */}
                <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-sm bg-[#122618] showcase-img-wrapper">
                    <img src="/images/course5.jpg" alt="Premium Putting Greens" className="w-full h-[130%] object-cover origin-center opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 text-right showcase-text z-10 w-full max-w-xl pl-8 flex flex-col items-end">
                        <span className="font-body text-accent text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold mb-4 block">03 / The Landscape</span>
                        <h3 className="font-heading text-4xl md:text-6xl text-white mb-4 leading-tight">Lush & Vibrant</h3>
                        <p className="font-body text-white/80 font-light text-base md:text-lg text-balance shadow-black">Surrounded by the breathtaking natural beauty of the pristine Northern Rivers.</p>
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

export const Home = () => {
    return (
        <main>
            <Hero />
            <CourseShowcase />
            <QuoteSection />
            <FeaturedShop />
            <MembershipCTA />
        </main>
    );
};
