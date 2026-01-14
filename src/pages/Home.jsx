
import React from 'react';
import DbioAutocomplete from '../components/DbioAutocomplete';
import { Database } from 'lucide-react';

const Home = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <div style={{
                    background: 'white',
                    width: '100px',
                    height: '100px',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <Database size={54} color="var(--color-primary)" />
                </div>
                <h1 className="text-gradient" style={{
                    fontSize: '3.5rem',
                    margin: '0 0 16px 0',
                    fontWeight: 800
                }}>
                    DBIO Explorer
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px' }}>
                    Intelligent SQL Similarity Search Service. Analyze and compare DBIO structures with ease.
                </p>
            </div>

            <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
                <DbioAutocomplete centered />
            </div>
        </div>
    );
};

export default Home;
