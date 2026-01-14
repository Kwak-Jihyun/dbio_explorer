
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Database, Code } from 'lucide-react';
import './TreeNode.css';

const TreeNode = ({ node, selectedId, onSelect, level = 1 }) => {
    const [isExpanded, setIsExpanded] = useState(level <= 2);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedId === node.id;

    const handleToggle = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleClick = () => {
        onSelect(node.id);
    };

    return (
        <div className="tree-node" style={{ paddingLeft: `${(level - 1) * 12}px` }}>
            <div
                className={`node-content ${isSelected ? 'selected' : ''}`}
                onClick={handleClick}
            >
                <span className="toggle-icon" onClick={hasChildren ? handleToggle : undefined}>
                    {hasChildren && (
                        isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    )}
                    {!hasChildren && <span className="spacer" />}
                </span>

                <span className="node-icon">
                    {level === 1 ? <Database size={14} className="icon-root" /> : <Code size={14} className="icon-sub" />}
                </span>

                <span className="node-title">
                    <span className="node-id">{node.id}</span>
                    <span className="node-label">{node.title}</span>
                </span>
            </div>

            {hasChildren && isExpanded && (
                <div className="node-children">
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
