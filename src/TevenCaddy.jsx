import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useChat } from 'ai/react';

export const TevenCaddy = () => {
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    // We are using the Vercel AI SDK here. 
    // In a real app we'd need an API route, but for this frontend demo we mock it out 
    // or point to a local proxy function.
    // For the sake of this local frontend demo without a backend, we'll manually handle the state 
    // to simulate the "Teven Caddy" AI responses based on the user's prompt.

    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Welcome to Teven Golf Course! I'm your digital caddy. Ask me anything about Teven's local rules or Golf Australia rules." }
    ]);
    const [input, setInput] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Added event listener to open caddy from remote buttons
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

        // Simulated AI Processing for the demo
        setTimeout(() => {
            let responseContent = "I'm not quite sure about that specific situation. As per standard Golf Australia rules, when in doubt, play two balls and check with the clubhouse after your round.";

            const lowerInput = userMessage.content.toLowerCase();

            if (lowerInput.includes('road') && (lowerInput.includes('3') || lowerInput.includes('4') || lowerInput.includes('5') || lowerInput.includes('8'))) {
                responseContent = "If you hit the ball on the road on holes 3, 4, 5, or 8: That is Out of Bounds. You must take a 1 shot penalty and play your 3rd shot off the tee, OR you can take a 2 shot penalty and play your 4th shot from where the ball entered the Out of Bounds area.";
            }
            else if (lowerInput.includes('garden') && lowerInput.includes('9')) {
                responseContent = "If you hit it in a garden bed on hole 9: Any man-made garden beds clearly bordered by garden edging are considered Ground Under Repair. You may take a free drop, one club length, no closer to the hole.";
            }
            else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                responseContent = "Hello! How is your round going? Let me know if you need any rulings.";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
        }, 1000);
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
