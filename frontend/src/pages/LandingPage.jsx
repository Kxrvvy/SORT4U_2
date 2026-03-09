import { Link } from "react-router-dom";
import logoIcon from "@/assets/Logo Design for SORT4U Web Application(1).png";

export default function LandingPage() {
    return (
        <div className="w-full bg-[#f8f9fb] overflow-x-hidden font-sans">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-white py-3 px-6 sm:px-12 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <img src={logoIcon} alt="SORT4U Logo" className="h-7 w-7" />
                    <span className="font-black text-lg tracking-tight text-gray-900">SORT4U</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Link to="/login">
                        <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                            Log in
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="px-5 py-2 text-sm font-bold bg-[#1a1a2e] text-white rounded-xl hover:opacity-90 transition-opacity">
                            Sign up free
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-28 pb-12 px-6 sm:px-12 max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
                            ✦ Built for students & young professionals
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-gray-900 mb-5">
                            Your life,<br />
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #22c55e, #3b82f6, #a855f7)' }}>
                                sorted.
                            </span>
                        </h1>
                        <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                            One app for tracking your food, preserving memories, and managing your budget — without the clutter.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <Link to="/signup">
                                <button className="px-8 py-3.5 bg-[#1a1a2e] text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm shadow-lg shadow-gray-900/20">
                                    Get started — it's free
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="px-8 py-3.5 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:border-gray-400 transition-all text-sm">
                                    I have an account
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Bento Grid Preview */}
                    <div className="flex-1 w-full max-w-sm lg:max-w-none">
                        <div className="grid grid-cols-2 gap-3">
                            {/* Calorie Card */}
                            <div className="col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-black uppercase tracking-widest text-green-600">Calorie Tracker</span>
                                    <span className="text-lg">🥗</span>
                                </div>
                                <div className="flex items-end gap-3">
                                    <div>
                                        <p className="text-3xl font-black text-gray-900">1,840</p>
                                        <p className="text-xs text-gray-400 font-medium">kcal today</p>
                                    </div>
                                    <div className="flex-1 flex items-end gap-1 pb-1">
                                        {[60, 80, 50, 90, 70, 85, 65].map((h, i) => (
                                            <div key={i} className="flex-1 rounded-sm bg-green-100" style={{ height: `${h * 0.4}px` }}>
                                                <div className="w-full rounded-sm bg-green-500" style={{ height: `${h * 0.4 * 0.7}px` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Memory Card */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                                <span className="text-lg mb-2 block">📸</span>
                                <p className="text-xs font-black uppercase tracking-widest text-purple-600 mb-1">Memory Lane</p>
                                <p className="text-sm font-bold text-gray-800 leading-tight">"Beach Trip 2025"</p>
                                <p className="text-[10px] text-purple-400 mt-1">#summer</p>
                            </div>

                            {/* Budget Card */}
                            <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                                <span className="text-lg mb-2 block">💰</span>
                                <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-1">Budget</p>
                                <p className="text-2xl font-black text-gray-900">₱3.2k</p>
                                <p className="text-[10px] text-blue-400 mt-1">saved this month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted by tagline */}
            <div className="py-8 px-6 text-center">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Three tools. One app. Zero overwhelm.</p>
            </div>

            {/* Features — Card Grid */}
            <section className="py-12 px-6 sm:px-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Feature 1 */}
                    <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mb-5">🥗</div>
                        <h3 className="text-lg font-black text-gray-900 mb-2">Smart Calorie Tracker</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4">
                            Type the name of any food and our AI instantly estimates calories. No forms, no barcode scanning.
                        </p>
                        <div className="bg-green-50 rounded-xl px-4 py-3 border border-green-100">
                            <p className="text-xs font-bold text-green-700">✓ AI-powered estimation</p>
                            <p className="text-xs font-bold text-green-700 mt-1">✓ Daily intake overview</p>
                            <p className="text-xs font-bold text-green-700 mt-1">✓ Built-in progress charts</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mb-5">📸</div>
                        <h3 className="text-lg font-black text-gray-900 mb-2">Memory Lane</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4">
                            Upload a photo, add tags, set a reminder date. Your memories come back to life when you need them most.
                        </p>
                        <div className="bg-purple-50 rounded-xl px-4 py-3 border border-purple-100">
                            <p className="text-xs font-bold text-purple-700">✓ Photo-first reminders</p>
                            <p className="text-xs font-bold text-purple-700 mt-1">✓ Tags + notes support</p>
                            <p className="text-xs font-bold text-purple-700 mt-1">✓ Filter by status</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-5">💰</div>
                        <h3 className="text-lg font-black text-gray-900 mb-2">Budget Tracker</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4">
                            Set a spending limit or savings goal. Log expenses by category and stay on track — no financial expertise needed.
                        </p>
                        <div className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
                            <p className="text-xs font-bold text-blue-700">✓ Goal-based planning</p>
                            <p className="text-xs font-bold text-blue-700 mt-1">✓ Expense categories</p>
                            <p className="text-xs font-bold text-blue-700 mt-1">✓ Spending trend charts</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 px-6 sm:px-12 max-w-4xl mx-auto text-center">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">How it works</p>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-14">Up and running in minutes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { step: "01", title: "Create your account", desc: "Sign up in seconds — no credit card, no commitments." },
                        { step: "02", title: "Pick your tools", desc: "Start with one feature or use all three from day one." },
                        { step: "03", title: "Stay sorted", desc: "Log, track, and relive — all in one clean interface." },
                    ].map(({ step, title, desc }) => (
                        <div key={step} className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-[#1a1a2e] text-white rounded-2xl flex items-center justify-center font-black text-lg mb-4">
                                {step}
                            </div>
                            <h4 className="font-black text-gray-900 mb-2">{title}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why section — horizontal pills */}
            <section className="py-16 px-6 sm:px-12 bg-white border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 text-center">Why SORT4U?</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            "📱 One app instead of three",
                            "🤖 AI calorie estimation",
                            "🎨 Clean, distraction-free UI",
                            "🎓 Made for students",
                            "🔒 Your data stays yours",
                            "🌏 Designed for daily life",
                            "🧘 Simple, not overwhelming",
                            "🎯 Goal-driven budgeting",
                        ].map((item, i) => (
                            <span key={i} className="bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 rounded-3xl overflow-hidden flex items-center justify-center bg-[#1a1a2e]">
                    <img src={logoIcon} alt="SORT4U" className="w-10 h-10 object-contain" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
                    Ready to get<br />sorted?
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mb-10 max-w-sm mx-auto leading-relaxed">
                    Join and start tracking what matters — your health, memories, and money.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/signup">
                        <button className="px-10 py-4 bg-[#1a1a2e] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-gray-900/20 text-sm">
                            Create free account
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="px-10 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:border-gray-400 transition-all text-sm">
                            Log in
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-white border-t border-gray-100 py-6 px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <img src={logoIcon} alt="SORT4U" className="h-5 w-5 opacity-40" />
                    <span className="text-xs font-bold text-gray-400">SORT4U</span>
                </div>
                <p className="text-xs text-gray-400">© 2026 SORT4U. All rights reserved.</p>
            </footer>
        </div>
    );
}
