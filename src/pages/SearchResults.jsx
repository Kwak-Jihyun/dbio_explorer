
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SimilarityList from '../components/SimilarityList';
import CompareModal from '../components/CompareModal';
import DbioAutocomplete from '../components/DbioAutocomplete';
import { Database } from 'lucide-react';
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

    const leftQueryData = dbioInfo && currentQueryInfo ? {
        name: dbioInfo.name,
        title: findTitleById(dbioInfo.structure, selectedSubqueryId) || "Selected Query",
        description: dbioInfo.description,
        sql: currentQueryInfo.sql
    } : null;

    if (!dbioInfo) {
        return (
            <div style={{ padding: 40, textAlign: 'center' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>DBIO Not Found</h2>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '10px 20px', background: 'var(--color-primary)',
                        color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
                    }}
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <Sidebar
                dbioInfo={dbioInfo}
                selectedId={selectedSubqueryId}
                onSelect={setSelectedSubqueryId}
            />

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <header style={{
                    padding: '12px 24px',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--bg-surface)',
                    zIndex: 10,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                        <div
                            onClick={() => navigate('/')}
                            style={{
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                                color: 'var(--color-primary)', fontWeight: 700
                            }}
                        >
                            <Database size={24} />
                            <span style={{ fontSize: '1.2rem', whiteSpace: 'nowrap' }}>DBIO Explorer</span>
                        </div>

                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <DbioAutocomplete />
                        </div>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '200px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                            Analyzing Selection
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                            <h2 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                                {findTitleById(dbioInfo.structure, selectedSubqueryId)}
                            </h2>
                            <span style={{
                                background: 'var(--color-primary)',
                                color: 'white',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                fontWeight: 700
                            }}>
                                {selectedSubqueryId}
                            </span>
                        </div>
                    </div>
                </header>

                <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-app)' }}>
                    <SimilarityList items={similarItems} onCompare={handleCompare} />
                </div>
            </main>

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
