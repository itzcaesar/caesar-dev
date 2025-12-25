import React from 'react';

const Scanline: React.FC = () => {
    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-[50] mix-blend-overlay opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] pointer-events-none"></div>
            <div className="fixed inset-0 pointer-events-none z-[50] bg-gradient-to-b from-transparent via-sw-accent/5 to-transparent h-screen w-full animate-scan opacity-20"></div>
        </>
    );
};

export default Scanline;
