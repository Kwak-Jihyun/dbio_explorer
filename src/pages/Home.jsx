import React from 'react';
import DbioAutocomplete from '../components/DbioAutocomplete';
import { Database, Search, Zap, Shield, BarChart3 } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand/5 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
                <div className="mb-12 text-center">
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 bg-brand/20 blur-2xl rounded-full" />
                        <div className="relative bg-white w-24 h-24 rounded-3xl shadow-2xl flex items-center justify-center border border-slate-100 transform active:scale-95 transition-transform duration-300">
                            <Database size={48} className="text-brand" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-accent text-white p-2 rounded-xl shadow-lg">
                            <Zap size={16} fill="white" />
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                        DBIO <span className="text-brand">Explorer</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Intelligent SQL Similarity Search Service. Analyze, visualize, and compare complex database structures with machine learning precision.
                    </p>
                </div>

                <div className="w-full max-w-2xl mb-16">
                    <DbioAutocomplete centered className="shadow-2xl shadow-brand/10" />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-brand/10 text-brand rounded-lg flex items-center justify-center mb-4">
                            <Search size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Deep Search</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Instantly locate any DBIO across your entire enterprise infrastructure.</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4">
                            <BarChart3 size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Similarity Score</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Advanced algorithms calculate structural similarity between complex queries.</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-4">
                            <Shield size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Safe Analysis</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Read-only exploration of metadata without impacting production performance.</p>
                    </div>
                </div>
            </div>

            <footer className="absolute bottom-8 text-slate-400 text-xs font-medium flex items-center gap-4">
                <span>© 2026 DBIO Explorer AI</span>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <span>Powered by Advanced SQL Analysis</span>
            </footer>
        </div>
    );
};

export default Home;
