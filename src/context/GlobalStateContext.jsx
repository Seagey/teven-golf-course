import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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

    // Local state
    const [courseOpen, setCourseOpen] = useState(defaultCourseOpen);
    const [buggiesAllowed, setBuggiesAllowed] = useState(true);
    const [products, setProducts] = useState(defaultProducts);
    const [events, setEvents] = useState(defaultEvents);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial Fetch from Supabase
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_data')
                    .select('data_key, data_value');

                if (error) throw error;

                if (data && data.length > 0) {
                    data.forEach(row => {
                        if (row.data_key === 'courseOpen') setCourseOpen(row.data_value);
                        if (row.data_key === 'buggiesAllowed') setBuggiesAllowed(row.data_value);
                        if (row.data_key === 'products') setProducts(row.data_value);
                        if (row.data_key === 'events') setEvents(row.data_value);
                    });
                }
            } catch (err) {
                console.log('Falling back to local defaults (Supabase table may not be set up yet).');
                // Fallback to local storage if DB fails or isn't set up yet
                const storedCourse = localStorage.getItem('courseOpen');
                if (storedCourse !== null) setCourseOpen(JSON.parse(storedCourse));

                const storedBuggies = localStorage.getItem('buggiesAllowed');
                if (storedBuggies !== null) setBuggiesAllowed(JSON.parse(storedBuggies));

                const storedProducts = localStorage.getItem('products');
                if (storedProducts) setProducts(JSON.parse(storedProducts));

                const storedEvents = localStorage.getItem('events');
                if (storedEvents) setEvents(JSON.parse(storedEvents));
            } finally {
                setIsLoaded(true);
            }
        };

        fetchInitialData();
    }, []);

    // Sync to Supabase & LocalStorage on change
    useEffect(() => {
        if (!isLoaded) return;

        const syncData = async (key, value) => {
            // Always keep local storage as a safety net
            localStorage.setItem(key, JSON.stringify(value));

            try {
                // Attempt to upsert to Supabase
                const { error } = await supabase
                    .from('site_data')
                    .upsert({ data_key: key, data_value: value }, { onConflict: 'data_key' });

                if (error) throw error;
            } catch (err) {
                // Silently fail if table isn't ready
            }
        };

        syncData('courseOpen', courseOpen);
    }, [courseOpen, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        const syncData = async (key, value) => {
            localStorage.setItem(key, JSON.stringify(value));
            try {
                await supabase.from('site_data').upsert({ data_key: key, data_value: value }, { onConflict: 'data_key' });
            } catch (err) { }
        };
        syncData('buggiesAllowed', buggiesAllowed);
    }, [buggiesAllowed, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        const syncData = async (key, value) => {
            localStorage.setItem(key, JSON.stringify(value));
            try {
                await supabase.from('site_data').upsert({ data_key: key, data_value: value }, { onConflict: 'data_key' });
            } catch (err) { }
        };
        syncData('products', products);
    }, [products, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        const syncData = async (key, value) => {
            localStorage.setItem(key, JSON.stringify(value));
            try {
                await supabase.from('site_data').upsert({ data_key: key, data_value: value }, { onConflict: 'data_key' });
            } catch (err) { }
        };
        syncData('events', events);
    }, [events, isLoaded]);

    return (
        <GlobalStateContext.Provider value={{
            courseOpen, setCourseOpen,
            buggiesAllowed, setBuggiesAllowed,
            products, setProducts,
            events, setEvents
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
