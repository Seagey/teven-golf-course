import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Course } from './pages/Course';
import { Scorecard } from './pages/Scorecard';
import { Events } from './pages/Events';
import { Membership } from './pages/Membership';
import { Contact } from './pages/Contact';
import { Shop, Product } from './pages/Shop';
import { Admin } from './pages/Admin';
import { Book } from './pages/Book';
import { TevenCaddy } from './TevenCaddy';

import { GlobalStateProvider } from './context/GlobalStateContext';

export default function App() {
    return (
        <GlobalStateProvider>
            <Router>
                <div className="w-full bg-background min-h-screen selection:bg-accent selection:text-white flex flex-col">
                    <Navbar />

                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/course" element={<Course />} />
                            <Route path="/scorecard" element={<Scorecard />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/membership" element={<Membership />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/shop/:id" element={<Product />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/book" element={<Book />} />
                        </Routes>
                    </div>

                    <Footer />
                    <TevenCaddy />
                </div>
            </Router>
        </GlobalStateProvider>
    );
}
