
import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-sql';

const SqlViewer = ({ sql }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, [sql]);

    return (
        <div className="sql-viewer" style={{
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#f8f9fa',
            height: '100%',
            border: '1px solid var(--border-color)'
        }}>
            <pre style={{ margin: 0, height: '100%', overflow: 'auto', padding: '16px' }}>
                <code className="language-sql">
                    {sql}
                </code>
            </pre>
        </div>
    );
};

export default SqlViewer;
