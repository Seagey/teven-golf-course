import React, { useEffect, useRef, useState } from 'react';

export const holes = [
    { num: 1, name: '1st Hole', src: 'https://player.vimeo.com/video/1046665575?h=6aa2f0aa98&badge=0&autopause=0&player_id=0&app_id=58479', title: 'Teven Valley Hole 1' },
    { num: 2, name: '2nd Hole', src: 'https://player.vimeo.com/video/1046666561?h=2bb6a09e87&badge=0&autopause=0&player_id=0&app_id=58479', title: 'Teven Valley Hole 2' },
    { num: 3, name: '3rd Hole', src: 'https://player.vimeo.com/video/1049557931?h=c6532a6a8e&badge=0&autopause=0&player_id=0&app_id=58479', title: 'Teven Valley Hole 3' },
    { num: 4, name: '4th Hole', src: 'https://player.vimeo.com/video/1049559154?h=426431e0a3&badge=0&autopause=0&player_id=0&app_id=58479', title: 'Teven Valley Hole 4' },
    { num: 5, name: '5th Hole', src: 'https://player.vimeo.com/video/1082736756?h=098b315cbc&badge=0&autopause=0&player_id=0&app_id=58479', title: 'Teven Valley Hole 5' },
    { num: 6, name: '6th Hole', src: 'https://player.vimeo.com/video/1082737146?h=6e348e188f&badge=0&autopause=0&player_id=0&app_id=58479', title: 'Teven Valley Hole 6' },
    { num: 7, name: '7th Hole', src: 'https://player.vimeo.com/video/1082737152?h=4fb9b998c5&badge=0&autopause=0&player_id=0&app_id=58479', title: 'Teven Valley Hole 7' },
    { num: 8, name: '8th Hole', src: 'https://player.vimeo.com/video/1082737163?h=5678d8db5f&badge=0&autopause=0&player_id=0&app_id=58479', title: 'Teven Valley Hole 8' },
    { num: 9, name: '9th Hole', src: 'https://player.vimeo.com/video/1082737166?h=266a1824ae&badge=0&autopause=0&player_id=0&app_id=58479', title: 'Teven Valley Hole 9' },
];

const HoleVideo = ({ hole }) => {
    // Strip everything after the hash from the original URL so we can cleanly append our own parameters
    const baseUrl = hole.src.split('&')[0];

    return (
        <div className="my-16 flex flex-col items-center w-full max-w-[85vw] mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-8 text-center">{hole.name}</h2>
            <div className="w-full relative shadow-2xl bg-[#0a110d] rounded-sm overflow-hidden pointer-events-none" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    src={`${baseUrl}&autoplay=1&loop=1&muted=1&background=1&byline=0&title=0`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute top-0 left-0 w-full h-full"
                    title={hole.title}
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export const Course = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 bg-background min-h-screen">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                <span className="text-accent tracking-widest text-xs uppercase font-medium mb-3 block text-center">Course Information</span>
                <h1 className="font-heading text-5xl md:text-6xl text-primary text-center mb-16">The Course</h1>

                <div className="font-body text-textdark/80 text-lg leading-relaxed font-light space-y-6 max-w-4xl mx-auto text-center">
                    <p>
                        Reopened in January 2021, this Craig Parry designed course boasts being the first Tee to Green Sir Grange Zoysia Course in Australia.
                    </p>
                    <p>
                        The boutique nine holes have been designed to challenge seasoned golfers but built for a fun round. The 9-hole layout is also playable as a full 18-hole experience with two dedicated tee boxes on each hole.
                    </p>
                </div>

                <div className="my-20">
                    <div className="w-full h-px bg-black/10 max-w-2xl mx-auto mb-10"></div>
                </div>
            </div>

            <div className="w-full flex flex-col items-center pb-32">
                {holes.map((hole) => (
                    <HoleVideo key={hole.num} hole={hole} />
                ))}
            </div>
        </main>
    );
};
