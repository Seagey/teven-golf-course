import React, { useState } from 'react';

export const DigitalScorecard = () => {
    const [selectedTee, setSelectedTee] = useState('black'); // 'black' for Front 9, 'white' for Back 9

    const courseData = {
        black: {
            name: "Front 9 (Black Tees)",
            par: 34,
            holes: [
                { no: 1, par: 4, index: 12, length: 275 },
                { no: 2, par: 4, index: 6, length: 320 },
                { no: 3, par: 3, index: 18, length: 145 },
                { no: 4, par: 5, index: 2, length: 480 },
                { no: 5, par: 4, index: 10, length: 360 },
                { no: 6, par: 4, index: 4, length: 390 },
                { no: 7, par: 3, index: 16, length: 160 },
                { no: 8, par: 4, index: 8, length: 340 },
                { no: 9, par: 3, index: 14, length: 170 },
            ]
        },
        white: {
            name: "Back 9 (White Tees)",
            par: 34,
            holes: [
                { no: 10, par: 4, index: 11, length: 260 },
                { no: 11, par: 4, index: 5, length: 310 },
                { no: 12, par: 3, index: 17, length: 135 },
                { no: 13, par: 5, index: 1, length: 495 },
                { no: 14, par: 4, index: 9, length: 350 },
                { no: 15, par: 4, index: 3, length: 380 },
                { no: 16, par: 3, index: 15, length: 150 },
                { no: 17, par: 4, index: 7, length: 330 },
                { no: 18, par: 3, index: 13, length: 165 },
            ]
        }
    };

    const currentData = courseData[selectedTee];
    const totalLength = currentData.holes.reduce((acc, h) => acc + h.length, 0);

    return (
        <section id="scorecard" className="py-32 px-6 md:px-12 lg:px-24 bg-white border-t border-black/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-accent tracking-widest text-xs uppercase font-medium mb-3 block">Interactive Guide</span>
                        <h2 className="font-heading text-4xl md:text-5xl text-primary">Digital Scorecard</h2>
                        <p className="font-body font-light text-textdark/60 mt-4 max-w-xl">
                            Our 9-hole layout is masterfully designed to be played as a full 18-hole experience utilizing two dedicated tee boxes on each hole.
                        </p>
                    </div>

                    <div className="flex bg-background rounded-full p-1 border border-black/5 shadow-inner">
                        <button
                            onClick={() => setSelectedTee('black')}
                            className={`px-6 py-2 rounded-full font-body text-xs tracking-widest uppercase font-bold transition-all duration-300 ${selectedTee === 'black' ? 'bg-primary text-accent shadow-md' : 'text-textdark/50 hover:text-primary'}`}
                        >
                            Front 9 (Black)
                        </button>
                        <button
                            onClick={() => setSelectedTee('white')}
                            className={`px-6 py-2 rounded-full font-body text-xs tracking-widest uppercase font-bold transition-all duration-300 ${selectedTee === 'white' ? 'bg-primary text-accent shadow-md' : 'text-textdark/50 hover:text-primary'}`}
                        >
                            Back 9 (White)
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-3xl shadow-xl border border-black/5">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`${selectedTee === 'black' ? 'bg-[#111]' : 'bg-[#E5E5E5]'} ${selectedTee === 'black' ? 'text-white' : 'text-primary'}`}>
                                <th className="px-6 py-5 pl-8 font-heading font-medium text-lg">Hole</th>
                                {currentData.holes.map(h => (
                                    <th key={h.no} className="px-4 py-5 font-heading font-bold text-center text-xl">{h.no}</th>
                                ))}
                                <th className="px-6 py-5 pr-8 font-heading font-medium text-lg text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {/* Length Row */}
                            <tr className="border-b border-black/5 hover:bg-background/50 transition-colors">
                                <td className="px-6 py-4 pl-8 font-body font-medium text-sm text-textdark/70 uppercase tracking-wider">Length (m)</td>
                                {currentData.holes.map(h => (
                                    <td key={h.no} className="px-4 py-4 text-center font-body text-sm">{h.length}</td>
                                ))}
                                <td className="px-6 py-4 pr-8 text-right font-body font-bold text-primary">{totalLength}</td>
                            </tr>
                            {/* Index Row */}
                            <tr className="border-b border-black/5 hover:bg-background/50 transition-colors">
                                <td className="px-6 py-4 pl-8 font-body font-medium text-sm text-textdark/70 uppercase tracking-wider">Index</td>
                                {currentData.holes.map(h => (
                                    <td key={h.no} className="px-4 py-4 text-center font-body text-sm text-textdark/50">{h.index}</td>
                                ))}
                                <td className="px-6 py-4 pr-8 text-right font-body font-bold text-primary">-</td>
                            </tr>
                            {/* Par Row */}
                            <tr className="bg-primary/5 hover:bg-primary/10 transition-colors">
                                <td className="px-6 py-5 pl-8 font-body font-bold text-sm text-primary uppercase tracking-wider">Par</td>
                                {currentData.holes.map(h => (
                                    <td key={h.no} className="px-4 py-5 text-center font-heading font-bold text-lg text-primary">{h.par}</td>
                                ))}
                                <td className="px-6 py-5 pr-8 text-right font-heading font-bold text-xl text-primary">{currentData.par}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
