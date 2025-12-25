import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../contexts/AudioContext';

const bootLogs = [
    "INITIALIZING_KERNEL...",
    "LOADING_MODULES [CAESAR_DEV_V2.0]...",
    "CHECKING_MEMORY_INTEGRITY... OK",
    "ESTABLISHING_SECURE_CONNECTION... OK",
    "MOUNTING_ VIRTUAL_DOM...",
    "LOADING_ASSETS...",
    "CONFIGURING_VIEWPORT...",
    "SYSTEM_READY."
];

export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const { playSound } = useSound();

    useEffect(() => {
        // Prevent scrolling during boot
        document.body.style.overflow = 'hidden';

        const totalTime = 4500; // Total boot time
        const stepTime = totalTime / bootLogs.length;

        // Sequence logs
        bootLogs.forEach((log, index) => {
            setTimeout(() => {
                setLogs(prev => [...prev, log]);
                playSound('click'); // Mechanical click for each log
            }, index * 500);
        });

        // Progress bar
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, totalTime / 100);

        // Completion
        const completeTimeout = setTimeout(() => {
            playSound('access');
            document.body.style.overflow = 'unset';
            onComplete();
        }, totalTime + 500);

        return () => {
            clearTimeout(completeTimeout);
            clearInterval(progressInterval);
            document.body.style.overflow = 'unset';
        };
    }, [onComplete, playSound]);

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-sw-accent p-8"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
        >
            <div className="w-full max-w-md space-y-8">
                {/* LOGS */}
                <div className="h-48 overflow-hidden flex flex-col justify-end border-l-2 border-sw-accent/30 pl-4">
                    {logs.map((log, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs md:text-sm mb-1 uppercase tracking-wider"
                        >
                            <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                            {log}
                        </motion.p>
                    ))}
                </div>

                {/* PROGRESS BAR */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs uppercase">
                        <span>System_Boot</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-900 overflow-hidden">
                        <motion.div
                            className="h-full bg-sw-accent"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
