import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Database, ArrowRight } from 'lucide-react';
import { DBIO_NAMES } from '../data/mockData';

const DbioAutocomplete = ({ centered = false, className = "" }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 0) {
            const filtered = DBIO_NAMES.filter(name =>
                name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    const handleSelect = (name) => {
        setQuery(name);
        setIsOpen(false);
        navigate(`/search/${name}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (suggestions.length > 0 && query) {
                const match = suggestions.find(s => s === query) || suggestions[0];
                handleSelect(match);
            }
        }
    };

    return (
        <div className={`relative w-full ${centered ? 'max-w-2xl mx-auto' : ''}`} ref={wrapperRef}>
            <div className={`relative flex items-center group ${className}`}>
                <Search className="absolute left-4 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for DBIO (e.g., zord)..."
                    className={`w-full h-12 pl-12 pr-4 bg-slate-100/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium text-slate-900 placeholder:text-slate-400`}
                />
            </div>

            {isOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                        <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1 flex items-center justify-between">
                            <span>Suggestions Found</span>
                            <span>{suggestions.length} Results</span>
                        </div>
                        <ul className="max-h-64 overflow-y-auto">
                            {suggestions.map((name) => (
                                <li
                                    key={name}
                                    onClick={() => handleSelect(name)}
                                    className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 group/item transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover/item:bg-brand/10 group-hover/item:text-brand transition-colors">
                                            <Database size={14} />
                                        </div>
                                        <span className="font-semibold text-slate-700 group-hover/item:text-slate-900">
                                            {name}
                                        </span>
                                    </div>
                                    <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DbioAutocomplete;
