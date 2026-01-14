
import React from 'react';
import TreeNode from './TreeNode';
import './Sidebar.css';

const Sidebar = ({ dbioInfo, selectedId, onSelect }) => {
    if (!dbioInfo) return <div className="sidebar loading">Loading...</div>;

    return (
        <aside className="sidebar glass">
            <div className="sidebar-header">
                <h2 className="dbio-name text-gradient">{dbioInfo.name}</h2>
                <h3 className="dbio-title">{dbioInfo.title}</h3>
                <p className="dbio-desc">{dbioInfo.description}</p>
            </div>

            <div className="sidebar-tree">
                <div className="tree-header">Structure</div>
                <div className="tree-content">
                    <TreeNode
                        node={dbioInfo.structure}
                        selectedId={selectedId}
                        onSelect={onSelect}
                        level={1}
                    />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
