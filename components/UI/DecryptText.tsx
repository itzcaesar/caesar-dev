import React from 'react';

interface DecryptTextProps {
    text: string;
    className?: string;
    speed?: number;
    revealDirection?: 'start' | 'end' | 'random';
    useOriginalCharsOnly?: boolean;
}

export const DecryptText: React.FC<DecryptTextProps> = ({ text, className = '' }) => {
    return <span className={className}>{text}</span>;
};
