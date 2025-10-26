'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '@/components/home/aquarium.module.css';
import Link from 'next/link';
import { routes } from '@/shared/const';

interface Bubble {
    id: number;
    left: number;
    size: number;
    duration: number;
}

const Aquarium = () => {
    const [fishPosition, setFishPosition] = useState(0);
    const [fishDirection, setFishDirection] = useState<'left' | 'right'>(
        'right'
    );
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const aquariumRef = useRef<HTMLDivElement>(null);

    const FISH_SPEED = 0.5;
    const FISH_MARGIN = 50;
    const BUBBLE_INTERVAL = 800;

    useEffect(() => {
        const aquariumWidth = aquariumRef.current
            ? aquariumRef.current.offsetWidth
            : window.innerWidth;

        const animateFish = () => {
            setFishPosition((prevPos) => {
                let newPos = prevPos;
                if (fishDirection === 'right') {
                    newPos = prevPos + FISH_SPEED;
                    if (newPos >= aquariumWidth - FISH_MARGIN - 100) {
                        setFishDirection('left');
                        newPos = aquariumWidth - FISH_MARGIN - 100;
                    }
                } else {
                    newPos = prevPos - FISH_SPEED;
                    if (newPos <= FISH_MARGIN) {
                        setFishDirection('right');
                        newPos = FISH_MARGIN;
                    }
                }
                return newPos;
            });
        };

        const fishAnimationInterval = setInterval(animateFish, 1000 / 60);

        const generateBubble = () => {
            const newBubble: Bubble = {
                id: Date.now(),
                left: Math.random() * 100,
                size: Math.random() * 15 + 10,
                duration: Math.random() * 3 + 2,
            };

            setBubbles((prevBubbles) => [...prevBubbles, newBubble]);

            setTimeout(() => {
                setBubbles((prevBubbles) =>
                    prevBubbles.filter((b) => b.id !== newBubble.id)
                );
            }, newBubble.duration * 1000);
        };

        const bubbleInterval = setInterval(generateBubble, BUBBLE_INTERVAL);

        return () => {
            clearInterval(fishAnimationInterval);
            clearInterval(bubbleInterval);
        };
    }, [fishDirection]);

    return (
        <div ref={aquariumRef} className={styles.aquarium}>
            {/* Рыбка */}
            <div
                className={`${styles.fish} ${
                    fishDirection === 'left'
                        ? styles.fishLeft
                        : styles.fishRight
                }`}
                style={{ left: fishPosition }}
            >
                <div className={styles.body}></div>
                <div className={styles.tail}></div>
                <div className={styles.eye}></div>
                <div className={styles.fin}></div>
            </div>

            {/* Пузыри */}
            {bubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className={styles.bubble}
                    style={{
                        left: `${bubble.left}%`,
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        animationDuration: `${bubble.duration}s`,
                    }}
                ></div>
            ))}

            {/* Водоросли */}
            <div className={styles.seaweed1}></div>
            <div className={styles.seaweed2}></div>
            <div className={styles.seaweed3}></div>
            <div className={styles.seaweed4}></div>

            {/* Камни */}
            <div className={styles.rock1}></div>
            <Link href={routes.LOGIN}>
                <div className={styles.rock2}></div>
            </Link>
        </div>
    );
};

export default Aquarium;
