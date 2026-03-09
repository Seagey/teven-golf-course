import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 pb-24 bg-background min-h-[80vh]">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <span className="text-accent tracking-widest text-xs uppercase font-medium mb-3 block text-center">Get in Touch</span>
                <h1 className="font-heading text-5xl md:text-6xl text-primary text-center mb-16">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="font-heading text-3xl text-primary mb-4">Teven Golf Club</h2>
                            <p className="font-body text-textdark/70 font-light leading-relaxed">
                                We love our customers, so feel free to visit during normal business hours. Whether you are looking to book a tee time, inquire about membership, or just say hello.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-primary/5 p-3 rounded-full">
                                    <MapPin className="text-accent w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-heading text-xl text-primary">Location</h4>
                                    <p className="font-body text-textdark/70 font-light mt-1">1684 Eltham Road<br />Teven New South Wales 2478</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-primary/5 p-3 rounded-full">
                                    <Phone className="text-accent w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-heading text-xl text-primary">Phone</h4>
                                    <a href="tel:0429835935" className="font-body text-accent font-medium mt-1 hover:underline block">0429 835 935</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-primary/5 p-3 rounded-full">
                                    <Mail className="text-accent w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-heading text-xl text-primary">Email</h4>
                                    <a href="mailto:golf@tevengc.com" className="font-body text-accent font-medium mt-1 hover:underline block">golf@tevengc.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary text-white p-8 border-l-4 border-accent">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="text-accent w-6 h-6" />
                                <h4 className="font-heading text-2xl">Operating Hours</h4>
                            </div>
                            <ul className="space-y-2 font-body font-light text-white/80">
                                <li className="flex justify-between border-b border-white/10 pb-2"><span>Monday - Sunday</span> <span>7:30 am - 4:30 pm</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="bg-white p-10 shadow-2xl border border-black/5">
                        <h3 className="font-heading text-3xl text-primary mb-6">Drop us a line!</h3>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block font-body text-xs tracking-widest uppercase text-textdark/60 font-medium mb-2">Name</label>
                                <input type="text" className="w-full bg-background border border-black/10 rounded-none px-4 py-3 font-body focus:border-accent focus:outline-none transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block font-body text-xs tracking-widest uppercase text-textdark/60 font-medium mb-2">Email</label>
                                <input type="email" className="w-full bg-background border border-black/10 rounded-none px-4 py-3 font-body focus:border-accent focus:outline-none transition-colors" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block font-body text-xs tracking-widest uppercase text-textdark/60 font-medium mb-2">Message</label>
                                <textarea rows="5" className="w-full bg-background border border-black/10 rounded-none px-4 py-3 font-body focus:border-accent focus:outline-none transition-colors" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-primary text-accent font-medium tracking-widest uppercase text-sm py-4 hover:bg-primary/90 transition-colors">
                                Send Message
                            </button>
                            <p className="text-[10px] text-textdark/40 font-body text-center mt-4">
                                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};
