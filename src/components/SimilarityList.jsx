import React from 'react';
import { GitCompare, Target, ArrowRight } from 'lucide-react';

const SimilarityList = ({ items, onCompare }) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all duration-300 relative overflow-hidden"
                    style={{ animation: `fadeInUp 0.5s ease-out forwards ${index * 0.1}s`, opacity: 0 }}
                >
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-16 -mt-16 group-hover:bg-brand/10 transition-colors duration-300" />

                    <div className="relative flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[10px] font-bold text-brand uppercase tracking-widest bg-brand/10 px-2 py-0.5 rounded">
                                        {item.dbioName}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-400">
                                        ID: {item.id}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand transition-colors line-clamp-1">
                                    {item.title}
                                </h4>
                            </div>

                            <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 group-hover:bg-brand/5 group-hover:border-brand/20 transition-all">
                                <span className="text-2xl font-black text-slate-900 group-hover:text-brand transition-colors leading-none mb-1">
                                    {item.score}
                                </span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                    % Match
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2 flex-grow">
                            {item.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                            </div>

                            <button
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-50 text-sky-600 border border-sky-100 rounded-xl text-sm font-bold hover:bg-brand hover:text-white hover:border-brand hover:shadow-lg hover:shadow-brand/30 active:scale-95 transition-all group/btn"
                                onClick={() => onCompare(item)}
                            >
                                <GitCompare size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                <span>Compare</span>
                                <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}} />
        </div>
    );
};

export default SimilarityList;
