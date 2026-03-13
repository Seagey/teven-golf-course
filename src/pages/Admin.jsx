import React, { useState, useContext, useEffect, useRef } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { Settings, Lock, ToggleLeft, ToggleRight, Plus, Edit2, Trash2, Save, Image as ImageIcon } from 'lucide-react';

// --- Reusable Image Dropzone for Base64 conversion ---
const ImageDropzone = ({ currentImage, onImageUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleDragIn = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragOut = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };

    const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const processFile = (file) => {
        if (!file.type.match('image.*')) {
            alert('Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            onImageUpload(e.target.result); // Pass back Base64 string
        };
        reader.readAsDataURL(file);
    };

    return (
        <div
            className={`w-32 h-32 flex-shrink-0 flex flex-col items-center justify-center border-2 border-dashed relative overflow-hidden transition-colors cursor-pointer rounded-sm ${isDragging ? 'border-primary bg-primary/5' : 'border-black/20 bg-gray-50 hover:bg-white'}`}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
        >
            {currentImage ? (
                <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
                <div className="flex flex-col items-center gap-1 p-2 text-center pointer-events-none">
                    <ImageIcon className="text-gray-400 w-6 h-6 mb-1" />
                    <span className="text-[9px] text-textdark/50 uppercase tracking-widest font-bold">Drop Image</span>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) processFile(e.target.files[0]);
                }}
            />
            {currentImage && (
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[9px] uppercase tracking-wider font-bold text-center px-2">Change Image</span>
                </div>
            )}
        </div>
    );
};


