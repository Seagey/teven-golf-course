import React, { useEffect } from 'react';
import { Clock, MapPin, Search } from 'lucide-react';

export const Book = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 pb-24 bg-background min-h-screen">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <span className="text-accent tracking-widest text-xs uppercase font-medium mb-4 block">Play Our Course</span>
                    <h1 className="font-heading text-5xl md:text-7xl text-primary leading-tight mb-8">
                        Book a <span className="italic text-accent font-light">Tee Time</span>
                    </h1>
                    <p className="font-body text-textdark/70 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        Experience the finest 9 holes in the Northern Rivers. Review our pricing and secure your spot on the fairways.
                    </p>
                </div>

                <div className="bg-white p-10 md:p-16 border border-black/5 shadow-2xl rounded-sm text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        <div className="text-left flex flex-col gap-6 font-body">
                            <h3 className="font-heading text-3xl text-primary border-b border-black/10 pb-4">Green Fees</h3>
                            <div className="flex justify-between items-center bg-gray-50 p-4 border border-black/5 rounded-sm">
                                <span className="font-bold text-primary">9 Holes <span className="text-xs font-normal text-textdark/70 ml-2">(Play Black or White Tees)</span></span>
                                <span className="font-light text-lg text-textdark">$60.00</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 p-4 border border-black/5 rounded-sm">
                                <span className="font-bold text-primary">18 Holes <span className="text-xs font-normal text-textdark/70 ml-2">(Play Black and White Tees)</span></span>
                                <span className="font-light text-lg text-textdark">$78.00 <span className="text-xs text-textdark/50">(+$18)</span></span>
                            </div>
                        </div>

                        <div className="text-left flex flex-col gap-6 font-body">
                            <h3 className="font-heading text-3xl text-primary border-b border-black/10 pb-4">Equipment Hire</h3>
                            <div className="flex justify-between items-center bg-gray-50 p-4 border border-black/5 rounded-sm">
                                <span className="font-bold text-primary">Standard Club Hire</span>
                                <span className="font-light text-lg text-textdark">$30.00</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 p-4 border border-black/5 rounded-sm">
                                <span className="font-bold text-primary">Premium Club Hire</span>
                                <span className="font-light text-lg text-textdark">$80.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-[#122618] text-white rounded-sm text-left flex flex-col md:flex-row items-center gap-6">
                        <Search className="w-12 h-12 text-accent shrink-0" />
                        <div className="flex flex-col">
                            <h4 className="font-heading text-2xl mb-2 text-white">Online Booking Portal</h4>
                            <p className="font-body text-sm text-white/70 font-light mb-6">
                                Proceed to our live portal to view all available daily timeslots.
                            </p>
                            <a href="https://tevenvalleygolfcourse.com.au/" target="_blank" rel="noreferrer" className="inline-block bg-accent text-primary px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors text-center w-full md:w-auto">
                                Search Times
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};
