import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Dark/light navbar modes depend on if we're on the home page and at the top
    const isHome = location.pathname === '/';
    const isDarkBackground = isHome && !scrolled;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // Force check on mount/location change
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const textColor = isDarkBackground ? 'text-white' : 'text-primary';
    const textColorMuted = isDarkBackground ? 'text-white/90' : 'text-primary/90';
    const logoSrc = isDarkBackground ? "/images/logo_white.png" : "/images/logo_black.png";
    const bgClass = scrolled ? 'bg-background shadow-xl py-4' : (isHome ? 'bg-transparent pt-8' : 'bg-background shadow-xl py-4');

    return (
        <React.Fragment>
            <div
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-700 ease-in-out px-6 py-5 md:px-12 grid grid-cols-2 md:grid-cols-3 items-center ${bgClass}`}
            >
                {/* Left: Logo */}
                <div className="flex justify-start">
                    <Link
                        to="/"
                        onClick={(e) => {
                            if (location.pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                window.dispatchEvent(new CustomEvent('restart-hero-video'));
                            }
                        }}
                    >
                        <img src={logoSrc} alt="Teven Golf Course Logo" className="h-10 md:h-12 w-auto object-contain transition-opacity duration-300" />
                    </Link>
                </div>

                {/* Center: Navigation Links (Desktop Only) */}
                <div className="hidden md:flex justify-center items-center gap-8">
                    <Link to="/course" className={`text-xs tracking-widest uppercase font-medium transition-colors duration-500 hover:text-accent ${textColorMuted}`}>The Course</Link>
                    <Link to="/scorecard" className={`text-xs tracking-widest uppercase font-medium transition-colors duration-500 hover:text-accent ${textColorMuted}`}>Scorecard</Link>
                    <Link to="/events" className={`text-xs tracking-widest uppercase font-medium transition-colors duration-500 hover:text-accent ${textColorMuted}`}>Events</Link>
                    <Link to="/shop" className={`text-xs tracking-widest uppercase font-medium transition-colors duration-500 hover:text-accent ${textColorMuted}`}>Pro Shop</Link>
                    <Link to="/membership" className={`text-xs tracking-widest uppercase font-medium transition-colors duration-500 hover:text-accent ${textColorMuted}`}>Membership</Link>
                    <Link to="/contact" className={`text-xs tracking-widest uppercase font-medium transition-colors duration-500 hover:text-accent ${textColorMuted}`}>Contact</Link>
                </div>

                {/* Right: Book Now & Mobile Toggle */}
                <div className="flex justify-end items-center gap-4">
                    <div className="hidden md:block">
                        <Link to="/book" className={`group relative overflow-hidden px-8 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-500 inline-block ${!isDarkBackground ? 'border border-primary text-primary hover:text-white' : 'border border-accent bg-transparent text-accent hover:text-primary'}`}>
                            <span className="relative z-10 flex items-center gap-2">
                                Book Now
                            </span>
                            <div className={`absolute inset-0 z-0 h-full w-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 ${!isDarkBackground ? 'bg-primary' : 'bg-accent'}`}></div>
                        </Link>
                    </div>

                    <button
                        className="md:hidden p-2 z-50 flex items-center justify-center relative w-10 h-10"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ?
                            <X className="text-white w-6 h-6 absolute" /> :
                            <Menu className={`w-6 h-6 absolute transition-colors duration-500 ${textColor}`} />
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center gap-8 transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <img src="/images/logo_white.png" alt="Teven Golf Course Logo" className="h-16 w-auto object-contain absolute top-12 left-1/2 -translate-x-1/2 opacity-50" />
                <Link to="/course" className="text-3xl font-heading text-white hover:text-accent transition-colors">The Course</Link>
                <Link to="/scorecard" className="text-3xl font-heading text-white hover:text-accent transition-colors">Scorecard</Link>
                <Link to="/events" className="text-3xl font-heading text-white hover:text-accent transition-colors">Events</Link>
                <Link to="/shop" className="text-3xl font-heading text-white hover:text-accent transition-colors">Pro Shop</Link>
                <Link to="/membership" className="text-3xl font-heading text-white hover:text-accent transition-colors">Membership</Link>
                <Link to="/contact" className="text-3xl font-heading text-white hover:text-accent transition-colors">Contact</Link>
                <Link to="/book" className="mt-8 border border-accent bg-accent px-12 py-4 text-sm tracking-widest uppercase font-medium text-primary">Book Now</Link>
            </div>
        </React.Fragment>
    );
};
