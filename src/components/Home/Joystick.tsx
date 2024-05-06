import React, { useState, useCallback } from 'react';
import { Html } from '@react-three/drei';


const Joystick = ({ onChange }: any) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 }); // Center position

    const handleMouseDown = useCallback((e: any) => {
        setIsDragging(true);
        updatePosition(e);
    }, []);

    const handleMouseMove = useCallback((e: any) => {
        if (isDragging) {
            updatePosition(e);
        }
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        // Reset position to center when let go
        setPosition({ x: 50, y: 50 });
        onChange({ x: 0, y: 0 });
    }, [onChange]);

    const updatePosition = (e: any) => {
        const joystick = e.currentTarget;
        const rect = joystick.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const newPosition = { x, y };
        setPosition(newPosition);
        onChange({
            x: (x - 50) / 50, // Normalize -1 to 1
            y: (y - 50) / 50 // Normalize -1 to 1
        });
    };

    return (
        <Html fullscreen>
            <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // End drag when the mouse leaves the area
                style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '100px',
                    background: '#ddd',
                    userSelect: 'none',
                    touchAction: 'none',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    margin: '10px',
                }}
            >
                <div
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '25px',
                        background: '#bbb',
                        position: 'absolute',
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </div>
        </Html>
    );
};

export default Joystick;
