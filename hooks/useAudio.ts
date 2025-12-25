import { useState, useCallback, useRef, useEffect } from 'react';

type SoundType = 'hover' | 'click' | 'toggle' | 'access';

export const useAudio = () => {
    const [isMuted, setIsMuted] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize Audio Context on first user interaction to handle autoplay policies
    const initAudio = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    }, []);

    const playSound = useCallback((type: SoundType) => {
        if (isMuted) return;
        initAudio();

        const ctx = audioContextRef.current;
        if (!ctx) return;

        const now = ctx.currentTime;

        // Helper for subtle distortion/texture
        const createOscillator = (type: OscillatorType, freq: number, detune: number = 0) => {
            const osc = ctx.createOscillator();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            osc.detune.setValueAtTime(detune, now);
            return osc;
        };

        const createGain = () => {
            const g = ctx.createGain();
            g.gain.setValueAtTime(0, now);
            return g;
        };

        switch (type) {
            case 'hover':
                // Glassy/Holographic "Tick"
                // Uses two sine waves with slight detuning for a shimmering effect
                const osc1 = createOscillator('sine', 2000);
                const osc2 = createOscillator('sine', 2000, 50); // Slight detune
                const gainH = createGain();

                gainH.gain.setValueAtTime(0.02, now);
                gainH.gain.exponentialRampToValueAtTime(0.001, now + 0.03); // Very short, percussive

                osc1.connect(gainH);
                osc2.connect(gainH);
                gainH.connect(ctx.destination);

                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + 0.05);
                osc2.stop(now + 0.05);
                break;

            case 'click':
                // Tech Interface "Confirm"
                // A low punch mixed with a high-tech transient
                const punch = createOscillator('triangle', 150);
                const transient = createOscillator('square', 800);
                const gainC = createGain();

                // Pitch envelope for the punch (kick-like)
                punch.frequency.exponentialRampToValueAtTime(50, now + 0.1);

                // Amplitude
                gainC.gain.setValueAtTime(0.1, now);
                gainC.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

                punch.connect(gainC);
                transient.connect(gainC);
                gainC.connect(ctx.destination);

                punch.start(now);
                transient.start(now);
                punch.stop(now + 0.15);
                transient.stop(now + 0.05); // Transient is shorter
                break;

            case 'toggle':
                // Digital "Warp" / "Charge"
                const warper = createOscillator('sawtooth', 200);
                const gainT = createGain();
                const filter = ctx.createBiquadFilter();

                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(200, now);
                filter.frequency.exponentialRampToValueAtTime(3000, now + 0.1); // Filter sweep

                gainT.gain.setValueAtTime(0.05, now);
                gainT.gain.linearRampToValueAtTime(0, now + 0.15);

                warper.connect(filter);
                filter.connect(gainT);
                gainT.connect(ctx.destination);

                warper.start(now);
                warper.stop(now + 0.15);
                break;

            case 'access':
                // "Data Stream" Success
                // Arpeggiated computer tones
                const baseFreq = 880;
                [0, 0.05, 0.1].forEach((delay, i) => {
                    const tone = createOscillator('sine', baseFreq * (1 + i * 0.5)); // Harmonics
                    const g = createGain();

                    g.gain.setValueAtTime(0.03, now + delay);
                    g.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);

                    tone.connect(g);
                    g.connect(ctx.destination);

                    tone.start(now + delay);
                    tone.stop(now + delay + 0.2);
                });
                break;
        }
    }, [isMuted, initAudio]);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
    }, []);

    return { playSound, isMuted, toggleMute };
};
