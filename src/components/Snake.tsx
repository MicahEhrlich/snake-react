import React, { useEffect, useState } from 'react';
import { Board } from './Board';

const enum DIRECTION {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}

const Snake = () => {
    const [snake, setSnake] = useState([
        { x: 10, y: 10 } // Initial position of the snake's head
    ]);
    const [food, setFood] = useState({ x: 15, y: 15 }); // Initial position of the food
    const [direction, setDirection] = useState(DIRECTION.RIGHT); // Initial direction of the snake

    const moveSnake = () => {
        const head = { ...snake[0] };
        switch (direction) {
            case DIRECTION.UP:
                head.y = head.y - 1;
                break;
            case DIRECTION.DOWN:
                head.y = head.y + 1;
                break;
            case DIRECTION.LEFT:
                head.x = head.x - 1;
                break;
            case DIRECTION.RIGHT:
                head.x = head.x + 1;
                break;
            default:
                break;
        }
        const newSnake = [head, ...snake];
        newSnake.pop(); // Remove the tail segment
        setSnake(newSnake);
    };

    useEffect(() => {
        const interval = setInterval(moveSnake, 1000); // Adjust the snake's speed as needed

        return () => {
            clearInterval(interval);
        };
    }, []);



    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.code) {
            case "ArrowUp": setDirection(DIRECTION.UP); break;
            case "ArrowDown": setDirection(DIRECTION.DOWN); break;
            case "ArrowLeft": setDirection(DIRECTION.LEFT); break;
            case "ArrowRight": setDirection(DIRECTION.RIGHT); break;
        }
    };

    return (
        <div tabIndex={0} onKeyDown={keyDownHandler}>
            <Board snake={snake} food={food} />
        </div>
    );
}

export default Snake;
