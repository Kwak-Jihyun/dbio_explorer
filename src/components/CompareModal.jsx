import React, { useEffect } from 'react';
import { X, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';
import SqlViewer from './SqlViewer';

const CompareModal = ({ isOpen, onClose, leftQuery, rightQuery }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
            style={{ animation: 'fadeIn 0.2s ease-out forwards' }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative w-full max-w-7xl h-full max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/20"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
            >
                <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
                            <ArrowRightLeft size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 leading-tight">Query Comparison</h2>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Side-by-side SQL analysis</p>
                        </div>
                    </div>

                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-all active:scale-90"
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 min-h-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
                    {/* Left Side: Original */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="p-6 bg-slate-50/30 border-b border-slate-100">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                    <Sparkles size={10} />
                                    Original Source
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{leftQuery.title}</h3>
                            <p className="text-xs text-slate-500 line-clamp-1">{leftQuery.description}</p>
                        </div>
                        <div className="flex-1 overflow-auto bg-slate-950">
                            <SqlViewer sql={leftQuery.sql} />
                        </div>
                    </div>

                    {/* Right Side: Comparison */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="p-6 bg-slate-50/30 border-b border-slate-100">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded uppercase tracking-wider">
                                    <AlertCircle size={10} />
                                    Similar Match
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">
                                    Match Score: {rightQuery.score}%
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{rightQuery.title}</h3>
                            <p className="text-xs text-slate-500 line-clamp-1">{rightQuery.description}</p>
                        </div>
                        <div className="flex-1 overflow-auto bg-slate-950">
                            <SqlViewer sql={rightQuery.sql} />
                        </div>
                    </div>
                </div>

                <div className="px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Dismiss
                    </button>
                    <button
                        onClick={onClose}
                        className="btn-primary"
                    >
                        Apply Changes
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}} />
        </div>
    );
};

export default CompareModal;
