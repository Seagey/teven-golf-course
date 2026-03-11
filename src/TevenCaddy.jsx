import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const TevenCaddy = () => {
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Welcome to Teven Golf Course! I'm your digital caddy. Ask me anything about Teven's local rules or Golf Australia (GA) rules." }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('openTevenCaddy', handleOpen);
        return () => window.removeEventListener('openTevenCaddy', handleOpen);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
                setIsTyping(false);
                setMessages(prev => [...prev, { role: 'assistant', content: "I am currently offline. Please ask the site administrator to add their Gemini API Key to my settings so I can help answer GA Rules!" }]);
                return;
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            // Create a system prompt context dynamically
            const systemPrompt = `You are the Teven Golf Course Digital Caddy. You are a polite, helpful expert in Golf Australia (GA) Rules, general golf etiquette, and specifically Teven Golf Course's Local Rules. Answer concisely and conversationally. Do not use extremely long paragraphs. Use your knowledge of these local rules to guide answers even if the situation isn't an exact match.

TEVEN GOLF COURSE LOCAL RULES:
1. Out of Bounds (OOB) - General (Rule 18-2): Defined by white markers, any boundary fence, and on or over the main internal road. Trespassing on adjoining properties is prohibited.
2. Out of Bounds, Stroke and Distance (Model Local Rule E-5): Players may proceed for a 2-stroke penalty, instead of returning to the tee (applies to Holes 1, 3, 8, etc.). For example, Hole 8 has a Drop Zone peg to drop within one club length for a 2-shot penalty.
3. OOB Fence: If a ball is in bounds but resting against an OOB fence, there is NO free relief. Play it as it lies, or take a 1-shot penalty for an unplayable lie.
4. Waterways (Red Penalty Areas - Rule 17.1d): All waterways on course are defined as red penalty areas (1-shot penalty). Drop on the side where it crossed the margin. For convenience on Hole 3, there is a designated Drop Zone to avoid steep banks.
5. Hole 1 Tee Bush/Hazard Drop Zone: If you duff into the left bush or slice into the right bush off the 1st tee, you can use the Drop Zone closer to the green for a 1-shot penalty (playing your 3rd shot) instead of re-teeing.
6. Hole 1 Green Drop Zone (Model Local Rule E-1.1): If a player's ball is in the penalty area to the right of the first green, relief may be taken within two club lengths of the blue stake at the bottom of the hill, under penalty of one stroke.
7. Roads and Paths (Rule 16.1): Free relief is available within course bounds.
8. Overhead Wires Rule (Model Local Rule E-11): A ball striking overhead wires must be replayed without penalty.
9. "The Scorpion" & Garden Beds (Hole 9): Long over the 9th green into the bordered garden beds (metal edging) is Ground Under Repair. You get FREE RELIEF (no penalty) to protect the garden and yourself. Pick up the ball, find the nearest point of complete relief on an arc (no closer to the hole) where both your ball and swing are unobstructed, drop within a club length, and play.

Always refer to standard Golf Australia rules for scenarios outside these local exceptions.`;

            let chatHistory = systemPrompt + "\n\n";
            messages.forEach(m => {
                chatHistory += `\n${m.role}: ${m.content}`;
            });
            chatHistory += `\nuser: ${input}\nassistant: `;

            const result = await model.generateContent(chatHistory);
            const responseText = result.response.text();

            setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I had a little trouble checking the rulebook just now. Can you ask me again?" }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-accent rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-accent/30 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            >
                <MessageCircle size={28} />
            </button>

            <div className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>

                {/* Header */}
                <div className="bg-primary text-white p-4 flex items-center justify-between border-b border-accent/30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-heading font-bold text-lg">C</div>
                        <div>
                            <h3 className="font-heading font-medium text-lg leading-tight text-accent">Teven Caddy</h3>
                            <p className="font-body text-[10px] text-white/50 tracking-widest uppercase">AI Rules Assistant</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-background/50 flex flex-col gap-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-2xl font-body text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-primary text-accent rounded-tr-sm'
                                : 'bg-white text-textdark border border-black/5 shadow-sm rounded-tl-sm'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white text-textdark border border-black/5 shadow-sm rounded-tl-sm p-4 rounded-2xl flex items-center justify-center gap-1">
                                <div className="w-1.5 h-1.5 bg-black/30 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-black/30 rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-black/30 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-black/5">
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about a ruling..."
                            className="w-full bg-background border border-black/10 rounded-full py-3 pl-4 pr-12 font-body text-sm outline-none focus:border-accent transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-2 w-8 h-8 flex items-center justify-center bg-accent text-primary rounded-full disabled:opacity-50 transition-opacity"
                        >
                            <Send size={14} className="ml-px" />
                        </button>
                    </form>
                </div>

            </div>
        </>
    );
};
