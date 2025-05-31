import React from 'react';

interface SectionDividerProps {
    id?: string;
    children?: React.ReactNode;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ id, children }) => {
    return (
        <section id={id} className="min-h-screen p-8">
            {children}
        </section>
    );
};

export default SectionDivider;