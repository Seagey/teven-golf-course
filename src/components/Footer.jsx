import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-[#122618] text-white px-6 md:px-12 lg:px-24 pt-24 pb-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                <div className="col-span-1 md:col-span-2 flex flex-col items-start gap-8">
                    <Link to="/">
                        <img src="/images/logo_white.png" alt="Teven Golf Course Logo" className="h-20 w-auto object-contain" />
                    </Link>
                    <p className="font-body font-light text-white/50 max-w-sm text-sm leading-relaxed">
                        A premium boutique 9-hole golf course in the Northern Rivers. Australia's first Tee to Green Sir Grange Zoysia course.
                    </p>
                </div>

                <div>
                    <h4 className="font-heading text-xl mb-6 text-accent">Club</h4>
                    <ul className="flex flex-col gap-4 font-body text-white/60 text-sm font-light">
                        <li><Link to="/course" className="hover:text-accent transition-colors">The Course</Link></li>
                        <li><Link to="/shop" className="hover:text-accent transition-colors">Pro Shop</Link></li>
                        <li><Link to="/#membership" className="hover:text-accent transition-colors">Membership</Link></li>
                        <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-heading text-xl mb-6 text-accent">Visit</h4>
                    <ul className="flex flex-col gap-4 font-body text-white/60 text-sm font-light">
                        <li>1684 Eltham Road<br />Teven, NSW 2478</li>
                        <li><a href="tel:0429835935" className="hover:text-accent transition-colors block mt-2">0429 835 935</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body font-light text-white/40">
                <p>&copy; {new Date().getFullYear()} Teven Golf Club. All Rights Reserved.</p>
                <div className="flex gap-8 uppercase tracking-wider">
                    <Link to="/admin" className="hover:text-accent transition-colors">Admin Login</Link>
                    <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link to="#" className="hover:text-white transition-colors">Terms</Link>
                </div>
            </div>
        </footer>
    );
};
