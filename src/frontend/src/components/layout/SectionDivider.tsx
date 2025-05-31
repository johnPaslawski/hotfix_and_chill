import React from 'react';

interface SectionDividerProps {
    id?: string;
    children?: React.ReactNode;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ id, children }) => {
    return (
        <section id={id} className="h-screen">
            {children}
        </section>
    );
};

export default SectionDivider;