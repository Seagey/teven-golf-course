import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronDown, ChevronUp, Star, Store } from 'lucide-react';
import { GlobalStateContext } from '../context/GlobalStateContext';

export const Shop = () => {
    const { products } = useContext(GlobalStateContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 pb-24 bg-background min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <span className="text-accent tracking-widest text-xs uppercase font-medium mb-3 block text-center">Apparel & Equipment</span>
                <h1 className="font-heading text-5xl md:text-6xl text-primary text-center mb-8">The Pro Shop</h1>

                <div className="max-w-2xl mx-auto bg-white p-6 border border-black/10 text-center rounded-sm mb-16 shadow-sm flex flex-col items-center gap-3">
                    <Store className="w-8 h-8 text-accent mb-2" />
                    <p className="font-body text-textdark/70 text-sm font-medium leading-relaxed">
                        We have demo wedges and putters available to order in store. Balls, tees, clothing, and much more are all available strictly in store only. Visit our pro shop during your next round!
                    </p>
                </div>

                {/* Shopify style grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((item) => (
                        <Link to={`/shop/${item.id}`} key={item.id} className="group flex flex-col items-center text-center">
                            <div className="relative w-full aspect-[4/5] bg-white mb-6 overflow-hidden flex items-center justify-center border border-black/5">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Quick shop overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className="w-full bg-primary text-white py-3 text-xs tracking-widest uppercase font-medium hover:bg-accent hover:text-primary transition-colors flex items-center justify-center gap-2">
                                        <ShoppingBag size={14} /> Quick View
                                    </span>
                                </div>
                            </div>
                            <h3 className="font-heading text-xl text-primary group-hover:text-accent transition-colors">{item.name}</h3>
                            <p className="font-body font-medium text-textdark/70 mt-2">{item.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
};

export const Product = () => {
    const { id } = useParams();
    const { products } = useContext(GlobalStateContext);
    const product = products.find(p => p.id === id);
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[1] : null);
    const [openAccordion, setOpenAccordion] = useState('description');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!product && products.length > 0) {
            navigate('/shop');
        }
    }, [id, product, products, navigate]);

    if (!product) return null;

    const toggleAccordion = (section) => {
        setOpenAccordion(prev => prev === section ? null : section);
    };

    return (
        <main className="pt-32 pb-24 bg-white min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Breadcrumbs */}
                <div className="flex gap-2 text-xs font-body uppercase tracking-widest font-medium text-textdark/50 mb-12">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-primary">{product.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Left: Image Gallery */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <div className="bg-[#f4f4f4] aspect-[4/5] flex items-center justify-center p-8 overflow-hidden rounded-sm relative group cursor-zoom-in">
                            <img src={product.img} alt={product.name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        {/* Thumbnails (mocked to just the one image for now) */}
                        <div className="flex gap-4">
                            <div className="w-20 h-20 bg-[#f4f4f4] border border-primary p-2 cursor-pointer rounded-sm">
                                <img src={product.img} alt="Thumbnail 1" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Details (Shopify Style) */}
                    <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pr-12">
                        <span className="text-xs font-body tracking-widest uppercase text-textdark/50 mb-2">Teven Pro Shop</span>
                        <h1 className="font-heading text-4xl lg:text-[2.75rem] text-primary mb-4 leading-tight">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-4">
                            <p className="font-body text-xl font-medium text-primary">{product.price}</p>
                            <div className="flex items-center text-accent">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-accent" />)}
                                <span className="text-textdark/50 text-xs ml-2 font-body font-medium">12 reviews</span>
                            </div>
                        </div>

                        <p className="font-body text-xs text-textdark/50 mb-8 pb-8 border-b border-black/10">
                            Tax included. <Link to="#" className="underline underline-offset-2 hover:text-primary">Shipping</Link> calculated at checkout.
                        </p>

                        {/* Variants */}
                        {product.sizes && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block font-body text-sm text-primary font-medium">Size</label>
                                    <span className="text-xs text-textdark/50 underline cursor-pointer hover:text-primary">Size guide</span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`h-11 px-4 min-w-[3.5rem] border rounded-sm font-body text-sm transition-all ${selectedSize === size ? 'border-primary bg-primary text-white' : 'border-black/20 text-textdark hover:border-primary'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.variants && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block font-body text-sm text-primary font-medium">Style</label>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant}
                                            onClick={() => setSelectedSize(variant)} // Reusing selectedSize state for simplicity since a product has either size OR variant
                                            className={`h-11 px-6 border rounded-sm font-body text-sm transition-all ${selectedSize === variant || (!selectedSize && product.variants[0] === variant) ? 'border-primary bg-primary text-white' : 'border-black/20 text-textdark hover:border-primary'}`}
                                        >
                                            {variant}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity and Actions */}
                        <div className="mb-6 flex flex-col gap-4">
                            <label className="block font-body text-sm text-primary font-medium">Quantity</label>
                            <div className="flex gap-4">
                                <div className="flex items-center border border-black/20 rounded-sm w-[120px] h-12">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-1/3 h-full flex items-center justify-center text-textdark hover:text-primary transition-colors">-</button>
                                    <input type="text" value={quantity} readOnly className="w-1/3 text-center font-body outline-none" />
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-1/3 h-full flex items-center justify-center text-textdark hover:text-primary transition-colors">+</button>
                                </div>
                                <button className="flex-1 bg-transparent border border-primary text-primary h-12 rounded-sm font-medium tracking-widest text-xs uppercase hover:bg-primary/5 transition-colors">
                                    Add to cart
                                </button>
                            </div>

                            {/* Dynamic Checkout Button (Shopify hallmark) */}
                            <button className="w-full bg-[#5a31f4] text-white h-12 rounded-sm font-medium text-sm hover:bg-[#4b27d4] transition-colors flex items-center justify-center gap-2">
                                Buy it now
                            </button>
                        </div>

                        <div className="mt-4 mb-10 space-y-3 font-body text-sm text-textdark/60 font-light flex flex-col">
                            <p className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Pickup available at <strong>Teven Golf Course</strong></p>
                            <p className="pl-4 text-xs">Usually ready in 24 hours</p>
                        </div>

                        <div className="w-full border-t border-black/10">
                            {/* Description Accordion */}
                            <div className="border-b border-black/10">
                                <button
                                    onClick={() => toggleAccordion('description')}
                                    className="w-full py-5 flex items-center justify-between hover:text-accent transition-colors"
                                >
                                    <span className="font-heading text-xl text-primary">Description</span>
                                    {openAccordion === 'description' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 font-body text-textdark/70 font-light leading-relaxed ${openAccordion === 'description' ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                                    {product.desc}
                                </div>
                            </div>

                            {/* Shipping Accordion */}
                            <div className="border-b border-black/10">
                                <button
                                    onClick={() => toggleAccordion('shipping')}
                                    className="w-full py-5 flex items-center justify-between hover:text-accent transition-colors"
                                >
                                    <span className="font-heading text-xl text-primary">Shipping & Returns</span>
                                    {openAccordion === 'shipping' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 font-body text-textdark/70 text-sm font-light leading-relaxed ${openAccordion === 'shipping' ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                                    Standard shipping takes 3-5 business days. Free shipping on orders over $150. Returns accepted within 30 days of purchase in unworn condition.
                                </div>
                            </div>

                            {/* Course Pickup Accordion */}
                            <div className="border-b border-black/10">
                                <button
                                    onClick={() => toggleAccordion('pickup')}
                                    className="w-full py-5 flex items-center justify-between hover:text-accent transition-colors"
                                >
                                    <span className="font-heading text-xl text-primary">Click & Collect</span>
                                    {openAccordion === 'pickup' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 font-body text-textdark/70 text-sm font-light leading-relaxed ${openAccordion === 'pickup' ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                                    Pickup your items directly from the Pro Shop before your tee time. Simply select "Local Pickup" during checkout and show your confirmation email at the door.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};
