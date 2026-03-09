import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowUpRight, MapPin } from 'lucide-react';
import { GlobalStateContext } from '../context/GlobalStateContext';

export const Events = () => {
    const { events } = useContext(GlobalStateContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 pb-24 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-24">
                    <span className="text-accent tracking-widest text-xs uppercase font-medium mb-4 block">Calendar & Tournaments</span>
                    <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] text-primary leading-tight mb-8">
                        2026 <span className="italic text-accent font-light">Events</span>
                    </h1>
                    <p className="font-body text-textdark/70 text-lg max-w-2xl font-light leading-relaxed">
                        Join us at Teven Golf Course for our premier tournaments, charity drives, and exclusive club events in 2026.
                    </p>
                </div>

                {/* Events List */}
                <div className="flex flex-col gap-16 md:gap-24">
                    {events.map((event, index) => (
                        <div key={event.id} className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Image side */}
                            <div className="w-full lg:w-1/2 relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-sm shadow-xl group">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-primary rounded-sm shadow-sm">
                                    {event.status}
                                </div>
                            </div>

                            {/* Content side */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                <div className="flex items-center gap-3 text-accent mb-6 font-body text-sm font-medium tracking-wide">
                                    <Calendar size={18} />
                                    <span>{event.date}</span>
                                </div>

                                <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6 leading-tight">
                                    {event.title}
                                </h2>

                                <p className="font-body text-textdark/70 font-light text-lg leading-relaxed mb-10">
                                    {event.desc}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-accent hover:text-primary transition-all shadow-md">
                                        Find Out More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter / Follow-up */}
                <div className="mt-32 p-12 md:p-20 bg-[#122618] rounded-sm text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-accent tracking-widest text-xs uppercase font-medium mb-4 block">Stay Updated</span>
                        <h3 className="font-heading text-4xl text-white mb-6">Don't Miss an Event</h3>
                        <p className="font-body text-white/70 font-light max-w-xl mx-auto mb-10">
                            Join our mailing list to receive early access to tournament registrations and exclusive event invitations.
                        </p>
                        <form className="flex border border-white/20 p-1 w-full max-w-md mx-auto bg-white/5 backdrop-blur-sm">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 bg-transparent px-4 font-body text-sm outline-none text-white placeholder:text-white/40"
                            />
                            <button type="submit" className="bg-accent text-primary px-6 py-3 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </main>
    );
};
