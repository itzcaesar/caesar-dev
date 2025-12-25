import React, { useState, useEffect, useRef } from 'react';

interface DecryptTextProps {
    text: string;
    className?: string;
    speed?: number; // ms per char
    revealDirection?: 'start' | 'end' | 'random';
    useOriginalCharsOnly?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

export const DecryptText: React.FC<DecryptTextProps> = ({
    text,
    className = "",
    speed = 40,
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const startScramble = () => {
        let iteration = 0;

        // Clear any existing interval
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3; // slows down the reveal logic
        }, speed);
    };

    useEffect(() => {
        // Initial scramble on mount? Optional. 
        // Let's keep it purely interaction-based or imperative if needed.
        // startScramble();

        // Actually, let's just make sure it resets if text changes
        setDisplayText(text);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    return (
        <span
            className={className}
            onMouseEnter={startScramble}
        >
            {displayText}
        </span>
    );
};
