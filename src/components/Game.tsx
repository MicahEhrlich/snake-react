import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

const GAME_SPEED = 200;

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
    border: 3px solid #333;
    position: fixed;
    margin: 2 px;
    left: ${(props: { $left: number; }) => props.$left * 50}px;
    top: ${(props: { $top: number; }) => props.$top * 50}px;
`;

const SnakePart = styled.div<{part: any}>`
    position: absolute;
    top: ${props => props.part.y * 50}px;
    left: ${props => props.part.x * 50}px;
    width: 50px;
    height: 50px;
    background: green;
    border: 2px solid #333;
`;

const generateRandomPosition = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return { x, y };
}

export const Game = () => {
    const square1Ref = useRef(null);
    const square2Ref = useRef(null);

    const [direction, setDirection] = useState(DIRECTION.UP);
    const [left, setLeft] = useState(200);
    const [bottom, setBottom] = useState(200);


    const [snakeParts, setSnakeParts] = useState([{ x: 13, y: 13 }]);
    const [food, setFood] = useState(generateRandomPosition());

    console.log(`food: {x , y}:  ${food.x} ${food.y}`)


    useEffect(() => {
        const interval = setInterval(() => {
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
            debugger
            setSnakeParts(updatedSnake);
        }, GAME_SPEED)
        return () => { console.log('clear'); clearInterval(interval); }
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

        snakeParts.forEach((part, index) => {
            if (direction === DIRECTION.UP && part.y < 0) {
                part.y = window.innerHeight / 50;
            }
            else if (direction === DIRECTION.DOWN && (part.y * 50) >  window.innerHeight) {
                part.y = 0;
            }
            else if (direction === DIRECTION.RIGHT && (part.x * 50) > window.innerWidth) {
                part.x = 0
            }
            else if (direction === DIRECTION.LEFT && (part.x < 0)) {
                part.x = window.innerWidth / 50;
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

    const checkCollision = () => {
        const square1Rect = square1Ref.current.getBoundingClientRect();
        const square2Rect = square2Ref.current.getBoundingClientRect();
        if (
            // square1Rect.left < square2Rect.right &&
            // square1Rect.right > square2Rect.left &&
            // square1Rect.top < square2Rect.bottom &&
            // square1Rect.bottom > square2Rect.top

            snakeParts[0].x === food.x && snakeParts[0].y === food.y
        ) {
            // setSnakeLen((snakeLen) => snakeLen + 1);
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
            setFood(generateRandomPosition())
        }
    }
    return (
        <div tabIndex={0} onKeyDown={keyDownHandler}>
            <Food ref={square2Ref} $left={food.x} $top={food.y} />

            {snakeParts.map((part, index) => 
                <SnakePart 
                    part={part}
                    ref={square1Ref}
                    key={index}

                />
            )}
        </div>
    )
};