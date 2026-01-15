
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SimilarityList from '../components/SimilarityList';
import CompareModal from '../components/CompareModal';
import DbioAutocomplete from '../components/DbioAutocomplete';
import { Database, Home, Info, Search } from 'lucide-react';
import { DBIO_DETAILS, getSimilarQueries } from '../data/mockData';

const SearchResults = () => {
    const { dbioName } = useParams();
    const navigate = useNavigate();

    const [dbioInfo, setDbioInfo] = useState(null);
    const [selectedSubqueryId, setSelectedSubqueryId] = useState('1');
    const [similarItems, setSimilarItems] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [compareTarget, setCompareTarget] = useState(null);

    // Load DBIO Data
    useEffect(() => {
        const data = DBIO_DETAILS[dbioName];
        if (data) {
            setDbioInfo(data);
            setSelectedSubqueryId('1');
        } else {
            setDbioInfo(null);
        }
    }, [dbioName]);

    // Load Similar Queries when selection changes
    useEffect(() => {
        if (dbioName && selectedSubqueryId) {
            const timer = setTimeout(() => {
                const results = getSimilarQueries(selectedSubqueryId, dbioName);
                setSimilarItems(results);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [dbioName, selectedSubqueryId]);

    const handleCompare = (targetItem) => {
        setCompareTarget(targetItem);
        setIsModalOpen(true);
    };

    const currentQueryInfo = dbioInfo?.queries[selectedSubqueryId];

    const findTitleById = (node, id) => {
        if (!node) return null;
        if (node.id === id) return node.title;
        if (node.children) {
            for (const child of node.children) {
                const found = findTitleById(child, id);
                if (found) return found;
            }
        }
        return null;
    };

    // Helper to find the path (titles) to the selected node for breadcrumbs
    const findPathToId = (node, id, path = []) => {
        if (!node) return null;
        const newPath = [...path, node.title];
        if (node.id === id) return newPath;
        if (node.children) {
            for (const child of node.children) {
                const found = findPathToId(child, id, newPath);
                if (found) return found;
            }
        }
        return null;
    };

    const breadcrumbs = (dbioInfo ? findPathToId(dbioInfo.structure, selectedSubqueryId) : []) || [];
    const currentNodeData = dbioInfo?.queries[selectedSubqueryId];

    const leftQueryData = dbioInfo && currentQueryInfo ? {
        name: dbioInfo.name,
        title: findTitleById(dbioInfo.structure, selectedSubqueryId) || "Selected Query",
        description: dbioInfo.description,
        sql: currentQueryInfo.sql
    } : null;

    if (!dbioInfo) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-10">
                <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6 max-w-md w-full border border-slate-100">
                    <div className="bg-red-50 p-4 rounded-full">
                        <Info className="text-red-500" size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">DBIO Not Found</h2>
                    <p className="text-slate-500 text-center">The requested DBIO explorer page could not be found or has been moved.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary flex items-center gap-2 w-full justify-center"
                    >
                        <Home size={18} />
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background font-sans">
            {/* Left Sidebar */}
            <Sidebar
                dbioInfo={dbioInfo}
                selectedId={selectedSubqueryId}
                onSelect={setSelectedSubqueryId}
            />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Global Header */}
                <header className="h-16 px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between z-20 shrink-0 sticky top-0">
                    <div className="flex items-center gap-8">
                        {/* Breadcrumbs in Header */}
                        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            <span className="hover:text-brand transition-colors cursor-pointer" onClick={() => navigate('/')}>Home</span>
                            <span className="opacity-30">/</span>
                            <span>{dbioInfo.name}</span>
                            {breadcrumbs.map((title, i) => (
                                <React.Fragment key={i}>
                                    <span className="opacity-30 text-slate-300">/</span>
                                    <span className={i === breadcrumbs.length - 1 ? 'text-brand font-black' : 'text-slate-500'}>
                                        {title}
                                    </span>
                                </React.Fragment>
                            ))}
                        </nav>
                    </div>

                    <div className="flex-1 max-w-xl px-10 hidden md:block">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={16} />
                            <DbioAutocomplete />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
                        <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
                                KW
                            </div>
                            <span className="text-xs font-bold text-slate-600 hidden lg:block">Admin Project</span>
                        </div>
                    </div>
                </header>

                {/* Main Scrollable Area */}
                <div className="flex-1 overflow-y-auto bg-slate-50/30 scroll-smooth">
                    {/* 1. Reference Node Hero - Refined & Simplified */}
                    <div className="bg-white px-8 py-10">
                        <div className="max-w-5xl mx-auto">

                            {/* Node Info - Clean Typography */}
                            <div className="max-w-3xl">
                                <div className="inline-flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-mono font-bold text-slate-500 mb-4 tracking-tighter">
                                    NODE_ID: {selectedSubqueryId}
                                </div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-5">
                                    {findTitleById(dbioInfo.structure, selectedSubqueryId)}
                                </h1>
                                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                    {dbioInfo.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Results Section - High Focus */}
                    <div className="max-w-5xl mx-auto py-12 px-8">
                        <div className="mb-10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-1 h-6 bg-brand rounded-full" />
                                <h2 className="text-xl font-bold text-slate-900">
                                    Matching Queries
                                    <span className="ml-3 text-slate-400 font-normal text-sm">({similarItems.length})</span>
                                </h2>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100/50 px-3 py-1.5 rounded-full border border-slate-200/50">
                                Relevance Sort
                            </div>
                        </div>

                        <SimilarityList items={similarItems} onCompare={handleCompare} />
                    </div>
                </div>
            </main>

            {/* Modal remains same but uses tailwind internal logic */}
            {isModalOpen && leftQueryData && compareTarget && (
                <CompareModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    leftQuery={leftQueryData}
                    rightQuery={compareTarget}
                />
            )}
        </div>
    );
};

export default SearchResults;
