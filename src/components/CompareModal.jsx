
import React from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import SqlViewer from './SqlViewer';
import './CompareModal.css';

const CompareModal = ({ isOpen, onClose, leftQuery, rightQuery }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay glass" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-title">
                        <ArrowRightLeft className="header-icon" />
                        <h2>Compare Queries</h2>
                    </div>
                    <button className="btn-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="split-view">
                        {/* Left Side: Original */}
                        <div className="split-pane">
                            <div className="pane-header">
                                <span className="badge original">Original</span>
                                <h3>{leftQuery.name} - {leftQuery.title}</h3>
                                <p>{leftQuery.description}</p>
                            </div>
                            <div className="pane-sql">
                                <SqlViewer sql={leftQuery.sql} />
                            </div>
                        </div>

                        {/* Right Side: Comparison */}
                        <div className="split-pane">
                            <div className="pane-header">
                                <span className="badge comparison">Comparison</span>
                                <h3>{rightQuery.dbioName} - {rightQuery.title}</h3>
                                <p>{rightQuery.description}</p>
                            </div>
                            <div className="pane-sql">
                                <SqlViewer sql={rightQuery.sql} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompareModal;
