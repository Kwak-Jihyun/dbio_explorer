import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-sql';

const SqlViewer = ({ sql }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, [sql]);

    return (
        <div className="h-full w-full bg-[#2d2d2d] selection:bg-brand/30">
            <pre className="m-0 h-full overflow-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <code className="language-sql block text-sm font-mono leading-relaxed">
                    {sql}
                </code>
            </pre>
        </div>
    );
};

export default SqlViewer;
