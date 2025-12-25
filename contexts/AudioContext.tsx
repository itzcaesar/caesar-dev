import React, { createContext, useContext, ReactNode } from 'react';
import { useAudio } from '../hooks/useAudio';

type SoundType = 'hover' | 'click' | 'toggle' | 'access';

interface AudioContextProps {
    playSound: (type: SoundType) => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const audio = useAudio();

    return (
        <AudioContext.Provider value={audio}>
            {children}
        </AudioContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useSound must be used within an AudioProvider');
    }
    return context;
};
