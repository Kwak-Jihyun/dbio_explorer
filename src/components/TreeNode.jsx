import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Database, Code } from 'lucide-react';

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
        <div className="select-none">
            <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group
                    ${isSelected
                        ? 'bg-brand text-white shadow-md shadow-brand/20'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
                style={{ marginLeft: `${(level - 1) * 12}px` }}
                onClick={handleClick}
            >
                <div
                    className={`flex items-center justify-center w-4 h-4 rounded transition-colors
                        ${hasChildren ? 'hover:bg-black/5' : ''}
                    `}
                    onClick={hasChildren ? handleToggle : undefined}
                >
                    {hasChildren && (
                        isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    )}
                </div>

                <div className={`
                    ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-brand'}
                `}>
                    {level === 1 ? <Database size={14} /> : <Code size={14} />}
                </div>

                <div className="flex flex-col min-w-0">
                    <span className={`text-[10px] font-mono font-bold leading-none mb-0.5
                        ${isSelected ? 'text-white/70' : 'text-slate-400'}
                    `}>
                        {node.id}
                    </span>
                    <span className={`text-xs font-medium truncate
                        ${isSelected ? 'text-white' : 'text-slate-700'}
                    `}>
                        {node.title}
                    </span>
                </div>
            </div>

            {hasChildren && isExpanded && (
                <div className="mt-0.5">
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
