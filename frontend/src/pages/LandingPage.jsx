import React from "react";
import { Code2, Users2, Zap, Terminal, Sparkles, Globe } from "lucide-react";

const LandingPage = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-8 container mx-auto">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        CodeRoom
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#" className="hover:text-white transition">Features</a>
                    <a href="#" className="hover:text-white transition">Showcase</a>
                    <a href="#" className="hover:text-white transition">Community</a>
                </div>
                <button
                    onClick={onStart}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm font-semibold transition border border-slate-700/50"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-8 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    <span>New: Standard Input Support added</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 max-w-4xl leading-[1.1]">
                    Collaborate, Code, and Execute in <span className="text-indigo-500">Real-Time</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
                    The industry-standard collaborative environment for teams and interviews.
                    Write, sync, and execute code with your team seamlessly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onStart}
                        className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center gap-2 overflow-hidden"
                    >
                        <span className="relative z-10">Start For Free</span>
                        <Zap className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                    <button className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg transition border border-slate-800">
                        View Demo
                    </button>
                </div>

                {/* How it Works */}
                <div className="mt-48 w-full">
                    <h2 className="text-3xl font-bold mb-16">Three Steps to Collaboration</h2>
                    <div className="flex flex-col md:flex-row justify-center items-start gap-12 max-w-5xl mx-auto">
                        <Step n="1" title="Create Room" desc="Generate a unique room ID and share it with your team instantly." />
                        <div className="hidden md:block w-px h-24 bg-slate-800 mt-12 self-start" />
                        <Step n="2" title="Code Together" desc="Write code in real-time with zero-latency synchronization." />
                        <div className="hidden md:block w-px h-24 bg-slate-800 mt-12 self-start" />
                        <Step n="3" title="Execute & Debug" desc="Run your code with stdin support and see results in our unified console." />
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 w-full max-w-6xl text-left">
                    <FeatureCard
                        icon={<Users2 className="w-6 h-6 text-blue-400" />}
                        title="Room-Based Sync"
                        desc="Join or create rooms instantly. All changes are broadcasted to participants with low latency."
                    />
                    <FeatureCard
                        icon={<Terminal className="w-6 h-6 text-indigo-400" />}
                        title="Piston Execution"
                        desc="Integrated code execution engine supporting JS, Python, Java, C++, and more."
                    />
                    <FeatureCard
                        icon={<Globe className="w-6 h-6 text-emerald-400" />}
                        title="Global Access"
                        desc="Optimized for remote teams. Work from anywhere with persistent room state and history."
                    />
                </div>

                {/* Console Preview Area (Visual only) */}
                <div className="mt-32 w-full max-w-5xl relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
                    <div className="relative bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2 bg-slate-950/50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                            </div>
                            <div className="ml-4 px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-400 font-mono">coderoom-main.js</div>
                        </div>
                        <div className="p-8 text-left font-mono text-sm space-y-2">
                            <p><span className="text-pink-500">import</span> {"{ createRoom }"} <span className="text-pink-500">from</span> <span className="text-emerald-400">"coderoom-api"</span>;</p>
                            <p>&nbsp;</p>
                            <p><span className="text-cyan-400">const</span> room = <span className="text-yellow-400">createRoom</span>(<span className="text-emerald-400">"industry-standard"</span>);</p>
                            <p>&nbsp;</p>
                            <p>room.<span className="text-yellow-400">on</span>(<span className="text-emerald-400">"join"</span>, (user) ={">"} {"{"}</p>
                            <p>&nbsp;&nbsp;<span className="text-slate-500">// Welcome to the future of collaboration</span></p>
                            <p>&nbsp;&nbsp;console.<span className="text-yellow-400">log</span>(<span className="text-emerald-400">`$user joined the code session!`</span>);</p>
                            <p>{"}"});</p>
                        </div>
                    </div>
                </div>
                {/* Trusted By / Marquee */}
                <div className="mt-40 w-full overflow-hidden relative">
                    <div className="flex items-center gap-12 animate-marquee whitespace-nowrap opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {["Google", "Microsoft", "Meta", "Amazon", "Netflix", "Uber", "Airbnb"].map((tech) => (
                            <div key={tech} className="flex items-center gap-2 px-8 py-4 bg-slate-900/40 rounded-2xl border border-slate-800">
                                <Globe className="w-5 h-5 text-indigo-400" />
                                <span className="text-xl font-bold tracking-tight text-white">{tech}</span>
                            </div>
                        ))}
                        {/* Duplicate for infinite loop effect */}
                        {["Google", "Microsoft", "Meta", "Amazon", "Netflix", "Uber", "Airbnb"].map((tech) => (
                            <div key={`${tech}-2`} className="flex items-center gap-2 px-8 py-4 bg-slate-900/40 rounded-2xl border border-slate-800">
                                <Globe className="w-5 h-5 text-indigo-400" />
                                <span className="text-xl font-bold tracking-tight text-white">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="mt-48 w-full max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-slate-400">Choose the plan that's right for your collaboration needs.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PricingCard
                            name="Starter"
                            price="0"
                            features={["Unlimited Rooms", "Social Integration", "Basic Execution", "24h History"]}
                        />
                        <PricingCard
                            name="Pro"
                            price="29"
                            highlight
                            features={["Everything in Starter", "Private Rooms", "Advanced Debugging", "Permanent History"]}
                        />
                        <PricingCard
                            name="Enterprise"
                            price="Custom"
                            features={["Custom SSO", "Dedicated Support", "On-premise Options", "Audit Logs"]}
                        />
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-48 w-full max-w-4xl text-left bg-slate-900/30 p-12 rounded-[3rem] border border-slate-800/50">
                    <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <FAQItem
                            q="Is standard input (stdin) fully supported?"
                            a="Yes, we recently added full support for stdin. You can now pass inputs to your programs precisely as you would in a terminal environment."
                        />
                        <FAQItem
                            q="Which programming languages are supported?"
                            a="We currently support JavaScript, C++, Python, Java, and many more melalui the Piston execution engine."
                        />
                        <FAQItem
                            q="How do I invite others to my room?"
                            a="Simply copy the Room ID from the editor dashboard and share it with your colleagues. They can join instantly from the home page."
                        />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-900 bg-slate-950/50 relative z-10 py-12">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-indigo-500" />
                        <span className="font-bold text-slate-300">CodeRoom</span>
                    </div>
                    <p className="text-slate-500 text-sm">© 2026 CodeRoom Inc. All rights reserved.</p>
                    <div className="flex gap-6 text-slate-500 text-sm">
                        <a href="#" className="hover:text-white transition">Github</a>
                        <a href="#" className="hover:text-white transition">Twitter</a>
                        <a href="#" className="hover:text-white transition">Docs</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:border-indigo-500/30 hover:bg-slate-900/60 transition-all duration-300 group">
        <div className="mb-6 p-3 bg-slate-950 rounded-2xl w-fit group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">
            {desc}
        </p>
    </div>
);

const PricingCard = ({ name, price, features, highlight }) => (
    <div className={`p-8 rounded-[2.5rem] border transition-all duration-300 ${highlight ? 'bg-indigo-600 border-indigo-400 scale-105 shadow-[0_20px_50px_rgba(79,70,229,0.3)] z-10' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-extrabold">${price}</span>
            {price !== "Custom" && <span className="text-sm opacity-60">/month</span>}
        </div>
        <ul className="space-y-4 mb-8">
            {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm opacity-80">
                    <Zap className="w-4 h-4 shrink-0" />
                    {f}
                </li>
            ))}
        </ul>
        <button className={`w-full py-3 rounded-2xl font-bold transition ${highlight ? 'bg-white text-indigo-600 hover:bg-slate-100' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
            Choose Plan
        </button>
    </div>
);

const FAQItem = ({ q, a }) => (
    <div className="group border-b border-slate-800 pb-6 last:border-0">
        <h4 className="text-lg font-bold mb-3 flex items-center justify-between group-hover:text-indigo-400 transition cursor-pointer">
            {q}
            <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-50 transition" />
        </h4>
        <p className="text-slate-400 leading-relaxed text-sm max-w-3xl">
            {a}
        </p>
    </div>
);

const Step = ({ n, title, desc }) => (
    <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xs">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl mb-6">
            {n}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;