export const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [activeTab, setActiveTab] = useState('status'); // status, shop, events

    const { 
        courseOpen, setCourseOpen, 
        buggiesAllowed, setBuggiesAllowed, 
        products, setProducts, 
        events, setEvents 
    } = useContext(GlobalStateContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Super simple fake login for now
        if (passwordInput.length > 0) {
            setIsAuthenticated(true);
        }
    };

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-[#F4F4F4] pt-48 pb-24 px-6 flex items-center justify-center">
                <div className="bg-white p-10 rounded-sm shadow-xl max-w-md w-full text-center border border-black/5">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-white w-8 h-8" />
                    </div>
                    <h1 className="font-heading text-3xl text-primary mb-2">Admin Access</h1>
                    <p className="font-body text-sm text-textdark/50 mb-8">Please log in to access the management dashboard.</p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                            type="password"
                            placeholder="Enter any password to continue..."
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="border border-black/20 p-4 rounded-sm font-body outline-none focus:border-primary transition-colors text-center"
                        />
                        <button type="submit" className="bg-primary text-white py-4 font-bold tracking-widest uppercase text-xs hover:bg-accent hover:text-primary transition-colors">
                            Enter Dashboard
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F4F4F4] pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8">

                {/* Admin Sidebar */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-sm shadow-sm border border-black/5 overflow-hidden sticky top-32">
                        <div className="p-6 bg-primary text-white flex items-center gap-3">
                            <Settings size={20} className="text-accent" />
                            <h2 className="font-heading text-xl">Dashboard</h2>
                        </div>
                        <div className="flex flex-col">
                            <button
                                onClick={() => setActiveTab('status')}
                                className={`p-4 text-left font-body text-sm font-medium transition-colors border-l-4 ${activeTab === 'status' ? 'border-accent bg-accent/5 text-primary' : 'border-transparent text-textdark/70 hover:bg-black/5'}`}
                            >
                                Course Status
                            </button>
                            <button
                                onClick={() => setActiveTab('shop')}
                                className={`p-4 text-left font-body text-sm font-medium transition-colors border-l-4 border-t border-t-black/5 ${activeTab === 'shop' ? 'border-accent bg-accent/5 text-primary' : 'border-transparent text-textdark/70 hover:bg-black/5'}`}
                            >
                                Pro Shop Inventory
                            </button>
                            <button
                                onClick={() => setActiveTab('events')}
                                className={`p-4 text-left font-body text-sm font-medium transition-colors border-l-4 border-t border-t-black/5 ${activeTab === 'events' ? 'border-accent bg-accent/5 text-primary' : 'border-transparent text-textdark/70 hover:bg-black/5'}`}
                            >
                                Events Manager
                            </button>
                        </div>
                    </div>
                </div>

                {/* Admin Content Area */}
                <div className="flex-grow flex flex-col gap-6">
                    {activeTab === 'status' && (
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5">
                            <h3 className="font-heading text-3xl text-primary mb-6">Course Operations</h3>
                            
                            <div className="grid grid-cols-1 gap-6">
                                {/* Course Status Toggle */}
                                <div className="flex items-center justify-between p-6 bg-gray-50 border border-black/10 rounded-sm">
                                    <div>
                                        <p className="font-body font-bold text-lg text-primary mb-1">Live Course Status</p>
                                        <p className="font-body text-sm text-textdark/60">Toggle to update the homepage hero and weather widget.</p>
                                        <p className="mt-2 font-body text-sm text-textdark/50">
                                            Currently: <strong className={courseOpen ? 'text-green-600' : 'text-red-600'}>{courseOpen ? 'OPEN' : 'CLOSED'}</strong>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setCourseOpen(!courseOpen)}
                                        className="flex items-center"
                                    >
                                        {courseOpen ? 
                                            <ToggleRight className="w-16 h-16 text-green-500" /> : 
                                            <ToggleLeft className="w-16 h-16 text-red-500" />
                                        }
                                    </button>
                                </div>

                                {/* Buggies Status Toggle */}
                                <div className="flex items-center justify-between p-6 bg-gray-50 border border-black/10 rounded-sm">
                                    <div>
                                        <p className="font-body font-bold text-lg text-primary mb-1">Buggies & Carts</p>
                                        <p className="font-body text-sm text-textdark/60">Toggle if golf buggies/carts are allowed on the course today.</p>
                                        <p className="mt-2 font-body text-sm text-textdark/50">
                                            Currently: <strong className={buggiesAllowed ? 'text-green-600' : 'text-red-600'}>{buggiesAllowed ? 'ALLOWED' : 'RESTRICTED'}</strong>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setBuggiesAllowed(!buggiesAllowed)}
                                        className="flex items-center"
                                    >
                                        {buggiesAllowed ? 
                                            <ToggleRight className="w-16 h-16 text-green-500" /> : 
                                            <ToggleLeft className="w-16 h-16 text-red-500" />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'shop' && (
                        <ShopAdmin products={products} setProducts={setProducts} />
                    )}

                    {activeTab === 'events' && (
                        <EventsAdmin events={events} setEvents={setEvents} />
                    )}
                </div>

            </div>
        </main>
    );
};

// Sub-components to keep the file clean

