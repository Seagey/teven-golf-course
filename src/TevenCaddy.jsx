import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

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
            // We now call our own backend API instead of calling Google directly
            // This keeps your GEMINI_API_KEY safe and hidden from the browser
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: messages,
                    input: input
                }),
            });

            if (!response.ok) {
                // Check if we accidentally got an HTML page back (e.g. from Vite dev server or Vercel Auth proxy)
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('text/html')) {
                    throw new Error("Received HTML error page. If running locally, ensure you use `npx vercel dev` instead of `npm run dev`. If on Vercel Preview, ensure Vercel Authentication is off or bypassable for APIs.");
                }
                const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
                throw new Error(errorData.error || `Failed to get response: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                throw new Error("Received HTML instead of JSON. If running locally, you must run `npx vercel dev` instead of `npm run dev` to enable the backend API.");
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
        } catch (error) {
            console.error("AI Error:", error);
            // Display the specific error message if it's our dev error, otherwise default to the friendly message
            const errorMessage = error.message.includes("npx vercel dev") 
                ? `Dev Error: ${error.message}`
                : "Sorry, I had a little trouble checking the rulebook just now. Can you ask me again?";
            
            setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
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
