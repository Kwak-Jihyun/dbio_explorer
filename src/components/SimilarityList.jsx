
import React from 'react';
import { GitCompare, Percent } from 'lucide-react';
import './SimilarityList.css';

const SimilarityList = ({ items, onCompare }) => {
    return (
        <div className="similarity-list">
            {items.map((item, index) => (
                <div key={item.id} className="sim-card glass" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="sim-header">
                        <div className="sim-info">
                            <span className="sim-name">{item.dbioName}</span>
                            <h4 className="sim-title">{item.title}</h4>
                        </div>
                        <div className="sim-score">
                            <span className="score-value">{item.score}</span>
                            <span className="score-label">% Match</span>
                        </div>
                    </div>

                    <p className="sim-desc">{item.description}</p>

                    <div className="sim-actions">
                        <button className="btn-compare" onClick={() => onCompare(item)}>
                            <GitCompare size={16} />
                            <span>Compare Query</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SimilarityList;