const ShopAdmin = ({ products, setProducts }) => {
    const handleAddProduct = () => {
        const newProduct = {
            id: `new-product-${Date.now()}`,
            name: 'New Product Name',
            price: '$0.00',
            img: '',
            desc: 'Product description goes here.',
            stock: 10
        };
        setProducts([newProduct, ...products]);
    };

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const handleUpdate = (id, field, value) => {
        setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    return (
        <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5">
            <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-4">
                <h3 className="font-heading text-3xl text-primary">Pro Shop Inventory</h3>
                <button onClick={handleAddProduct} className="flex items-center gap-2 bg-primary text-white px-4 py-2 text-xs uppercase font-bold tracking-wider hover:bg-accent hover:text-primary transition-colors">
                    <Plus size={16} /> Add Product
                </button>
            </div>

            <div className="flex flex-col gap-6">
                {products.map(product => (
                    <div key={product.id} className="border border-black/10 rounded-sm p-6 flex flex-col md:flex-row gap-6 relative">

                        <ImageDropzone
                            currentImage={product.img}
                            onImageUpload={(base64) => handleUpdate(product.id, 'img', base64)}
                        />

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase text-textdark/50 tracking-wider mb-1 font-bold">Product Name</label>
                                <input
                                    className="w-full border border-black/20 p-2 font-body text-sm outline-none focus:border-primary font-bold text-primary"
                                    value={product.name}
                                    onChange={(e) => handleUpdate(product.id, 'name', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-textdark/50 tracking-wider mb-1 font-bold">Price</label>
                                <input
                                    className="w-full border border-black/20 p-2 font-body text-sm outline-none focus:border-primary"
                                    value={product.price}
                                    onChange={(e) => handleUpdate(product.id, 'price', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase text-textdark/50 tracking-wider mb-1 font-bold">Image URL (Fallback to path if no drag/drop)</label>
                                <input
                                    className="w-full border border-black/20 p-2 font-body text-sm outline-none focus:border-primary"
                                    value={product.img}
                                    onChange={(e) => handleUpdate(product.id, 'img', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase text-textdark/50 tracking-wider mb-1 font-bold">Description (Store Info)</label>
                                <textarea
                                    className="w-full border border-black/20 p-2 font-body text-sm outline-none focus:border-primary h-20"
                                    value={product.desc}
                                    onChange={(e) => handleUpdate(product.id, 'desc', e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => handleDelete(product.id)}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EventsAdmin = ({ events, setEvents }) => {
    const handleAddEvent = () => {
        const newEvent = {
            id: `new-event-${Date.now()}`,
            title: 'New Golf Event',
            date: 'TBA',
            status: 'Upcoming',
            image: '',
            desc: 'Event details here.'
        };
        setEvents([newEvent, ...events]);
    };

    const handleDelete = (id) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const handleUpdate = (id, field, value) => {
        setEvents(events.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    return (
        <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5">
            <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-4">
                <h3 className="font-heading text-3xl text-primary">Events Manager</h3>
                <button onClick={handleAddEvent} className="flex items-center gap-2 bg-primary text-white px-4 py-2 text-xs uppercase font-bold tracking-wider hover:bg-accent hover:text-primary transition-colors">
                    <Plus size={16} /> Add Event
                </button>
            </div>

            <div className="flex flex-col gap-6">
                {events.map(ev => (
                    <div key={ev.id} className="border border-black/10 rounded-sm p-6 flex flex-col md:flex-row gap-6 relative">

                        <ImageDropzone
                            currentImage={ev.image}
                            onImageUpload={(base64) => handleUpdate(ev.id, 'image', base64)}
                        />

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase text-textdark/50 tracking-wider mb-1 font-bold">Event Title</label>
                                <input
                                    className="w-full border border-black/20 p-2 font-body text-sm outline-none focus:border-primary font-bold text-primary"
                                    value={ev.title}
                                    onChange={(e) => handleUpdate(ev.id, 'title', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-textdark/50 tracking-wider mb-1 font-bold">Date String</label>
                                <input
                                    className="w-full border border-black/20 p-2 font-body text-sm outline-none focus:border-primary"
                                    value={ev.date}
                                    onChange={(e) => handleUpdate(ev.id, 'date', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-textdark/50 tracking-wider mb-1 font-bold">Status Badge</label>
                                <select
                                    className="w-full border border-black/20 p-2 font-body text-sm outline-none focus:border-primary bg-white"
                                    value={ev.status}
                                    onChange={(e) => handleUpdate(ev.id, 'status', e.target.value)}
                                >
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Past">Past</option>
                                    <option value="Sold Out">Sold Out</option>
                                    <option value="Members Only">Members Only</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase text-textdark/50 tracking-wider mb-1 font-bold">Event Description</label>
                                <textarea
                                    className="w-full border border-black/20 p-2 font-body text-sm outline-none focus:border-primary h-24"
                                    value={ev.desc}
                                    onChange={(e) => handleUpdate(ev.id, 'desc', e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => handleDelete(ev.id)}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
