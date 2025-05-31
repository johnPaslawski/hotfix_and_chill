import React from 'react';

interface SectionDividerProps {
    id?: string;
    children?: React.ReactNode;
    className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ id, children, className }) => {
    return (
        <section id={id} className={`${className || ""}`}>
            {children}
        </section>
    );
};

export default SectionDivider;