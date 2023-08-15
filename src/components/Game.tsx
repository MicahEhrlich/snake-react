import { useEffect, useState } from "react";
import styled from 'styled-components';

const GAME_SPEED = 200;

type SnakePart = {
    x: number;
    y: number;
}

const enum DIRECTION {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}

const Food = styled.div<{ $left: number; $top: number }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ff0000;
    border: 2px solid #333;
    position: fixed;
    margin: 2px;
    left: ${(props: { $left: number; }) => props.$left * 50}px;
    top: ${(props: { $top: number; }) => props.$top * 50}px;
`;

const SnakePart = styled.div<{ part: { x: number, y: number } }>`
    position: absolute;
    top: ${props => props.part.y * 50}px;
    left: ${props => props.part.x * 50}px;
    width: 50px;
    height: 50px;
    background: green;
    border: 2px solid #333;
`;

const ScoreBoard = styled.div`
    position: absolute;
    top: 50px; 
    left: 100px;
    font-weight: 500;
    font-size: 30px;
    color: yellow;
`;

const GameOver = styled.div`
    font-weight: 600;
    font-size: 70px;
    color: red;
    top: 50%;
    left: 50%;
`;

const generateRandomPosition = () => {
    const x = Math.floor(Math.random() * 10 + 2);
    const y = Math.floor(Math.random() * 10 + 2);

    return { x, y };
}

export const Game = () => {
    const [direction, setDirection] = useState(DIRECTION.UP);
    const [left, setLeft] = useState(200);
    const [bottom, setBottom] = useState(200);
    const [snakeParts, setSnakeParts] = useState([{ x: 13, y: 13 }]);
    const [food, setFood] = useState(generateRandomPosition());
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameOver) {
                switch (direction) {
                    default:
                    case DIRECTION.UP: setBottom((bottom) => bottom + 50); break;
                    case DIRECTION.DOWN: setBottom((bottom) => bottom - 50); break;
                    case DIRECTION.LEFT: setLeft((left) => left - 50); break;
                    case DIRECTION.RIGHT: setLeft((left) => left + 50); break;
                }

                const head = { ...snakeParts[0] };
                switch (direction) {
                    case DIRECTION.UP:
                        head.y--;
                        break;
                    case DIRECTION.DOWN:
                        head.y++;
                        break;
                    case DIRECTION.LEFT:
                        head.x--;
                        break;
                    case DIRECTION.RIGHT:
                        head.x++;
                        break;
                    default:
                        break;
                }

                const updatedSnake = [head, ...snakeParts.slice(0, -1)];
                setSnakeParts(updatedSnake);
            }
        }, Math.max(GAME_SPEED - score, 30))
        return () => { clearInterval(interval); }
    }, [direction, snakeParts])

    useEffect(() => {
        checkCollision()
        if (direction === DIRECTION.UP && bottom > window.innerHeight) {
            setBottom(0);
        }
        else if (direction === DIRECTION.DOWN && bottom < 0) {
            setBottom(window.innerHeight);
        }
        else if (direction === DIRECTION.RIGHT && left > window.innerWidth) {
            setLeft(0);
        }
        else if (direction === DIRECTION.LEFT && left < 0) {
            setLeft(window.innerWidth);
        }

        snakeParts.forEach((part) => {
            if (direction === DIRECTION.UP && part.y < 3) {
                part.y = Math.floor(window.innerHeight / 50) - 3;
            }
            else if (direction === DIRECTION.DOWN && ((part.y + 3) * 50) > window.innerHeight) {
                part.y = 2;
            }
            else if (direction === DIRECTION.RIGHT && ((part.x + 4) * 50) > window.innerWidth) {
                part.x = 2;
            }
            else if (direction === DIRECTION.LEFT && (part.x < 3)) {
                part.x = Math.floor(window.innerWidth / 50) - 3;
            }
        })
    }, [bottom, left])

    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.code) {
            case "ArrowUp": direction !== DIRECTION.DOWN && setDirection(DIRECTION.UP); break;
            case "ArrowDown": direction !== DIRECTION.UP && setDirection(DIRECTION.DOWN); break;
            case "ArrowLeft": direction !== DIRECTION.RIGHT && setDirection(DIRECTION.LEFT); break;
            case "ArrowRight": direction !== DIRECTION.LEFT && setDirection(DIRECTION.RIGHT); break;
        }
    };

    const setRandomFoodPosition = () => {
        let foodPositionIsInSnake = true;
        let newFoodPosition = { x: 0, y: 0 };
        while (foodPositionIsInSnake) {
            foodPositionIsInSnake = false;
            newFoodPosition = generateRandomPosition();
            snakeParts.forEach((part) => {
                if (part.x === newFoodPosition.x && part.y === newFoodPosition.y) {
                    foodPositionIsInSnake = true;
                }
            })
        }
        setFood(newFoodPosition);
    }

    const isDuplicatePart = (item: SnakePart, arr: SnakePart[]) => {
        return arr.some((el: SnakePart) => item.x === el.x && item.y === el.y);
    }

    const isSnakeSelfCollide = () => {
        const uniqueSnakeParts: SnakePart[] = [];
        snakeParts.forEach((part) => {
            if (!isDuplicatePart(part, uniqueSnakeParts)) {
                uniqueSnakeParts.push(part);
            }
        });
        return uniqueSnakeParts.length < snakeParts.length;
    }

    const checkCollision = () => {
        if (isSnakeSelfCollide()) {
            setGameOver(true);
        }
        else if (
            snakeParts[0].x === food.x && snakeParts[0].y === food.y
        ) {
            setScore((score) => score + 10);
            const head = { ...snakeParts[0] };
            switch (direction) {
                case DIRECTION.UP:
                    head.y--;
                    break;
                case DIRECTION.DOWN:
                    head.y++;
                    break;
                case DIRECTION.LEFT:
                    head.x--;
                    break;
                case DIRECTION.RIGHT:
                    head.x++;
                    break;
                default:
                    break;
            }
            setSnakeParts([...snakeParts, { x: head.x, y: head.y }]);
            setRandomFoodPosition();
        }
    }
    return (
        <>
            {gameOver && <GameOver>GAME OVER!</GameOver>}
            <ScoreBoard>{`SCORE: ${score}`}</ScoreBoard>
            <div tabIndex={0} onKeyDown={keyDownHandler}>
                <Food $left={food.x} $top={food.y} />

                {snakeParts.map((part, index) =>
                    <SnakePart
                        part={part}
                        key={index}

                    />
                )}
            </div>
        </>
    )
};