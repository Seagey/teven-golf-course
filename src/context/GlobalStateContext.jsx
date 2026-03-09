import React, { createContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    // Initial State defaults
    const defaultCourseOpen = true;

    const defaultProducts = [
        {
            id: 'teven-performance-golf-polo',
            name: 'Teven Performance Golf Polo',
            price: '$85.00',
            img: '/images/merch_performance_polo.png',
            desc: "The official Teven Golf Course performance polo. Moisture-wicking, breathable, and designed for maximum comfort and style on the course. Features our primary green with a crisp white logo."
        },
        {
            id: 'signature-club-cap',
            name: 'Signature Club Cap',
            price: '$40.00',
            img: '/images/merch_cap.jpg',
            desc: "Classic unstructured 6-panel cap in rich earthy tones. Features a subtle embroidered T logo. Adjustable brass clasp strap. Essential protection for the Northern Rivers sun."
        },
        {
            id: 'teven-branded-golf-ball',
            name: 'Teven Branded Golf Ball',
            price: '$25.00',
            img: '/images/merch_branded_balls.jpg',
            desc: "Premium tour-grade golf balls featuring the official Teven logo. Available in TaylorMade TP5 or Titleist ProV1 to suit your preferred feel around the Zoysia greens.",
            hasVariants: true
        },
        {
            id: 'teven-ball-marker',
            name: 'Teven Ball Marker',
            price: '$10.00',
            img: '/images/merch_ball_marker.jpg',
            desc: "Heavyweight brass ball marker with the signature Teven 'T' logo. The perfect small keepsake or gift from your round."
        }
    ];

    const defaultEvents = [
        {
            id: 'nsw-open-qualifying',
            title: 'NSW Open Regional Qualifying Series',
            date: 'July 24 – 26, 2025',
            status: 'Past',
            image: '/images/course3.jpg',
            desc: 'Teven Golf Course will host Australia’s best professional and elite amateur golfers to test their skills. With the time-honoured NSW Open Golf Championship having a series of six $50,000 lead-up events, it will attract competitors from across Australia.'
        },
        {
            id: 'gotcha4life-charity',
            title: 'Gotcha4Life Charity Golf Day',
            date: 'Friday May 16th, 2025',
            status: 'Past',
            image: '/images/course2.jpg',
            desc: 'Following the success of last year’s inaugural event, the Gotcha4Life Charity Golf Day returns! Join us for a day of great golf and even greater purpose as we swing in support of mental fitness. Proudly supported by the Ballina RSL.'
        },
        {
            id: 'ladies-open',
            title: 'Teven Valley GC Ladies Open Day',
            date: 'Wednesday April 9th, 2025',
            status: 'Past',
            image: '/images/course5.jpg',
            desc: 'A fantastic day of golf, good company, and great hospitality! Gather a partner and join us for a 9-hole 2-Person Ambrose event with a 10:00 AM shotgun start. Includes coffee & cake on arrival, post-round catering, and a glass of bubbles.'
        }
    ];

    // State definition with local storage initialization
    const [courseOpen, setCourseOpen] = useState(() => {
        const stored = localStorage.getItem('courseOpen');
        return stored !== null ? JSON.parse(stored) : defaultCourseOpen;
    });

    const [products, setProducts] = useState(() => {
        const stored = localStorage.getItem('products');
        return stored ? JSON.parse(stored) : defaultProducts;
    });

    const [events, setEvents] = useState(() => {
        const stored = localStorage.getItem('events');
        return stored ? JSON.parse(stored) : defaultEvents;
    });

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('courseOpen', JSON.stringify(courseOpen));
    }, [courseOpen]);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    return (
        <GlobalStateContext.Provider value={{
            courseOpen, setCourseOpen,
            products, setProducts,
            events, setEvents
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
