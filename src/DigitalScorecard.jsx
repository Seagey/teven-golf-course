import React, { useState } from 'react';

export const DigitalScorecard = () => {
    const [selectedTee, setSelectedTee] = useState('black'); // 'black' for Front 9, 'white' for Back 9

    const courseData = {
        black: {
            name: "Front 9 (Black Tees)",
            par: 31,
            holes: [
                { no: 1, par: 3, index: "3/4", length: 180 },
                { no: 2, par: 4, index: "4/3", length: 268 },
                { no: 3, par: 3, index: "2", length: 133 },
                { no: 4, par: 4, index: "8/7", length: 236 },
                { no: 5, par: 3, index: "5/8", length: 139 },
                { no: 6, par: 4, index: "7/5", length: 250 },
                { no: 7, par: 4, index: "6", length: 259 },
                { no: 8, par: 3, index: "9", length: 89 },
                { no: 9, par: 3, index: "1", length: 151 },
            ]
        },
        white: {
            name: "Back 9 (White Tees)",
            par: 27,
            holes: [
                { no: 10, par: 3, index: "3/4", length: 144 },
                { no: 11, par: 3, index: "2", length: 150 },
                { no: 12, par: 3, index: "4/3", length: 115 },
                { no: 13, par: 3, index: "6", length: 165 },
                { no: 14, par: 3, index: "8", length: 113 },
                { no: 15, par: 3, index: "5", length: 151 },
                { no: 16, par: 3, index: "7", length: 176 },
                { no: 17, par: 3, index: "9", length: 89 },
                { no: 18, par: 3, index: "1", length: 114 },
            ]
        }
    };

    const currentData = courseData[selectedTee];
    const totalLength = currentData.holes.reduce((acc, h) => acc + h.length, 0);

    return (
        <section id="scorecard" className="py-32 px-6 md:px-12 lg:px-24 bg-white border-t border-black/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="flex flex-col">
                        <span className="text-accent tracking-widest text-xs uppercase font-medium mb-3 block">Interactive Guide</span>
                        <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">Digital Scorecard</h2>
                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                            <div className="bg-[#111] text-white px-3 py-1.5 rounded-sm flex gap-3 text-xs tracking-wider font-body">
                                <span className="font-bold">BLACK SLOPE <span className="font-normal opacity-80">129</span></span>
                                <span className="opacity-50">|</span>
                                <span className="font-bold">SCRATCH <span className="font-normal opacity-80">70</span></span>
                            </div>
                            <div className="bg-[#E5E5E5] text-primary px-3 py-1.5 rounded-sm flex gap-3 text-xs tracking-wider font-body">
                                <span className="font-bold">WHITE SLOPE <span className="font-normal opacity-80">110</span></span>
                                <span className="opacity-50">|</span>
                                <span className="font-bold">SCRATCH <span className="font-normal opacity-80">65</span></span>
                            </div>
                        </div>
                        <p className="font-body font-light text-textdark/60 max-w-xl">
                            Our 9-hole layout is masterfully designed to be played as a full 18-hole experience utilizing two dedicated tee boxes on each hole.
                        </p>
                    </div>

                    <div className="flex bg-background rounded-full p-1 border border-black/5 shadow-inner self-start md:self-end">
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
                                <td className="px-6 py-4 pl-8 font-body font-medium text-sm text-textdark/70 uppercase tracking-wider">Index m/w</td>
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
