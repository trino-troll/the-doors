'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '@/components/home/aquarium.module.css';
import Link from 'next/link';
import { routes } from '@/shared/const';
import { getColorFromGradient } from '@/shared/get-color-from-gradient';

interface Bubble {
    id: number;
    left: number;
    size: number;
    duration: number;
    zIndex: number;
}

interface Fish {
    id: number;
    position: number;
    direction: 'left' | 'right';
    top: number; // Новая позиция по вертикали
    speed: number; // Разная скорость для каждой рыбки
    color: string; // Разный цвет для каждой рыбки
}

const Aquarium = ({ fishes }: { fishes: number }) => {
    const [fishList, setFishList] = useState<Fish[]>([]);
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const aquariumRef = useRef<HTMLDivElement>(null);

    const FISH_MARGIN = 50;
    const BUBBLE_INTERVAL = 800;

    // Создаем массив рыбок при изменении количества
    useEffect(() => {
        const newFishes: Fish[] = [];
        for (let i = 0; i < fishes; i++) {
            newFishes.push({
                id: i,
                position: Math.random() * (window.innerWidth - 200) + 100, // случайная начальная позиция
                direction: Math.random() > 0.5 ? 'right' : 'left',
                top: Math.random() * 60 + 20, // случайная высота от 20% до 80%
                speed: Math.random() * 0.8 + 0.3, // разная скорость от 0.3 до 1.1
                color: getRandomFishColor(), // случайный цвет
            });
        }
        setFishList(newFishes);
    }, [fishes]);

    // Функция для случайного цвета рыбки
    const getRandomFishColor = (): string => {
        const colors = [
            'linear-gradient(45deg, #ff6b6b, #ff8e8e)', // оранжево-красный
            'linear-gradient(45deg, #4ecdc4, #44a08d)', // бирюзовый
            'linear-gradient(45deg, #ffd93d, #ff9a3d)', // желто-оранжевый
            'linear-gradient(45deg, #6a11cb, #2575fc)', // фиолетово-синий
            'linear-gradient(45deg, #ff9a9e, #fad0c4)', // розовый
            'linear-gradient(45deg, #a1c4fd, #c2e9fb)', // голубой
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        if (fishList.length === 0) return;

        const aquariumWidth = aquariumRef.current
            ? aquariumRef.current.offsetWidth
            : window.innerWidth;

        const animateFishes = () => {
            setFishList((prevFishes) =>
                prevFishes.map((fish) => {
                    let newPosition = fish.position;
                    let newDirection = fish.direction;

                    if (fish.direction === 'right') {
                        newPosition = fish.position + fish.speed;
                        if (newPosition >= aquariumWidth - FISH_MARGIN - 100) {
                            newDirection = 'left';
                            newPosition = aquariumWidth - FISH_MARGIN - 100;
                        }
                    } else {
                        newPosition = fish.position - fish.speed;
                        if (newPosition <= FISH_MARGIN) {
                            newDirection = 'right';
                            newPosition = FISH_MARGIN;
                        }
                    }

                    return {
                        ...fish,
                        position: newPosition,
                        direction: newDirection,
                    };
                })
            );
        };

        const fishAnimationInterval = setInterval(animateFishes, 1000 / 60);

        const generateBubble = () => {
            const zIndex = Math.random() > 0.3 ? 5 : 15;

            const newBubble: Bubble = {
                id: Date.now(),
                left: Math.random() * 100,
                size: Math.random() * 15 + 10,
                duration: Math.random() * 3 + 2,
                zIndex: zIndex,
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
    }, [fishList.length]); // Зависимость от количества рыбок

    return (
        <div ref={aquariumRef} className={styles.aquarium}>
            {/* Рыбки */}
            {fishList.map((fish) => (
                <div
                    key={fish.id}
                    className={`${styles.fish} ${
                        fish.direction === 'left'
                            ? styles.fishLeft
                            : styles.fishRight
                    }`}
                    style={{
                        left: fish.position,
                        top: `${fish.top}%`,
                        // Применяем индивидуальный цвет для каждой рыбки
                    }}
                >
                    <div
                        className={styles.body}
                        style={{ background: fish.color }}
                    ></div>
                    <div
                        className={styles.tail}
                        style={{
                            borderColor:
                                fish.direction === 'right'
                                    ? 'transparent transparent transparent ' +
                                      getColorFromGradient(fish.color)
                                    : 'transparent ' +
                                      getColorFromGradient(fish.color) +
                                      ' transparent transparent',
                        }}
                    ></div>
                    <div className={styles.eye}></div>
                    <div
                        className={styles.fin}
                        style={{ background: getColorFromGradient(fish.color) }}
                    ></div>
                </div>
            ))}

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
                        zIndex: bubble.zIndex,
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
