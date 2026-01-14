
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { DBIO_NAMES } from '../data/mockData';
import './DbioAutocomplete.css';

const DbioAutocomplete = ({ centered = false }) => {
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
                // If exact match or top suggestion
                const match = suggestions.find(s => s === query) || suggestions[0];
                handleSelect(match);
            }
        }
    };

    return (
        <div className={`autocomplete-wrapper ${centered ? 'centered' : ''}`} ref={wrapperRef}>
            <div className="input-group glass">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for DBIO (e.g., zord_svc_s001)..."
                    className="search-input"
                />
            </div>
            {isOpen && suggestions.length > 0 && (
                <ul className="suggestions-list glass">
                    {suggestions.map((name) => (
                        <li key={name} onClick={() => handleSelect(name)} className="suggestion-item">
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DbioAutocomplete;
