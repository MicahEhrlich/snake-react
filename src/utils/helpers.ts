import { GamePosition } from "../types";

export const generateRandomPosition = (): GamePosition => {
    const x = Math.floor(Math.random() * 10 + 2);
    const y = Math.floor(Math.random() * 10 + 2);

    return { x, y };
};

export const setRandomItemPosition = (arr: GamePosition[]) => {
    let foodPositionIsInSnake = true;
    let newFoodPosition = { x: 0, y: 0 };
    while (foodPositionIsInSnake) {
        foodPositionIsInSnake = false;
        newFoodPosition = generateRandomPosition();
        arr.forEach((part) => {
            if (part.x === newFoodPosition.x && part.y === newFoodPosition.y) {
                foodPositionIsInSnake = true;
            }
        });
    }
    return newFoodPosition;
};

export const isDuplicatePart = (item: GamePosition, arr: GamePosition[]) => {
    return arr.some((el: GamePosition) => item.x === el.x && item.y === el.y);
};

export const isSnakeSelfCollide = (snake: GamePosition[]) => {
    const uniqueSnakeParts: GamePosition[] = [];
    snake.forEach((part) => {
        if (!isDuplicatePart(part, uniqueSnakeParts)) {
            uniqueSnakeParts.push(part);
        }
    });
    return uniqueSnakeParts.length < snake.length;
};