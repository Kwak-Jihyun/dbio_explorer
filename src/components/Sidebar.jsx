import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Layers } from 'lucide-react';
import TreeNode from './TreeNode';

const Sidebar = ({ dbioInfo, selectedId, onSelect }) => {
    const navigate = useNavigate();

    if (!dbioInfo) return (
        <aside className="w-80 h-full border-r border-slate-200 bg-white p-6 animate-pulse">
            <div className="h-6 w-32 bg-slate-100 rounded mb-4" />
            <div className="h-4 w-48 bg-slate-50 rounded mb-8" />
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 w-full bg-slate-50 rounded" />)}
            </div>
        </aside>
    );

    return (
        <aside className="w-80 h-full border-r border-slate-200 bg-white flex flex-col z-30 shadow-sm overflow-hidden">
            {/* Logo Area - Aligned with Header Height (h-16 = 64px) */}
            <div className="h-16 px-6 flex items-center border-b border-slate-200 shrink-0 bg-white">
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="bg-brand p-1.5 rounded-lg text-white shadow-sm transition-transform group-hover:scale-105">
                        <Database size={18} />
                    </div>
                    <span className="text-lg font-black tracking-tight text-slate-900 uppercase leading-none">
                        DBIO <span className="text-brand/80">Explorer</span>
                    </span>
                </div>
            </div>

            {/* DBIO Info Section */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/50 to-white">
                <div className="flex items-center gap-2 mb-3 text-brand font-bold uppercase tracking-wider text-[10px]">
                    <Layers size={14} />
                    Current DBIO
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">{dbioInfo.name}</h2>
                <h3 className="text-sm font-bold text-slate-600 mb-3">{dbioInfo.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500 font-medium line-clamp-3">{dbioInfo.description}</p>
            </div>

            {/* Tree Section */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 pt-6 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Structure</div>
                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <TreeNode
                        node={dbioInfo.structure}
                        selectedId={selectedId}
                        onSelect={onSelect}
                        level={1}
                    />
                </div>
            </div>

            {/* Footer Status */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/30">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    System Active
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
